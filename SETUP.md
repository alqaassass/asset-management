# Quick Setup Guide

## Prerequisites
- Node.js v16 or higher
- PostgreSQL installed and running

## Step-by-Step Setup

### 1. Database Setup
```bash
# Create database
psql -U postgres
CREATE DATABASE asset_management;
\q

# Run schema
psql -U postgres -d asset_management -f server/schema.sql
```

### 2. Environment Configuration
```bash
# Copy example env file
copy .env.example .env

# Edit .env with your database credentials
# Example:
# DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/asset_management
# JWT_SECRET=your-random-secret-key-here
```

### 3. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 4. Run the Application
```bash
# Start both backend and frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 5. Login
Use the default admin credentials:
- Email: admin@example.com
- Password: admin123

## Testing the QR Feature

1. Log in to the admin panel
2. Go to "Assets" and add a new asset
3. Click the "QR" button next to the asset
4. Download the QR code
5. Go to "Scan QR" and scan the downloaded QR code
6. Or open the QR code on your phone and scan with your mobile camera

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check your DATABASE_URL in .env
- Verify database credentials

### Port Already in Use
- Change PORT in .env for backend
- Change port in client/vite.config.js for frontend

### Camera Not Working
- Ensure you're using HTTPS or localhost
- Grant camera permissions in your browser
- Try a different browser if issues persist
