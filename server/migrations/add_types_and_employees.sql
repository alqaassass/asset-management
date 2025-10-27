-- Asset Types table
CREATE TABLE IF NOT EXISTS asset_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some default asset types
INSERT INTO asset_types (name) VALUES 
    ('Laptop'),
    ('Desktop'),
    ('Monitor'),
    ('Keyboard'),
    ('Mouse'),
    ('Printer')
ON CONFLICT (name) DO NOTHING;
