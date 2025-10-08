@echo off
title ash - Node Version Check
cls
echo ====================================
echo     ASH - Node Version Check
echo ====================================
echo.

REM Get Node version
for /f "tokens=*" %%i in ('node -v 2^>nul') do set NODE_VERSION=%%i

if "%NODE_VERSION%"=="" (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js 20 LTS from:
    echo https://nodejs.org/en/download
    echo.
    pause
    exit /b 1
)

echo Current Node version: %NODE_VERSION%
echo.

REM Check if version starts with v20 or v18
echo %NODE_VERSION% | findstr /B "v20" >nul
if %ERRORLEVEL%==0 (
    echo [OK] Node version is compatible! ✓
    echo.
    echo You can now run the app with:
    echo   npm run dev:cmd
    echo.
    pause
    exit /b 0
)

echo %NODE_VERSION% | findstr /B "v18" >nul
if %ERRORLEVEL%==0 (
    echo [OK] Node version is compatible! ✓
    echo.
    echo You can now run the app with:
    echo   npm run dev:cmd
    echo.
    pause
    exit /b 0
)

REM Version is not compatible
echo [ERROR] Node version is NOT compatible! ✗
echo.
echo Your version: %NODE_VERSION%
echo Required: v20.x.x or v18.x.x
echo.
echo Next.js 14 does not work with Node v22 on Windows!
echo.
echo Please install Node 20 LTS:
echo 1. Download from: https://nodejs.org/en/download
echo 2. Install the .msi file
echo 3. Restart your computer
echo 4. Run this script again
echo.
echo See FIX_NODE_VERSION.md for detailed instructions.
echo.
pause
exit /b 1
