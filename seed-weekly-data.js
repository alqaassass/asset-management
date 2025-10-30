// Run this script to add weekly test data
// Usage: node seed-weekly-data.js

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const weeklyTestData = [
  // Day 1 (Today) - 5 assets
  { name: 'iPhone 14 Pro', type: 'Phone', serial: 'IP14-2024-001', location: 'New York Office', assigned: 'Alex Martinez', status: 'in use', daysAgo: 0 },
  { name: 'MacBook Air M2', type: 'Laptop', serial: 'MBA-2024-001', location: 'San Francisco Office', assigned: 'Amelia Lewis', status: 'in use', daysAgo: 0 },
  { name: 'Dell Monitor 27"', type: 'Monitor', serial: 'DM27-2024-001', location: 'Chicago Office', assigned: 'Ava Thomas', status: 'available', daysAgo: 0 },
  { name: 'Logitech Mouse', type: 'Mouse', serial: 'LM-2024-001', location: 'New York Office', assigned: null, status: 'available', daysAgo: 0 },
  { name: 'HP Printer Pro', type: 'Printer', serial: 'HPP-2024-001', location: 'Boston Office', assigned: null, status: 'in use', daysAgo: 0 },
  
  // Day 2 (Yesterday) - 4 assets
  { name: 'iPad Pro 12.9"', type: 'Tablet', serial: 'IPD-2024-001', location: 'Seattle Office', assigned: 'Benjamin Lee', status: 'in use', daysAgo: 1 },
  { name: 'Surface Laptop 5', type: 'Laptop', serial: 'SL5-2024-001', location: 'Austin Office', assigned: 'Charlotte Harris', status: 'in use', daysAgo: 1 },
  { name: 'Samsung Monitor', type: 'Monitor', serial: 'SM-2024-001', location: 'Denver Office', assigned: 'David Wilson', status: 'available', daysAgo: 1 },
  { name: 'Wireless Keyboard', type: 'Keyboard', serial: 'WK-2024-001', location: 'Miami Office', assigned: null, status: 'available', daysAgo: 1 },
  
  // Day 3 (2 days ago) - 6 assets
  { name: 'ThinkPad X1', type: 'Laptop', serial: 'TPX1-2024-001', location: 'Portland Office', assigned: 'Emily Brown', status: 'in use', daysAgo: 2 },
  { name: 'Dell XPS 15', type: 'Desktop', serial: 'DX15-2024-001', location: 'Phoenix Office', assigned: 'Emma Wilson', status: 'in use', daysAgo: 2 },
  { name: 'LG UltraWide', type: 'Monitor', serial: 'LGU-2024-001', location: 'Dallas Office', assigned: 'Ethan White', status: 'available', daysAgo: 2 },
  { name: 'Canon Printer', type: 'Printer', serial: 'CP-2024-001', location: 'Houston Office', assigned: null, status: 'in repair', daysAgo: 2 },
  { name: 'Webcam HD', type: 'Webcam', serial: 'WHD-2024-001', location: 'Atlanta Office', assigned: 'Isabella Garcia', status: 'in use', daysAgo: 2 },
  { name: 'USB Hub', type: 'Peripherals', serial: 'UH-2024-001', location: 'Nashville Office', assigned: null, status: 'available', daysAgo: 2 },
  
  // Day 4 (3 days ago) - 3 assets
  { name: 'MacBook Pro 16"', type: 'Laptop', serial: 'MBP16-2024-001', location: 'Los Angeles Office', assigned: 'James Clark', status: 'in use', daysAgo: 3 },
  { name: 'iMac 24"', type: 'Desktop', serial: 'IM24-2024-001', location: 'San Diego Office', assigned: 'Jennifer Taylor', status: 'in use', daysAgo: 3 },
  { name: 'Epson Scanner', type: 'Scanner', serial: 'ES-2024-001', location: 'Sacramento Office', assigned: null, status: 'available', daysAgo: 3 },
  
  // Day 5 (4 days ago) - 7 assets
  { name: 'Galaxy Tab S8', type: 'Tablet', serial: 'GTS8-2024-001', location: 'Orlando Office', assigned: 'Jessica Thomas', status: 'in use', daysAgo: 4 },
  { name: 'Lenovo ThinkCentre', type: 'Desktop', serial: 'LTC-2024-001', location: 'Tampa Office', assigned: 'John Smith', status: 'in use', daysAgo: 4 },
  { name: 'BenQ Monitor', type: 'Monitor', serial: 'BQ-2024-001', location: 'Charlotte Office', assigned: 'Jonathan Taylor', status: 'available', daysAgo: 4 },
  { name: 'Mechanical Keyboard', type: 'Keyboard', serial: 'MK-2024-001', location: 'Raleigh Office', assigned: 'Jordan Anderson', status: 'in use', daysAgo: 4 },
  { name: 'Headset Pro', type: 'Headset', serial: 'HS-2024-001', location: 'Richmond Office', assigned: null, status: 'available', daysAgo: 4 },
  { name: 'Docking Station', type: 'Docking Station', serial: 'DS-2024-001', location: 'Baltimore Office', assigned: 'Joseph Martinez', status: 'in use', daysAgo: 4 },
  { name: 'External SSD 1TB', type: 'Storage', serial: 'SSD1TB-2024-001', location: 'Philadelphia Office', assigned: null, status: 'available', daysAgo: 4 },
  
  // Day 6 (5 days ago) - 4 assets
  { name: 'HP EliteBook', type: 'Laptop', serial: 'HPEB-2024-001', location: 'Pittsburgh Office', assigned: 'Joshua Brown', status: 'in use', daysAgo: 5 },
  { name: 'Asus ROG Monitor', type: 'Monitor', serial: 'ARM-2024-001', location: 'Cleveland Office', assigned: 'Julia Davis', status: 'available', daysAgo: 5 },
  { name: 'Laser Printer', type: 'Printer', serial: 'LP-2024-001', location: 'Columbus Office', assigned: null, status: 'in repair', daysAgo: 5 },
  { name: 'Conference Phone', type: 'Phone', serial: 'CP-2024-002', location: 'Indianapolis Office', assigned: null, status: 'in use', daysAgo: 5 },
  
  // Day 7 (6 days ago) - 5 assets
  { name: 'Surface Pro 9', type: 'Tablet', serial: 'SP9-2024-001', location: 'Milwaukee Office', assigned: 'Justin Wilson', status: 'in use', daysAgo: 6 },
  { name: 'Mac Mini M2', type: 'Desktop', serial: 'MM2-2024-001', location: 'Detroit Office', assigned: 'Karen Martinez', status: 'in use', daysAgo: 6 },
  { name: 'Acer Monitor 32"', type: 'Monitor', serial: 'AM32-2024-001', location: 'Minneapolis Office', assigned: 'Katherine Johnson', status: 'available', daysAgo: 6 },
  { name: 'Wireless Mouse', type: 'Mouse', serial: 'WM-2024-001', location: 'Kansas City Office', assigned: null, status: 'available', daysAgo: 6 },
  { name: 'Projector HD', type: 'Projector', serial: 'PHD-2024-001', location: 'St. Louis Office', assigned: null, status: 'in use', daysAgo: 6 },
];

async function seedData() {
  try {
    console.log('Starting to seed weekly test data...');
    
    for (const asset of weeklyTestData) {
      await pool.query(
        `INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, NOW() - INTERVAL '${asset.daysAgo} days')`,
        [asset.name, asset.type, asset.serial, asset.location, asset.assigned, asset.status]
      );
      console.log(`✓ Added: ${asset.name} (${asset.daysAgo} days ago)`);
    }
    
    console.log(`\n✅ Successfully added ${weeklyTestData.length} test assets!`);
    console.log('\nBreakdown by day:');
    console.log('Today: 5 assets');
    console.log('Yesterday: 4 assets');
    console.log('2 days ago: 6 assets');
    console.log('3 days ago: 3 assets');
    console.log('4 days ago: 7 assets');
    console.log('5 days ago: 4 assets');
    console.log('6 days ago: 5 assets');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await pool.end();
  }
}

seedData();
