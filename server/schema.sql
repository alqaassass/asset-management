-- Create database
-- CREATE DATABASE asset_management;

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Asset types table
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
    department VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    serial_number VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255),
    assigned_to VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default asset types
INSERT INTO asset_types (name) VALUES 
('Laptop'), ('Desktop'), ('Monitor'), ('Printer'), ('Phone'), ('Tablet')
ON CONFLICT (name) DO NOTHING;

-- Insert default employees
INSERT INTO employees (name, email, department) VALUES 
('John Smith', 'john.smith@company.com', 'IT Department'),
('Sarah Johnson', 'sarah.johnson@company.com', 'Marketing'),
('Mike Davis', 'mike.davis@company.com', 'Engineering'),
('Emily Brown', 'emily.brown@company.com', 'HR'),
('David Wilson', 'david.wilson@company.com', 'Sales'),
('Lisa Garcia', 'lisa.garcia@company.com', 'Design'),
('Robert Miller', 'robert.miller@company.com', 'IT Department'),
('Jennifer Taylor', 'jennifer.taylor@company.com', 'Accounting'),
('Michael Anderson', 'michael.anderson@company.com', 'HR'),
('Jessica Thomas', 'jessica.thomas@company.com', 'Engineering')
ON CONFLICT (email) DO NOTHING;

-- Insert default admin user (password: admin123)
-- Hash generated with: bcrypt.hash('admin123', 10)
INSERT INTO users (email, password) 
VALUES ('admin@example.com', '$2a$10$sL/kJn4NIcn7DsheGHhJe.ejGKF7gw8I0LtukyDVusGS35t6mMSIq')
ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password;
