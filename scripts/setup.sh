#!/bin/bash

echo "🚀 IT Asset Management System - Setup Script"
echo "=============================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Please install PostgreSQL."
    exit 1
fi

echo "✅ PostgreSQL is installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd client && npm install && cd ..
echo "✅ Dependencies installed"
echo ""

# Setup .env
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your database credentials"
    echo ""
fi

# Database setup
echo "🗄️  Database Setup"
echo "=================="
read -p "Enter PostgreSQL username (default: postgres): " PG_USER
PG_USER=${PG_USER:-postgres}

read -p "Enter database name (default: asset_management): " DB_NAME
DB_NAME=${DB_NAME:-asset_management}

echo ""
echo "Creating database..."
psql -U $PG_USER -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || echo "Database may already exist"

echo "Running schema..."
psql -U $PG_USER -d $DB_NAME -f server/schema.sql

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Edit .env with your database credentials"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:5173"
echo "4. Login: admin@example.com / admin123"
echo ""
echo "📖 For deployment: See WEBSITE_DEPLOYMENT.md"
