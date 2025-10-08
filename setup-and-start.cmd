@echo off
title ash - Setup and Start
cls
echo ====================================
echo     ASH - Automated Setup
echo ====================================
echo.

REM Check Node version first
echo [1/5] Checking Node.js version...
for /f "tokens=*" %%i in ('node -v 2^>nul') do set NODE_VERSION=%%i

if "%NODE_VERSION%"=="" (
    echo [ERROR] Node.js is not installed!
    echo Please run check-node.cmd first.
    pause
    exit /b 1
)

echo Found: %NODE_VERSION%

REM Verify it's Node 20 or 18
echo %NODE_VERSION% | findstr /B "v20 v18" >nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Incompatible Node version!
    echo Please run check-node.cmd for instructions.
    pause
    exit /b 1
)

echo [OK] Node version is compatible!
echo.

REM Clean previous installation
echo [2/5] Cleaning previous build...
if exist node_modules rmdir /s /q node_modules
if exist .next rmdir /s /q .next
if exist package-lock.json del /q package-lock.json
echo [OK] Cleanup complete!
echo.

REM Install dependencies
echo [3/5] Installing dependencies...
echo This may take 2-5 minutes...
echo.
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm install failed!
    pause
    exit /b 1
)
echo [OK] Dependencies installed!
echo.

REM Show summary
echo [4/5] Installation Summary:
echo   Node: %NODE_VERSION%
for /f "tokens=*" %%i in ('npm -v 2^>nul') do echo   npm: v%%i
echo   Project: ash
echo.

REM Start the server
echo [5/5] Starting development server...
echo.
echo ====================================
echo Server will be available at:
echo   http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ====================================
echo.

call npm run dev:cmd

echo.
echo Server stopped.
pause
