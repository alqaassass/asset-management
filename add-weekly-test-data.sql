-- Add test data for the past week to test the time range selector
-- This will add assets with created_at dates spread across the last 7 days

-- Day 1 (Today) - 5 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at) VALUES
('iPhone 14 Pro', 'Phone', 'IP14-2024-001', 'New York Office', 'Alex Martinez', 'in use', NOW()),
('MacBook Air M2', 'Laptop', 'MBA-2024-001', 'San Francisco Office', 'Amelia Lewis', 'in use', NOW()),
('Dell Monitor 27"', 'Monitor', 'DM27-2024-001', 'Chicago Office', 'Ava Thomas', 'available', NOW()),
('Logitech Mouse', 'Mouse', 'LM-2024-001', 'New York Office', NULL, 'available', NOW()),
('HP Printer Pro', 'Printer', 'HPP-2024-001', 'Boston Office', NULL, 'in use', NOW());

-- Day 2 (Yesterday) - 4 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at) VALUES
('iPad Pro 12.9"', 'Tablet', 'IPD-2024-001', 'Seattle Office', 'Benjamin Lee', 'in use', NOW() - INTERVAL '1 day'),
('Surface Laptop 5', 'Laptop', 'SL5-2024-001', 'Austin Office', 'Charlotte Harris', 'in use', NOW() - INTERVAL '1 day'),
('Samsung Monitor', 'Monitor', 'SM-2024-001', 'Denver Office', 'David Wilson', 'available', NOW() - INTERVAL '1 day'),
('Wireless Keyboard', 'Keyboard', 'WK-2024-001', 'Miami Office', NULL, 'available', NOW() - INTERVAL '1 day');

-- Day 3 (2 days ago) - 6 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at) VALUES
('ThinkPad X1', 'Laptop', 'TPX1-2024-001', 'Portland Office', 'Emily Brown', 'in use', NOW() - INTERVAL '2 days'),
('Dell XPS 15', 'Desktop', 'DX15-2024-001', 'Phoenix Office', 'Emma Wilson', 'in use', NOW() - INTERVAL '2 days'),
('LG UltraWide', 'Monitor', 'LGU-2024-001', 'Dallas Office', 'Ethan White', 'available', NOW() - INTERVAL '2 days'),
('Canon Printer', 'Printer', 'CP-2024-001', 'Houston Office', NULL, 'in repair', NOW() - INTERVAL '2 days'),
('Webcam HD', 'Webcam', 'WHD-2024-001', 'Atlanta Office', 'Isabella Garcia', 'in use', NOW() - INTERVAL '2 days'),
('USB Hub', 'Peripherals', 'UH-2024-001', 'Nashville Office', NULL, 'available', NOW() - INTERVAL '2 days');

-- Day 4 (3 days ago) - 3 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at) VALUES
('MacBook Pro 16"', 'Laptop', 'MBP16-2024-001', 'Los Angeles Office', 'James Clark', 'in use', NOW() - INTERVAL '3 days'),
('iMac 24"', 'Desktop', 'IM24-2024-001', 'San Diego Office', 'Jennifer Taylor', 'in use', NOW() - INTERVAL '3 days'),
('Epson Scanner', 'Scanner', 'ES-2024-001', 'Sacramento Office', NULL, 'available', NOW() - INTERVAL '3 days');

-- Day 5 (4 days ago) - 7 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at) VALUES
('Galaxy Tab S8', 'Tablet', 'GTS8-2024-001', 'Orlando Office', 'Jessica Thomas', 'in use', NOW() - INTERVAL '4 days'),
('Lenovo ThinkCentre', 'Desktop', 'LTC-2024-001', 'Tampa Office', 'John Smith', 'in use', NOW() - INTERVAL '4 days'),
('BenQ Monitor', 'Monitor', 'BQ-2024-001', 'Charlotte Office', 'Jonathan Taylor', 'available', NOW() - INTERVAL '4 days'),
('Mechanical Keyboard', 'Keyboard', 'MK-2024-001', 'Raleigh Office', 'Jordan Anderson', 'in use', NOW() - INTERVAL '4 days'),
('Headset Pro', 'Headset', 'HP-2024-001', 'Richmond Office', NULL, 'available', NOW() - INTERVAL '4 days'),
('Docking Station', 'Docking Station', 'DS-2024-001', 'Baltimore Office', 'Joseph Martinez', 'in use', NOW() - INTERVAL '4 days'),
('External SSD 1TB', 'Storage', 'SSD1TB-2024-001', 'Philadelphia Office', NULL, 'available', NOW() - INTERVAL '4 days');

-- Day 6 (5 days ago) - 4 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at) VALUES
('HP EliteBook', 'Laptop', 'HPEB-2024-001', 'Pittsburgh Office', 'Joshua Brown', 'in use', NOW() - INTERVAL '5 days'),
('Asus ROG Monitor', 'Monitor', 'ARM-2024-001', 'Cleveland Office', 'Julia Davis', 'available', NOW() - INTERVAL '5 days'),
('Laser Printer', 'Printer', 'LP-2024-001', 'Columbus Office', NULL, 'in repair', NOW() - INTERVAL '5 days'),
('Conference Phone', 'Phone', 'CP-2024-002', 'Indianapolis Office', NULL, 'in use', NOW() - INTERVAL '5 days');

-- Day 7 (6 days ago) - 5 assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status, created_at) VALUES
('Surface Pro 9', 'Tablet', 'SP9-2024-001', 'Milwaukee Office', 'Justin Wilson', 'in use', NOW() - INTERVAL '6 days'),
('Mac Mini M2', 'Desktop', 'MM2-2024-001', 'Detroit Office', 'Karen Martinez', 'in use', NOW() - INTERVAL '6 days'),
('Acer Monitor 32"', 'Monitor', 'AM32-2024-001', 'Minneapolis Office', 'Katherine Johnson', 'available', NOW() - INTERVAL '6 days'),
('Wireless Mouse', 'Mouse', 'WM-2024-001', 'Kansas City Office', NULL, 'available', NOW() - INTERVAL '6 days'),
('Projector HD', 'Projector', 'PHD-2024-001', 'St. Louis Office', NULL, 'in use', NOW() - INTERVAL '6 days');

-- Summary: 34 new assets added across the past 7 days
-- Day 1 (Today): 5 assets
-- Day 2: 4 assets
-- Day 3: 6 assets
-- Day 4: 3 assets
-- Day 5: 7 assets
-- Day 6: 4 assets
-- Day 7: 5 assets
