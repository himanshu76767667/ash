# PowerShell Upload Script for ash to mars.cse.iitb.ac.in

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  ASH - Upload to IITB Mars Server" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$REMOTE_USER = "himanshuthalor"
$REMOTE_HOST = "mars.cse.iitb.ac.in"
$REMOTE_PATH = "~/public_html/ash"

Write-Host "📦 Step 1: Creating deployment package..." -ForegroundColor Yellow
Write-Host ""

# Clean previous deploy folder
if (Test-Path "ash-deploy") {
    Remove-Item -Recurse -Force ash-deploy
}
New-Item -ItemType Directory -Path ash-deploy | Out-Null

# Copy essential files only
Write-Host "Copying project files..."
Copy-Item -Recurse components ash-deploy/
Copy-Item -Recurse lib ash-deploy/
Copy-Item -Recurse pages ash-deploy/
Copy-Item -Recurse public ash-deploy/
Copy-Item -Recurse styles ash-deploy/
Copy-Item package.json ash-deploy/
Copy-Item package-lock.json ash-deploy/
Copy-Item next.config.js ash-deploy/
Copy-Item tsconfig.json ash-deploy/
Copy-Item tailwind.config.js ash-deploy/
Copy-Item postcss.config.js ash-deploy/
Copy-Item .env.example ash-deploy/
Copy-Item README.md ash-deploy/
Copy-Item FIREBASE_SETUP.md ash-deploy/

Write-Host "✓ Files copied" -ForegroundColor Green
Write-Host ""

# Create tarball (using tar on Windows 10+)
Write-Host "📦 Creating tarball..." -ForegroundColor Yellow
tar -czf ash-deploy.tar.gz -C ash-deploy .
Write-Host "✓ Created ash-deploy.tar.gz" -ForegroundColor Green
Write-Host ""

# Upload using SCP
Write-Host "📤 Step 2: Uploading to mars.cse.iitb.ac.in..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Uploading to ${REMOTE_USER}@${REMOTE_HOST}:~/" -ForegroundColor Cyan
Write-Host ""

scp ash-deploy.tar.gz "${REMOTE_USER}@${REMOTE_HOST}:~/"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Upload complete!" -ForegroundColor Green
    Write-Host ""
    
    # Instructions
    Write-Host "=========================================" -ForegroundColor Cyan
    Write-Host "  Next Steps on Mars Server:" -ForegroundColor Cyan
    Write-Host "=========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. SSH into mars:" -ForegroundColor Yellow
    Write-Host "   ssh ${REMOTE_USER}@${REMOTE_HOST}" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Extract and setup:" -ForegroundColor Yellow
    Write-Host "   mkdir -p ~/public_html/ash" -ForegroundColor White
    Write-Host "   cd ~/public_html/ash" -ForegroundColor White
    Write-Host "   tar -xzf ~/ash-deploy.tar.gz" -ForegroundColor White
    Write-Host "   rm ~/ash-deploy.tar.gz" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Install Node.js 20 (if not already):" -ForegroundColor Yellow
    Write-Host "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash" -ForegroundColor White
    Write-Host "   source ~/.bashrc" -ForegroundColor White
    Write-Host "   nvm install 20" -ForegroundColor White
    Write-Host "   nvm use 20" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Install dependencies and build:" -ForegroundColor Yellow
    Write-Host "   npm install" -ForegroundColor White
    Write-Host "   npm run build" -ForegroundColor White
    Write-Host ""
    Write-Host "5. Start the server:" -ForegroundColor Yellow
    Write-Host "   PORT=3000 nohup npm start > app.log 2>&1 &" -ForegroundColor White
    Write-Host ""
    Write-Host "6. Access your app at:" -ForegroundColor Yellow
    Write-Host "   http://mars.cse.iitb.ac.in:3000" -ForegroundColor Green
    Write-Host ""
    Write-Host "=========================================" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    Write-Host "Make sure you have SCP configured and can connect to mars." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🧹 Cleaning up local files..." -ForegroundColor Yellow
Remove-Item -Recurse -Force ash-deploy -ErrorAction SilentlyContinue
Remove-Item ash-deploy.tar.gz -ErrorAction SilentlyContinue
Write-Host "✓ Cleanup complete" -ForegroundColor Green
Write-Host ""
Write-Host "Done! 🚀" -ForegroundColor Cyan
