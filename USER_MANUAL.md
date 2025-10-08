# 📱 ash - Visual Guide & User Manual

## App Overview

```
┌─────────────────────────────────────┐
│  📅 TUESDAY, 8 OCTOBER             │  ← Header (current date)
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐  │
│  │ CS228 | LA001         08:30 │  │  ← Class Block
│  │ Data Structures Lab         │  │    (tap to see full name)
│  └─────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ CS230 | LH102         10:30 │  │  ← Another Class
│  └─────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ 📝 DEADLINE                 │  │  ← Deadline Event
│  │ Assignment 3                │  │
│  │ CS230              14:00    │  │
│  └─────────────────────────────┘  │
│                                     │
│  ← Swipe left for next day         │
│  → Swipe right for previous day    │
│                                     │
├─────────────────────────────────────┤
│  UPCOMING DEADLINES                 │  ← Upcoming Lists
│  ☐ Assignment 3 - CS230             │    (check to complete)
│  ☐ Project Report - CS213           │
│                                     │
│  UPCOMING EXAMS                     │
│  ☐ Midterm - CS228                 │
│  ☐ Final - EC101                   │
└─────────────────────────────────────┘
              ┌───┐
              │ + │  ← FAB (Floating Action Button)
              └───┘    Click to add event
```

---

## 🎯 Main Features

### 1. Daily View

**What it shows:**
- Current date in header
- All classes for that day
- All deadlines/exams due that day
- Sorted by time (earliest first)

**How to use:**
- **Swipe left**: See tomorrow
- **Swipe right**: See yesterday
- **Tap class**: Reveal full course name
- **Tap event**: Edit or delete

**Colors:**
- 🟢 Lime: CS230, CS231
- 💗 Pink: CS215, CS405
- 💜 Purple: CS228, CS293
- 🟠 Orange: EC101, CS213

---

### 2. Class Schedule

**Your Weekly Schedule:**

```
MONDAY
09:30  CS230  LH102  Data Structures
10:30  CS215  LA002  Computer Organization
11:30  CS228  LA001  DS Lab
15:30  EC101  LA001  Economics

TUESDAY
08:30  CS228  LA001  DS Lab
10:30  CS230  LH102  Data Structures
11:30  CS215  LA002  Computer Organization
14:00  CS231  SL2    OS Lab

WEDNESDAY
09:30  CS405  LA002  Computer Networks
11:00  CS213  LA002  Database Systems

THURSDAY
08:30  CS215  LA002  Computer Organization
09:30  CS228  LA001  DS Lab
11:30  CS230  LH102  Data Structures
15:30  EC101  LA001  Economics

FRIDAY
09:30  CS405  LA002  Computer Networks
11:00  CS213  LA002  Database Systems
14:00  CS293  SL2    Software Engineering Lab

SATURDAY & SUNDAY
No classes
```

**Important:** Schedule only shows until November 22, 2025

---

### 3. Adding Events

**Step-by-step:**

```
1. Click the + button (bottom right)
   ↓
2. Modal opens
   ↓
3. Choose type:
   [Deadline] or [Exam]
   ↓
4. Enter course code:
   e.g., "CS230"
   ↓
5. Enter title:
   e.g., "Assignment 3"
   ↓
6. Pick date:
   [📅 Date Picker]
   ↓
7. Pick time:
   [🕐 Time Picker]
   ↓
8. Click "Add Event"
   ↓
9. ✅ Syncs to all users instantly!
```

**Example Event:**
- Type: Deadline
- Course: CS230
- Title: Assignment 3
- Date: October 15, 2025
- Time: 23:59

---

### 4. Editing/Deleting Events

```
1. Find event in Upcoming List
   ↓
2. Click on the event
   ↓
3. Modal opens with current data
   ↓
4. Option A: Edit
   - Change any field
   - Click "Save Changes"
   ↓
5. Option B: Delete
   - Click red "Delete" button
   - Event removed for everyone
```

---

### 5. Marking Complete

```
☐  Assignment 3 - CS230     ← Click checkbox
   ↓
✅ Assignment 3 - CS230     ← Marked complete
   ↓
   Grayed out + strikethrough
   Still visible but clearly done
```

**Note:** Complete status syncs across all users

---

## 🎨 Visual Elements

### Class Block Example

```
┌─────────────────────────────────┐
│ CS230                    09:30  │  ← Course Code + Time
│ Data Structures                 │  ← Full Name (on tap)
│ LH102                           │  ← Classroom
└─────────────────────────────────┘
  ← Colored left border (lime green)
```

### Deadline Block Example

```
┌─────────────────────────────────┐
│ 📝 DEADLINE              14:00  │  ← Type + Time
│ Assignment 3                    │  ← Title
│ CS230                           │  ← Course
└─────────────────────────────────┘
  ← Purple gradient background
```

### Upcoming List Item Example

```
┌─────────────────────────────────┐
│ ☐  Assignment 3                 │  ← Checkbox + Title
│    CS230                        │  ← Course
│    Oct 15, 2025 at 23:59       │  ← Due date
└─────────────────────────────────┘
```

---

## 🔄 Real-Time Sync Flow

```
User A adds deadline
       ↓
   Firebase Firestore
       ↓
   ┌────────────────┐
   ↓                ↓
User B's app    User C's app
   ↓                ↓
Deadline appears instantly!
```

**What syncs:**
- ✅ New events
- ✅ Edited events
- ✅ Deleted events
- ✅ Completion status

**What doesn't sync:**
- ❌ Current date view (local to each user)
- ❌ Tap states (showing full course name)

---

## 📱 Mobile Usage

### Gestures

```
←─ Swipe Left   = Next Day
─→ Swipe Right  = Previous Day
👆 Tap Class    = Show Full Name
👆 Tap Event    = Edit Event
👆 Tap +        = Add Event
✓  Tap Checkbox = Mark Complete
```

### Installation (Android)

```
1. Open in Chrome
2. Menu (⋮) → Add to Home screen
3. Name: "ash"
4. Add
5. Icon appears on home screen
6. Opens like native app!
```

### Installation (iPhone)

```
1. Open in Safari
2. Share button (□↑)
3. Add to Home Screen
4. Name: "ash"
5. Add
6. Icon appears on home screen
```

---

## 🎯 Use Cases

### Use Case 1: Check Today's Schedule

```
Open app → See today's classes → Done!
```

### Use Case 2: Add Assignment Deadline

```
Click + → Deadline → CS230 → "Assignment 3"
→ Oct 15 → 23:59 → Add Event → Done!
```

### Use Case 3: See What's Coming Up

```
Scroll down → See Upcoming Deadlines
→ See Upcoming Exams → Plan accordingly!
```

### Use Case 4: Mark Assignment Done

```
Find in Upcoming → Check box → Grayed out!
```

### Use Case 5: Navigate to Specific Day

```
Today: Tuesday
Swipe left → Wednesday
Swipe left → Thursday
Swipe right → Wednesday
```

---

## 🎨 Theme & Colors

### Dark Theme
- **Background**: Very dark blue (#10111A)
- **Text**: White (#FFFFFF)
- **Subtle text**: Gray (#9CA3AF)

### Accent Colors
- **Primary**: Purple (#A855F7) - buttons, highlights
- **Lime**: (#84CC16) - CS230, CS231
- **Pink**: (#EC4899) - CS215, CS405
- **Orange**: (#FB923C) - EC101, CS213

### Gradients
- **FAB**: Purple → Pink
- **Event blocks**: Purple fade
- **Buttons**: Purple → Pink

---

## 🕐 Time Format

All times use 24-hour format:
- 08:30 = 8:30 AM
- 14:00 = 2:00 PM
- 23:59 = 11:59 PM

---

## 📅 Date Navigation

```
October 2025
Su Mo Tu We Th Fr Sa
          1  2  3  4
 5  6  7 [8] 9 10 11   ← You are here (Oct 8)
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30 31

Swipe left  → Oct 9
Swipe right → Oct 7
```

---

## 🔔 Upcoming Lists Explained

### Upcoming Deadlines
Shows all future deadlines that are:
- ✅ Not completed
- ✅ Due date is in the future
- ✅ Sorted by date (soonest first)

### Upcoming Exams
Shows all future exams that are:
- ✅ Not completed
- ✅ Date is in the future
- ✅ Sorted by date (soonest first)

**Note:** Past events don't show in upcoming lists

---

## 🎭 Animations

### Swipe Animation
```
Day → [Slide out] → Next Day [Slide in]
```

### Modal Animation
```
Click + → [Slide up from bottom] → Modal
Close → [Slide down] → Gone
```

### Checkbox Animation
```
☐ → ✅ → [Fade + Strike-through]
```

### List Updates
```
New event → [Fade in from top]
Deleted → [Fade out]
```

---

## 💾 Data Storage

### What's Stored Where

**Firebase (Cloud):**
- All deadlines
- All exams
- Completion status

**Local (Your Device):**
- Current view date
- App files (for offline use)
- Cached data

**Not Stored:**
- Class schedule (hardcoded)
- UI preferences

---

## 🔌 Offline Mode

```
Online:
App ↔ Firebase ↔ All Users
  ✅ Real-time sync
  ✅ Instant updates

Offline:
App ↔ Local Cache
  ⚠️ Can view data
  ⚠️ Can't add/edit
  ⚠️ Syncs when back online
```

---

## 🎓 Tips & Best Practices

### Do's ✅
- ✅ Add deadlines as soon as you get them
- ✅ Use clear, descriptive titles
- ✅ Include course codes
- ✅ Mark complete when done
- ✅ Install as PWA for quick access
- ✅ Check upcoming lists daily

### Don'ts ❌
- ❌ Don't rely on app when offline
- ❌ Don't use vague titles ("homework")
- ❌ Don't forget to set correct date/time
- ❌ Don't delete other people's events without asking
- ❌ Don't mark incomplete items as done

---

## 🎯 Quick Reference

| Task | Action |
|------|--------|
| Next day | Swipe left |
| Previous day | Swipe right |
| Add event | Click + button |
| Edit event | Click event in list |
| Delete event | Edit → Delete button |
| Complete task | Check checkbox |
| See full course name | Tap class block |
| View upcoming | Scroll down |

---

## 📊 Understanding the Layout

```
┌─────────────────────────┐
│ Header (Date)           │  ← Always visible
├─────────────────────────┤
│                         │
│ Daily Agenda (Swipeable)│  ← Swipe to navigate
│                         │
│ - Classes               │
│ - Events for today      │
│                         │
├─────────────────────────┤
│                         │
│ Upcoming Deadlines      │  ← Scroll to see
│                         │
├─────────────────────────┤
│                         │
│ Upcoming Exams          │  ← Scroll to see
│                         │
└─────────────────────────┘
         ┌───┐
         │ + │  ← Always visible
         └───┘
```

---

**Happy planning with ash! 📅✨**

For technical help, see `TROUBLESHOOTING.md`
For setup help, see `QUICKSTART.md`
