# ash - Quick Start Guide 🚀

Welcome to **ash** - your collaborative daily planner!

## ⚡ Quick Start (3 Steps)

### 1️⃣ Install Node.js
- Download from: https://nodejs.org/
- Choose the LTS version
- Restart your computer after installation

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Firebase
1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Firestore Database
4. Copy your config and update `lib/firebase.ts`

**Full Firebase setup instructions**: See `FIREBASE_SETUP.md`

## 🏃 Run the App

```bash
npm run dev
```

Open http://localhost:3000

## 📱 Key Features

- **Swipe Navigation**: Swipe left/right between days
- **Class Schedule**: Automatically shows your classes (until Nov 22, 2025)
- **Shared Deadlines**: Add deadlines that sync with your group
- **Shared Exams**: Add exams that sync with your group
- **Mark Complete**: Check off completed tasks
- **PWA**: Install on your phone like a native app

## 🎨 What You'll See

1. **Header**: Current date (e.g., "TUESDAY, 8 OCTOBER")
2. **Daily Agenda**: Today's classes and events
3. **Upcoming Deadlines**: All future deadlines, sorted by date
4. **Upcoming Exams**: All future exams, sorted by date
5. **+ Button**: Floating button to add new items

## 📖 Full Documentation

- `INSTALLATION.md` - Detailed installation guide
- `FIREBASE_SETUP.md` - Step-by-step Firebase configuration
- `README.md` - Complete project documentation

## 🎯 Class Schedule

Your hardcoded weekly schedule includes:

**Monday**: CS230, CS215, CS228, EC101  
**Tuesday**: CS228, CS230, CS215, CS231  
**Wednesday**: CS405, CS213  
**Thursday**: CS215, CS228, CS230, EC101  
**Friday**: CS405, CS213, CS293

**Note**: Classes only show until November 22, 2025

## 🔥 Tips

- **Navigation**: Swipe anywhere on the screen to change days
- **Full Names**: Tap on a class to see the full course name
- **Edit Events**: Click on any deadline/exam to edit or delete it
- **Install PWA**: Use Chrome's "Add to Home Screen" feature
- **Offline Mode**: Once installed, works without internet (after initial sync)

## 🆘 Troubleshooting

**npm not found?**
→ Install Node.js from nodejs.org

**Firebase errors?**
→ Check your config in `lib/firebase.ts`

**Events not syncing?**
→ Make sure Firestore is enabled in Firebase Console

**Can't install as PWA?**
→ Use Chrome and look for the install icon in the address bar

## 🚀 Next Steps

1. Run `npm install`
2. Set up Firebase (see `FIREBASE_SETUP.md`)
3. Run `npm run dev`
4. Open http://localhost:3000
5. Add your first deadline!
6. Install as PWA on your phone
7. Share with your group

---

**Made with ❤️ for seamless planning**

Enjoy ash! 📅✨
