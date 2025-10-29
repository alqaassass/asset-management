const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/auth');

// Get all vendors with stats
router.get('/', auth, async (req, res) => {
  try {
    const { category, minRating, search } = req.query;
    
    let query = `
      SELECT 
        v.*,
        COUNT(DISTINCT a.id) as total_assets,
        COALESCE(SUM(po.total_amount), 0) as total_spend
      FROM vendors v
      LEFT JOIN assets a ON v.id = a.vendor_id
      LEFT JOIN purchase_orders po ON v.id = po.vendor_id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (category) {
      params.push(category);
      query += ` AND v.category = $${params.length}`;
    }
    
    if (minRating) {
      params.push(minRating);
      query += ` AND v.rating >= $${params.length}`;
    }
    
    if (search) {
      params.push(`%${search}%`);
      query += ` AND v.name ILIKE $${params.length}`;
    }
    
    query += `
      GROUP BY v.id
      ORDER BY v.name
    `;
    
    const result = await pool.query(query, params);
    
    const vendors = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      address: row.address,
      category: row.category,
      rating: parseFloat(row.rating) || 0,
      notes: row.notes,
      contractStartDate: row.contract_start_date,
      contractEndDate: row.contract_end_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      totalAssets: parseInt(row.total_assets),
      totalSpend: parseFloat(row.total_spend)
    }));
    
    res.json(vendors);
  } catch (error) {
    console.error('Get vendors error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single vendor with detailed stats
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const vendorResult = await pool.query('SELECT * FROM vendors WHERE id = $1', [id]);
    
    if (vendorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    
    const vendor = vendorResult.rows[0];
    
    // Get asset stats
    const assetStats = await pool.query(`
      SELECT 
        COUNT(*) as total_assets,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_assets,
        COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_assets
      FROM assets 
      WHERE vendor_id = $1
    `, [id]);
    
    // Get total spend
    const spendResult = await pool.query(`
      SELECT COALESCE(SUM(total_amount), 0) as total_spend
      FROM purchase_orders
      WHERE vendor_id = $1
    `, [id]);
    
    // Calculate reliability score
    const stats = assetStats.rows[0];
    const totalAssets = parseInt(stats.total_assets);
    const activeAssets = parseInt(stats.active_assets);
    const rating = parseFloat(vendor.rating) || 0;
    
    let reliabilityScore = 0;
    if (totalAssets > 0) {
      reliabilityScore = (
        (activeAssets / totalAssets) * 0.4 +
        (rating / 5) * 0.6
      ) * 100;
    }
    
    res.json({
      id: vendor.id,
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
      address: vendor.address,
      category: vendor.category,
      rating: rating,
      notes: vendor.notes,
      contractStartDate: vendor.contract_start_date,
      contractEndDate: vendor.contract_end_date,
      createdAt: vendor.created_at,
      updatedAt: vendor.updated_at,
      totalAssets: totalAssets,
      activeAssets: activeAssets,
      inactiveAssets: parseInt(stats.inactive_assets),
      totalSpend: parseFloat(spendResult.rows[0].total_spend),
      reliabilityScore: Math.round(reliabilityScore)
    });
  } catch (error) {
    console.error('Get vendor error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new vendor
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, address, category, rating, notes, contractStartDate, contractEndDate } = req.body;
    
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }
    
    const result = await pool.query(`
      INSERT INTO vendors (name, email, phone, address, category, rating, notes, contract_start_date, contract_end_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [name, email, phone, address, category, rating, notes, contractStartDate, contractEndDate]);
    
    res.status(201).json({
      message: 'Vendor created successfully',
      vendor: result.rows[0]
    });
  } catch (error) {
    console.error('Create vendor error:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Vendor name already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Update vendor
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, category, rating, notes, contractStartDate, contractEndDate } = req.body;
    
    const result = await pool.query(`
      UPDATE vendors 
      SET name = $1, email = $2, phone = $3, address = $4, category = $5, 
          rating = $6, notes = $7, contract_start_date = $8, contract_end_date = $9,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING *
    `, [name, email, phone, address, category, rating, notes, contractStartDate, contractEndDate, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    
    res.json({
      message: 'Vendor updated successfully',
      vendor: result.rows[0]
    });
  } catch (error) {
    console.error('Update vendor error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete vendor
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Set vendor_id to NULL for all assets before deleting
    await pool.query('UPDATE assets SET vendor_id = NULL WHERE vendor_id = $1', [id]);
    
    const result = await pool.query('DELETE FROM vendors WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    
    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Delete vendor error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get vendor's assets
router.get('/:id/assets', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT * FROM assets 
      WHERE vendor_id = $1
      ORDER BY created_at DESC
    `, [id]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get vendor assets error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get vendor's purchase orders
router.get('/:id/orders', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT * FROM purchase_orders 
      WHERE vendor_id = $1
      ORDER BY order_date DESC
    `, [id]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get vendor orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get vendor dashboard stats
router.get('/dashboard/stats', auth, async (req, res) => {
  try {
    // Total vendors
    const totalResult = await pool.query('SELECT COUNT(*) FROM vendors');
    
    // Vendors by category
    const categoryResult = await pool.query(`
      SELECT category, COUNT(*) as count
      FROM vendors
      GROUP BY category
      ORDER BY count DESC
    `);
    
    // Top vendors by spend
    const spendResult = await pool.query(`
      SELECT v.id, v.name, v.category, COALESCE(SUM(po.total_amount), 0) as total_spend
      FROM vendors v
      LEFT JOIN purchase_orders po ON v.id = po.vendor_id
      GROUP BY v.id, v.name, v.category
      ORDER BY total_spend DESC
      LIMIT 5
    `);
    
    // Top vendors by assets
    const assetsResult = await pool.query(`
      SELECT v.id, v.name, v.category, COUNT(a.id) as asset_count
      FROM vendors v
      LEFT JOIN assets a ON v.id = a.vendor_id
      GROUP BY v.id, v.name, v.category
      ORDER BY asset_count DESC
      LIMIT 5
    `);
    
    // Average rating
    const ratingResult = await pool.query('SELECT AVG(rating) as avg_rating FROM vendors WHERE rating IS NOT NULL');
    
    // Total spend
    const totalSpendResult = await pool.query('SELECT COALESCE(SUM(total_amount), 0) as total_spend FROM purchase_orders');
    
    // Active contracts
    const activeContractsResult = await pool.query(`
      SELECT COUNT(*) as active_contracts
      FROM vendors
      WHERE contract_end_date >= CURRENT_DATE
    `);
    
    // Expiring contracts (within 30 days)
    const expiringResult = await pool.query(`
      SELECT v.id, v.name, v.contract_end_date,
             (v.contract_end_date - CURRENT_DATE) as days_remaining
      FROM vendors v
      WHERE v.contract_end_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
      ORDER BY v.contract_end_date
    `);
    
    res.json({
      overview: {
        totalVendors: parseInt(totalResult.rows[0].count),
        activeContracts: parseInt(activeContractsResult.rows[0].active_contracts),
        totalSpend: parseFloat(totalSpendResult.rows[0].total_spend),
        averageRating: parseFloat(ratingResult.rows[0].avg_rating) || 0
      },
      categoryDistribution: categoryResult.rows.map(row => ({
        category: row.category,
        count: parseInt(row.count)
      })),
      topVendorsBySpend: spendResult.rows.map(row => ({
        id: row.id,
        name: row.name,
        category: row.category,
        totalSpend: parseFloat(row.total_spend)
      })),
      topVendorsByAssets: assetsResult.rows.map(row => ({
        id: row.id,
        name: row.name,
        category: row.category,
        assetCount: parseInt(row.asset_count)
      })),
      expiringContracts: expiringResult.rows.map(row => ({
        id: row.id,
        name: row.name,
        contractEndDate: row.contract_end_date,
        daysRemaining: parseInt(row.days_remaining)
      }))
    });
  } catch (error) {
    console.error('Vendor dashboard stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
