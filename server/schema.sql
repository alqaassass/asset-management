-- Create database
-- CREATE DATABASE asset_management;

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
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

-- Insert default admin user (password: admin123)
-- Hash generated with: bcrypt.hash('admin123', 10)
INSERT INTO users (email, password) 
VALUES ('admin@example.com', '$2a$10$rOZJov3qKPqyVq5Cg5VkLON8Kp0Yz.QZ5yP5xKGqYvXqJ5YqZqZqZ')
ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password;
