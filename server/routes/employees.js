const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all employees
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create employee
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const result = await pool.query(
      'INSERT INTO employees (name, email, department) VALUES ($1, $2, $3) RETURNING *',
      [name, email, department]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      res.status(400).json({ error: 'Employee email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Delete employee
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM employees WHERE id = $1', [req.params.id]);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
