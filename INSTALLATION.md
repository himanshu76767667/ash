# Installation & Setup Guide for ash

## Prerequisites

Before you begin, you need to install **Node.js** which includes **npm** (Node Package Manager).

### Step 1: Install Node.js

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version for Windows
3. Run the installer
4. Follow the installation wizard (use default settings)
5. Restart your computer after installation

### Step 2: Verify Installation

Open PowerShell or Command Prompt and run:

```bash
node --version
npm --version
```

You should see version numbers (e.g., v20.x.x and 10.x.x).

## Project Setup

### Step 3: Install Dependencies

Navigate to the project folder and install dependencies:

```bash
cd c:\Users\himan\Desktop\calender\ash
npm install
```

This will install all required packages:
- Next.js (React framework)
- React & React DOM
- Framer Motion (animations)
- Firebase (backend database)
- date-fns (date utilities)
- TypeScript
- Tailwind CSS

**Note**: Installation may take 5-10 minutes depending on your internet speed.

### Step 4: Configure Firebase

1. Follow the instructions in `FIREBASE_SETUP.md`
2. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
3. Copy your Firebase configuration
4. Update `lib/firebase.ts` with your config

### Step 5: Run Development Server

```bash
npm run dev
```

The app will start at [http://localhost:3000](http://localhost:3000)

### Step 6: Test the App

1. Open [http://localhost:3000](http://localhost:3000) in Chrome
2. Swipe left/right to navigate between days
3. Click the + button to add a deadline or exam
4. Check Firebase Console to see data sync

## Building for Production

```bash
npm run build
npm start
```

## Installing as PWA

### On Mobile (Android/iPhone):

**Chrome (Android):**
1. Open the app in Chrome
2. Tap the menu (3 dots)
3. Tap "Add to Home screen"
4. Name it "ash" and tap "Add"

**Safari (iPhone):**
1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Name it "ash" and tap "Add"

### On Desktop (Chrome):

1. Open the app in Chrome
2. Look for the install icon (⊕) in the address bar
3. Click it
4. Click "Install"

The app will now:
- ✅ Work offline
- ✅ Load instantly
- ✅ Look like a native app
- ✅ Sync data in real-time

## Troubleshooting

### "npm is not recognized"
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your computer
- Verify with `node --version`

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` folder and `.next` folder
- Run `npm install` again

### Firebase errors
- Check `lib/firebase.ts` configuration
- Verify Firestore is enabled in Firebase Console
- Check security rules are set to test mode

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check that you're using Node.js version 18 or higher
- Delete `.next` folder and run `npm run dev` again

### App not installing as PWA
- Must be served over HTTPS (localhost is OK for testing)
- Check manifest.json is accessible at `/manifest.json`
- Verify service worker is registered (check browser console)

## Features Checklist

After setup, verify these features work:

- [x] App opens to today's date
- [x] Swipe left/right to navigate days
- [x] Classes appear with correct times and colors
- [x] Tap class blocks to reveal full course names
- [x] Click + button to add deadline/exam
- [x] Fill out form and save event
- [x] Event appears in upcoming list
- [x] Check checkbox to mark complete
- [x] Edit event by clicking it
- [x] Delete event from edit modal
- [x] Data syncs across multiple browser tabs/devices
- [x] Smooth animations on all interactions
- [x] Dark theme with vibrant colors
- [x] Installable as PWA

## Project Structure Overview

```
ash/
├── components/           # React components
│   ├── ClassBlock.tsx   # Display class/event blocks
│   ├── EventModal.tsx   # Add/edit modal
│   ├── FAB.tsx          # Floating action button
│   └── UpcomingList.tsx # Upcoming deadlines/exams
├── lib/                 # Business logic
│   ├── firebase.ts      # Firebase config
│   ├── eventService.ts  # CRUD operations
│   ├── schedule.ts      # Class schedule data
│   └── types.ts         # TypeScript types
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper
│   ├── _document.tsx    # HTML document
│   └── index.tsx        # Main page
├── public/              # Static files
│   ├── logo.jpg         # App icon
│   ├── manifest.json    # PWA manifest
│   └── service-worker.js # Offline support
├── styles/
│   └── globals.css      # Global styles
└── package.json         # Dependencies
```

## Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Set up Firebase (see `FIREBASE_SETUP.md`)
4. ✅ Run `npm run dev`
5. ✅ Test all features
6. ✅ Install as PWA on your phone
7. ✅ Share with your group!

## Support

If you encounter any issues:

1. Check the console in your browser (F12 → Console tab)
2. Read the error messages carefully
3. Verify Firebase configuration
4. Ensure all dependencies are installed
5. Check that Node.js version is 18 or higher

---

**Enjoy using ash! 🚀**
