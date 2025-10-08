# 📂 Complete Folder Structure

## Visual Tree

```
ash/
│
├── 📄 Configuration Files
│   ├── package.json              # NPM dependencies & scripts
│   ├── tsconfig.json            # TypeScript compiler settings
│   ├── next.config.js           # Next.js configuration
│   ├── tailwind.config.js       # Tailwind CSS customization
│   ├── postcss.config.js        # PostCSS configuration
│   ├── .gitignore              # Git ignore rules
│   └── .env.example            # Environment variables template
│
├── 📚 Documentation (READ THESE!)
│   ├── QUICKSTART.md           # ⭐ START HERE - Quick setup guide
│   ├── PROJECT_SUMMARY.md      # Complete project overview
│   ├── README.md               # Main documentation
│   ├── INSTALLATION.md         # Detailed installation guide
│   ├── FIREBASE_SETUP.md       # Step-by-step Firebase config
│   ├── DEPLOYMENT.md           # Production deployment guide
│   ├── TROUBLESHOOTING.md      # Fix common issues
│   ├── USER_MANUAL.md          # Visual guide & usage
│   └── FOLDER_STRUCTURE.md     # This file!
│
├── 📱 Public Assets
│   └── public/
│       ├── logo.jpg            # Your app icon
│       ├── manifest.json       # PWA manifest (app metadata)
│       └── service-worker.js   # Service worker (offline support)
│
├── 🎨 Styles
│   └── styles/
│       └── globals.css         # Global CSS & animations
│
├── 📄 Pages (Next.js Routes)
│   └── pages/
│       ├── _app.tsx            # App wrapper, service worker registration
│       ├── _document.tsx       # HTML document structure
│       └── index.tsx           # Main page (Daily Agenda View)
│
├── 🧩 Components (React UI Components)
│   └── components/
│       ├── ClassBlock.tsx      # Display class & event blocks
│       ├── EventModal.tsx      # Full-screen add/edit modal
│       ├── FAB.tsx             # Floating Action Button (+)
│       └── UpcomingList.tsx    # Upcoming deadlines/exams lists
│
├── 🔧 Library (Backend Logic)
│   └── lib/
│       ├── firebase.ts         # Firebase initialization & config
│       ├── firebase-config-example.ts  # Config template
│       ├── eventService.ts     # CRUD operations for events
│       ├── schedule.ts         # Hardcoded class schedule
│       └── types.ts            # TypeScript type definitions
│
├── 📦 Generated/Ignored (Created by tools)
│   ├── node_modules/           # Installed dependencies (gitignored)
│   ├── .next/                  # Next.js build output (gitignored)
│   ├── .git/                   # Git repository data
│   └── .env.local             # Your Firebase config (gitignored)
│
└── 📊 This structure represents a complete Next.js PWA!
```

---

## File Details

### Configuration Files

#### `package.json`
```json
Purpose: Lists all dependencies & scripts
Key Dependencies:
  - next: React framework
  - react: UI library
  - framer-motion: Animations
  - firebase: Backend database
  - date-fns: Date utilities
  - tailwindcss: Styling
Scripts:
  - npm run dev: Start development server
  - npm run build: Build for production
  - npm start: Start production server
```

#### `tsconfig.json`
```json
Purpose: TypeScript compiler configuration
Key Settings:
  - strict: true (type safety)
  - jsx: preserve (for Next.js)
  - paths: @/* aliases
```

#### `next.config.js`
```javascript
Purpose: Next.js framework configuration
Settings:
  - reactStrictMode: Helps find bugs
  - swcMinify: Faster builds
```

#### `tailwind.config.js`
```javascript
Purpose: Tailwind CSS customization
Custom Colors:
  - background: #10111A
  - primary: #A855F7
  - accent-lime: #84CC16
  - accent-pink: #EC4899
  - accent-orange: #FB923C
```

---

### Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| `QUICKSTART.md` | Fast 3-step setup | **Read first!** |
| `PROJECT_SUMMARY.md` | Complete overview | To understand project |
| `README.md` | Technical docs | Reference |
| `INSTALLATION.md` | Detailed setup | If issues with install |
| `FIREBASE_SETUP.md` | Firebase guide | Before running app |
| `DEPLOYMENT.md` | Go to production | When ready to deploy |
| `TROUBLESHOOTING.md` | Fix issues | When errors occur |
| `USER_MANUAL.md` | Usage guide | To understand features |

---

### Public Assets

#### `public/logo.jpg`
- Your app icon
- Used in PWA manifest
- Shows on home screen when installed

#### `public/manifest.json`
```json
{
  "name": "ash",
  "short_name": "ash",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#A855F7",
  "background_color": "#10111A",
  "icons": [...]
}
```

#### `public/service-worker.js`
- Enables offline functionality
- Caches app shell for fast loading
- Required for PWA installation

---

### Pages

#### `pages/_app.tsx`
**Purpose**: App wrapper
**Key Functions**:
- Registers service worker
- Wraps all pages
- Sets up PWA metadata

#### `pages/_document.tsx`
**Purpose**: HTML document structure
**Key Functions**:
- Sets up HTML boilerplate
- Custom document modifications

#### `pages/index.tsx` ⭐ MAIN PAGE
**Purpose**: Daily agenda view
**Key Features**:
- Displays current date
- Shows class schedule
- Shows events for selected day
- Swipe navigation
- Upcoming lists
- FAB button

**State Management**:
- currentDate: Currently viewed date
- events: All events from Firebase
- isModalOpen: Modal visibility
- editingEvent: Event being edited

---

### Components

#### `components/ClassBlock.tsx`
**Purpose**: Display individual class or event
**Props**:
- item: ClassSession or UserEvent

**Features**:
- Color-coded left border
- Tap to reveal full course name
- Different styling for classes vs events

#### `components/EventModal.tsx`
**Purpose**: Add/edit deadline or exam
**Props**:
- event: Event to edit (null if adding new)
- onClose: Function to close modal

**Features**:
- Full-screen modal
- Type toggle (Deadline/Exam)
- Form inputs
- Date/time pickers
- Save & Delete buttons
- Firebase integration

#### `components/FAB.tsx`
**Purpose**: Floating action button
**Props**:
- onClick: Function when clicked

**Features**:
- Fixed position (bottom-right)
- Gradient background
- Smooth animations
- Opens EventModal

#### `components/UpcomingList.tsx`
**Purpose**: Display list of deadlines or exams
**Props**:
- title: "Upcoming Deadlines" or "Upcoming Exams"
- items: Array of UserEvents
- onItemClick: Function when item clicked

**Features**:
- Checkboxes for completion
- Click to edit
- Sorted by date
- Real-time updates

---

### Library (Business Logic)

#### `lib/firebase.ts` 🔥
**Purpose**: Firebase initialization
**What to do**: 
1. Get config from Firebase Console
2. Replace placeholder values
3. Keep this file secure

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",        // ← Replace these!
  authDomain: "...",
  projectId: "...",
  // ...
};
```

#### `lib/eventService.ts`
**Purpose**: CRUD operations for events
**Exported Functions**:
- `createEvent(event)`: Add new event
- `updateEvent(id, updates)`: Edit event
- `deleteEvent(id)`: Remove event
- `subscribeToEvents(callback)`: Real-time sync

**Firebase Collection**: `events`

#### `lib/schedule.ts`
**Purpose**: Hardcoded class schedule
**Key Exports**:
- `weekSchedule`: Weekly class data
- `getDaySchedule(date)`: Get classes for a date
- `SCHEDULE_END_DATE`: Nov 22, 2025

**Data Structure**:
```typescript
{
  Monday: {
    "09:30": { courseCode, courseName, classroom, time, color },
    "10:30": { ... },
    ...
  },
  Tuesday: { ... },
  ...
}
```

#### `lib/types.ts`
**Purpose**: TypeScript type definitions
**Key Types**:
- `ClassSession`: Individual class
- `UserEvent`: Deadline or exam
- `WeekSchedule`: Weekly schedule structure

**Exported Data**:
- `courseColors`: Color mapping for courses
- `courseNames`: Full course names

---

## Data Flow

### Adding a New Event

```
User clicks + FAB
      ↓
FAB.tsx triggers onClick
      ↓
index.tsx opens EventModal
      ↓
User fills form in EventModal.tsx
      ↓
EventModal calls createEvent()
      ↓
eventService.ts → Firebase
      ↓
Firebase Firestore stores data
      ↓
subscribeToEvents() detects change
      ↓
index.tsx updates events state
      ↓
UpcomingList.tsx re-renders
      ↓
All users see new event! ✨
```

### Loading Daily View

```
App opens to index.tsx
      ↓
useEffect sets currentDate = today
      ↓
getDaySchedule(currentDate)
      ↓
schedule.ts returns classes
      ↓
subscribeToEvents() fetches events
      ↓
Filter events for currentDate
      ↓
Combine classes + events
      ↓
Sort by time
      ↓
ClassBlock.tsx renders each item
```

---

## Import Paths

The project uses TypeScript path aliases:

```typescript
// @ refers to project root
import { UserEvent } from '@/lib/types';
import ClassBlock from '@/components/ClassBlock';
import '@/styles/globals.css';

// Configured in tsconfig.json:
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

---

## Build Output

When you run `npm run build`:

```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
│   └── pages/         # Pre-rendered pages
├── static/             # Static assets
│   ├── chunks/        # JavaScript bundles
│   └── css/           # Compiled CSS
└── BUILD_ID           # Build identifier
```

---

## Dependencies Overview

### Production Dependencies
```
next                    # React framework
react                   # UI library
react-dom              # React DOM renderer
framer-motion          # Animations
date-fns               # Date utilities
firebase               # Backend database
```

### Development Dependencies
```
typescript             # Type safety
@types/node           # Node.js types
@types/react          # React types
tailwindcss           # CSS framework
postcss               # CSS processing
autoprefixer          # CSS vendor prefixes
```

---

## Environment Variables

### Required (for Firebase)
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### File Locations
- Development: `.env.local` (gitignored)
- Template: `.env.example` (committed)
- Production: Set in hosting platform (Vercel/Netlify)

---

## Git Structure

### Tracked Files (Committed)
- Source code (`.ts`, `.tsx`, `.css`)
- Configuration files
- Documentation
- Public assets
- `package.json`

### Ignored Files (Not Committed)
- `node_modules/` - Dependencies
- `.next/` - Build output
- `.env.local` - Secrets
- `*.log` - Log files

### See `.gitignore` for complete list

---

## Key Files to Customize

When adapting for your needs:

| File | What to Change |
|------|----------------|
| `lib/firebase.ts` | Firebase config |
| `lib/schedule.ts` | Class schedule |
| `lib/types.ts` | Course colors/names |
| `public/manifest.json` | App name/colors |
| `tailwind.config.js` | Theme colors |

---

## File Size Reference

Approximate sizes:

```
Small Files (<100 lines):
- Configuration files
- FAB.tsx
- types.ts

Medium Files (100-300 lines):
- ClassBlock.tsx
- UpcomingList.tsx
- EventModal.tsx
- schedule.ts

Large Files (300+ lines):
- index.tsx (main page)
- Documentation files
```

---

## Development Workflow

```
1. Edit source files
   ↓
2. Next.js auto-reloads (Hot Module Replacement)
   ↓
3. See changes instantly in browser
   ↓
4. Check console for errors
   ↓
5. Commit when working
   ↓
6. Push to GitHub
   ↓
7. Deploy to Vercel (auto-deploys)
```

---

## Folder Permissions

All files should have:
- Read ✅
- Write ✅ (for source files)
- Execute ❌ (except scripts)

No special permissions needed for development.

---

## What NOT to Edit

⚠️ **Don't modify these**:
- `node_modules/` - Managed by npm
- `.next/` - Build output
- `package-lock.json` - Managed by npm
- Hidden `.git/` - Git internals

✅ **Safe to edit**:
- All source files
- Configuration files
- Documentation
- Public assets

---

## Folder Size Estimates

After `npm install`:
```
node_modules/    ~500 MB    (largest)
.next/           ~50 MB     (after build)
public/          ~1 MB      (your assets)
components/      ~50 KB
lib/             ~30 KB
pages/           ~20 KB
styles/          ~5 KB
```

**Total project**: ~550 MB with dependencies

---

## Quick Navigation

**Finding files quickly**:

```bash
# Search for a string in files
findstr /s "ClassBlock" *.tsx

# List all TypeScript files
dir /s *.tsx

# Find file by name
dir /s schedule.ts
```

Or use VS Code search (Ctrl+Shift+F)

---

## Backup Recommendations

**Critical files to backup**:
1. `.env.local` (Firebase config)
2. Source code (entire project)
3. `logo.jpg` (your icon)

**Use Git**:
```bash
git add .
git commit -m "Backup"
git push origin main
```

---

**That's the complete folder structure! 📂✨**

For setup help, see `QUICKSTART.md`
For understanding code, explore files in order:
1. `lib/types.ts` (understand data)
2. `lib/schedule.ts` (see schedule)
3. `components/` (UI pieces)
4. `pages/index.tsx` (main page)
