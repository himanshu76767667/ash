# 🚀 Quick Deploy to IITB Mars - 5 Minutes

## TL;DR - Super Fast Deploy

```bash
# 1. On your computer - upload project
scp -r c:\Users\himan\Desktop\calender\ash your_ldap@mars.iitb.ac.in:~/

# 2. SSH to mars
ssh your_ldap@mars.iitb.ac.in

# 3. Run automated deployment
cd ~/ash
chmod +x deploy-mars.sh
./deploy-mars.sh

# Done! Your app is live at http://mars.iitb.ac.in:3000
```

---

## Important Notes for Mars

### ⚠️ Node Version Issue

**Mars has Node v17.8.0 (too old for Next.js 14!)**

The deployment script automatically installs Node 20 in your home directory using nvm. This won't affect other users or the system Node.

### 🌐 Accessing Your App

**From IITB Campus:**
```
http://mars.iitb.ac.in:3000
```

**From Outside Campus (VPN required):**
1. Connect to IITB VPN
2. Then access: http://mars.iitb.ac.in:3000

**Mobile (on campus WiFi):**
- Same URL works on phones/tablets connected to IITB WiFi
- Install as PWA: "Add to Home Screen"

### 🔥 Port Information

- Default port: **3000**
- If port 3000 is blocked or in use, you can change it:
  ```bash
  # Edit package.json "start" script to use different port
  # Or set PORT environment variable
  PORT=8080 pm2 start npm --name "ash" -- start
  ```

---

## Step-by-Step Manual Deploy

### 1. Upload Your Project

**Option A: Git (Recommended)**
```bash
ssh your_ldap@mars.iitb.ac.in
cd ~
git clone https://github.com/himanshu76767667/ash.git
cd ash
```

**Option B: SCP Upload**
```bash
# From Windows PowerShell
scp -r c:\Users\himan\Desktop\calender\ash your_ldap@mars.iitb.ac.in:~/
```

### 2. Setup Node 20 (One-time)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node -v  # Should show v20.x.x
```

### 3. Install & Build

```bash
cd ~/ash
npm install
npm run build
```

### 4. Start with PM2

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start npm --name "ash" -- start

# Save PM2 configuration
pm2 save

# Setup auto-restart on boot (optional)
pm2 startup
# Follow the instructions shown
```

### 5. Verify It's Running

```bash
pm2 status
pm2 logs ash
```

Visit: **http://mars.iitb.ac.in:3000**

---

## Useful PM2 Commands

```bash
pm2 status              # Check app status
pm2 logs ash            # View real-time logs
pm2 restart ash         # Restart the app
pm2 stop ash            # Stop the app
pm2 delete ash          # Remove from PM2
pm2 monit               # Monitor CPU/memory
pm2 save                # Save current process list
```

---

## Updating Your Deployment

When you make changes:

```bash
# SSH to mars
ssh your_ldap@mars.iitb.ac.in
cd ~/ash

# Pull latest changes (if using git)
git pull

# Or upload new files via SCP

# Reinstall dependencies if package.json changed
npm install

# Rebuild
npm run build

# Restart app
pm2 restart ash
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find what's using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use a different port
PORT=8080 pm2 start npm --name "ash" -- start
```

### App Not Accessible

1. **Check if running:**
   ```bash
   pm2 status
   pm2 logs ash --lines 50
   ```

2. **Check firewall (if you have sudo):**
   ```bash
   # Firewall might block external access to port 3000
   # Contact mars admin if needed
   ```

3. **VPN required for off-campus:**
   - Install IITB VPN
   - Connect before accessing

### Node Version Issues

```bash
# Always use Node 20
nvm use 20
node -v  # Should show v20.x.x

# Rebuild if needed
rm -rf node_modules .next
npm install
npm run build
```

---

## Performance Tips

### 1. Use PM2 Cluster Mode

```bash
pm2 delete ash
pm2 start npm --name "ash" -i max -- start
```

This runs multiple instances for better performance.

### 2. Enable Gzip Compression

Already configured in `next.config.js`!

### 3. Monitor Resource Usage

```bash
pm2 monit
```

---

## Security Considerations

1. **Firebase Config:** Your Firebase config in `lib/firebase.ts` is safe - it's meant to be public
2. **Firestore Rules:** Make sure to set proper security rules in Firebase Console
3. **HTTPS:** Mars might not support HTTPS - for production, consider Vercel
4. **API Keys:** Never commit sensitive keys to git

---

## Alternative: Deploy to Vercel (Recommended for Production)

For better performance and HTTPS:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd c:\Users\himan\Desktop\calender\ash
vercel

# Follow prompts, done!
```

Benefits:
- ✅ HTTPS by default
- ✅ Auto-scaling
- ✅ CDN worldwide
- ✅ Automatic deployments from git
- ✅ Free for personal projects

---

## Summary

**Quick Deploy:**
1. Upload project to mars
2. Run `./deploy-mars.sh`
3. Access at http://mars.iitb.ac.in:3000

**Manual Deploy:**
1. SSH to mars
2. Install Node 20 via nvm
3. `npm install && npm run build`
4. `pm2 start npm --name ash -- start`

**Update:**
1. Upload/pull new code
2. `npm run build`
3. `pm2 restart ash`

---

## Need Help?

- Check logs: `pm2 logs ash`
- Check status: `pm2 status`
- See full guide: `DEPLOY_IITB.md`

**Your app is ready to share with campus! 🎉**
