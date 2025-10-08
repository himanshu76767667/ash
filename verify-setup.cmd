@echo off
echo ========================================
echo   ASH - Pre-Run Verification Script
echo ========================================
echo.

REM Check Node version
echo [1/6] Checking Node.js version...
node -v
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found!
    echo Please install Node.js 20 LTS from https://nodejs.org
    pause
    exit /b 1
)

REM Verify Node version is 20 or 18
for /f "tokens=1 delims=." %%a in ('node -v') do set NODE_MAJOR=%%a
set NODE_MAJOR=%NODE_MAJOR:v=%
if %NODE_MAJOR% LSS 18 (
    echo ERROR: Node.js version is too old!
    echo You have: Node.js %NODE_MAJOR%
    echo Required: Node.js 18 or 20
    pause
    exit /b 1
)
if %NODE_MAJOR% GTR 21 (
    echo ERROR: Node.js version is too new!
    echo You have: Node.js %NODE_MAJOR%
    echo Required: Node.js 18 or 20
    pause
    exit /b 1
)
echo OK: Node.js version is compatible
echo.

REM Check if node_modules exists
echo [2/6] Checking dependencies...
if not exist "node_modules" (
    echo WARNING: node_modules not found!
    echo Running npm install...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
) else (
    echo OK: Dependencies installed
)
echo.

REM Check critical files
echo [3/6] Checking critical files...
set MISSING=0

if not exist "package.json" (
    echo ERROR: package.json missing!
    set MISSING=1
)
if not exist "next.config.js" (
    echo ERROR: next.config.js missing!
    set MISSING=1
)
if not exist "pages\index.tsx" (
    echo ERROR: pages\index.tsx missing!
    set MISSING=1
)
if not exist "public\manifest.json" (
    echo ERROR: public\manifest.json missing!
    set MISSING=1
)
if not exist "lib\firebase.ts" (
    echo ERROR: lib\firebase.ts missing!
    set MISSING=1
)

if %MISSING% EQU 1 (
    echo.
    echo ERROR: Critical files are missing!
    pause
    exit /b 1
)
echo OK: All critical files present
echo.

REM Check TypeScript compilation
echo [4/6] Checking TypeScript configuration...
if not exist "tsconfig.json" (
    echo ERROR: tsconfig.json missing!
    pause
    exit /b 1
)
echo OK: TypeScript configured
echo.

REM Check PWA files
echo [5/6] Checking PWA configuration...
if not exist "public\service-worker.js" (
    echo WARNING: service-worker.js missing!
    echo PWA offline features may not work
) else (
    echo OK: Service worker present
)
if not exist "public\logo.jpg" (
    echo WARNING: logo.jpg missing!
    echo App icon may not display
) else (
    echo OK: App icon present
)
echo.

REM Final check
echo [6/6] Running final verification...
echo Checking if TypeScript compiles...
call npx tsc --noEmit --skipLibCheck
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: TypeScript compilation has errors
    echo The app may still run, but please check the errors above
    echo.
) else (
    echo OK: TypeScript compilation successful
    echo.
)

echo ========================================
echo   VERIFICATION COMPLETE!
echo ========================================
echo.
echo Your app is ready to run!
echo.
echo To start the development server:
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
echo To install as PWA:
echo   1. Open the app in your browser
echo   2. Look for "Install" or "Add to Home Screen"
echo   3. Confirm installation
echo.
pause
