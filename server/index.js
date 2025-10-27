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
    const totalResult = await pool.query('SELECT COUNT(*) FROM assets');
    const activeResult = await pool.query("SELECT COUNT(*) FROM assets WHERE status = 'active'");
    const inactiveResult = await pool.query("SELECT COUNT(*) FROM assets WHERE status = 'inactive'");
    
    res.json({
      total: parseInt(totalResult.rows[0].count),
      active: parseInt(activeResult.rows[0].count),
      inactive: parseInt(inactiveResult.rows[0].count)
    });
  } catch (error) {
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
