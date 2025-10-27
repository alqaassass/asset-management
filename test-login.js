const pool = require('./server/config/db');
const bcrypt = require('bcryptjs');

async function test() {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', ['admin@example.com']);
    console.log('User found:', result.rows.length > 0);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log('Email:', user.email);
      console.log('Hash:', user.password);
      
      const match = await bcrypt.compare('admin123', user.password);
      console.log('Password matches:', match);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

test();
