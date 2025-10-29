const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const assetRoutes = require('./routes/assets');
const assetTypesRoutes = require('./routes/assetTypes');
const employeesRoutes = require('./routes/employees');
const vendorsRoutes = require('./routes/vendors');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/asset-types', assetTypesRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/vendors', vendorsRoutes);

// Charts data endpoint with AI insights
app.get('/api/insights/charts', async (req, res) => {
  try {
    const pool = require('./config/db');
    
    // 1. Asset Acquisition Trend (last 12 months)
    const trendResult = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY') as month,
        COUNT(*) as count,
        DATE_TRUNC('month', created_at) as month_date
      FROM assets 
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY DATE_TRUNC('month', created_at)
    `);
    
    // 2. Status Distribution
    const statusResult = await pool.query(`
      SELECT status, COUNT(*) as count 
      FROM assets 
      GROUP BY status
    `);
    
    const totalAssets = statusResult.rows.reduce((sum, row) => sum + parseInt(row.count), 0);
    
    // 3. Asset Type Distribution
    const typeResult = await pool.query(`
      SELECT type, COUNT(*) as count 
      FROM assets 
      GROUP BY type 
      ORDER BY count DESC
    `);
    
    // 4. Assignment Distribution
    const assignmentResult = await pool.query(`
      SELECT 
        CASE 
          WHEN assigned_to IS NULL THEN 'Unassigned'
          WHEN assigned_to = 'Shared Resource' THEN 'Shared'
          ELSE 'Assigned'
        END as category,
        COUNT(*) as count
      FROM assets
      GROUP BY category
    `);
    
    // Generate AI insights
    const trendData = trendResult.rows.map(row => ({
      month: row.month,
      count: parseInt(row.count)
    }));
    
    // Trend insight
    let trendInsight = 'Asset acquisition is steady.';
    if (trendData.length >= 2) {
      const recent = trendData[trendData.length - 1].count;
      const previous = trendData[trendData.length - 2].count;
      const change = ((recent - previous) / previous * 100).toFixed(0);
      
      if (Math.abs(change) > 30) {
        trendInsight = `📈 Asset acquisition ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change)}% this month. ${change > 0 ? 'Consider reviewing budget allocation.' : 'Acquisition rate has slowed significantly.'}`;
      } else if (Math.abs(change) > 10) {
        trendInsight = `Asset acquisition ${change > 0 ? 'grew' : 'declined'} by ${Math.abs(change)}% compared to last month.`;
      }
    }
    
    // Status insight
    const activeCount = statusResult.rows.find(r => r.status === 'active')?.count || 0;
    const activePercent = ((activeCount / totalAssets) * 100).toFixed(0);
    let statusInsight = `${activePercent}% of assets are currently active.`;
    if (activePercent < 70) {
      statusInsight = `⚠️ Only ${activePercent}% of assets are active. Consider reviewing inactive assets for reallocation or disposal.`;
    } else if (activePercent > 90) {
      statusInsight = `✅ Excellent! ${activePercent}% of assets are actively deployed and in use.`;
    }
    
    // Type insight
    const topType = typeResult.rows[0];
    const topTypePercent = ((topType.count / totalAssets) * 100).toFixed(0);
    let typeInsight = `${topType.type} is the most common asset type (${topTypePercent}%).`;
    if (topTypePercent > 40) {
      typeInsight = `⚠️ ${topType.type} assets dominate your inventory at ${topTypePercent}%. Consider diversifying asset types for better flexibility.`;
    }
    
    // Assignment insight
    const unassignedCount = assignmentResult.rows.find(r => r.category === 'Unassigned')?.count || 0;
    const unassignedPercent = ((unassignedCount / totalAssets) * 100).toFixed(0);
    let assignmentInsight = `${unassignedPercent}% of assets are currently unassigned.`;
    if (unassignedPercent > 20) {
      assignmentInsight = `💡 ${unassignedPercent}% of assets (${unassignedCount} items) are unassigned. Consider reallocating these resources to improve utilization.`;
    } else if (unassignedPercent < 5) {
      assignmentInsight = `✅ Great asset utilization! Only ${unassignedPercent}% of assets are unassigned.`;
    }
    
    res.json({
      trendData: {
        data: trendData,
        insight: trendInsight
      },
      statusData: {
        data: statusResult.rows.map(row => ({
          status: row.status,
          count: parseInt(row.count),
          percentage: ((parseInt(row.count) / totalAssets) * 100).toFixed(1),
          color: row.status === 'active' ? '#10B981' : row.status === 'inactive' ? '#EF4444' : '#F59E0B'
        })),
        insight: statusInsight
      },
      typeData: {
        data: typeResult.rows.map(row => ({
          type: row.type,
          count: parseInt(row.count),
          percentage: ((parseInt(row.count) / totalAssets) * 100).toFixed(1)
        })),
        insight: typeInsight
      },
      assignmentData: {
        data: assignmentResult.rows.map(row => ({
          category: row.category,
          count: parseInt(row.count),
          percentage: ((parseInt(row.count) / totalAssets) * 100).toFixed(1),
          color: row.category === 'Assigned' ? '#3B82F6' : row.category === 'Unassigned' ? '#F59E0B' : '#8B5CF6'
        })),
        insight: assignmentInsight
      }
    });
  } catch (error) {
    console.error('Charts data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

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
      LIMIT 5
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
      LIMIT 5
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
