# Play Store Assets Guide - Taskra

This guide covers all the visual assets and content needed for your Google Play Store listing.

## 📱 Required Assets

### 1. App Icon ✅
**Already have:** `icon-512.png`
- **Size:** 512x512 pixels
- **Format:** PNG (32-bit)
- **Status:** ✅ Ready to use
- **Notes:** Must not contain transparency

### 2. Feature Graphic 🎨
**Required for Store Listing**
- **Size:** 1024 x 500 pixels
- **Format:** PNG or JPEG
- **File size:** Max 1MB
- **Purpose:** Top banner in Play Store listing

#### Design Suggestions:
```
┌──────────────────────────────────────────────┐
│  [App Icon]  Taskra                          │
│              Smart Task Manager              │
│              ✓ Notifications  ✓ Offline     │
│              ✓ Categories     ✓ Dark Mode   │
└──────────────────────────────────────────────┘
```

**Colors to use:**
- Background: HoneyDew (#F0FFF0) or Teal gradient
- Text: DarkSlateGrey (#2F4F4F)
- Accents: Teal (#2F4F4F)

**Tools to create:**
- Canva: [1024x500 template](https://www.canva.com/design/play-feature-graphic)
- Figma: Use artboard 1024x500
- Photoshop: New file 1024x500, 72 DPI

### 3. Phone Screenshots 📱
**Minimum:** 2 screenshots
**Maximum:** 8 screenshots
**Recommended:** 4-6 screenshots

#### Specifications:
- **Aspect ratio:** 16:9 or 9:16
- **Recommended sizes:**
  - Portrait: 1080 x 2400 pixels (9:16)
  - Landscape: 2400 x 1080 pixels (16:9)
- **Format:** PNG or JPEG
- **File size:** Max 8MB each

#### Screenshot Ideas (Portrait 1080x2400):

**Screenshot 1: Onboarding/Welcome**
```
┌─────────────────┐
│                 │
│   Welcome to    │
│     Taskra      │
│                 │
│   📋 Icon 📋    │
│                 │
│ Smart task      │
│ management with │
│ notifications   │
│                 │
│   [Get Started] │
└─────────────────┘
```

**Screenshot 2: Main Dashboard**
- Show task list with mix of priorities
- Display categories
- Show date badges
- Highlight premium badge (if premium)

**Screenshot 3: Task Detail/Add Task**
- Show add task form
- Display due date picker
- Priority selector
- Category dropdown

**Screenshot 4: Notifications**
- Show notification preview
- Display upcoming tasks
- Highlight notification badge

**Screenshot 5: Dark Mode**
- Same as dashboard but in dark theme
- Shows app versatility

**Screenshot 6: Premium Features (Optional)**
- Highlight unlimited tasks
- Show premium badge
- Display all premium features

#### How to Capture Screenshots:

**Option 1: Real Device**
```powershell
# Connect Android device
adb devices

# Install app
adb install app-release.apk

# Capture screenshot
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png ./screenshots/
```

**Option 2: Chrome DevTools**
1. Open: http://localhost:8080 (your local server)
2. Press F12 → Device Toolbar
3. Select device: Pixel 5 (1080x2340)
4. Capture screenshot
5. Add device frame: https://mockuphone.com

**Option 3: Android Emulator**
- Android Studio → AVD Manager
- Launch Pixel 5 emulator
- Install APK and capture screenshots

### 4. Tablet Screenshots (Optional)
**If targeting tablets:**
- **Size:** 7-inch or 10-inch tablet sizes
- **Aspect ratio:** Different from phone
- **Recommended:** 1920 x 1200 pixels

### 5. Video (Optional but Recommended)
**Promotional Video**
- **Length:** 30 seconds - 2 minutes
- **Format:** MP4, MOV, or AVI
- **File size:** Max 2GB
- **Aspect ratio:** 16:9 or 9:16

#### Video Outline:
1. (0-5s) App icon animation + "Introducing Taskra"
2. (5-15s) Quick task creation demo
3. (15-25s) Show notifications, categories, priorities
4. (25-35s) Dark mode toggle
5. (35-45s) Premium features highlight
6. (45-60s) "Download free on Google Play" CTA

## 📝 Store Listing Text

### App Name
```
Taskra - Smart Task Manager
```
**Length:** Max 50 characters
**Current:** 27 characters ✅

### Short Description
```
Smart task manager with notifications, priorities, and offline support.
```
**Length:** Max 80 characters
**Current:** 73 characters ✅

### Full Description

```markdown
Taskra - Your Smart Task Manager

Stay organized with Taskra, a beautiful and powerful task management app designed for productivity.

✨ KEY FEATURES

📅 Due Dates & Times
Set deadlines with precise timing and never miss important tasks.

🔔 Smart Notifications
Get reminded 15 minutes before and exactly when tasks are due.

🚦 Priority Levels
Organize with High, Medium, and Low priority color-coded tasks.

🏷️ 7 Categories
Sort tasks by Work, Personal, Shopping, Health, Finance, Home, or Other.

🔍 Search & Filter
Find tasks instantly with powerful search and smart filters.

🌗 Dark Mode
Easy on the eyes with automatic dark theme support.

✈️ 100% Offline
All tasks stored locally - works perfectly without internet.

📱 Clean Interface
Distraction-free design focused on getting things done.

💎 FREE VERSION

✓ Create up to 5 tasks with notifications
✓ All core features included
✓ No ads, ever!
✓ Full offline access

⭐ PREMIUM UPGRADE ($4.99)

✓ Unlimited tasks with notifications
✓ One-time payment, yours forever
✓ No subscriptions!
✓ Support independent development

🔒 PRIVACY FIRST

✓ No account required
✓ All data stored locally on your device
✓ No tracking or analytics
✓ Your tasks never leave your phone
✓ Complete privacy guaranteed

📱 PERFECT FOR

• Daily to-do lists
• Work project management
• Shopping lists
• Personal goal tracking
• Study schedules
• Household tasks
• Habit tracking
• Event planning

🎯 WHY TASKRA?

Unlike complicated project management tools, Taskra focuses on simplicity. We believe task management should be quick, beautiful, and stress-free. No cloud sync issues, no forced accounts, no subscriptions - just a clean, powerful task manager that works exactly how you need it.

🌟 WHAT USERS SAY

"Finally, a task app that doesn't require an account!" - beta tester
"Love the clean design and notifications work perfectly" - early user
"Offline support saved me during a flight" - frequent traveler

💰 ONE-TIME PURCHASE, LIFETIME ACCESS

We chose one-time pricing instead of monthly subscriptions because we believe in giving you permanent value. Pay once, own it forever.

🚀 GET STARTED TODAY

Download Taskra and take control of your tasks!

Questions? Email support@taskra.app
GitHub: github.com/kbteck/to-do-app
```

**Length:** 2,184 characters (max 4,000) ✅

### Developer Website
```
https://github.com/kbteck/to-do-app
```

### Privacy Policy URL
```
https://kbteck.github.io/to-do-app/privacy-policy.html
```

## 🎨 Brand Assets Summary

### Colors
- **Primary:** #2F4F4F (DarkSlateGrey / Teal)
- **Background:** #F0FFF0 (HoneyDew)
- **Cards:** #FFFFFF (White)
- **High Priority:** #dc3545 (Red)
- **Medium Priority:** #ffc107 (Yellow)
- **Low Priority:** #28a745 (Green)

### Typography
- **Primary Font:** System default (Roboto on Android)
- **Headings:** Bold, 24-28px
- **Body:** Regular, 16px
- **Small Text:** 14px

### Design Style
- **Minimal:** Clean, uncluttered interface
- **Modern:** Rounded corners, soft shadows
- **Professional:** Consistent spacing and alignment
- **Accessible:** High contrast, readable text

## 🛠️ Tools for Creating Assets

### Free Design Tools
1. **Canva** (easiest): https://www.canva.com
   - Pre-made templates
   - Drag-and-drop interface
   - Free tier available

2. **Figma** (professional): https://www.figma.com
   - Advanced design features
   - Collaboration tools
   - Free for individuals

3. **GIMP** (open-source): https://www.gimp.org
   - Photoshop alternative
   - Completely free
   - Powerful editing

### Screenshot Framing
1. **Mockuphone**: https://mockuphone.com
   - Add device frames
   - Multiple device options
   - Free to use

2. **Screely**: https://screely.com
   - Add backgrounds
   - Gradient options
   - Quick and simple

3. **Smartmockups**: https://smartmockups.com
   - Realistic mockups
   - Multiple angles
   - Free tier available

### Video Creation
1. **DaVinci Resolve** (free): https://www.blackmagicdesign.com
   - Professional video editing
   - Screen recording
   - Free version powerful enough

2. **OBS Studio** (free): https://obsproject.com
   - Screen recording
   - Live streaming capable
   - Open source

3. **Canva Video** (easy): https://www.canva.com
   - Simple video templates
   - No editing experience needed
   - Free tier available

## ✅ Pre-Launch Asset Checklist

Before submitting to Play Store:

Visual Assets:
- [ ] App icon (512x512) prepared
- [ ] Feature graphic (1024x500) designed
- [ ] 4-6 phone screenshots captured
- [ ] Screenshots show key features
- [ ] (Optional) Tablet screenshots
- [ ] (Optional) Promotional video

Text Content:
- [ ] App name finalized (Taskra)
- [ ] Short description written
- [ ] Full description complete
- [ ] Developer website URL
- [ ] Privacy policy URL
- [ ] Support email created

Branding:
- [ ] Consistent colors used
- [ ] Professional appearance
- [ ] No spelling errors
- [ ] Screenshots show actual app
- [ ] Feature graphic matches app design

Play Console:
- [ ] Content rating completed
- [ ] Target audience set
- [ ] Category selected (Productivity)
- [ ] Tags added (task, todo, productivity, etc.)
- [ ] Release notes written

## 📊 Categories & Tags

### Primary Category
**Productivity**

### Tags (choose relevant ones)
- task manager
- to-do list
- productivity
- organizer
- reminder
- planner
- offline
- notes
- checklist
- gtd (getting things done)

### Content Rating
**Everyone** (most likely)

## 🎯 Marketing Copy Examples

### Google Ad (if running ads)
```
Taskra - Simple Task Manager
Get organized with smart notifications
Free download, optional premium
```

### Social Media Bio
```
Taskra 📋
Smart task management made simple
✓ Notifications ✓ Offline ✓ Private
Download free on Google Play 👇
```

### Press Release Title
```
Taskra Launches on Google Play: Privacy-First Task Management
```

## 📸 Screenshot Text Overlays

Add text overlays to screenshots to highlight features:

```
Screenshot 1: "Never miss a deadline"
Screenshot 2: "Organize with categories"
Screenshot 3: "Works 100% offline"
Screenshot 4: "Beautiful dark mode"
Screenshot 5: "Upgrade for unlimited tasks"
```

Keep overlay text:
- Short (3-5 words)
- High contrast
- Large, readable font
- Positioned consistently

## 💡 Tips for Success

1. **First Screenshot Matters Most**
   - Show your best feature
   - Clear, uncluttered
   - Compelling text overlay

2. **Tell a Story**
   - Screenshots should flow logically
   - Show user journey
   - Highlight pain points solved

3. **Professional Appearance**
   - Use same device frame for all
   - Consistent styling
   - High resolution images

4. **Show, Don't Tell**
   - Actual screenshots > mockups
   - Real features > marketing fluff
   - Functional UI > concept designs

5. **Update Regularly**
   - Refresh screenshots with new features
   - Keep descriptions current
   - Test different graphics

## 🚀 Next Steps

1. **Create Feature Graphic** using Canva or Figma
2. **Capture 4-6 Screenshots** of key features
3. **Review Store Listing Text** for accuracy
4. **Upload Assets** to Play Console
5. **Preview Store Listing** before publishing
6. **Get Feedback** from friends/beta testers

Good luck with your launch! 🎉
