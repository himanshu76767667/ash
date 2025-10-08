# Firebase Setup Guide for ash

## Step-by-Step Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `ash` (or any name you prefer)
4. Click "Continue"
5. Disable Google Analytics (optional, not needed for this app)
6. Click "Create project"
7. Wait for setup to complete, then click "Continue"

### 2. Register Your Web App

1. In your Firebase project dashboard, click the **Web** icon (`</>`)
2. Register app with nickname: `ash-web`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. **Copy the firebaseConfig object** - you'll need this!

### 3. Enable Firestore Database

1. In the left sidebar, click "Build" → "Firestore Database"
2. Click "Create database"
3. Choose "Start in **test mode**" (for development)
   - **Important**: For production, set up proper security rules
4. Select a Cloud Firestore location (choose closest to your users)
5. Click "Enable"

### 4. Configure Security Rules (Important!)

In the Firestore Database → Rules tab, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to all events
    match /events/{eventId} {
      allow read, write: if true;
    }
  }
}
```

**Note**: These rules allow anyone to read/write. For production, implement proper authentication.

### 5. Update Your App Configuration

1. Open `lib/firebase.ts` in your project
2. Replace the placeholder config with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "AIza...",              // From Firebase Console
  authDomain: "ash-xxx.firebaseapp.com",
  projectId: "ash-xxx",
  storageBucket: "ash-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

### 6. Test the Connection

1. Run `npm run dev`
2. Open the app in your browser
3. Try adding a deadline or exam
4. Check Firebase Console → Firestore Database
5. You should see a new collection called `events` with your data

## Firestore Data Structure

The app uses a single collection called `events`:

```
events/
  └── {eventId}/
      ├── type: "deadline" | "exam"
      ├── courseCode: string
      ├── title: string
      ├── date: string (ISO format)
      ├── time: string (HH:MM format)
      ├── completed: boolean
      └── createdAt: number (timestamp)
```

## Optional: Set Up Firebase Authentication

For production, you should add user authentication:

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable sign-in methods (Email/Password, Google, etc.)
4. Update the app to require authentication
5. Update Firestore security rules to validate authenticated users

## Troubleshooting

### Issue: "Permission denied" errors
- Check Firestore security rules are set to test mode
- Verify your Firebase config is correct

### Issue: Events not syncing
- Open browser console and check for errors
- Verify Firestore is enabled
- Check network tab for failed requests

### Issue: App won't load
- Verify all Firebase config values are correct
- Make sure you've run `npm install`
- Check for any console errors

## Production Deployment

Before deploying to production:

1. ✅ Enable Firebase Authentication
2. ✅ Update Firestore security rules
3. ✅ Add user-based access control
4. ✅ Set up proper error handling
5. ✅ Configure environment variables
6. ✅ Test thoroughly on multiple devices

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
