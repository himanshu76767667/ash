# Easy Start Guide for Windows

## After You Install Node 20

Once you have Node 20 LTS installed, here's the easiest way to start your app:

### Option 1: Double-Click Files (Easiest!)

Just double-click these files from Windows Explorer:

1. **check-node.cmd** - Verify your Node version is compatible
2. **setup-and-start.cmd** - Automatically install dependencies and start server

That's it! The server will start automatically.

---

### Option 2: Using File Explorer

1. Open File Explorer
2. Navigate to: `c:\Users\himan\Desktop\calender\ash`
3. Double-click: **setup-and-start.cmd**
4. Wait for installation and server to start
5. Open browser to: http://localhost:3000

---

### Option 3: Using Command Prompt

1. Press `Win + R`
2. Type: `cmd`
3. Press Enter
4. Run these commands:

```bat
cd c:\Users\himan\Desktop\calender\ash
setup-and-start.cmd
```

---

### Option 4: Manual Commands

If you prefer to run each step manually:

```bat
cd c:\Users\himan\Desktop\calender\ash
check-node.cmd
rmdir /s /q node_modules .next
del package-lock.json
npm install
npm run dev:cmd
```

---

## Troubleshooting

### "Server stopped" or crashes immediately
- **Check Node version:** Run `check-node.cmd`
- **Must be v20.x.x or v18.x.x**
- If v22.x.x, install Node 20 LTS first (see FIX_NODE_VERSION.md)

### Port 3000 already in use
Try the alternative port:
```bat
npm run dev:cmd:3001
```
Then open: http://localhost:3001

### "npm is not recognized"
- Restart Command Prompt after installing Node
- Or restart your computer

---

## Creating a Desktop Shortcut

To create a shortcut on your desktop:

1. Right-click on **setup-and-start.cmd**
2. Select "Send to" → "Desktop (create shortcut)"
3. Now you can start the app from your desktop!

---

## What Each File Does

- **check-node.cmd** - Verifies your Node version is compatible
- **setup-and-start.cmd** - Full automated setup and start (recommended)
- **run-server.cmd** - Just starts the server (no cleanup/reinstall)
- **start-dev.bat** - Alternative startup script
- **FIX_NODE_VERSION.md** - Detailed guide for fixing Node version issues

---

## First Time Setup Checklist

- [ ] Install Node 20 LTS from https://nodejs.org/en/download
- [ ] Restart computer
- [ ] Run `check-node.cmd` to verify
- [ ] Double-click `setup-and-start.cmd`
- [ ] Wait for "Server will be available at http://localhost:3000"
- [ ] Open browser to http://localhost:3000
- [ ] Configure Firebase (see FIREBASE_SETUP.md)

---

## Need Help?

1. **Node version issues:** See FIX_NODE_VERSION.md
2. **Firebase setup:** See FIREBASE_SETUP.md
3. **Complete guide:** See QUICKSTART.md
4. **All documentation:** See START_HERE.md
