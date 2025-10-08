@echo off
title ASH - Daily Agenda PWA
color 0A

echo.
echo  ========================================
echo     ASH - Daily Agenda PWA Launcher
echo  ========================================
echo.

REM Check Node.js
echo  [Step 1/3] Verifying Node.js...
node -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  ERROR: Node.js not found!
    echo  Please install Node.js 20 LTS from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=1 delims=." %%a in ('node -v') do set NODE_MAJOR=%%a
set NODE_MAJOR=%NODE_MAJOR:v=%

if %NODE_MAJOR% LSS 18 (
    color 0C
    echo  ERROR: Node.js version too old!
    echo  Current: v%NODE_MAJOR%
    echo  Required: v18 or v20
    echo.
    echo  Download Node.js 20 LTS from: https://nodejs.org
    pause
    exit /b 1
)

if %NODE_MAJOR% GTR 21 (
    color 0C
    echo  ERROR: Node.js version too new!
    echo  Current: v%NODE_MAJOR%
    echo  Required: v18 or v20
    echo.
    echo  Please install Node.js 20 LTS
    pause
    exit /b 1
)

echo  OK - Node.js v%NODE_MAJOR% detected
echo.

REM Check dependencies
echo  [Step 2/3] Checking dependencies...
if not exist "node_modules" (
    echo  Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        color 0C
        echo  ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
) else (
    echo  OK - Dependencies already installed
)
echo.

REM Start the server
echo  [Step 3/3] Starting development server...
echo.
echo  ========================================
echo     Server starting...
echo  ========================================
echo.
echo  The app will open at: http://localhost:3000
echo.
echo  Features:
echo   - Pull down to refresh
echo   - Swipe left/right to navigate days
echo   - Tap + button to add events
echo   - Mark items complete (local only)
echo.
echo  To stop the server: Press Ctrl+C
echo.
echo  To install as PWA:
echo   1. Open app in browser
echo   2. Look for install icon
echo   3. Click "Add to Home Screen"
echo.
echo  ========================================
echo.

npm run dev

pause
