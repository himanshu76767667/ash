# ash - Daily Planner & Agenda

A stunning Progressive Web App (PWA) for collaborative daily planning, combining a fixed class schedule with shared deadlines and exams.

## Features

✨ **Beautiful Dark Theme** - Vibrant colors on a sleek dark background  
📱 **Mobile-First PWA** - Install on your device, works offline  
👥 **Real-Time Collaboration** - Shared deadlines and exams via Firebase  
📅 **Class Schedule** - Hardcoded weekly timetable (until Nov 22, 2025)  
🎯 **Swipe Navigation** - Navigate between days with smooth animations  
✅ **Task Management** - Mark deadlines and exams as completed  
🚀 **Smooth Animations** - Powered by Framer Motion

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Go to Project Settings → Your apps → Web app
4. Copy your Firebase configuration
5. Update `lib/firebase.ts` with your config:

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

6. Enable Firestore Database in Firebase Console

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Deployment

### For IITB Students 🎓
Deploy to IITB's mars server for free hosting accessible on campus:
- See **[DEPLOY_IITB.md](DEPLOY_IITB.md)** for complete IITB deployment guide
- Access: `http://mars.iitb.ac.in:3000`
- Perfect for class projects and campus groups

### For Public Access 🌍
Deploy to Vercel, Netlify, or Firebase Hosting:
- See **[DEPLOYMENT.md](DEPLOYMENT.md)** for all deployment options
- See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** to choose the best option

## Install as PWA

### On Mobile (Chrome/Safari):
1. Open the app in your mobile browser
2. Tap the "Share" or "Menu" button
3. Select "Add to Home Screen"
4. The app will install and appear on your home screen

### On Desktop (Chrome):
1. Look for the install icon in the address bar
2. Click it and follow the prompts

## Features Overview

### Class Schedule
- Automatically displays your weekly class schedule
- Valid until November 22, 2025
- Vibrant colored blocks for each course
- Tap to reveal full course names

### Deadlines & Exams
- Add shared deadlines and exams
- Real-time sync across all users
- Mark items as completed
- Sorted by date in upcoming lists

### Navigation
- Swipe left/right to navigate between days
- Automatically opens to today's date
- Smooth animations and transitions

## Technology Stack

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Firebase/Firestore** - Real-time database
- **date-fns** - Date utilities
- **PWA** - Service worker for offline support

## Project Structure

```
ash/
├── components/        # React components
│   ├── ClassBlock.tsx
│   ├── EventModal.tsx
│   ├── FAB.tsx
│   └── UpcomingList.tsx
├── lib/              # Utilities and services
│   ├── firebase.ts
│   ├── eventService.ts
│   ├── schedule.ts
│   └── types.ts
├── pages/            # Next.js pages
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── public/           # Static assets
│   ├── logo.jpg
│   ├── manifest.json
│   └── service-worker.js
└── styles/           # Global styles
    └── globals.css
```

## License

MIT
