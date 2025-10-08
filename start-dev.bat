@echo off
cd /d "%~dp0"
echo Starting ash development server...
echo Visit http://localhost:3000 in your browser
echo Press Ctrl+C to stop the server
echo.
node node_modules\next\dist\bin\next dev
