-- Add more asset types
INSERT INTO asset_types (name) VALUES 
('Mouse'), ('Keyboard'), ('Webcam'), ('Dock'), ('Hub'), 
('Storage'), ('Network')
ON CONFLICT (name) DO NOTHING;

-- Add more employees to match dummy data
INSERT INTO employees (name, email, department) VALUES 
('Lisa Anderson', 'lisa.anderson@company.com', 'Design'),
('Tom Martinez', 'tom.martinez@company.com', 'IT Department'),
('Anna Garcia', 'anna.garcia@company.com', 'Operations')
ON CONFLICT (email) DO NOTHING;
