@echo off
echo ========================================
echo IT Asset Management System - Setup
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 16+ from https://nodejs.org
    exit /b 1
)

echo [OK] Node.js version:
node -v
echo.

REM Check PostgreSQL
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] PostgreSQL not found
    echo Please install PostgreSQL from https://www.postgresql.org
    exit /b 1
)

echo [OK] PostgreSQL is installed
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
cd client
call npm install
cd ..
echo [OK] Dependencies installed
echo.

REM Setup .env
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo [WARNING] Please edit .env with your database credentials
    echo.
)

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env with your database credentials
echo 2. Create database: psql -U postgres -c "CREATE DATABASE asset_management;"
echo 3. Run schema: psql -U postgres -d asset_management -f server/schema.sql
echo 4. Start app: npm run dev
echo 5. Open: http://localhost:5173
echo 6. Login: admin@example.com / admin123
echo.
echo For deployment: See WEBSITE_DEPLOYMENT.md
echo.
pause