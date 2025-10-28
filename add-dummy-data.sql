-- Add dummy assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status) VALUES
('MacBook Pro 16"', 'Laptop', 'MBP-2023-001', 'Office 101', 'John Smith', 'active'),
('Dell XPS 15', 'Laptop', 'DELL-2023-002', 'Office 102', 'Sarah Johnson', 'active'),
('HP EliteBook', 'Laptop', 'HP-2023-003', 'Office 103', 'Mike Davis', 'active'),
('Lenovo ThinkPad', 'Laptop', 'LEN-2023-004', 'Office 104', 'Emily Brown', 'active'),
('MacBook Air M2', 'Laptop', 'MBA-2023-005', 'Office 105', 'David Wilson', 'active'),

('iMac 27"', 'Desktop', 'IMAC-2023-006', 'Design Studio', 'Lisa Anderson', 'active'),
('Dell OptiPlex', 'Desktop', 'DELL-2023-007', 'IT Room', 'Tom Martinez', 'active'),
('HP Pavilion', 'Desktop', 'HP-2023-008', 'Office 201', 'Anna Garcia', 'inactive'),

('LG UltraWide 34"', 'Monitor', 'LG-2023-009', 'Office 101', 'John Smith', 'active'),
('Dell U2720Q', 'Monitor', 'DELL-2023-010', 'Office 102', 'Sarah Johnson', 'active'),
('Samsung 32"', 'Monitor', 'SAM-2023-011', 'Office 103', 'Mike Davis', 'active'),
('BenQ Designer', 'Monitor', 'BEN-2023-012', 'Design Studio', 'Lisa Anderson', 'active'),
('ASUS ProArt', 'Monitor', 'ASUS-2023-013', 'Office 104', 'Emily Brown', 'active'),

('HP LaserJet Pro', 'Printer', 'HP-PRINT-001', 'Office Floor 1', NULL, 'active'),
('Canon ImageClass', 'Printer', 'CAN-PRINT-002', 'Office Floor 2', NULL, 'active'),
('Epson EcoTank', 'Printer', 'EPS-PRINT-003', 'Design Studio', NULL, 'inactive'),

('iPhone 14 Pro', 'Phone', 'IPH-2023-014', 'Mobile', 'John Smith', 'active'),
('Samsung Galaxy S23', 'Phone', 'SAM-2023-015', 'Mobile', 'Sarah Johnson', 'active'),
('iPhone 13', 'Phone', 'IPH-2023-016', 'Mobile', 'Mike Davis', 'active'),
('Google Pixel 7', 'Phone', 'GOO-2023-017', 'Mobile', 'Emily Brown', 'active'),

('iPad Pro 12.9"', 'Tablet', 'IPAD-2023-018', 'Mobile', 'David Wilson', 'active'),
('Samsung Galaxy Tab', 'Tablet', 'SAM-TAB-019', 'Mobile', 'Lisa Anderson', 'active'),
('Microsoft Surface Pro', 'Tablet', 'MS-SURF-020', 'Office 201', 'Tom Martinez', 'active'),

('Logitech MX Master', 'Mouse', 'LOG-MOUSE-021', 'Office 101', 'John Smith', 'active'),
('Apple Magic Keyboard', 'Keyboard', 'APL-KEY-022', 'Office 102', 'Sarah Johnson', 'active'),
('Webcam HD Pro', 'Webcam', 'WEB-CAM-023', 'Office 103', 'Mike Davis', 'active'),

('Dell Docking Station', 'Dock', 'DELL-DOCK-024', 'Office 104', 'Emily Brown', 'active'),
('USB-C Hub', 'Hub', 'USB-HUB-025', 'Office 105', 'David Wilson', 'active'),

('Backup Drive 2TB', 'Storage', 'BACKUP-026', 'Server Room', NULL, 'active'),
('NAS Synology', 'Storage', 'NAS-027', 'Server Room', NULL, 'active'),

('Router Cisco', 'Network', 'CISCO-028', 'Server Room', NULL, 'active'),
('Switch Netgear', 'Network', 'NET-029', 'Server Room', NULL, 'active'),
('WiFi Access Point', 'Network', 'WIFI-030', 'Office Floor 1', NULL, 'active');

