#!/bin/bash

# Upload Script for ash to mars.cse.iitb.ac.in
# Run this from your local machine

echo "========================================="
echo "  ASH - Upload to IITB Mars Server"
echo "========================================="
echo ""

# Configuration
REMOTE_USER="himanshuthalor"
REMOTE_HOST="mars.cse.iitb.ac.in"
REMOTE_PATH="~/public_html/ash"

echo "📦 Step 1: Creating deployment package..."
echo ""

# Create a temporary directory for deployment
rm -rf ash-deploy
mkdir ash-deploy

# Copy essential files only (no node_modules, no .next)
echo "Copying project files..."
cp -r components ash-deploy/
cp -r lib ash-deploy/
cp -r pages ash-deploy/
cp -r public ash-deploy/
cp -r styles ash-deploy/
cp package.json ash-deploy/
cp package-lock.json ash-deploy/
cp next.config.js ash-deploy/
cp tsconfig.json ash-deploy/
cp tailwind.config.js ash-deploy/
cp postcss.config.js ash-deploy/
cp .env.example ash-deploy/
cp README.md ash-deploy/
cp FIREBASE_SETUP.md ash-deploy/

echo "✓ Files copied"
echo ""

# Create tarball
echo "📦 Creating tarball..."
tar -czf ash-deploy.tar.gz -C ash-deploy .
echo "✓ Created ash-deploy.tar.gz"
echo ""

# Upload
echo "📤 Step 2: Uploading to mars.cse.iitb.ac.in..."
echo ""
echo "Uploading to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
echo ""

scp ash-deploy.tar.gz $REMOTE_USER@$REMOTE_HOST:~/

echo ""
echo "✓ Upload complete!"
echo ""

# Instructions for server setup
echo "========================================="
echo "  Next Steps on Mars Server:"
echo "========================================="
echo ""
echo "1. SSH into mars:"
echo "   ssh $REMOTE_USER@$REMOTE_HOST"
echo ""
echo "2. Extract and setup:"
echo "   mkdir -p ~/public_html/ash"
echo "   cd ~/public_html/ash"
echo "   tar -xzf ~/ash-deploy.tar.gz"
echo "   rm ~/ash-deploy.tar.gz"
echo ""
echo "3. Install Node.js 20 (if not already):"
echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
echo "   source ~/.bashrc"
echo "   nvm install 20"
echo "   nvm use 20"
echo ""
echo "4. Install dependencies and build:"
echo "   npm install"
echo "   npm run build"
echo ""
echo "5. Start the server:"
echo "   PORT=3000 npm start &"
echo ""
echo "6. Access your app at:"
echo "   http://mars.cse.iitb.ac.in:3000"
echo ""
echo "========================================="
echo ""

# Cleanup
echo "🧹 Cleaning up local files..."
rm -rf ash-deploy
echo "✓ Cleanup complete"
echo ""
echo "Done! 🚀"
