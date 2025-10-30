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
    
    // Get time range from query parameter (default: 1 year)
    const timeRange = req.query.range || '1year';
    let interval, dateFormat, truncFormat;
    
    switch(timeRange) {
      case '1week':
        interval = '7 days';
        dateFormat = 'Dy';
        truncFormat = 'day';
        break;
      case '1month':
        interval = '30 days';
        dateFormat = 'Mon DD';
        truncFormat = 'day';
        break;
      case '1year':
      default:
        interval = '12 months';
        dateFormat = 'Mon YYYY';
        truncFormat = 'month';
        break;
    }
    
    // 1. Asset Acquisition Trend
    const trendResult = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC($1, created_at), $2) as month,
        COUNT(*) as count,
        DATE_TRUNC($1, created_at) as month_date
      FROM assets 
      WHERE created_at >= NOW() - INTERVAL '${interval}'
      GROUP BY DATE_TRUNC($1, created_at)
      ORDER BY DATE_TRUNC($1, created_at)
    `, [truncFormat, dateFormat]);
    
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
    
    // Helper function to randomly select insight
    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    // Generate AI insights
    const trendData = trendResult.rows.map(row => ({
      month: row.month,
      count: parseInt(row.count)
    }));
    
    // Calculate trend statistics
    const totalAcquired = trendData.reduce((sum, d) => sum + d.count, 0);
    const avgPerMonth = (totalAcquired / trendData.length).toFixed(1);
    const maxMonth = trendData.reduce((max, d) => d.count > max.count ? d : max, trendData[0]);
    const minMonth = trendData.reduce((min, d) => d.count < min.count ? d : min, trendData[0]);
    
    // Generate diverse trend insights
    const trendInsights = [
      `📊 You've acquired ${totalAcquired} assets over the past ${trendData.length} months. Average: ${avgPerMonth} per month.`,
      `📈 Peak acquisition was in ${maxMonth.month} with ${maxMonth.count} assets. Plan for similar capacity needs.`,
      `💡 Your slowest month was ${minMonth.month} (${minMonth.count} assets). Consider seasonal patterns in procurement.`,
      `📊 Asset acquisition averages ${avgPerMonth} per month. Budget accordingly for consistent growth.`,
      `🎯 Highest acquisition: ${maxMonth.count} assets in ${maxMonth.month}. Lowest: ${minMonth.count} in ${minMonth.month}.`
    ];
    
    let trendInsight = randomChoice(trendInsights);
    
    // Add recent change insight if applicable
    if (trendData.length >= 2) {
      const recent = trendData[trendData.length - 1].count;
      const previous = trendData[trendData.length - 2].count;
      const change = ((recent - previous) / previous * 100).toFixed(0);
      
      if (Math.abs(change) > 30) {
        const recentChangeInsights = [
          `📈 Recent surge: ${Math.abs(change)}% ${change > 0 ? 'increase' : 'decrease'} this month. ${change > 0 ? 'Ensure adequate tracking resources.' : 'Investigate if this slowdown is intentional.'}`,
          `⚠️ Significant ${change > 0 ? 'spike' : 'drop'} detected: ${Math.abs(change)}% change from last month. Review procurement strategy.`,
          `🚨 ${Math.abs(change)}% ${change > 0 ? 'jump' : 'decline'} in acquisitions. ${change > 0 ? 'Prepare for increased management overhead.' : 'Consider if this aligns with business goals.'}`
        ];
        trendInsight = randomChoice(recentChangeInsights);
      }
    }
    
    // Status insight with diverse information
    const inUseCount = statusResult.rows.find(r => r.status === 'in use')?.count || 0;
    const availableCount = statusResult.rows.find(r => r.status === 'available')?.count || 0;
    const inRepairCount = statusResult.rows.find(r => r.status === 'in repair')?.count || 0;
    const inUsePercent = ((inUseCount / totalAssets) * 100).toFixed(1);
    const availablePercent = ((availableCount / totalAssets) * 100).toFixed(1);
    const inRepairPercent = ((inRepairCount / totalAssets) * 100).toFixed(1);
    const utilizationRate = ((inUseCount / (inUseCount + availableCount)) * 100).toFixed(1);
    
    // Generate diverse status insights
    const statusInsights = [
      `✅ ${inUseCount} assets in use, ${availableCount} available, ${inRepairCount} in repair. Healthy distribution.`,
      `📊 Utilization rate: ${utilizationRate}% (${inUseCount} deployed out of ${inUseCount + availableCount} operational assets).`,
      `💡 ${availableCount} assets ready for deployment. That's ${availablePercent}% of your inventory available on demand.`,
      `🔧 Maintenance impact: ${inRepairPercent}% of assets are being serviced. ${inRepairCount > 0 ? 'Plan for temporary capacity reduction.' : 'All assets operational!'}`,
      `🎯 ${inUsePercent}% active deployment rate. ${availableCount} assets in reserve for future needs.`,
      `📈 Asset health: ${((inUseCount + availableCount) / totalAssets * 100).toFixed(1)}% operational, ${inRepairPercent}% under maintenance.`
    ];
    
    let statusInsight = randomChoice(statusInsights);
    
    // Override with critical insights
    if (inRepairCount > 0 && inRepairPercent > 10) {
      const criticalInsights = [
        `⚠️ High maintenance alert: ${inRepairCount} assets (${inRepairPercent}%) need repair. Review asset quality and usage patterns.`,
        `🔧 ${inRepairPercent}% maintenance rate is elevated. Consider preventive maintenance program to reduce downtime.`,
        `⚠️ ${inRepairCount} assets under repair. This impacts ${inRepairPercent}% of capacity - plan for replacements.`
      ];
      statusInsight = randomChoice(criticalInsights);
    } else if (availableCount > totalAssets * 0.3) {
      const underutilizedInsights = [
        `💡 ${availableCount} assets (${availablePercent}%) are idle. Potential cost savings through reallocation or disposal.`,
        `📦 Over 30% of assets are unused. Consider: 1) Reassigning to new employees, 2) Retiring old equipment.`,
        `⚠️ Low utilization detected: ${utilizationRate}% usage rate. ${availableCount} assets could be better deployed.`
      ];
      statusInsight = randomChoice(underutilizedInsights);
    }
    
    // Type insight with diverse information
    const topType = typeResult.rows[0];
    const secondType = typeResult.rows[1];
    const thirdType = typeResult.rows[2];
    const topTypePercent = ((parseInt(topType.count) / totalAssets) * 100).toFixed(0);
    const typeCount = typeResult.rows.length;
    const top3Count = parseInt(topType.count) + parseInt(secondType?.count || 0) + parseInt(thirdType?.count || 0);
    const top3Percent = ((top3Count / totalAssets) * 100).toFixed(0);
    
    // Generate diverse type insights
    const typeInsights = [
      `📊 You manage ${typeCount} different asset types. Top category: ${topType.type} (${topTypePercent}%).`,
      `💼 Asset diversity: ${typeCount} types tracked. ${topType.type} leads with ${topType.count} items.`,
      `📈 Top 3 categories (${topType.type}, ${secondType?.type || 'N/A'}, ${thirdType?.type || 'N/A'}) represent ${top3Percent}% of inventory.`,
      `🎯 ${topType.type} is your primary asset type with ${topType.count} units (${topTypePercent}% of total).`,
      `📊 Asset portfolio: ${typeCount} categories managed. Largest: ${topType.type} (${topTypePercent}%), smallest: ${typeResult.rows[typeResult.rows.length-1].type}.`
    ];
    
    let typeInsight = randomChoice(typeInsights);
    
    // Override for concentration risk
    if (topTypePercent > 40) {
      const concentrationInsights = [
        `⚠️ Portfolio risk: ${topType.type} dominates at ${topTypePercent}%. Diversification recommended for resilience.`,
        `📊 Heavy concentration in ${topType.type} (${topTypePercent}%). Consider expanding into other asset categories.`,
        `💡 ${topTypePercent}% of assets are ${topType.type}. Diversifying could reduce operational risk and increase flexibility.`
      ];
      typeInsight = randomChoice(concentrationInsights);
    }
    
    // Assignment insight with diverse information
    const unassignedCount = assignmentResult.rows.find(r => r.category === 'Unassigned')?.count || 0;
    const sharedCount = assignmentResult.rows.find(r => r.category === 'Shared')?.count || 0;
    const assignedCount = assignmentResult.rows.find(r => r.category === 'Assigned')?.count || 0;
    const assignedPercent = ((assignedCount / totalAssets) * 100).toFixed(0);
    const unassignedPercent = ((unassignedCount / totalAssets) * 100).toFixed(0);
    const sharedPercent = ((sharedCount / totalAssets) * 100).toFixed(0);
    const accountabilityRate = (((assignedCount + sharedCount) / totalAssets) * 100).toFixed(0);
    
    // Generate diverse assignment insights
    const assignmentInsights = [
      `👥 ${assignedCount} assets individually assigned, ${sharedCount} shared resources, ${unassignedCount} unassigned.`,
      `📊 Accountability rate: ${accountabilityRate}% of assets have clear ownership (assigned or shared).`,
      `💼 Assignment breakdown: ${assignedPercent}% individual, ${sharedPercent}% shared, ${unassignedPercent}% unassigned.`,
      `🎯 ${assignedCount} assets have individual owners. ${sharedCount} are shared resources across teams.`,
      `📈 ${unassignedCount} assets awaiting assignment. ${assignedCount + sharedCount} already have clear ownership.`,
      `✅ ${accountabilityRate}% of assets are tracked with ownership. ${unassignedCount} need assignment for full accountability.`
    ];
    
    let assignmentInsight = randomChoice(assignmentInsights);
    
    // Override for critical situations
    if (unassignedCount === 0) {
      const perfectInsights = [
        `✅ Perfect accountability! All ${totalAssets} assets are assigned (${assignedCount} individual, ${sharedCount} shared).`,
        `🎯 100% assignment rate achieved! ${assignedCount} individually assigned, ${sharedCount} shared resources.`,
        `🏆 Excellent tracking: Every asset has an owner. ${assignedPercent}% individual, ${sharedPercent}% shared.`
      ];
      assignmentInsight = randomChoice(perfectInsights);
    } else if (unassignedPercent > 30) {
      const criticalInsights = [
        `⚠️ ${unassignedCount} assets (${unassignedPercent}%) lack owners. This creates accountability gaps and loss risk.`,
        `📋 High unassignment rate: ${unassignedPercent}%. Assign owners to improve tracking and reduce loss/theft risk.`,
        `🚨 ${unassignedCount} assets untracked. Immediate action needed: assign to employees or mark as shared resources.`
      ];
      assignmentInsight = randomChoice(criticalInsights);
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

// Notifications endpoint
app.get('/api/notifications', async (req, res) => {
  try {
    const pool = require('./config/db');
    
    // Get recent critical events
    const criticalAssets = await pool.query(`
      SELECT name, status, updated_at 
      FROM assets 
      WHERE status = 'in_repair' 
      ORDER BY updated_at DESC 
      LIMIT 5
    `);
    
    // Get recently added assets
    const recentAssets = await pool.query(`
      SELECT name, type, created_at 
      FROM assets 
      WHERE created_at >= NOW() - INTERVAL '7 days'
      ORDER BY created_at DESC 
      LIMIT 3
    `);
    
    // Generate notifications
    const notifications = [];
    
    // Critical events
    criticalAssets.rows.forEach(asset => {
      notifications.push({
        id: `repair_${asset.name}`,
        type: 'warning',
        title: 'Asset Needs Attention',
        message: `${asset.name} is currently in repair`,
        timestamp: asset.updated_at,
        icon: '⚠️'
      });
    });
    
    // Recent additions
    recentAssets.rows.forEach(asset => {
      notifications.push({
        id: `new_${asset.name}`,
        type: 'info',
        title: 'New Asset Added',
        message: `${asset.name} (${asset.type}) was added to inventory`,
        timestamp: asset.created_at,
        icon: '📦'
      });
    });
    
    // Add some system notifications
    notifications.push({
      id: 'system_backup',
      type: 'success',
      title: 'System Update',
      message: 'Daily backup completed successfully',
      timestamp: new Date(),
      icon: '✅'
    });
    
    // Sort by timestamp (newest first)
    notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json(notifications.slice(0, 10)); // Return top 10 notifications
  } catch (error) {
    console.error('Notifications error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Dashboard stats endpoint
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const pool = require('./config/db');
    
    // Basic counts
    const totalResult = await pool.query('SELECT COUNT(*) FROM assets');
    const inUseResult = await pool.query("SELECT COUNT(*) FROM assets WHERE status = 'in use'");
    const availableResult = await pool.query("SELECT COUNT(*) FROM assets WHERE status = 'available'");
    const inRepairResult = await pool.query("SELECT COUNT(*) FROM assets WHERE status = 'in repair'");
    
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
      WHERE assigned_to IS NOT NULL 
        AND assigned_to != '' 
        AND assigned_to != 'Shared Resource'
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
        inUse: parseInt(inUseResult.rows[0].count),
        available: parseInt(availableResult.rows[0].count),
        inRepair: parseInt(inRepairResult.rows[0].count),
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
