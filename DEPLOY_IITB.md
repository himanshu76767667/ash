# 🎓 Deploying ash to IITB (mars.iitb.ac.in)

## Overview

This guide covers deploying your **ash** PWA to IIT Bombay's student server (mars.iitb.ac.in).

---

## Prerequisites

- [x] IITB LDAP credentials (your institute login)
- [x] SSH access to mars.iitb.ac.in
- [x] Project built and tested locally
- [x] Firebase configured and working

---

## Step 1: Access IITB Server

### Connect via SSH

**On Windows (PowerShell)**:
```powershell
ssh your_ldap@mars.iitb.ac.in
# Example: ssh 210050999@mars.iitb.ac.in
```

**On Mac/Linux**:
```bash
ssh your_ldap@mars.iitb.ac.in
```

Enter your LDAP password when prompted.

---

## Step 2: Set Up Environment on Mars

### Install Node.js (If Not Available)

Once logged into mars:

```bash
# Check if Node.js is installed
node --version

# If not installed or version is old, install using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install latest LTS Node.js
nvm install --lts
nvm use --lts

# Verify
node --version  # Should show v20.x.x or higher
npm --version   # Should show v10.x.x or higher
```

---

## Step 3: Transfer Your Project to Mars

### Option A: Using Git (Recommended)

```bash
# On mars server
cd ~/public_html  # Or your preferred directory

# Clone your repository
git clone https://github.com/himanshu76767667/ash.git
cd ash
```

### Option B: Using SCP (From Your Computer)

**On Windows (PowerShell)**:
```powershell
# Navigate to your project directory
cd c:\Users\himan\Desktop\calender

# Copy entire project to mars
scp -r ash your_ldap@mars.iitb.ac.in:~/public_html/
```

**On Mac/Linux**:
```bash
# From your local machine
scp -r ~/path/to/ash your_ldap@mars.iitb.ac.in:~/public_html/
```

---

## Step 4: Install Dependencies on Mars

```bash
# SSH into mars
ssh your_ldap@mars.iitb.ac.in

# Navigate to project
cd ~/public_html/ash

# Install dependencies
npm install

# This will take 5-10 minutes
```

---

## Step 5: Configure for Production

### Create Environment File

```bash
# Create .env.local file on mars
nano .env.local
```

Add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Save: `Ctrl+O`, then `Enter`, then `Ctrl+X`

---

## Step 6: Build the Application

```bash
# Build for production
npm run build

# This creates optimized production build
```

---

## Step 7: Run the Application

### Option A: Using PM2 (Recommended - Keeps Running)

```bash
# Install PM2 globally
npm install -g pm2

# Start the app with PM2
pm2 start npm --name "ash" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on server reboot
pm2 startup
# Follow the instructions it gives you

# Check status
pm2 status
pm2 logs ash

# View running app
pm2 list
```

**PM2 Commands**:
```bash
pm2 stop ash      # Stop the app
pm2 restart ash   # Restart the app
pm2 delete ash    # Remove from PM2
pm2 logs ash      # View logs
pm2 monit         # Monitor performance
```

### Option B: Using Screen (Alternative)

```bash
# Start a screen session
screen -S ash

# Start the app
npm start

# Detach from screen: Press Ctrl+A, then D
# Reattach later: screen -r ash
```

### Option C: Direct Start (For Testing Only)

```bash
# This stops when you close SSH
npm start

# App runs on port 3000 by default
```

---

## Step 8: Configure Apache/Nginx (If Available)

If mars has Apache or Nginx, you can set up a reverse proxy:

### Apache Configuration

Create/edit `.htaccess` in your public_html:
```apache
RewriteEngine On
RewriteRule ^ash$ http://localhost:3000/ [P,L]
RewriteRule ^ash/(.*)$ http://localhost:3000/$1 [P,L]
```

### Nginx Configuration (If you have access)

```nginx
location /ash {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---

## Step 9: Access Your App

### Direct Access (If Mars Allows)
```
http://mars.iitb.ac.in:3000
```

### Through Apache (If configured)
```
http://www.mars.iitb.ac.in/~your_ldap/ash
```

### HTTPS (If available)
```
https://www.mars.iitb.ac.in/~your_ldap/ash
```

---

## Step 10: Set Up Custom Port (If Needed)

If port 3000 is blocked or in use:

```bash
# Start on different port
PORT=3001 npm start

# Or with PM2
PORT=3001 pm2 start npm --name "ash" -- start
```

---

## Maintenance & Updates

### Update Your App

```bash
# SSH into mars
ssh your_ldap@mars.iitb.ac.in
cd ~/public_html/ash

# Pull latest changes (if using Git)
git pull origin main

# Reinstall dependencies (if package.json changed)
npm install

# Rebuild
npm run build

# Restart with PM2
pm2 restart ash

# Or restart screen session
screen -r ash
# Press Ctrl+C to stop
npm start
# Press Ctrl+A, then D to detach
```

### Check Logs

```bash
# PM2 logs
pm2 logs ash

# Or check Next.js logs
tail -f .next/server/logs/nextjs.log
```

---

## Troubleshooting IITB Deployment

### Issue: Permission Denied

```bash
# Fix permissions
chmod -R 755 ~/public_html/ash

# Fix node_modules permissions
cd ~/public_html/ash
chmod -R 755 node_modules
```

### Issue: Port Already in Use

```bash
# Find what's using the port
lsof -i :3000

# Kill the process
kill -9 PID_NUMBER

# Or use a different port
PORT=3001 npm start
```

### Issue: Out of Memory During Build

```bash
# Build with limited memory
NODE_OPTIONS="--max-old-space-size=2048" npm run build
```

### Issue: App Stops After Logout

**Solution**: Use PM2 or Screen (see Step 7)

### Issue: Can't Access from Outside IITB

**Note**: Mars is typically only accessible from IITB network or via VPN.

**Solutions**:
1. Use IITB VPN when accessing from outside
2. Or deploy to external hosting (Vercel, Netlify)

---

## Security Considerations

### 1. Secure Your Firebase Config

```bash
# Ensure .env.local is not publicly accessible
chmod 600 .env.local

# Add to .htaccess (if using Apache)
<Files ".env.local">
    Require all denied
</Files>
```

### 2. Update Firebase Security Rules

In Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId} {
      allow read: if true;  // Anyone can read
      allow write: if request.auth != null;  // Only authenticated users can write
      // OR for now, keep open:
      // allow write: if true;
    }
  }
}
```

### 3. Keep Dependencies Updated

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Rebuild and restart
npm run build
pm2 restart ash
```

---

## Performance Optimization for IITB

### 1. Enable Compression

In `next.config.js`:
```javascript
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
}
```

### 2. Optimize Images

```bash
# If you add images, use Next.js Image component
# It auto-optimizes
```

### 3. Monitor Resource Usage

```bash
# Check CPU and memory
top

# PM2 monitoring
pm2 monit
```

---

## Alternative: Static Export to public_html

If you want a static site (no server required):

### 1. Configure for Static Export

Update `next.config.js`:
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/~your_ldap/ash',
}
```

### 2. Build Static Site

```bash
npm run build

# This creates 'out' folder
```

### 3. Copy to public_html

```bash
# On mars
cp -r out/* ~/public_html/ash/

# Access at:
# http://www.mars.iitb.ac.in/~your_ldap/ash
```

**Note**: This won't have server-side features, but Firebase will still work!

---

## Resource Limits on Mars

Be aware of typical shared server limits:

- **CPU**: Shared with other users
- **Memory**: Usually 1-2GB per user
- **Storage**: Check your quota with `quota -s`
- **Bandwidth**: Shared

If you hit limits:
- Use static export instead
- Optimize build size
- Consider external hosting for heavy traffic

---

## Backup Strategy

### Backup Your Data

```bash
# Backup entire project
cd ~/public_html
tar -czf ash-backup-$(date +%Y%m%d).tar.gz ash/

# Download backup to local machine (from your computer)
scp your_ldap@mars.iitb.ac.in:~/public_html/ash-backup-*.tar.gz ./
```

### Backup Firebase

- Firebase data is already in the cloud
- Download from Firebase Console → Firestore → Export

---

## Monitoring & Logs

### Check App Status

```bash
# PM2 status
pm2 status

# View logs
pm2 logs ash --lines 100

# Monitor resources
pm2 monit
```

### Check Access Logs

```bash
# Apache access logs (if available)
tail -f ~/public_html/logs/access_log
```

---

## Sharing with Your Group

Once deployed:

**URL Format**:
```
http://mars.iitb.ac.in:3000
# or
http://www.mars.iitb.ac.in/~your_ldap/ash
```

**Access Requirements**:
- Must be on IITB network
- Or connected to IITB VPN
- Share URL with your classmates!

---

## Quick Reference Commands

```bash
# SSH to mars
ssh your_ldap@mars.iitb.ac.in

# Navigate to project
cd ~/public_html/ash

# Update code (if using Git)
git pull

# Install/update dependencies
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name "ash" -- start

# Restart
pm2 restart ash

# Stop
pm2 stop ash

# View logs
pm2 logs ash

# Check status
pm2 status
```

---

## Complete Deployment Checklist

- [ ] SSH access to mars verified
- [ ] Node.js installed on mars
- [ ] Project transferred to mars
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with Firebase config
- [ ] Project built (`npm run build`)
- [ ] PM2 installed and configured
- [ ] App started with PM2
- [ ] App accessible via browser
- [ ] Firebase connection working
- [ ] PWA features working
- [ ] Shared URL with group
- [ ] Backup created

---

## Getting Help

### IITB Resources
- **CC Help Desk**: For mars server issues
- **IITB IT Support**: For network/access issues

### Project Issues
- Check `TROUBLESHOOTING.md`
- Check PM2 logs: `pm2 logs ash`
- Check browser console (F12)

---

## Cost

**Hosting on Mars**: 🆓 FREE!
- No hosting costs
- IITB provides server space
- Firebase free tier for database

---

**Your ash app will be running on IITB infrastructure! 🎓✨**

For questions about mars server, contact IITB Computer Center.
