# ✅ Pre-Launch Checklist - ash PWA

## 🎯 Quick Start Guide

### Before You Start
1. **Node.js Version**: Ensure you have Node.js 20.x or 18.x installed
   - Check: `node -v`
   - If wrong version, download from: https://nodejs.org

2. **Run Verification Script**:
   ```cmd
   verify-setup.cmd
   ```
   This will check everything automatically!

### Start Development Server

```bash
# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔍 Manual Verification Checklist

### ✅ 1. Dependencies Installed
- [ ] `node_modules/` folder exists
- [ ] Run `npm install` if missing

### ✅ 2. PWA Configuration
- [x] `public/manifest.json` configured for standalone mode
- [x] `public/service-worker.js` present
- [x] `pages/_document.tsx` has PWA meta tags
- [x] `public/logo.jpg` exists

**PWA Settings:**
- Display mode: `standalone` (opens full-screen, not in browser)
- Theme color: `#A855F7` (purple)
- Orientation: `portrait-primary`
- Apple mobile web app capable: `yes`

### ✅ 3. Core Files Present
- [x] `pages/index.tsx` - Main page
- [x] `pages/_app.tsx` - App wrapper
- [x] `pages/_document.tsx` - HTML document
- [x] `components/ClassBlock.tsx` - Class/event cards
- [x] `components/EventModal.tsx` - Add/edit modal
- [x] `components/FAB.tsx` - Floating action button
- [x] `components/UpcomingList.tsx` - Event lists
- [x] `lib/firebase.ts` - Firebase config
- [x] `lib/eventService.ts` - Event CRUD operations
- [x] `lib/schedule.ts` - Class schedule
- [x] `lib/types.ts` - TypeScript types

### ✅ 4. Configuration Files
- [x] `package.json` - Dependencies and scripts
- [x] `tsconfig.json` - TypeScript config
- [x] `next.config.js` - Next.js config
- [x] `tailwind.config.js` - Tailwind config
- [x] `postcss.config.js` - PostCSS config

### ✅ 5. Clean Project (No Clutter)
- [x] Old documentation files removed
- [x] Helper scripts removed
- [x] Only essential files remain:
  - `README.md` - Main documentation
  - `FIREBASE_SETUP.md` - Firebase configuration guide

---

## 🧪 Testing Checklist

### Local Testing

#### 1. Development Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] Opens at http://localhost:3000
- [ ] Page loads correctly
- [ ] No console errors

#### 2. Visual Elements
- [ ] Background gradient animations visible
- [ ] Header displays current date
- [ ] Pull-to-refresh indicator works
- [ ] Swipe navigation works (left/right)
- [ ] Cards have glassmorphism effects
- [ ] Animations are smooth
- [ ] FAB button rotates and pulses

#### 3. Functionality
- [ ] Can add new deadline
- [ ] Can add new exam
- [ ] Can edit existing event
- [ ] Can delete event
- [ ] Can mark event as complete (checkbox)
- [ ] Completion state persists (localStorage)
- [ ] Completed items fade out
- [ ] Edit button appears on events
- [ ] Modal opens/closes smoothly

#### 4. Swipe & Navigation
- [ ] Swipe left shows next day
- [ ] Swipe right shows previous day
- [ ] Pull down shows refresh indicator
- [ ] Release after pull goes to today
- [ ] "Today" button appears when not on current date
- [ ] Clicking "Today" button returns to current date

#### 5. PWA Features (in browser first)
- [ ] Can open dev tools (F12) without errors
- [ ] Service worker registers
- [ ] Manifest loads correctly

### Production Build Testing
```bash
npm run build
npm start
```
- [ ] Build completes without errors
- [ ] Production server starts
- [ ] All features work in production mode

---

## 📲 PWA Installation Testing

### On Mobile (iOS)
1. [ ] Open http://localhost:3000 (or deployed URL) in Safari
2. [ ] Tap Share button
3. [ ] Tap "Add to Home Screen"
4. [ ] App icon appears on home screen
5. [ ] Tap icon - app opens **full-screen** (no browser UI)
6. [ ] Status bar color is purple (#A855F7)
7. [ ] App works offline after first load

### On Mobile (Android)
1. [ ] Open app URL in Chrome
2. [ ] See "Install app" banner or tap menu → "Install app"
3. [ ] Confirm installation
4. [ ] App icon appears in app drawer
5. [ ] Tap icon - app opens **full-screen** (no browser UI)
6. [ ] Theme color is purple
7. [ ] App works offline

### On Desktop
1. [ ] Open app in Chrome/Edge
2. [ ] Look for install icon in address bar (⊕ or computer icon)
3. [ ] Click install
4. [ ] App opens in separate window
5. [ ] No browser UI visible
6. [ ] Works like native app

---

## 🔥 Firebase Setup (Required for Events)

If you haven't set up Firebase yet:

1. [ ] Go to [Firebase Console](https://console.firebase.google.com/)
2. [ ] Create new project or use existing
3. [ ] Enable Firestore Database
4. [ ] Go to Project Settings → Your apps → Web
5. [ ] Copy configuration
6. [ ] Update `lib/firebase.ts` with your config
7. [ ] Test: Add an event and verify it appears after refresh

See `FIREBASE_SETUP.md` for detailed instructions.

---

## 🎨 Visual Quality Check

### Design Elements
- [ ] All class blocks are purple (#A855F7)
- [ ] Deadline blocks are blue (#3B82F6)
- [ ] Exam blocks are red (#EF4444)
- [ ] Cards have left border accent (4px)
- [ ] Cards have subtle shadows
- [ ] Hover effects work (scale up + lift)
- [ ] Glassmorphism backgrounds visible
- [ ] Gradient text in headers
- [ ] Icons display correctly (time, location, edit)
- [ ] Empty state shows animated emoji

### Animations
- [ ] Cards stagger on load (0.05s delay each)
- [ ] FAB entrance rotates from -180°
- [ ] Modal slides up from bottom
- [ ] Pull indicator appears on pull
- [ ] Swipe transitions are smooth
- [ ] Completed items fade smoothly
- [ ] Background orbs pulse continuously
- [ ] Edit button rotates on hover

---

## 🐛 Common Issues & Fixes

### Issue: ERR_CONNECTION_REFUSED
**Cause**: Wrong Node.js version  
**Fix**: 
```bash
node -v  # Check version
# If v22.x or higher, install Node 20 LTS
```

### Issue: Module not found errors
**Cause**: Dependencies not installed  
**Fix**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
**Cause**: Type checking issues  
**Fix**: Already configured with `strict: false` in tsconfig.json

### Issue: Port 3000 already in use
**Fix**:
```bash
npm run dev:3001  # Uses port 3001 instead
```

### Issue: PWA not installing
**Cause**: HTTPS required (except localhost)  
**Fix**: Deploy to Vercel/Netlify or use localhost

### Issue: Service worker not updating
**Fix**: 
1. Open DevTools (F12)
2. Application tab → Service Workers
3. Click "Unregister"
4. Refresh page

---

## 🚀 Deployment Readiness

### Before Deploying
- [ ] Firebase configured with real credentials
- [ ] All features tested locally
- [ ] PWA installs correctly
- [ ] No console errors
- [ ] Build completes: `npm run build`
- [ ] Production mode works: `npm start`

### Recommended Platforms
1. **Vercel** (easiest for Next.js)
2. **Netlify**
3. **Firebase Hosting**
4. **Render**
5. **Railway**

---

## ✨ Ready to Launch!

If all checkboxes above are ticked, your app is **production-ready**!

### Final Steps:
1. Run `verify-setup.cmd` one more time
2. Start dev server: `npm run dev`
3. Test all features
4. Build for production: `npm run build`
5. Deploy! 🚀

---

**Need help?** Check `README.md` and `FIREBASE_SETUP.md`
