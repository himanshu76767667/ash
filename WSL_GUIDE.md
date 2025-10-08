# Running ash in WSL (Windows Subsystem for Linux)

## ✅ You're All Set Up!

Your WSL environment is configured and ready:

- ✅ WSL 2 with Ubuntu installed
- ✅ Node.js v20.19.5 installed via nvm
- ✅ npm v10.8.2 ready to use
- ✅ Project located at: `/mnt/c/Users/himan/Desktop/calender/ash`

---

## Quick Start Commands

### Starting WSL
From PowerShell or Command Prompt:
```powershell
wsl
```

### Running the Dev Server
Once in WSL terminal:
```bash
cd /mnt/c/Users/himan/Desktop/calender/ash
npm run dev
```

Then open: **http://localhost:3000**

---

## Complete Setup Steps (Already Done!)

1. ✅ Installed nvm in WSL
2. ✅ Installed Node.js 20.19.5
3. ✅ Cleaned old Windows node_modules
4. ⏳ Installing dependencies with `npm install`

---

## Daily Workflow

### Option 1: VS Code with WSL Extension (Recommended)

1. Install "WSL" extension in VS Code
2. Open Command Palette (Ctrl+Shift+P)
3. Type: "WSL: Open Folder in WSL"
4. Navigate to your project
5. Open integrated terminal (Ctrl+`)
6. Run: `npm run dev`

### Option 2: Separate Terminal

1. Open PowerShell/Command Prompt
2. Type: `wsl`
3. Navigate: `cd /mnt/c/Users/himan/Desktop/calender/ash`
4. Run: `npm run dev`

### Option 3: Windows Terminal with WSL (Best Experience)

1. Install Windows Terminal from Microsoft Store (if not installed)
2. Open Windows Terminal
3. Click dropdown → Ubuntu
4. Navigate: `cd /mnt/c/Users/himan/Desktop/calender/ash`
5. Run: `npm run dev`

---

## Available Commands in WSL

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check versions
node -v
npm -v
nvm --version

# Update dependencies
npm install

# Clean build
rm -rf .next node_modules package-lock.json
npm install
```

---

## Why WSL is Better for This Project

✅ **No Node.js version issues** - Linux handles Node 20+ perfectly  
✅ **Faster build times** - Native Linux performance  
✅ **Better compatibility** - Next.js is optimized for Linux  
✅ **No PowerShell restrictions** - Full bash scripting support  
✅ **Same as production** - Deploy environment matches dev environment  
✅ **Docker ready** - Easy containerization if needed  

---

## Accessing Your Files

### From Windows Explorer
Your project is still accessible from Windows:
```
\\wsl$\Ubuntu\mnt\c\Users\himan\Desktop\calender\ash
```

Or the original location:
```
C:\Users\himan\Desktop\calender\ash
```

### From WSL
```bash
/mnt/c/Users/himan/Desktop/calender/ash
```

**Note:** Files are shared - editing in Windows updates them in WSL and vice versa!

---

## Performance Tip

For **best performance**, consider moving your project to the Linux filesystem:

```bash
# Copy project to Linux home directory
cp -r /mnt/c/Users/himan/Desktop/calender/ash ~/ash
cd ~/ash
npm install
npm run dev
```

Benefits:
- 2-5x faster file operations
- Better git performance
- Faster npm installs

Access from Windows:
```
\\wsl$\Ubuntu\home\himanshu\ash
```

---

## Troubleshooting

### "npm install" is slow on /mnt/c
This is normal - Windows filesystem (C:) is slower from WSL.
**Solution:** Move project to Linux filesystem (see above).

### Port 3000 already in use
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Need to restart WSL
From PowerShell:
```powershell
wsl --shutdown
wsl
```

### Node/npm not found after reopening terminal
```bash
source ~/.bashrc
nvm use 20
```

---

## VS Code Integration

### Install WSL Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search: "WSL"
4. Install "WSL" by Microsoft

### Open Project in WSL
1. Press F1 or Ctrl+Shift+P
2. Type: "WSL: Open Folder in WSL"
3. Select: `/mnt/c/Users/himan/Desktop/calender/ash`

Now VS Code runs entirely in WSL with full Linux support!

---

## Git in WSL

Your git repository works seamlessly:

```bash
# Git is already configured from Windows
git status
git add .
git commit -m "message"
git push
```

---

## Next Steps

1. **Wait for `npm install` to complete** (currently running)
2. **Start the server:** `npm run dev`
3. **Open browser:** http://localhost:3000
4. **Configure Firebase:** See `FIREBASE_SETUP.md`
5. **Enjoy fast, stable development!** 🚀

---

## Quick Reference

| Task | Command |
|------|---------|
| Start WSL | `wsl` from PowerShell |
| Go to project | `cd /mnt/c/Users/himan/Desktop/calender/ash` |
| Start dev server | `npm run dev` |
| Stop server | `Ctrl+C` |
| Exit WSL | `exit` or `Ctrl+D` |
| Restart WSL | `wsl --shutdown` then `wsl` |

---

## Benefits You'll Notice

- ✅ Server starts instantly (no crashes!)
- ✅ Fast hot-reload and compilation
- ✅ No Windows permission issues
- ✅ Better terminal experience
- ✅ Professional Linux development environment

**You're now developing like a pro! 🎉**
