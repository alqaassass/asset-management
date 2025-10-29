-- Verify Dummy Data

-- Check Assets
SELECT 'Assets' as table_name, COUNT(*) as count FROM assets;
SELECT 'Sample Assets:' as info;
SELECT id, name, type, assigned_to, status FROM assets LIMIT 10;

-- Check Employees  
SELECT 'Employees' as table_name, COUNT(*) as count FROM employees;
SELECT 'Sample Employees:' as info;
SELECT id, name, email, department FROM employees LIMIT 10;

-- Check Asset Types
SELECT 'Asset Types' as table_name, COUNT(*) as count FROM asset_types;
SELECT 'All Asset Types:' as info;
SELECT id, name FROM asset_types ORDER BY name;
