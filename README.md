# 📅 ash - Daily Agenda & Planner

A visually stunning, mobile-first Progressive Web App (PWA) for managing your daily schedule, deadlines, and exams.

## ✨ Features

- 📱 **Mobile-First Design** - Optimized for touch interactions
- 🎨 **Beautiful UI** - Glassmorphism, smooth animations, and gradient effects
- 📆 **Daily Agenda** - View your classes and events by day
- ✅ **Task Management** - Mark deadlines and exams as complete (locally)
- 🔄 **Pull to Refresh** - Quick navigation back to today
- 👆 **Swipe Navigation** - Intuitive day-to-day browsing
- 🔔 **Event Types** - Separate colors for classes, deadlines, and exams
- 📲 **PWA Support** - Install to home screen for full-screen experience
- 🔥 **Firebase Sync** - Share events across all users

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x (LTS)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Firestore Database
3. Copy your Firebase config to `lib/firebase.ts`

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 📱 PWA Installation

### On Mobile (iOS/Android)

1. Open the app in your browser
2. Tap the share button (iOS) or menu (Android)
3. Select "Add to Home Screen"
4. **The app will open in full-screen mode like a native app!**

### On Desktop

1. Open the app in Chrome/Edge
2. Click the install icon in the address bar
3. Click "Install"

## 🎨 Color Scheme

- **Classes**: Purple (#A855F7)
- **Deadlines**: Blue (#3B82F6)
- **Exams**: Red (#EF4444)
- **Background**: Dark (#10111A)

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **UI**: React 18 + Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Date Handling**: date-fns
- **PWA**: Service Worker + Web Manifest

## 📄 License

MIT

---

Made with ❤️ for IITB students
