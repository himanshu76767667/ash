# Deployment Guide for ash

This guide covers deploying your ash PWA to production.

## Deployment Options Overview

| Option | Best For | Cost | Difficulty |
|--------|----------|------|------------|
| **IITB Mars** | IITB students (on-campus access) | 🆓 Free | Easy |
| **Vercel** | Public access, easiest setup | 🆓 Free | Very Easy |
| **Netlify** | Alternative to Vercel | 🆓 Free | Easy |
| **Firebase Hosting** | Already using Firebase | 🆓 Free | Medium |
| **Self-Hosted** | Full control | 💰 Varies | Hard |

---

## Option 1: IITB Mars Server (For IITB Students) 🎓

Perfect for student projects accessible within IITB network!

**Quick Summary**:
1. SSH to mars.iitb.ac.in
2. Upload project
3. Install dependencies
4. Build and run with PM2
5. Access at http://mars.iitb.ac.in:3000

**Complete Guide**: See [`DEPLOY_IITB.md`](DEPLOY_IITB.md) for detailed IITB deployment instructions.

**Pros**:
- ✅ Free hosting
- ✅ IITB infrastructure
- ✅ Perfect for class projects
- ✅ Good for campus users

**Cons**:
- ⚠️ Requires IITB network/VPN
- ⚠️ Shared server resources
- ⚠️ Manual updates

---

## Option 2: Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and offers the smoothest deployment experience.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ash.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "New Project"
   - Import your `ash` repository
   - Vercel will auto-detect Next.js settings
   - Add environment variables (Firebase config)
   - Click "Deploy"

3. **Add Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_value
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
   NEXT_PUBLIC_FIREBASE_APP_ID=your_value
   ```

4. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

**Your app will be live at**: `https://ash.vercel.app` (or your custom domain)

---

## Option 3: Netlify

### Steps:

1. **Build Configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables
   - Deploy

---

## Option 4: Firebase Hosting

Since you're already using Firebase, you can host on Firebase too!

### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory: `out`
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. **Update `next.config.js`**
   ```javascript
   module.exports = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   ```

5. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

**Your app will be live at**: `https://YOUR_PROJECT.web.app`

---

## Option 5: Self-Hosted (VPS/Cloud)

For Ubuntu/Linux servers:

### Steps:

1. **Install Node.js on Server**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ash.git
   cd ash
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Set Up Environment Variables**
   Create `.env.local` file with your Firebase config

6. **Use PM2 for Process Management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "ash" -- start
   pm2 startup
   pm2 save
   ```

7. **Set Up Nginx as Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Set Up SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Pre-Deployment Checklist

Before deploying to production, make sure:

- [ ] Firebase security rules are configured properly (not in test mode)
- [ ] Environment variables are set correctly
- [ ] All sensitive data is in `.env.local` (not committed to git)
- [ ] `.gitignore` includes `.env.local`
- [ ] App has been tested thoroughly
- [ ] PWA manifest is configured with production URL
- [ ] Service worker is working correctly
- [ ] Logo/icons are optimized
- [ ] Firebase billing is set up (if using free tier limits)

---

## Post-Deployment

### Update Firebase Security Rules

In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId} {
      // Everyone can read
      allow read: if true;
      
      // Only authenticated users can write (if you add auth)
      allow write: if request.auth != null;
      
      // OR keep open for now (less secure)
      // allow write: if true;
    }
  }
}
```

### Monitor Usage

- **Firebase Console**: Check Firestore usage, storage, reads/writes
- **Vercel/Netlify Dashboard**: Monitor bandwidth, build times, errors
- **Analytics** (Optional): Add Google Analytics or similar

### Performance Optimization

1. **Enable Caching**
   - Service worker caches static assets
   - Firebase caches Firestore queries

2. **Image Optimization**
   - Compress `logo.jpg` if needed
   - Consider WebP format

3. **Bundle Size**
   - Run `npm run build` and check output
   - Next.js automatically optimizes bundles

---

## Custom Domain Setup

### For Vercel:
1. Add domain in Vercel dashboard
2. Update DNS records:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### For Netlify:
1. Add domain in Netlify dashboard
2. Update DNS to Netlify nameservers

### For Firebase:
1. Go to Hosting → Add custom domain
2. Follow verification steps
3. Update DNS records

---

## Troubleshooting Production Issues

### Issue: PWA not installing
- Ensure site is served over HTTPS
- Check manifest.json is accessible
- Verify service worker is registered

### Issue: Firebase connection errors
- Double-check environment variables
- Verify Firebase project settings
- Check CORS settings

### Issue: Build fails
- Check Node.js version (should be 18+)
- Run `npm install` to ensure all deps are installed
- Check build logs for specific errors

---

## Cost Estimates

### Free Tier (Perfect for Student Projects):
- **Vercel**: Free for personal projects
- **Firebase**: 
  - 50K reads/day free
  - 20K writes/day free
  - 1GB storage free
- **Total**: $0/month for typical usage

### Paid (If You Exceed Free Limits):
- **Vercel Pro**: $20/month (unlikely needed)
- **Firebase Blaze**: Pay-as-you-go (usually <$5/month for small groups)

---

## Continuous Deployment

Once set up with Vercel/Netlify:

1. Make changes to your code
2. Commit and push to GitHub
3. Auto-deploys to production! ✨

```bash
git add .
git commit -m "Update feature"
git push
```

Your site updates automatically in ~1 minute.

---

## Support & Monitoring

### Set Up Alerts:
- Firebase: Usage alerts in Firebase Console
- Vercel: Email notifications for failed deployments
- Uptime monitoring: Use UptimeRobot (free)

### Logs:
- Vercel: Built-in logs in dashboard
- Firebase: Console logs and Firestore audit logs
- Browser: Use browser DevTools for client-side issues

---

**Ready to deploy? Start with Vercel - it's the easiest! 🚀**
