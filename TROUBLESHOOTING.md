# 🔧 Troubleshooting Checklist

Quick reference for fixing common issues with ash.

## Before You Start

- [ ] Node.js installed (check with `node --version`)
- [ ] In correct directory (`cd c:\Users\himan\Desktop\calender\ash`)
- [ ] Dependencies installed (`npm install`)

---

## ❌ Issue: "npm is not recognized"

**Cause**: Node.js not installed or not in PATH

**Solution**:
1. Download Node.js from https://nodejs.org/
2. Install the LTS version
3. **Restart your computer** (important!)
4. Open new PowerShell and try again
5. Verify: `node --version` should show v18.x.x or higher

---

## ❌ Issue: "Cannot find module 'react'" or similar

**Cause**: Dependencies not installed

**Solution**:
```bash
npm install
```

If that doesn't work:
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## ❌ Issue: Firebase errors / "Permission denied"

**Cause**: Firebase not configured or rules too restrictive

**Solution**:

1. **Check Configuration** (`lib/firebase.ts`):
   - Replace ALL placeholder values
   - No "YOUR_API_KEY" should remain
   - Get config from Firebase Console

2. **Enable Firestore**:
   - Go to Firebase Console
   - Click "Firestore Database"
   - Click "Create database"
   - Choose "Test mode"

3. **Check Security Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /events/{eventId} {
         allow read, write: if true;
       }
     }
   }
   ```

4. **Verify Network**:
   - Check internet connection
   - Check Firebase project is active
   - Check browser console (F12) for specific errors

---

## ❌ Issue: Events not syncing between users

**Cause**: Not using same Firebase project or Firestore not enabled

**Solution**:
- [ ] All users configured with same Firebase project
- [ ] Firestore database is enabled
- [ ] Security rules allow read/write
- [ ] Check Firebase Console → Firestore Database → events collection exists
- [ ] Check browser console for errors

**Test**:
1. Add event in one browser
2. Check Firebase Console → Firestore
3. Should see new document in "events" collection
4. Open in another browser/device
5. Should see event appear

---

## ❌ Issue: Classes not showing up

**Cause**: Date is after November 22, 2025 or wrong day

**Solution**:
- [ ] Check today's date (classes only show until Nov 22, 2025)
- [ ] Swipe to a weekday (Mon-Fri have more classes)
- [ ] Check `lib/schedule.ts` for schedule data
- [ ] Weekend? Saturday/Sunday have no classes configured

**Test Day Navigation**:
- Swipe to Monday - should see 4 classes
- Swipe to Wednesday - should see 2 classes
- Swipe to Saturday - should see 0 classes

---

## ❌ Issue: Swipe navigation not working

**Cause**: Event handlers not attached or browser compatibility

**Solution**:
- [ ] Use Chrome or Edge (Safari may have issues)
- [ ] Check console for JavaScript errors
- [ ] Try clicking and dragging instead of quick swipe
- [ ] Refresh page (Ctrl+F5)

**Alternative**:
- Can still navigate by editing URL: `/?date=2025-10-09`

---

## ❌ Issue: PWA not installing

**Cause**: HTTPS required (except localhost), manifest issues

**Solution**:

1. **On Localhost**:
   - Should work on http://localhost:3000
   - Look for install icon in Chrome address bar
   - Chrome → Menu → "Install ash"

2. **On Production**:
   - Must be HTTPS (Vercel/Netlify provide this)
   - Check manifest.json is accessible
   - Check service worker is registered

3. **Verify PWA**:
   - Chrome DevTools (F12)
   - Application tab
   - Manifest section should show app details
   - Service Workers should show "activated"

---

## ❌ Issue: Animations not smooth or missing

**Cause**: Framer Motion not installed or GPU acceleration off

**Solution**:
```bash
npm install framer-motion@^11.0.0
```

**Browser Settings**:
- Enable hardware acceleration in Chrome
- Chrome → Settings → System → Hardware acceleration

---

## ❌ Issue: Modal not opening when clicking + button

**Cause**: JavaScript error or state issue

**Solution**:
1. Open browser console (F12)
2. Look for red error messages
3. Click + button and watch console
4. Common fixes:
   - Refresh page
   - Clear browser cache (Ctrl+Shift+Del)
   - Check if `EventModal.tsx` has errors

---

## ❌ Issue: Styles not loading / looks broken

**Cause**: Tailwind CSS not building or CSS not loaded

**Solution**:

1. **Check Tailwind**:
   ```bash
   npm install tailwindcss postcss autoprefixer
   ```

2. **Clear Next.js cache**:
   ```bash
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

3. **Hard refresh browser**:
   - Ctrl + Shift + R (Windows)
   - Cmd + Shift + R (Mac)

---

## ❌ Issue: Build fails with TypeScript errors

**Cause**: Type errors in code or dependencies

**Solution**:

1. **Install type definitions**:
   ```bash
   npm install --save-dev @types/react @types/node
   ```

2. **Check tsconfig.json** exists

3. **Ignore errors temporarily** (not recommended):
   - In `next.config.js`:
   ```javascript
   module.exports = {
     typescript: {
       ignoreBuildErrors: true,
     },
   }
   ```

---

## ❌ Issue: "Port 3000 already in use"

**Cause**: Another app using port 3000

**Solution**:

1. **Kill existing process**:
   ```powershell
   # Find process
   netstat -ano | findstr :3000
   
   # Kill process (replace PID with actual number)
   taskkill /PID <PID> /F
   ```

2. **Or use different port**:
   ```bash
   npm run dev -- -p 3001
   ```

---

## ❌ Issue: Data not persisting / gets deleted

**Cause**: Using wrong database or deletion script running

**Solution**:
- [ ] Check Firebase Console → Firestore Database
- [ ] Verify data exists there
- [ ] Check you're not in incognito mode (IndexedDB clears)
- [ ] Check browser isn't clearing cache on exit

---

## ❌ Issue: Date/time showing wrong timezone

**Cause**: date-fns using UTC or browser timezone

**Solution**:
- App uses local browser timezone by default
- Check computer's date/time settings
- Verify timezone is correct in OS settings

---

## 🆘 Still Having Issues?

### Debugging Steps:

1. **Check Browser Console**:
   - Press F12
   - Click "Console" tab
   - Look for red error messages
   - Share these errors when asking for help

2. **Check Network Tab**:
   - F12 → Network tab
   - Refresh page
   - Look for failed requests (red)
   - Check Firebase requests

3. **Verify Installation**:
   ```bash
   node --version    # Should be v18 or higher
   npm --version     # Should be v9 or higher
   ```

4. **Check Files Exist**:
   - lib/firebase.ts
   - components/EventModal.tsx
   - pages/index.tsx
   - public/manifest.json

5. **Fresh Start**:
   ```bash
   # Nuclear option - start fresh
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Recurse -Force .next
   Remove-Item package-lock.json
   npm install
   npm run dev
   ```

---

## 📋 Quick Health Check

Run this checklist to verify everything:

```bash
# 1. Check Node.js
node --version

# 2. Check dependencies
npm list --depth=0

# 3. Build project
npm run build

# 4. Start dev server
npm run dev
```

Expected output:
- Node version v18+
- All dependencies listed
- Build succeeds
- Server starts on http://localhost:3000

---

## 🔍 Error Code Reference

| Error Message | Location | Fix |
|---------------|----------|-----|
| "Cannot find module" | Terminal | Run `npm install` |
| "Permission denied" | Browser | Check Firebase rules |
| "Network error" | Browser | Check internet/Firebase config |
| "Invalid date" | Browser | Check date format in code |
| "Module not found" | Build | Check import paths |
| "Port in use" | Terminal | Kill process or use different port |

---

## 📞 Getting Help

When asking for help, provide:

1. **Error message** (full text from console)
2. **What you were doing** when error occurred
3. **Node.js version** (`node --version`)
4. **Operating System** (Windows 10, 11, etc.)
5. **Browser** (Chrome, Firefox, etc.)
6. **Screenshot** of error (F12 → Console)

---

## ✅ Prevention Tips

Avoid issues by:

- [ ] Always run `npm install` after pulling changes
- [ ] Keep Node.js updated (LTS version)
- [ ] Use Chrome for development
- [ ] Don't edit `node_modules` folder
- [ ] Keep `.env.local` backed up
- [ ] Commit code regularly
- [ ] Test on localhost before deploying

---

**Most issues are solved by:**
1. Running `npm install`
2. Restarting dev server
3. Checking Firebase config
4. Reading console errors

**Good luck! 🍀**
