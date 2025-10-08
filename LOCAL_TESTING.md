# 🧪 Local Testing Guide for ash

## Complete Local Testing Workflow

This guide covers how to test your **ash** app locally before deployment.

---

## Prerequisites Checklist

Before you start testing:

- [ ] Node.js installed (v18 or higher)
- [ ] npm installed (comes with Node.js)
- [ ] Project downloaded/cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Firebase project created
- [ ] Firebase config added to `lib/firebase.ts`

---

## Step 1: Install Node.js (If Not Already)

### Check if Node.js is Installed

```powershell
node --version
npm --version
```

If you see version numbers, you're good! If not:

### Install Node.js

1. Go to https://nodejs.org/
2. Download **LTS version** (currently v20.x.x)
3. Run installer (use all default options)
4. **Restart your computer**
5. Verify installation:
   ```powershell
   node --version  # Should show v20.x.x
   npm --version   # Should show v10.x.x
   ```

---

## Step 2: Navigate to Project Directory

Open PowerShell and navigate to your project:

```powershell
# Navigate to the ash folder
cd c:\Users\himan\Desktop\calender\ash

# Verify you're in the right place
dir

# You should see: package.json, components/, lib/, pages/, etc.
```

---

## Step 3: Install Dependencies

First time only - install all required packages:

```powershell
npm install
```

**What this does**:
- Downloads all dependencies (~500MB)
- Creates `node_modules` folder
- Takes 5-10 minutes depending on internet speed

**Output**: You'll see progress bars and package names

**When complete**: You'll see a summary like:
```
added 342 packages in 2m
```

---

## Step 4: Configure Firebase for Local Testing

### Option A: Use Your Production Firebase (Recommended)

Edit `lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIza...",  // Your actual Firebase API key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

### Option B: Use Environment Variables (Better for Security)

1. Create `.env.local` file in project root:
   ```powershell
   # In the ash folder
   New-Item .env.local
   notepad .env.local
   ```

2. Add your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...
   ```

3. Save and close

---

## Step 5: Start Development Server

Run the development server:

```powershell
npm run dev
```

**What you'll see**:
```
> ash@1.0.0 dev
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully in 2.5s (18 modules)
- wait compiling...
- event compiled successfully in 234 ms (18 modules)
```

**Success indicators**:
- ✅ "ready started server on... http://localhost:3000"
- ✅ "compiled successfully"
- ✅ No red error messages

**Keep this terminal open** - the server needs to keep running!

---

## Step 6: Access Your App

Open your web browser (Chrome recommended) and go to:

```
http://localhost:3000
```

**What you should see**:
- ✅ Dark themed app
- ✅ Header showing "TUESDAY, 8 OCTOBER" (or current date)
- ✅ Today's class schedule (if it's a weekday before Nov 22, 2025)
- ✅ Floating + button in bottom-right corner

**If you see errors**: Check the terminal and browser console (F12)

---

## Step 7: Test All Features

### ✅ Test Navigation

**Swipe between days**:
1. Click and drag left on the screen → Should go to tomorrow
2. Click and drag right → Should go to yesterday
3. Header date should update

**Keyboard alternative** (on desktop):
- Use browser back/forward buttons
- Or manually change URL: `http://localhost:3000/?date=2025-10-09`

### ✅ Test Class Schedule

1. Navigate to Monday (swipe to any Monday)
2. You should see 4 classes:
   - CS230 at 09:30
   - CS215 at 10:30
   - CS228 at 11:30
   - EC101 at 15:30
3. Tap/click on a class → Full course name should appear
4. Tap again → Should collapse

### ✅ Test Adding a Deadline

1. Click the **+** button (bottom-right)
2. Modal should slide up from bottom
3. Fill out the form:
   - Type: **Deadline**
   - Course Code: `CS230`
   - Title: `Test Assignment`
   - Date: Pick tomorrow's date
   - Time: `23:59`
4. Click **"Add Event"**
5. Modal should close
6. Scroll down to "Upcoming Deadlines" section
7. Your deadline should appear!

### ✅ Test Firebase Sync

**Open browser console** (F12 → Console tab):

1. Add a deadline (as above)
2. Watch console - should see Firebase messages
3. Go to Firebase Console → Firestore Database
4. You should see a new document in "events" collection

**Test real-time sync**:
1. Open app in two different browser tabs
2. Add deadline in tab 1
3. Tab 2 should update automatically! ✨

### ✅ Test Marking Complete

1. Find a deadline in "Upcoming Deadlines"
2. Click the checkbox
3. Item should:
   - ✅ Get a checkmark
   - ✅ Fade to gray
   - ✅ Show strikethrough text
   - ✅ Smooth animation

### ✅ Test Editing Events

1. Click on any deadline/exam in the list
2. Modal should open with current data
3. Change the title
4. Click **"Save Changes"**
5. Modal closes
6. Updated title should appear in list

### ✅ Test Deleting Events

1. Click on a deadline/exam
2. Modal opens
3. Click red **"Delete"** button
4. Modal closes
5. Event should disappear from list

### ✅ Test Animations

Watch for smooth animations on:
- Modal opening/closing
- Swiping between days
- Checking/unchecking items
- Adding new items to list
- Deleting items

### ✅ Test PWA Features (Chrome)

1. Look for install icon in address bar (computer icon with ⊕)
2. Click it
3. Click "Install"
4. App should open in standalone window
5. Should work without internet (after initial load)

---

## Step 8: Test on Mobile Device (Same Network)

### Find Your Local IP Address

**On Windows**:
```powershell
ipconfig
```

Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x or 10.0.x.x)

Example: `192.168.1.100`

### Access from Phone

1. Connect phone to **same Wi-Fi** as computer
2. Open Chrome on phone
3. Go to: `http://YOUR_IP_ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`
4. Test all features on mobile!

### Test Mobile Features

- ✅ Swipe gestures work smoothly
- ✅ + button is easily tappable
- ✅ Modal fills screen properly
- ✅ Text is readable
- ✅ Touch targets are large enough
- ✅ No horizontal scrolling

### Install as PWA on Mobile

1. Chrome menu (⋮)
2. "Add to Home screen"
3. Name it "ash"
4. Check home screen
5. Open from home screen icon
6. Should feel like native app!

---

## Testing Checklist

Run through this checklist before deploying:

### Basic Functionality
- [ ] App loads without errors
- [ ] Current date displays correctly
- [ ] Class schedule appears (for valid dates)
- [ ] Can swipe between days
- [ ] Tap on class shows full name

### CRUD Operations
- [ ] Can add deadline
- [ ] Can add exam
- [ ] Can edit event
- [ ] Can delete event
- [ ] Changes appear immediately

### Firebase Integration
- [ ] Events save to Firebase
- [ ] Events load from Firebase
- [ ] Real-time sync works across tabs
- [ ] Check Firebase Console shows data

### UI/UX
- [ ] Animations are smooth
- [ ] Colors look good
- [ ] Dark theme works
- [ ] Mobile responsive
- [ ] No layout issues

### PWA Features
- [ ] Can install as PWA
- [ ] Works offline (after initial load)
- [ ] Service worker registers
- [ ] Manifest.json loads

### Performance
- [ ] Page loads quickly
- [ ] Swipes are responsive
- [ ] No lag when adding events
- [ ] Firebase queries are fast

---

## Common Testing Issues & Fixes

### Issue: "npm: command not found"

**Fix**:
```powershell
# Install Node.js from nodejs.org
# Then restart PowerShell
node --version
```

### Issue: "Cannot find module 'react'"

**Fix**:
```powershell
# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: "Port 3000 already in use"

**Fix**:
```powershell
# Option 1: Use different port
npm run dev -- -p 3001

# Option 2: Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Issue: Firebase errors in console

**Fix**:
1. Check `lib/firebase.ts` has correct config
2. Verify Firestore is enabled in Firebase Console
3. Check security rules allow read/write
4. Check browser console for specific error

### Issue: Events not syncing

**Fix**:
1. Open Firebase Console → Firestore
2. Check "events" collection exists
3. Check data appears when you add event
4. Check Firebase config is correct
5. Check internet connection

### Issue: Styles look broken

**Fix**:
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run dev
```

### Issue: Hot reload not working

**Fix**:
1. Stop server (Ctrl+C)
2. Delete `.next` folder
3. Restart: `npm run dev`

---

## Browser Testing

Test in multiple browsers:

### Chrome (Recommended)
- ✅ Best PWA support
- ✅ Best DevTools
- ✅ Use for primary testing

### Edge
- ✅ Good PWA support
- ✅ Similar to Chrome

### Firefox
- ⚠️ PWA support limited
- ✅ Good for cross-browser testing

### Safari (if available)
- ⚠️ Some PWA limitations
- ✅ Test on Mac/iPhone

---

## Development Tools

### Browser DevTools (F12)

**Console Tab**:
- See errors and warnings
- Check Firebase messages
- Debug JavaScript

**Network Tab**:
- See Firebase requests
- Check loading times
- Debug API calls

**Application Tab**:
- Check Service Worker status
- View localStorage/IndexedDB
- Inspect manifest.json
- Test offline mode

### React DevTools (Optional)

Install React DevTools extension:
1. Chrome Web Store → Search "React Developer Tools"
2. Install extension
3. F12 → React tab
4. Inspect component tree and state

---

## Performance Testing

### Check Build Size

```powershell
# Create production build
npm run build

# See output - check bundle sizes
```

**Look for**:
- First Load JS should be < 100KB for good performance
- No unusually large bundles

### Test Production Build Locally

```powershell
# Build for production
npm run build

# Start production server
npm start

# Access at http://localhost:3000
# Should be faster than dev mode
```

---

## Testing Scenarios

### Scenario 1: New User

1. Clear browser cache/cookies
2. Open app
3. Should default to today
4. No deadlines/exams initially
5. Can add first event

### Scenario 2: Returning User

1. With existing data
2. Reload page
3. Data should load from Firebase
4. Upcoming lists should populate

### Scenario 3: Multiple Users

1. Open in 2+ browsers/tabs
2. Add event in one
3. Should appear in others immediately
4. Test marking complete syncs

### Scenario 4: Offline Mode

1. Load app
2. Open DevTools → Network tab
3. Select "Offline" mode
4. App should still display
5. Firebase operations will queue
6. Go back online → syncs

### Scenario 5: Mobile Testing

1. Test on actual phone (same WiFi)
2. Test portrait and landscape
3. Test touch gestures
4. Test keyboard input
5. Test installing as PWA

---

## Debug Mode

### Enable Verbose Logging

Add to top of `pages/index.tsx`:

```typescript
// Enable debug logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug mode enabled');
}
```

### Check Firebase Connection

Add to `lib/firebase.ts`:

```typescript
// Test connection
console.log('Firebase initialized:', firebaseConfig.projectId);
```

---

## Automated Testing (Optional)

### Install Testing Tools

```powershell
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### Run Tests

```powershell
npm test
```

---

## Final Pre-Deployment Checklist

Before deploying to IITB or Vercel:

- [ ] All features tested and working
- [ ] No console errors
- [ ] Firebase integration working
- [ ] PWA installable
- [ ] Mobile responsive
- [ ] Performance is good
- [ ] Production build succeeds
- [ ] .env.local not committed to Git
- [ ] README updated
- [ ] Code committed to GitHub

---

## Quick Test Commands

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for outdated packages
npm outdated

# Update packages
npm update
```

---

## Testing Workflow Summary

```
1. Install Node.js
   ↓
2. Navigate to project: cd c:\Users\himan\Desktop\calender\ash
   ↓
3. Install dependencies: npm install
   ↓
4. Configure Firebase in lib/firebase.ts
   ↓
5. Start server: npm run dev
   ↓
6. Open browser: http://localhost:3000
   ↓
7. Test all features (use checklist above)
   ↓
8. Test on mobile (same WiFi)
   ↓
9. Fix any issues
   ↓
10. Build for production: npm run build
   ↓
11. Test production: npm start
   ↓
12. Ready to deploy! 🚀
```

---

## Video Walkthrough (What to See)

When everything works, you should see:

**First Load**:
1. Dark background appears
2. Header shows today's date
3. Class schedule loads (if applicable)
4. + button animates in
5. No errors in console

**Adding Event**:
1. Click + → Modal slides up
2. Fill form → No errors
3. Submit → Modal closes
4. Event appears in list
5. Smooth animations

**Real-time Sync**:
1. Open second tab
2. Both tabs show same data
3. Add in tab 1
4. Appears in tab 2 (1-2 sec)

---

## Getting Help

If you encounter issues during testing:

1. **Check Console**: F12 → Console tab
2. **Check Network**: F12 → Network tab  
3. **Check Firebase**: Firebase Console → Firestore
4. **Read Error**: Error messages are usually helpful
5. **Check Docs**: See `TROUBLESHOOTING.md`

---

## Next Steps

After successful local testing:

1. ✅ **Commit to Git**:
   ```powershell
   git add .
   git commit -m "Tested and working"
   git push origin main
   ```

2. ✅ **Deploy**: Choose your deployment option
   - IITB Mars: See `DEPLOY_IITB.md`
   - Vercel: See `DEPLOYMENT.md`

3. ✅ **Share**: Give URL to your group!

---

**Happy Testing! 🧪✨**

Remember: Test thoroughly locally before deploying!
