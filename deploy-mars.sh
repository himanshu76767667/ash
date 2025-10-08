#!/bin/bash
# ash - IITB Mars Deployment Script
# Run this script on mars.iitb.ac.in after uploading your project

set -e  # Exit on error

echo "======================================"
echo "  ash - IITB Mars Setup Script"
echo "======================================"
echo ""

# Step 1: Check and setup Node.js 20
echo "[1/6] Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "Current Node version: $NODE_VERSION"
    
    if [[ ! $NODE_VERSION =~ ^v20 ]] && [[ ! $NODE_VERSION =~ ^v18 ]]; then
        echo "⚠️  Node version is too old for Next.js 14!"
        echo "Installing Node 20 via nvm..."
        
        # Install nvm if not present
        if [ ! -d "$HOME/.nvm" ]; then
            echo "Installing nvm..."
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        else
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        fi
        
        # Install and use Node 20
        nvm install 20
        nvm use 20
        nvm alias default 20
        
        echo "✓ Node 20 installed successfully!"
    else
        echo "✓ Node version is compatible!"
    fi
else
    echo "Node.js not found. Installing via nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 20
    nvm use 20
    nvm alias default 20
fi

echo ""
echo "[2/6] Verifying environment..."
echo "Node: $(node -v)"
echo "npm: $(npm -v)"
echo ""

# Step 2: Install dependencies
echo "[3/6] Installing dependencies..."
npm install
echo "✓ Dependencies installed!"
echo ""

# Step 3: Build the project
echo "[4/6] Building production bundle..."
npm run build
echo "✓ Build complete!"
echo ""

# Step 4: Install PM2 globally if not present
echo "[5/6] Setting up PM2 process manager..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    echo "✓ PM2 installed!"
else
    echo "✓ PM2 already installed!"
fi
echo ""

# Step 5: Start/Restart the app with PM2
echo "[6/6] Starting application..."

# Stop existing instance if running
pm2 stop ash 2>/dev/null || true
pm2 delete ash 2>/dev/null || true

# Start new instance
pm2 start npm --name "ash" -- start
pm2 save

echo ""
echo "======================================"
echo "  ✓ Deployment Complete!"
echo "======================================"
echo ""
echo "Your app is now running at:"
echo "  http://mars.iitb.ac.in:3000"
echo ""
echo "Useful commands:"
echo "  pm2 status          - Check app status"
echo "  pm2 logs ash        - View logs"
echo "  pm2 restart ash     - Restart app"
echo "  pm2 stop ash        - Stop app"
echo "  pm2 monit           - Monitor in real-time"
echo ""
echo "To make PM2 start on boot:"
echo "  pm2 startup"
echo "  (follow the instructions shown)"
echo ""
echo "Happy coding! 🚀"
