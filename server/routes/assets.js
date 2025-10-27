const express = require('express');
const QRCode = require('qrcode');
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all assets
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM assets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single asset (public for QR scanning)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM assets WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create asset
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, type, serial_number, location, assigned_to, status } = req.body;
    
    const result = await pool.query(
      'INSERT INTO assets (name, type, serial_number, location, assigned_to, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, type, serial_number, location, assigned_to, status || 'active']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Serial number already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Update asset
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, serial_number, location, assigned_to, status } = req.body;
    
    const result = await pool.query(
      'UPDATE assets SET name = $1, type = $2, serial_number = $3, location = $4, assigned_to = $5, status = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [name, type, serial_number, location, assigned_to, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete asset
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM assets WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    
    res.json({ message: 'Asset deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get QR code for asset
router.get('/:id/qr', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const assetUrl = `${process.env.CLIENT_URL}/asset/${id}`;
    
    console.log('Generating QR code for URL:', assetUrl);
    console.log('CLIENT_URL env var:', process.env.CLIENT_URL);
    
    const qrCode = await QRCode.toDataURL(assetUrl);
    res.json({ qrCode, url: assetUrl });
  } catch (error) {
    console.error('QR generation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
