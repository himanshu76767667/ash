# 📝 IITB Mars Deployment Summary

## Key Information

**Mars Server:** mars.iitb.ac.in  
**Current Mars Node Version:** v17.8.0 ❌ (Too old for Next.js 14)  
**Required Node Version:** v20.x.x ✅  
**Your App URL:** http://mars.iitb.ac.in:3000  

---

## What I Created For You

### 1. **deploy-mars.sh** - Automated Deployment Script
- Checks/installs Node 20 automatically
- Installs dependencies
- Builds production bundle
- Sets up PM2 process manager
- Starts your app

**Usage:**
```bash
chmod +x deploy-mars.sh
./deploy-mars.sh
```

### 2. **DEPLOY_MARS_QUICK.md** - Quick Reference Guide
- 5-minute deployment steps
- Common commands
- Troubleshooting tips
- PM2 management

### 3. **Updated DEPLOY_IITB.md**
- Added Mars Node version warning
- Instructions to install Node 20 via nvm
- Complete step-by-step guide

---

## Why Node 20 is Needed

**Problem:** Mars has Node v17.8.0 (released 2022, now deprecated)

**Issues with Node 17:**
- Next.js 14 requires Node 18.17+
- Missing modern JavaScript features
- Security vulnerabilities
- Build errors and crashes

**Solution:** Install Node 20 in your home directory using nvm
- Doesn't affect system or other users
- You have full control
- Works perfectly with Next.js 14

---

## Deployment Options

### Option 1: Automated (Recommended)
```bash
ssh your_ldap@mars.iitb.ac.in
cd ~/ash
./deploy-mars.sh
# Done in ~2 minutes!
```

### Option 2: Manual
```bash
# 1. Install Node 20
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# 2. Build and deploy
npm install
npm run build
npm install -g pm2
pm2 start npm --name "ash" -- start
```

---

## After Deployment

### Access Your App
**On Campus:**
```
http://mars.iitb.ac.in:3000
```

**Off Campus:**
1. Connect to IITB VPN
2. Then access the URL

### Manage Your App
```bash
pm2 status          # Check status
pm2 logs ash        # View logs
pm2 restart ash     # Restart
pm2 stop ash        # Stop
pm2 monit           # Monitor resources
```

### Update Your App
```bash
# Pull new code
git pull  # or upload via SCP

# Rebuild and restart
npm install
npm run build
pm2 restart ash
```

---

## Important Notes

### Port Configuration
- Default: Port 3000
- If blocked, change in package.json or use: `PORT=8080 pm2 start ...`
- Check with mars admin about allowed ports

### VPN Access
- Required for off-campus access
- Install IITB VPN client
- Connect before accessing your app

### Firewall
- Mars might have firewall rules
- Port 3000 should be accessible on campus
- Contact admin if issues

### Resource Limits
- Check your account's resource quotas
- Monitor with `pm2 monit`
- Mars may have memory/CPU limits

---

## Alternative Deployment: Vercel

For production with HTTPS and better performance:

```bash
npm install -g vercel
cd c:\Users\himan\Desktop\calender\ash
vercel
```

Benefits over Mars:
- ✅ HTTPS (secure)
- ✅ Global CDN
- ✅ Auto-scaling
- ✅ Free for personal use
- ✅ Accessible worldwide (no VPN)

Use Mars for:
- ✅ Campus-only access
- ✅ Learning deployment
- ✅ Testing before public launch

---

## Troubleshooting Quick Guide

### App won't start
```bash
pm2 logs ash --lines 100
# Check for errors in build or dependencies
```

### Port in use
```bash
lsof -ti:3000 | xargs kill -9
pm2 restart ash
```

### Node version wrong
```bash
nvm use 20
node -v  # Should show v20.x.x
pm2 restart ash
```

### Can't access from browser
1. Check PM2: `pm2 status`
2. Check logs: `pm2 logs ash`
3. Verify VPN if off-campus
4. Try different browser
5. Check URL: http (not https)

---

## Files Reference

- **deploy-mars.sh** - Automated deployment script
- **DEPLOY_MARS_QUICK.md** - Quick reference (5 min deploy)
- **DEPLOY_IITB.md** - Complete deployment guide
- **FIREBASE_SETUP.md** - Firebase configuration
- **USER_MANUAL.md** - How to use the app

---

## Next Steps

1. **Deploy to Mars:**
   - Upload your project
   - Run `./deploy-mars.sh`
   - Access at http://mars.iitb.ac.in:3000

2. **Share with Friends:**
   - Send them the URL
   - They can install as PWA
   - All events sync via Firebase!

3. **Monitor & Maintain:**
   - Check logs regularly
   - Update when you add features
   - Monitor resource usage

4. **Consider Vercel for Production:**
   - Better performance
   - HTTPS security
   - Worldwide access
   - Free tier available

---

## Summary

✅ **Node 20 Solution:** Install via nvm in your home directory  
✅ **Automated Script:** `deploy-mars.sh` does everything  
✅ **Quick Deploy:** 5 minutes from upload to live  
✅ **Easy Management:** PM2 handles process control  
✅ **Documentation:** Complete guides provided  

**You're ready to deploy to IITB Mars! 🚀**
