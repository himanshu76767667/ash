@echo off
title ash Development Server
cls
echo ====================================
echo     ASH Development Server
echo ====================================
echo.
echo Initializing...
cd /d "%~dp0"
echo Working directory: %CD%
echo.
echo Starting Next.js...
echo.
call npm run dev
echo.
echo.
echo Server stopped. Press any key to exit.
pause >nul
