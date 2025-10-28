-- Add 100 diverse assets for AI analysis testing
-- This script creates realistic data patterns to test the AI insights

-- Clear existing assets (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE assets RESTART IDENTITY CASCADE;

-- Add more employees for better distribution
INSERT INTO employees (name, email, department) VALUES 
('Alex Martinez', 'alex.martinez@company.com', 'Engineering'),
('Sophie Chen', 'sophie.chen@company.com', 'Design'),
('Marcus Johnson', 'marcus.johnson@company.com', 'Sales'),
('Emma Wilson', 'emma.wilson@company.com', 'Marketing'),
('Oliver Brown', 'oliver.brown@company.com', 'IT Department'),
('Isabella Garcia', 'isabella.garcia@company.com', 'HR'),
('Liam Anderson', 'liam.anderson@company.com', 'Accounting'),
('Ava Thomas', 'ava.thomas@company.com', 'Engineering'),
('Noah Martinez', 'noah.martinez@company.com', 'Sales'),
('Mia Robinson', 'mia.robinson@company.com', 'Marketing'),
('Ethan White', 'ethan.white@company.com', 'IT Department'),
('Charlotte Harris', 'charlotte.harris@company.com', 'Design'),
('James Clark', 'james.clark@company.com', 'Engineering'),
('Amelia Lewis', 'amelia.lewis@company.com', 'HR'),
('Benjamin Lee', 'benjamin.lee@company.com', 'Sales')
ON CONFLICT (email) DO NOTHING;

-- Add more asset types
INSERT INTO asset_types (name) VALUES 
('Server'), ('Router'), ('Switch'), ('Keyboard'), ('Mouse'), ('Headset'), ('Webcam'), ('Docking Station')
ON CONFLICT (name) DO NOTHING;

-- Insert 100 assets with varied patterns
-- Pattern 1: Recent acquisitions (last 2 months) - 15 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at, updated_at) VALUES
('MacBook Pro 16"', 'Laptop', 'MBP-2024-001', 'New York Office', 'Alex Martinez', 'active', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('MacBook Pro 16"', 'Laptop', 'MBP-2024-002', 'New York Office', 'Sophie Chen', 'active', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
('Dell XPS 15', 'Laptop', 'DELL-2024-001', 'San Francisco Office', 'Marcus Johnson', 'active', NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),
('HP EliteBook', 'Laptop', 'HP-2024-001', 'Austin Office', 'Emma Wilson', 'active', NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
('Lenovo ThinkPad', 'Laptop', 'LEN-2024-001', 'Boston Office', 'Oliver Brown', 'active', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),
('Dell Monitor 27"', 'Monitor', 'MON-2024-001', 'New York Office', 'Isabella Garcia', 'active', NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days'),
('Dell Monitor 27"', 'Monitor', 'MON-2024-002', 'New York Office', 'Liam Anderson', 'active', NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days'),
('iPhone 15 Pro', 'Phone', 'IPH-2024-001', 'San Francisco Office', 'Ava Thomas', 'active', NOW() - INTERVAL '32 days', NOW() - INTERVAL '32 days'),
('iPhone 15 Pro', 'Phone', 'IPH-2024-002', 'Austin Office', 'Noah Martinez', 'active', NOW() - INTERVAL '35 days', NOW() - INTERVAL '35 days'),
('iPad Pro 12.9"', 'Tablet', 'IPAD-2024-001', 'Boston Office', 'Mia Robinson', 'active', NOW() - INTERVAL '40 days', NOW() - INTERVAL '40 days'),
('HP Printer LaserJet', 'Printer', 'PRT-2024-001', 'New York Office', 'Shared Resource', 'active', NOW() - INTERVAL '42 days', NOW() - INTERVAL '42 days'),
('Cisco Router', 'Router', 'RTR-2024-001', 'Server Room NY', 'Shared Resource', 'active', NOW() - INTERVAL '45 days', NOW() - INTERVAL '45 days'),
('Dell Server R740', 'Server', 'SRV-2024-001', 'Data Center', 'Shared Resource', 'active', NOW() - INTERVAL '48 days', NOW() - INTERVAL '48 days'),
('Logitech Webcam', 'Webcam', 'WEB-2024-001', 'New York Office', 'Ethan White', 'active', NOW() - INTERVAL '50 days', NOW() - INTERVAL '50 days'),
('Docking Station', 'Docking Station', 'DOCK-2024-001', 'San Francisco Office', 'Charlotte Harris', 'active', NOW() - INTERVAL '55 days', NOW() - INTERVAL '55 days');

-- Pattern 2: Older assets (3-6 months) - 30 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at, updated_at) VALUES
('MacBook Pro 14"', 'Laptop', 'MBP-2023-101', 'New York Office', 'James Clark', 'active', NOW() - INTERVAL '90 days', NOW() - INTERVAL '30 days'),
('MacBook Pro 14"', 'Laptop', 'MBP-2023-102', 'San Francisco Office', 'Amelia Lewis', 'active', NOW() - INTERVAL '95 days', NOW() - INTERVAL '25 days'),
('Dell XPS 13', 'Laptop', 'DELL-2023-101', 'Austin Office', 'Benjamin Lee', 'active', NOW() - INTERVAL '100 days', NOW() - INTERVAL '20 days'),
('HP EliteBook', 'Laptop', 'HP-2023-101', 'Boston Office', 'John Smith', 'active', NOW() - INTERVAL '105 days', NOW() - INTERVAL '15 days'),
('Lenovo ThinkPad', 'Laptop', 'LEN-2023-101', 'New York Office', 'Sarah Johnson', 'active', NOW() - INTERVAL '110 days', NOW() - INTERVAL '10 days'),
('Dell Desktop', 'Desktop', 'DESK-2023-101', 'San Francisco Office', 'Mike Davis', 'active', NOW() - INTERVAL '115 days', NOW() - INTERVAL '5 days'),
('Dell Desktop', 'Desktop', 'DESK-2023-102', 'Austin Office', 'Emily Brown', 'active', NOW() - INTERVAL '120 days', NOW() - INTERVAL '3 days'),
('HP Desktop', 'Desktop', 'DESK-2023-103', 'Boston Office', 'David Wilson', 'active', NOW() - INTERVAL '125 days', NOW() - INTERVAL '2 days'),
('Dell Monitor 24"', 'Monitor', 'MON-2023-101', 'New York Office', 'Lisa Garcia', 'active', NOW() - INTERVAL '130 days', NOW() - INTERVAL '1 day'),
('Dell Monitor 24"', 'Monitor', 'MON-2023-102', 'San Francisco Office', 'Robert Miller', 'active', NOW() - INTERVAL '135 days', NOW()),
('LG Monitor 27"', 'Monitor', 'MON-2023-103', 'Austin Office', 'Jennifer Taylor', 'active', NOW() - INTERVAL '140 days', NOW() - INTERVAL '60 days'),
('LG Monitor 27"', 'Monitor', 'MON-2023-104', 'Boston Office', 'Michael Anderson', 'active', NOW() - INTERVAL '145 days', NOW() - INTERVAL '55 days'),
('Samsung Monitor', 'Monitor', 'MON-2023-105', 'New York Office', 'Jessica Thomas', 'active', NOW() - INTERVAL '150 days', NOW() - INTERVAL '50 days'),
('iPhone 14', 'Phone', 'IPH-2023-101', 'San Francisco Office', 'Alex Martinez', 'active', NOW() - INTERVAL '155 days', NOW() - INTERVAL '45 days'),
('iPhone 14', 'Phone', 'IPH-2023-102', 'Austin Office', 'Sophie Chen', 'active', NOW() - INTERVAL '160 days', NOW() - INTERVAL '40 days'),
('Samsung Galaxy', 'Phone', 'SAM-2023-101', 'Boston Office', 'Marcus Johnson', 'active', NOW() - INTERVAL '165 days', NOW() - INTERVAL '35 days'),
('iPad Air', 'Tablet', 'IPAD-2023-101', 'New York Office', 'Emma Wilson', 'active', NOW() - INTERVAL '170 days', NOW() - INTERVAL '30 days'),
('iPad Air', 'Tablet', 'IPAD-2023-102', 'San Francisco Office', 'Oliver Brown', 'active', NOW() - INTERVAL '175 days', NOW() - INTERVAL '25 days'),
('HP Printer', 'Printer', 'PRT-2023-101', 'Austin Office', 'Shared Resource', 'active', NOW() - INTERVAL '180 days', NOW() - INTERVAL '20 days'),
('Canon Printer', 'Printer', 'PRT-2023-102', 'Boston Office', 'Shared Resource', 'active', NOW() - INTERVAL '185 days', NOW() - INTERVAL '15 days'),
('Mechanical Keyboard', 'Keyboard', 'KEY-2023-101', 'New York Office', 'Isabella Garcia', 'active', NOW() - INTERVAL '90 days', NOW() - INTERVAL '10 days'),
('Mechanical Keyboard', 'Keyboard', 'KEY-2023-102', 'San Francisco Office', 'Liam Anderson', 'active', NOW() - INTERVAL '95 days', NOW() - INTERVAL '8 days'),
('Logitech Mouse', 'Mouse', 'MOU-2023-101', 'Austin Office', 'Ava Thomas', 'active', NOW() - INTERVAL '100 days', NOW() - INTERVAL '6 days'),
('Logitech Mouse', 'Mouse', 'MOU-2023-102', 'Boston Office', 'Noah Martinez', 'active', NOW() - INTERVAL '105 days', NOW() - INTERVAL '4 days'),
('Wireless Headset', 'Headset', 'HEAD-2023-101', 'New York Office', 'Mia Robinson', 'active', NOW() - INTERVAL '110 days', NOW() - INTERVAL '2 days'),
('Wireless Headset', 'Headset', 'HEAD-2023-102', 'San Francisco Office', 'Ethan White', 'active', NOW() - INTERVAL '115 days', NOW() - INTERVAL '1 day'),
('Cisco Switch', 'Switch', 'SWT-2023-101', 'Server Room SF', 'Shared Resource', 'active', NOW() - INTERVAL '120 days', NOW() - INTERVAL '90 days'),
('Dell Server', 'Server', 'SRV-2023-101', 'Data Center', 'Shared Resource', 'active', NOW() - INTERVAL '125 days', NOW() - INTERVAL '85 days'),
('HP Server', 'Server', 'SRV-2023-102', 'Data Center', 'Shared Resource', 'active', NOW() - INTERVAL '130 days', NOW() - INTERVAL '80 days'),
('Webcam HD', 'Webcam', 'WEB-2023-101', 'Austin Office', 'Charlotte Harris', 'active', NOW() - INTERVAL '135 days', NOW() - INTERVAL '75 days');

-- Pattern 3: Old assets needing maintenance (6+ months, not updated in 90+ days) - 20 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at, updated_at) VALUES
('MacBook Pro 2020', 'Laptop', 'MBP-2020-001', 'New York Office', 'James Clark', 'active', NOW() - INTERVAL '365 days', NOW() - INTERVAL '120 days'),
('MacBook Pro 2020', 'Laptop', 'MBP-2020-002', 'San Francisco Office', 'Amelia Lewis', 'active', NOW() - INTERVAL '370 days', NOW() - INTERVAL '125 days'),
('Dell XPS 2020', 'Laptop', 'DELL-2020-001', 'Austin Office', 'Benjamin Lee', 'active', NOW() - INTERVAL '380 days', NOW() - INTERVAL '130 days'),
('HP EliteBook 2020', 'Laptop', 'HP-2020-001', 'Boston Office', NULL, 'active', NOW() - INTERVAL '390 days', NOW() - INTERVAL '135 days'),
('Lenovo ThinkPad 2020', 'Laptop', 'LEN-2020-001', 'New York Office', NULL, 'active', NOW() - INTERVAL '400 days', NOW() - INTERVAL '140 days'),
('Dell Desktop 2019', 'Desktop', 'DESK-2019-001', 'San Francisco Office', 'John Smith', 'active', NOW() - INTERVAL '500 days', NOW() - INTERVAL '150 days'),
('Dell Desktop 2019', 'Desktop', 'DESK-2019-002', 'Austin Office', 'Sarah Johnson', 'active', NOW() - INTERVAL '510 days', NOW() - INTERVAL '155 days'),
('HP Desktop 2019', 'Desktop', 'DESK-2019-003', 'Boston Office', NULL, 'active', NOW() - INTERVAL '520 days', NOW() - INTERVAL '160 days'),
('Old Monitor 22"', 'Monitor', 'MON-2019-001', 'New York Office', NULL, 'active', NOW() - INTERVAL '530 days', NOW() - INTERVAL '165 days'),
('Old Monitor 22"', 'Monitor', 'MON-2019-002', 'San Francisco Office', NULL, 'active', NOW() - INTERVAL '540 days', NOW() - INTERVAL '170 days'),
('iPhone 12', 'Phone', 'IPH-2020-001', 'Austin Office', 'Mike Davis', 'active', NOW() - INTERVAL '450 days', NOW() - INTERVAL '100 days'),
('iPhone 12', 'Phone', 'IPH-2020-002', 'Boston Office', NULL, 'active', NOW() - INTERVAL '460 days', NOW() - INTERVAL '105 days'),
('Old Printer', 'Printer', 'PRT-2019-001', 'New York Office', 'Shared Resource', 'active', NOW() - INTERVAL '600 days', NOW() - INTERVAL '180 days'),
('Old Printer', 'Printer', 'PRT-2019-002', 'San Francisco Office', 'Shared Resource', 'active', NOW() - INTERVAL '610 days', NOW() - INTERVAL '185 days'),
('Basic Keyboard', 'Keyboard', 'KEY-2019-001', 'Austin Office', NULL, 'active', NOW() - INTERVAL '550 days', NOW() - INTERVAL '175 days'),
('Basic Mouse', 'Mouse', 'MOU-2019-001', 'Boston Office', NULL, 'active', NOW() - INTERVAL '560 days', NOW() - INTERVAL '180 days'),
('Old Headset', 'Headset', 'HEAD-2019-001', 'New York Office', NULL, 'active', NOW() - INTERVAL '570 days', NOW() - INTERVAL '185 days'),
('Old Router', 'Router', 'RTR-2019-001', 'Server Room', 'Shared Resource', 'active', NOW() - INTERVAL '700 days', NOW() - INTERVAL '200 days'),
('Old Switch', 'Switch', 'SWT-2019-001', 'Server Room', 'Shared Resource', 'active', NOW() - INTERVAL '710 days', NOW() - INTERVAL '205 days'),
('Old Server', 'Server', 'SRV-2019-001', 'Data Center', 'Shared Resource', 'active', NOW() - INTERVAL '720 days', NOW() - INTERVAL '210 days');

-- Pattern 4: Inactive assets (should trigger cost optimization insights) - 20 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at, updated_at) VALUES
('Unused Laptop 1', 'Laptop', 'UNU-LAP-001', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '200 days', NOW() - INTERVAL '150 days'),
('Unused Laptop 2', 'Laptop', 'UNU-LAP-002', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '205 days', NOW() - INTERVAL '145 days'),
('Unused Laptop 3', 'Laptop', 'UNU-LAP-003', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '210 days', NOW() - INTERVAL '140 days'),
('Unused Laptop 4', 'Laptop', 'UNU-LAP-004', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '215 days', NOW() - INTERVAL '135 days'),
('Unused Desktop 1', 'Desktop', 'UNU-DESK-001', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '220 days', NOW() - INTERVAL '130 days'),
('Unused Desktop 2', 'Desktop', 'UNU-DESK-002', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '225 days', NOW() - INTERVAL '125 days'),
('Unused Desktop 3', 'Desktop', 'UNU-DESK-003', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '230 days', NOW() - INTERVAL '120 days'),
('Broken Monitor 1', 'Monitor', 'BRK-MON-001', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '180 days', NOW() - INTERVAL '100 days'),
('Broken Monitor 2', 'Monitor', 'BRK-MON-002', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '185 days', NOW() - INTERVAL '95 days'),
('Broken Monitor 3', 'Monitor', 'BRK-MON-003', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '190 days', NOW() - INTERVAL '90 days'),
('Old Phone 1', 'Phone', 'OLD-PHN-001', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '300 days', NOW() - INTERVAL '200 days'),
('Old Phone 2', 'Phone', 'OLD-PHN-002', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '305 days', NOW() - INTERVAL '195 days'),
('Old Phone 3', 'Phone', 'OLD-PHN-003', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '310 days', NOW() - INTERVAL '190 days'),
('Broken Printer 1', 'Printer', 'BRK-PRT-001', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '250 days', NOW() - INTERVAL '150 days'),
('Broken Printer 2', 'Printer', 'BRK-PRT-002', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '255 days', NOW() - INTERVAL '145 days'),
('Old Tablet 1', 'Tablet', 'OLD-TAB-001', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '270 days', NOW() - INTERVAL '160 days'),
('Old Tablet 2', 'Tablet', 'OLD-TAB-002', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '275 days', NOW() - INTERVAL '155 days'),
('Spare Keyboard 1', 'Keyboard', 'SPR-KEY-001', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '150 days', NOW() - INTERVAL '100 days'),
('Spare Mouse 1', 'Mouse', 'SPR-MOU-001', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '155 days', NOW() - INTERVAL '95 days'),
('Old Headset 1', 'Headset', 'OLD-HEAD-001', 'Storage Room', NULL, 'inactive', NOW() - INTERVAL '160 days', NOW() - INTERVAL '90 days');

-- Pattern 5: Unassigned but active assets (underutilization) - 15 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at, updated_at) VALUES
('Available Laptop 1', 'Laptop', 'AVL-LAP-001', 'New York Office', NULL, 'active', NOW() - INTERVAL '60 days', NOW() - INTERVAL '30 days'),
('Available Laptop 2', 'Laptop', 'AVL-LAP-002', 'San Francisco Office', NULL, 'active', NOW() - INTERVAL '65 days', NOW() - INTERVAL '28 days'),
('Available Laptop 3', 'Laptop', 'AVL-LAP-003', 'Austin Office', NULL, 'active', NOW() - INTERVAL '70 days', NOW() - INTERVAL '26 days'),
('Available Desktop 1', 'Desktop', 'AVL-DESK-001', 'Boston Office', NULL, 'active', NOW() - INTERVAL '75 days', NOW() - INTERVAL '24 days'),
('Available Desktop 2', 'Desktop', 'AVL-DESK-002', 'New York Office', NULL, 'active', NOW() - INTERVAL '80 days', NOW() - INTERVAL '22 days'),
('Available Monitor 1', 'Monitor', 'AVL-MON-001', 'San Francisco Office', NULL, 'active', NOW() - INTERVAL '85 days', NOW() - INTERVAL '20 days'),
('Available Monitor 2', 'Monitor', 'AVL-MON-002', 'Austin Office', NULL, 'active', NOW() - INTERVAL '90 days', NOW() - INTERVAL '18 days'),
('Available Phone 1', 'Phone', 'AVL-PHN-001', 'Boston Office', NULL, 'active', NOW() - INTERVAL '50 days', NOW() - INTERVAL '16 days'),
('Available Phone 2', 'Phone', 'AVL-PHN-002', 'New York Office', NULL, 'active', NOW() - INTERVAL '55 days', NOW() - INTERVAL '14 days'),
('Available Tablet 1', 'Tablet', 'AVL-TAB-001', 'San Francisco Office', NULL, 'active', NOW() - INTERVAL '45 days', NOW() - INTERVAL '12 days'),
('Available Tablet 2', 'Tablet', 'AVL-TAB-002', 'Austin Office', NULL, 'active', NOW() - INTERVAL '48 days', NOW() - INTERVAL '10 days'),
('Spare Keyboard 2', 'Keyboard', 'SPR-KEY-002', 'Boston Office', NULL, 'active', NOW() - INTERVAL '40 days', NOW() - INTERVAL '8 days'),
('Spare Mouse 2', 'Mouse', 'SPR-MOU-002', 'New York Office', NULL, 'active', NOW() - INTERVAL '42 days', NOW() - INTERVAL '6 days'),
('Spare Headset 1', 'Headset', 'SPR-HEAD-001', 'San Francisco Office', NULL, 'active', NOW() - INTERVAL '44 days', NOW() - INTERVAL '4 days'),
('Spare Webcam 1', 'Webcam', 'SPR-WEB-001', 'Austin Office', NULL, 'active', NOW() - INTERVAL '46 days', NOW() - INTERVAL '2 days');

-- Summary of data patterns:
-- Total: 100 assets
-- Recent (0-2 months): 15 assets - Should show acquisition spike
-- Medium age (3-6 months): 30 assets - Normal distribution
-- Old (6+ months, not updated 90+ days): 20 assets - Should trigger maintenance alerts
-- Inactive: 20 assets - Should trigger cost optimization
-- Unassigned but active: 15 assets - Should trigger underutilization alerts
-- This creates a realistic scenario with multiple AI insights to test
