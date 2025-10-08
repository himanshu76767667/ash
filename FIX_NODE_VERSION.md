# 🚨 CRITICAL FIX REQUIRED: Switch to Node.js 20 LTS

## The Problem

Your app is crashing because **Node v22.20.0** is incompatible with Next.js 14 on Windows. 
The Next.js build worker crashes with exit code `3221225477` (DLL/SWC issue).

**Current Node version:** v22.20.0 ❌  
**Required Node version:** v20.x.x ✅

---

## Quick Fix (Choose ONE option)

### ⭐ OPTION 1: Install Node 20 LTS Directly (Easiest)

1. **Download Node 20 LTS**
   - Go to: https://nodejs.org/en/download
   - Download: **20.18.0 LTS** (Windows Installer .msi, 64-bit)
   - Or direct link: https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi

2. **Run the installer**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the wizard
   - ✅ Check "Automatically install necessary tools" if prompted
   - Click "Install" (may require admin password)
   - Wait for installation to complete
   - Click "Finish"

3. **Restart your computer** (important!)

4. **Verify installation**
   - Open a **NEW** Command Prompt window
   - Run:
   ```bat
   node -v
   ```
   - Should show: `v20.18.0` or similar

5. **Continue to "After Installing Node 20" section below**

---

### OPTION 2: Use nvm-windows (For Managing Multiple Node Versions)

1. **Download nvm-windows**
   - Go to: https://github.com/coreybutler/nvm-windows/releases
   - Download: `nvm-setup.exe` (latest version)
   - Or direct link: https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe

2. **Install nvm-windows**
   - Run the downloaded `nvm-setup.exe`
   - Click "Next" through the installer
   - Choose install location (default is fine)
   - Click "Install"
   - Click "Finish"

3. **Install Node 20**
   - Open a **NEW** Command Prompt **as Administrator**
   - Run these commands:
   ```bat
   nvm install 20
   nvm use 20
   node -v
   ```
   - Should show: `v20.x.x`

4. **Continue to "After Installing Node 20" section below**

---

## After Installing Node 20

Once you have Node 20 installed and verified, run these commands:

### Step 1: Clean existing installation
```bat
cd c:\Users\himan\Desktop\calender\ash
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json
```

### Step 2: Fresh install with Node 20
```bat
npm install
```

### Step 3: Start the development server
```bat
npm run dev:cmd
```

Or use the alternative port:
```bat
npm run dev:cmd:3001
```

### Step 4: Open your browser
- Visit: http://localhost:3000
- Or: http://localhost:3001 (if you used the alternative command)

---

## Troubleshooting

### "npm is not recognized"
- Restart your Command Prompt **after installing Node**
- Or restart your computer

### Server still crashes
1. Verify Node version is 20.x:
   ```bat
   node -v
   ```
2. If still on v22, you need to restart your computer
3. Try uninstalling Node 22 first from Control Panel → Programs

### Port 3000 already in use
- Use the alternative port:
  ```bat
  npm run dev:cmd:3001
  ```

---

## Quick Test Commands

After Node 20 is installed, verify everything:

```bat
cd c:\Users\himan\Desktop\calender\ash
npm run doctor
```

Expected output:
```
v20.18.0 (or v20.x.x)
10.8.2 (or similar npm version)
14.2.33 (Next.js version)
```

---

## Why This Happens

- Node.js v22 is very new (released 2024)
- Next.js 14's SWC (Rust-based compiler) hasn't been fully tested with Node 22 on Windows
- The native binary crashes on Windows with Node 22
- Node 20 LTS is the current stable, production-ready version
- Most projects use Node 18 or 20 LTS

---

## After You Install Node 20

**Please let me know when you've:**
1. Installed Node 20
2. Verified `node -v` shows v20.x.x
3. Run `npm install` in the project folder

**Then I'll start the server for you and make sure it works!** 🚀
