# 🚀 Manual Upload Guide for Mars (IITB)

## Why Manual Upload?
- Git/GitHub is blocked by IITB firewall on mars
- SCP (file transfer) works fine
- We upload the source code and build on the server

---

## 📦 Step 1: Create Deployment Package (On Your PC)

Run this in PowerShell from the `ash` directory:

```powershell
# Navigate to project
cd C:\Users\himan\Desktop\calender\ash

# Create clean package (without node_modules and .next)
tar --exclude=node_modules --exclude=.next --exclude=.git -czf ash.tar.gz *

# Verify the tarball was created
ls ash.tar.gz
```

---

## 📤 Step 2: Upload to Mars

```powershell
# Upload the tarball
scp ash.tar.gz himanshuthalor@mars.cse.iitb.ac.in:~/
```

Enter your password when prompted.

---

## 🔧 Step 3: Setup on Mars Server

SSH into mars:

```bash
ssh himanshuthalor@mars.cse.iitb.ac.in
```

Then run these commands:

### A. Extract Files

```bash
# Create directory
mkdir -p ~/public_html/ash
cd ~/public_html/ash

# Extract
tar -xzf ~/ash.tar.gz

# Clean up
rm ~/ash.tar.gz
```

### B. Install Node.js 20 (if not already installed)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Load nvm
source ~/.bashrc

# Install Node 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node -v  # Should show v20.x.x
```

### C. Install Dependencies

```bash
cd ~/public_html/ash

# Install packages
npm install

# This may take 5-10 minutes
```

### D. Build the App

```bash
# Build for production
npm run build

# This creates the optimized .next folder
```

### E. Start the Server

```bash
# Start on port 3000 (or any available port)
PORT=3000 nohup npm start > app.log 2>&1 &

# Check if running
ps aux | grep node
```

---

## 🌐 Step 4: Access Your App

Open in browser:
- **URL**: `http://mars.cse.iitb.ac.in:3000`
- Or try: `http://mars.iitb.ac.in:3000`

---

## 🔄 To Update Your App Later

When you make changes:

1. On your PC:
```powershell
cd C:\Users\himan\Desktop\calender\ash
tar --exclude=node_modules --exclude=.next --exclude=.git -czf ash.tar.gz *
scp ash.tar.gz himanshuthalor@mars.cse.iitb.ac.in:~/
```

2. On mars:
```bash
# Stop the running app
pkill -f "npm start"

# Extract new version
cd ~/public_html/ash
tar -xzf ~/ash.tar.gz --overwrite
rm ~/ash.tar.gz

# Rebuild (only if you changed code, not just content)
npm run build

# Restart
PORT=3000 nohup npm start > app.log 2>&1 &
```

---

## 🐛 Troubleshooting

### Check if app is running:
```bash
ps aux | grep node
tail -f ~/public_html/ash/app.log
```

### Port already in use:
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 nohup npm start > app.log 2>&1 &
```

### App not accessible:
- Check if port 3000 is allowed on mars
- Try different ports: 3000, 3001, 8080
- Contact IITB IT if ports are blocked

### Memory issues:
```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=2048" npm run build
```

---

## 📱 Install as PWA

Once the app is running:

1. Open on your phone: `http://mars.cse.iitb.ac.in:3000`
2. Browser menu → "Add to Home Screen"
3. App opens full-screen! 🎉

---

## ⚡ Quick Commands Reference

```bash
# SSH to mars
ssh himanshuthalor@mars.cse.iitb.ac.in

# Check app status
ps aux | grep node
tail ~/public_html/ash/app.log

# Stop app
pkill -f "npm start"

# Start app
cd ~/public_html/ash
PORT=3000 nohup npm start > app.log 2>&1 &

# Check logs
tail -f ~/public_html/ash/app.log
```

---

## 🎯 Notes

- **No Git needed**: Everything is done via file upload
- **Firewall safe**: Only uses SSH/SCP (allowed on campus)
- **Port**: Make sure to use an allowed port (3000 usually works)
- **Persistence**: Use `nohup` so app keeps running after logout

---

Good luck! 🚀
