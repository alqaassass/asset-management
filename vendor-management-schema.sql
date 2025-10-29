-- Vendor Management Module Database Schema
-- Run this script to add vendor management tables to the existing database

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    category VARCHAR(100) NOT NULL,
    rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
    notes TEXT,
    contract_start_date DATE,
    contract_end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for vendors
CREATE INDEX IF NOT EXISTS idx_vendors_category ON vendors(category);
CREATE INDEX IF NOT EXISTS idx_vendors_rating ON vendors(rating);
CREATE INDEX IF NOT EXISTS idx_vendors_contract_end ON vendors(contract_end_date);

-- Create purchase_orders table
CREATE TABLE IF NOT EXISTS purchase_orders (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    invoice_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for purchase_orders
CREATE INDEX IF NOT EXISTS idx_po_vendor ON purchase_orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_po_status ON purchase_orders(status);
CREATE INDEX IF NOT EXISTS idx_po_date ON purchase_orders(order_date);

-- Create purchase_order_items junction table
CREATE TABLE IF NOT EXISTS purchase_order_items (
    id SERIAL PRIMARY KEY,
    purchase_order_id INTEGER REFERENCES purchase_orders(id) ON DELETE CASCADE,
    asset_id INTEGER REFERENCES assets(id) ON DELETE SET NULL,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for purchase_order_items
CREATE INDEX IF NOT EXISTS idx_poi_po ON purchase_order_items(purchase_order_id);
CREATE INDEX IF NOT EXISTS idx_poi_asset ON purchase_order_items(asset_id);

-- Add vendor-related columns to assets table
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS vendor_id INTEGER REFERENCES vendors(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS purchase_date DATE,
ADD COLUMN IF NOT EXISTS purchase_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS warranty_end_date DATE;

-- Create index for assets vendor_id
CREATE INDEX IF NOT EXISTS idx_assets_vendor ON assets(vendor_id);

-- Insert sample vendor data
INSERT INTO vendors (name, email, phone, address, category, rating, contract_start_date, contract_end_date, notes) VALUES
('Dell Technologies', 'sales@dell.com', '+1-800-289-3355', '1 Dell Way, Round Rock, TX 78682', 'Hardware', 4.5, '2024-01-01', '2025-12-31', 'Primary laptop and desktop supplier'),
('HP Inc.', 'enterprise@hp.com', '+1-800-752-0900', '1501 Page Mill Road, Palo Alto, CA 94304', 'Hardware', 4.2, '2024-01-01', '2025-12-31', 'Secondary hardware vendor'),
('Lenovo', 'sales@lenovo.com', '+1-855-253-6686', '1009 Think Place, Morrisville, NC 27560', 'Hardware', 4.3, '2024-03-01', '2025-12-31', 'ThinkPad supplier'),
('Apple Inc.', 'business@apple.com', '+1-800-692-7753', 'One Apple Park Way, Cupertino, CA 95014', 'Hardware', 4.8, '2024-01-01', '2026-01-31', 'MacBook and iPhone supplier'),
('Microsoft Corporation', 'licensing@microsoft.com', '+1-800-642-7676', 'One Microsoft Way, Redmond, WA 98052', 'Software', 4.6, '2024-01-01', '2025-06-30', 'Software licensing and Surface devices'),
('Logitech', 'sales@logitech.com', '+1-510-795-8500', '3930 North First Street, San Jose, CA 95134', 'Peripherals', 4.1, '2024-01-01', '2025-12-31', 'Keyboards, mice, webcams'),
('Canon USA', 'sales@usa.canon.com', '+1-800-652-2666', 'One Canon Park, Melville, NY 11747', 'Peripherals', 3.9, '2024-01-01', '2025-12-31', 'Printers and scanners'),
('Cisco Systems', 'sales@cisco.com', '+1-408-526-4000', '170 West Tasman Drive, San Jose, CA 95134', 'Hardware', 4.7, '2024-01-01', '2026-12-31', 'Network equipment supplier'),
('Samsung Electronics', 'b2b@samsung.com', '+1-800-726-7864', '85 Challenger Road, Ridgefield Park, NJ 07660', 'Hardware', 4.4, '2024-02-01', '2025-12-31', 'Monitors and mobile devices'),
('Adobe Systems', 'sales@adobe.com', '+1-800-833-6687', '345 Park Avenue, San Jose, CA 95110', 'Software', 4.5, '2024-01-01', '2025-12-31', 'Creative Cloud licenses'),
('Zoom Video', 'sales@zoom.us', '+1-888-799-9666', '55 Almaden Boulevard, San Jose, CA 95113', 'Software', 4.3, '2024-01-01', '2025-03-31', 'Video conferencing licenses'),
('Amazon Web Services', 'aws-sales@amazon.com', '+1-206-266-4064', '410 Terry Avenue North, Seattle, WA 98109', 'Services', 4.6, '2024-01-01', '2025-12-31', 'Cloud infrastructure services'),
('CDW Corporation', 'sales@cdw.com', '+1-800-800-4239', '200 N Milwaukee Avenue, Vernon Hills, IL 60061', 'Services', 4.0, '2024-01-01', '2025-11-30', 'IT procurement and services'),
('Insight Enterprises', 'sales@insight.com', '+1-800-467-4448', '6820 S Harl Ave, Tempe, AZ 85283', 'Services', 3.8, '2024-01-01', '2024-12-31', 'IT solutions provider'),
('Tech Data', 'sales@techdata.com', '+1-800-237-8931', '5350 Tech Data Drive, Clearwater, FL 33760', 'Services', 3.7, '2024-01-01', '2024-11-15', 'IT distribution and services')
ON CONFLICT (name) DO NOTHING;

-- Link some existing assets to vendors (update random assets)
-- This will link laptops to Dell, HP, Lenovo, and Apple
UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Dell Technologies' LIMIT 1)
WHERE type = 'Laptop' AND name LIKE '%Dell%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'HP Inc.' LIMIT 1)
WHERE type = 'Laptop' AND name LIKE '%HP%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Lenovo' LIMIT 1)
WHERE type = 'Laptop' AND name LIKE '%Lenovo%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Apple Inc.' LIMIT 1)
WHERE type = 'Laptop' AND name LIKE '%MacBook%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Apple Inc.' LIMIT 1)
WHERE type = 'Phone' AND name LIKE '%iPhone%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Apple Inc.' LIMIT 1)
WHERE type = 'Tablet' AND name LIKE '%iPad%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Dell Technologies' LIMIT 1)
WHERE type = 'Desktop' AND name LIKE '%Dell%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'HP Inc.' LIMIT 1)
WHERE type = 'Desktop' AND name LIKE '%HP%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Dell Technologies' LIMIT 1)
WHERE type = 'Monitor' AND name LIKE '%Dell%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Samsung Electronics' LIMIT 1)
WHERE type = 'Monitor' AND name LIKE '%Samsung%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Canon USA' LIMIT 1)
WHERE type = 'Printer' AND name LIKE '%Canon%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'HP Inc.' LIMIT 1)
WHERE type = 'Printer' AND name LIKE '%HP%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Logitech' LIMIT 1)
WHERE type IN ('Keyboard', 'Mouse', 'Webcam', 'Headset') AND name LIKE '%Logitech%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Cisco Systems' LIMIT 1)
WHERE type IN ('Router', 'Switch') AND name LIKE '%Cisco%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'Dell Technologies' LIMIT 1)
WHERE type = 'Server' AND name LIKE '%Dell%';

UPDATE assets SET vendor_id = (SELECT id FROM vendors WHERE name = 'HP Inc.' LIMIT 1)
WHERE type = 'Server' AND name LIKE '%HP%';

-- Create sample purchase orders
INSERT INTO purchase_orders (vendor_id, order_number, order_date, total_amount, status, notes) VALUES
((SELECT id FROM vendors WHERE name = 'Dell Technologies'), 'PO-2024-001', '2024-01-15', 125000.00, 'completed', 'Q1 laptop procurement'),
((SELECT id FROM vendors WHERE name = 'Apple Inc.'), 'PO-2024-002', '2024-02-01', 89500.00, 'completed', 'MacBook Pro order for design team'),
((SELECT id FROM vendors WHERE name = 'HP Inc.'), 'PO-2024-003', '2024-03-10', 76200.00, 'completed', 'Desktop and monitor order'),
((SELECT id FROM vendors WHERE name = 'Microsoft Corporation'), 'PO-2024-004', '2024-01-05', 45000.00, 'completed', 'Annual software licenses'),
((SELECT id FROM vendors WHERE name = 'Cisco Systems'), 'PO-2024-005', '2024-04-20', 32000.00, 'completed', 'Network infrastructure upgrade'),
((SELECT id FROM vendors WHERE name = 'Logitech'), 'PO-2024-006', '2024-05-15', 8500.00, 'completed', 'Peripherals for new office'),
((SELECT id FROM vendors WHERE name = 'Samsung Electronics'), 'PO-2024-007', '2024-06-01', 15000.00, 'completed', 'Monitor procurement'),
((SELECT id FROM vendors WHERE name = 'Dell Technologies'), 'PO-2024-008', '2024-09-10', 95000.00, 'pending', 'Q4 hardware refresh'),
((SELECT id FROM vendors WHERE name = 'Apple Inc.'), 'PO-2024-009', '2024-10-01', 42000.00, 'pending', 'iPhone 15 Pro order'),
((SELECT id FROM vendors WHERE name = 'Adobe Systems'), 'PO-2024-010', '2024-10-15', 28000.00, 'pending', 'Creative Cloud renewal')
ON CONFLICT (order_number) DO NOTHING;

-- Success message
SELECT 'Vendor Management schema created successfully!' as message;
SELECT COUNT(*) as vendors_created FROM vendors;
SELECT COUNT(*) as purchase_orders_created FROM purchase_orders;
SELECT COUNT(*) as assets_linked FROM assets WHERE vendor_id IS NOT NULL;
