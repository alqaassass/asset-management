@echo off
echo ========================================
echo   IT Asset Manager - Quick Update
echo ========================================
echo.

echo [1/4] Pulling latest changes from GitHub...
git pull origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to pull changes
    pause
    exit /b 1
)
echo.

echo [2/4] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)
echo.

echo [3/4] Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install client dependencies
    pause
    exit /b 1
)
cd ..
echo.

echo [4/4] Starting development server...
echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo The server will start now...
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

call npm run dev
