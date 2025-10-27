const pool = require('./server/config/db');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  try {
    const hash = await bcrypt.hash('admin123', 10);
    console.log('Generated hash:', hash);
    
    await pool.query('DELETE FROM users WHERE email = $1', ['admin@example.com']);
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', ['admin@example.com', hash]);
    
    console.log('Admin user created successfully');
    
    // Test it
    const result = await pool.query('SELECT * FROM users WHERE email = $1', ['admin@example.com']);
    const match = await bcrypt.compare('admin123', result.rows[0].password);
    console.log('Password test:', match ? 'SUCCESS' : 'FAILED');
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

createAdmin();
