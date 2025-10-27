const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all asset types
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM asset_types ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create asset type
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      'INSERT INTO asset_types (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      res.status(400).json({ error: 'Asset type already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Delete asset type
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM asset_types WHERE id = $1', [req.params.id]);
    res.json({ message: 'Asset type deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
