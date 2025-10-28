const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const assetRoutes = require('./routes/assets');
const assetTypesRoutes = require('./routes/assetTypes');
const employeesRoutes = require('./routes/employees');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/asset-types', assetTypesRoutes);
app.use('/api/employees', employeesRoutes);

// Dashboard stats endpoint
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const pool = require('./config/db');
    
    // Basic counts
    const totalResult = await pool.query('SELECT COUNT(*) FROM assets');
    const activeResult = await pool.query("SELECT COUNT(*) FROM assets WHERE status = 'active'");
    const inactiveResult = await pool.query("SELECT COUNT(*) FROM assets WHERE status = 'inactive'");
    
    // Asset types distribution
    const typeDistribution = await pool.query(`
      SELECT type, COUNT(*) as count 
      FROM assets 
      GROUP BY type 
      ORDER BY count DESC
    `);
    
    // Most assigned employees
    const topEmployees = await pool.query(`
      SELECT assigned_to, COUNT(*) as asset_count 
      FROM assets 
      WHERE assigned_to IS NOT NULL AND assigned_to != 'Shared Resource'
      GROUP BY assigned_to 
      ORDER BY asset_count DESC 
      LIMIT 5
    `);
    
    // Location distribution
    const locationStats = await pool.query(`
      SELECT location, COUNT(*) as count 
      FROM assets 
      WHERE location IS NOT NULL AND location != ''
      GROUP BY location 
      ORDER BY count DESC 
      LIMIT 10
    `);
    
    // Recent assets (last 30 days)
    const recentAssets = await pool.query(`
      SELECT COUNT(*) as count 
      FROM assets 
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);
    
    // Assets by status breakdown
    const statusBreakdown = await pool.query(`
      SELECT status, COUNT(*) as count 
      FROM assets 
      GROUP BY status
    `);
    
    res.json({
      overview: {
        total: parseInt(totalResult.rows[0].count),
        active: parseInt(activeResult.rows[0].count),
        inactive: parseInt(inactiveResult.rows[0].count),
        recentlyAdded: parseInt(recentAssets.rows[0].count)
      },
      typeDistribution: typeDistribution.rows.map(row => ({
        type: row.type,
        count: parseInt(row.count)
      })),
      topEmployees: topEmployees.rows.map(row => ({
        name: row.assigned_to,
        assetCount: parseInt(row.asset_count)
      })),
      locationStats: locationStats.rows.map(row => ({
        location: row.location,
        count: parseInt(row.count)
      })),
      statusBreakdown: statusBreakdown.rows.map(row => ({
        status: row.status,
        count: parseInt(row.count)
      }))
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
