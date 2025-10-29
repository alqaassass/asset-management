-- Dummy Data for IT Asset Management System

-- Insert Asset Types
INSERT INTO asset_types (name) VALUES 
    ('Laptop'),
    ('Desktop'),
    ('Monitor'),
    ('Keyboard'),
    ('Mouse'),
    ('Printer'),
    ('Scanner'),
    ('Tablet'),
    ('Phone'),
    ('Router'),
    ('Switch'),
    ('Server')
ON CONFLICT (name) DO NOTHING;

-- Insert Employees
INSERT INTO employees (name, email, department) VALUES 
    ('John Smith', 'john.smith@company.com', 'IT Department'),
    ('Sarah Johnson', 'sarah.johnson@company.com', 'HR Department'),
    ('Michael Brown', 'michael.brown@company.com', 'Finance'),
    ('Emily Davis', 'emily.davis@company.com', 'Marketing'),
    ('David Wilson', 'david.wilson@company.com', 'Sales'),
    ('Lisa Anderson', 'lisa.anderson@company.com', 'Operations'),
    ('James Taylor', 'james.taylor@company.com', 'IT Department'),
    ('Jennifer Martinez', 'jennifer.martinez@company.com', 'HR Department'),
    ('Robert Garcia', 'robert.garcia@company.com', 'Finance'),
    ('Maria Rodriguez', 'maria.rodriguez@company.com', 'Marketing'),
    ('William Lee', 'william.lee@company.com', 'Sales'),
    ('Patricia White', 'patricia.white@company.com', 'Operations'),
    ('Christopher Harris', 'christopher.harris@company.com', 'IT Department'),
    ('Linda Clark', 'linda.clark@company.com', 'HR Department'),
    ('Daniel Lewis', 'daniel.lewis@company.com', 'Finance')
ON CONFLICT (email) DO NOTHING;

-- Insert Assets
INSERT INTO assets (name, type, serial_number, location, assigned_to, status) VALUES 
    -- Laptops
    ('MacBook Pro 16"', 'Laptop', 'MBP-2024-001', 'HQ Office', 'John Smith', 'in_use'),
    ('Dell XPS 15', 'Laptop', 'DELL-2024-002', 'HQ Office', 'Sarah Johnson', 'in_use'),
    ('HP EliteBook 840', 'Laptop', 'HP-2024-003', 'Branch Office', 'Michael Brown', 'in_use'),
    ('Lenovo ThinkPad X1', 'Laptop', 'LEN-2024-004', 'HQ Office', 'Emily Davis', 'in_use'),
    ('MacBook Air M2', 'Laptop', 'MBA-2024-005', 'Remote', 'David Wilson', 'in_use'),
    ('ASUS ZenBook', 'Laptop', 'ASUS-2024-006', 'HQ Office', 'Lisa Anderson', 'in_use'),
    ('Acer Swift 3', 'Laptop', 'ACER-2024-007', 'Branch Office', 'James Taylor', 'in_use'),
    ('MSI Prestige 14', 'Laptop', 'MSI-2024-008', 'HQ Office', 'Jennifer Martinez', 'in_repair'),
    ('Surface Laptop 5', 'Laptop', 'SURF-2024-009', 'Remote', 'Robert Garcia', 'in_use'),
    ('Dell Latitude 7420', 'Laptop', 'DELL-2024-010', 'HQ Office', 'Maria Rodriguez', 'in_use'),
    
    -- Desktops
    ('iMac 27"', 'Desktop', 'IMAC-2024-011', 'Design Studio', 'William Lee', 'in_use'),
    ('Dell OptiPlex 7090', 'Desktop', 'DELL-2024-012', 'Accounting', 'Patricia White', 'in_use'),
    ('HP ProDesk 600', 'Desktop', 'HP-2024-013', 'Reception', 'Christopher Harris', 'in_use'),
    ('Lenovo ThinkCentre', 'Desktop', 'LEN-2024-014', 'IT Room', 'Linda Clark', 'in_use'),
    ('Custom Gaming PC', 'Desktop', 'CUSTOM-2024-015', 'Dev Lab', 'Daniel Lewis', 'in_use'),
    ('Mac Mini M2', 'Desktop', 'MINI-2024-016', 'Conference Room A', '', 'in_use'),
    ('Dell Precision 3660', 'Desktop', 'DELL-2024-017', 'Engineering', 'John Smith', 'in_use'),
    ('HP Z2 Tower', 'Desktop', 'HP-2024-018', 'Design Studio', 'Sarah Johnson', 'inactive'),
    
    -- Monitors
    ('Dell UltraSharp 27"', 'Monitor', 'MON-2024-019', 'HQ Office', 'Michael Brown', 'in_use'),
    ('LG 32" 4K', 'Monitor', 'MON-2024-020', 'HQ Office', 'Emily Davis', 'in_use'),
    ('Samsung 24"', 'Monitor', 'MON-2024-021', 'Branch Office', 'David Wilson', 'in_use'),
    ('ASUS ProArt 27"', 'Monitor', 'MON-2024-022', 'Design Studio', 'Lisa Anderson', 'in_use'),
    ('BenQ 24"', 'Monitor', 'MON-2024-023', 'HQ Office', 'James Taylor', 'in_use'),
    ('HP 27" IPS', 'Monitor', 'MON-2024-024', 'Conference Room B', '', 'in_use'),
    ('Dell P2422H', 'Monitor', 'MON-2024-025', 'HQ Office', 'Jennifer Martinez', 'in_use'),
    ('LG UltraWide 34"', 'Monitor', 'MON-2024-026', 'Dev Lab', 'Robert Garcia', 'in_use'),
    
    -- Keyboards & Mice
    ('Logitech MX Keys', 'Keyboard', 'KEY-2024-027', 'HQ Office', 'Maria Rodriguez', 'in_use'),
    ('Apple Magic Keyboard', 'Keyboard', 'KEY-2024-028', 'Design Studio', 'William Lee', 'in_use'),
    ('Corsair K95 RGB', 'Keyboard', 'KEY-2024-029', 'Dev Lab', 'Patricia White', 'in_use'),
    ('Logitech MX Master 3', 'Mouse', 'MOUSE-2024-030', 'HQ Office', 'Christopher Harris', 'in_use'),
    ('Apple Magic Mouse', 'Mouse', 'MOUSE-2024-031', 'Design Studio', 'Linda Clark', 'in_use'),
    ('Razer DeathAdder', 'Mouse', 'MOUSE-2024-032', 'Dev Lab', 'Daniel Lewis', 'in_use'),
    
    -- Printers & Scanners
    ('HP LaserJet Pro', 'Printer', 'PRINT-2024-033', 'HQ Office Floor 1', '', 'in_use'),
    ('Canon ImageClass', 'Printer', 'PRINT-2024-034', 'HQ Office Floor 2', '', 'in_use'),
    ('Epson EcoTank', 'Printer', 'PRINT-2024-035', 'Branch Office', '', 'in_repair'),
    ('Brother MFC-L2750DW', 'Printer', 'PRINT-2024-036', 'Accounting', '', 'in_use'),
    ('Fujitsu ScanSnap', 'Scanner', 'SCAN-2024-037', 'HR Department', 'Sarah Johnson', 'in_use'),
    ('Canon CanoScan', 'Scanner', 'SCAN-2024-038', 'Accounting', 'Michael Brown', 'in_use'),
    
    -- Tablets & Phones
    ('iPad Pro 12.9"', 'Tablet', 'IPAD-2024-039', 'Mobile', 'Emily Davis', 'in_use'),
    ('Samsung Galaxy Tab S8', 'Tablet', 'TAB-2024-040', 'Mobile', 'David Wilson', 'in_use'),
    ('iPad Air', 'Tablet', 'IPAD-2024-041', 'Conference Room A', '', 'in_use'),
    ('iPhone 14 Pro', 'Phone', 'PHONE-2024-042', 'Mobile', 'Lisa Anderson', 'in_use'),
    ('Samsung Galaxy S23', 'Phone', 'PHONE-2024-043', 'Mobile', 'James Taylor', 'in_use'),
    ('Google Pixel 7', 'Phone', 'PHONE-2024-044', 'Mobile', 'Jennifer Martinez', 'in_use'),
    
    -- Network Equipment
    ('Cisco Router RV340', 'Router', 'ROUTER-2024-045', 'Server Room', '', 'in_use'),
    ('TP-Link Archer AX6000', 'Router', 'ROUTER-2024-046', 'Branch Office', '', 'in_use'),
    ('Netgear Nighthawk', 'Router', 'ROUTER-2024-047', 'Conference Floor', '', 'in_use'),
    ('Cisco Switch SG350', 'Switch', 'SWITCH-2024-048', 'Server Room', '', 'in_use'),
    ('TP-Link 24-Port Switch', 'Switch', 'SWITCH-2024-049', 'IT Room', '', 'in_use'),
    ('Netgear 16-Port Switch', 'Switch', 'SWITCH-2024-050', 'Branch Office', '', 'in_use'),
    
    -- Servers
    ('Dell PowerEdge R740', 'Server', 'SERVER-2024-051', 'Data Center', '', 'in_use'),
    ('HP ProLiant DL380', 'Server', 'SERVER-2024-052', 'Data Center', '', 'in_use'),
    ('Synology NAS DS920+', 'Server', 'NAS-2024-053', 'Server Room', '', 'in_use');

-- Display summary
SELECT 
    'Asset Types' as category,
    COUNT(*) as count
FROM asset_types
UNION ALL
SELECT 
    'Employees' as category,
    COUNT(*) as count
FROM employees
UNION ALL
SELECT 
    'Assets' as category,
    COUNT(*) as count
FROM assets;
