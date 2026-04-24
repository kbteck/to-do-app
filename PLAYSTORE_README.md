# TaskMaster Pro - Play Store Development Branch

## 🎯 Overview
This branch contains the **freemium Play Store version** with onboarding and monetization features.

## 📁 New Files
- **config.js** - Feature flags, premium manager, Play Billing integration
- **onboarding.html** - Beautiful 5-screen onboarding flow
- **index.html** (modified) - Integrated freemium limits and upgrade prompts

## 🆓 Free vs Premium Features

### Free Version (5 Task Limit)
- ✅ 5 tasks with notifications
- ✅ Basic notifications (15-min + due time)
- ✅ All categories & priorities
- ✅ Search & filters
- ✅ Dark/Light themes
- ✅ Offline mode

### Premium ($4.99 One-Time)
- ✅ **Unlimited** tasks with notifications
- ✅ Custom reminder times (5min, 30min, 1hr, 1day)
- ✅ Recurring tasks (coming soon)
- ✅ Cloud sync (coming soon)
- ✅ Data export (coming soon)
- ✅ Custom themes (coming soon)

## 🧪 Testing Instructions

### Test Onboarding Flow:
1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. You'll see onboarding screens

### Skip Onboarding (Direct Access):
1. Add to URL: `?skip=true`
2. Or set: `localStorage.setItem('onboardingCompleted', 'true')`

### Test Premium Upgrade:
1. Try adding 6th task with date+time
2. Upgrade modal will appear
3. Click "Unlock Premium"
4. Mock purchase completes (web version)

### Test Premium Features:
- Manually unlock: `premiumManager.unlockPremium('test_token')`
- Check status: `premiumManager.isPremium`
- Verify badge shows "👑 Premium"

## 🚀 Branch Strategy

```
main branch (PWA - your phone)
  ├── Production PWA at GitHub Pages
  ├── No onboarding
  └── No limits (full features)

playstore-dev branch (Development)
  ├── Onboarding flow
  ├── Freemium limits
  ├── Upgrade prompts
  └── Ready for Play Store packaging
```

## 📱 Next Steps for Play Store

### Phase 1: TWA Setup (Recommended)
1. Install Android Studio
2. Create TWA project
3. Link to GitHub Pages domain
4. Add Google Play Billing Library
5. Test on device

### Phase 2: Production Billing
Replace mock billing in `config.js`:
```javascript
// Current: Mock for testing
playBilling.purchasePremium() // Simulated

// Production: Real Play Billing API
const {BillingClient} = require('@google-play/billing');
```

### Phase 3: Distribution
1. Generate signed APK/AAB
2. Create Play Store listing
3. Add screenshots (5-8 required)
4. Write privacy policy
5. Submit for review

## 🔧 Development Commands

```bash
# Switch to this branch
git checkout playstore-dev

# Test locally
# Open index.html in browser

# Keep PWA updated (merge features you want)
git checkout main
git cherry-pick <commit>

# Push changes
git add .
git commit -m "Description"
git push origin playstore-dev
```

## 🎨 Customization

### Change App Name:
- `config.js` → `APP_CONFIG.name`
- `manifest.json` → `name` field
- `index.html` → `<title>` tag

### Change Price:
- `config.js` → `APP_CONFIG.pricing.oneTimePurchase`

### Change Free Limit:
- `config.js` → `APP_CONFIG.features.free.maxTasksWithNotifications`

### Modify Onboarding:
- Edit `onboarding.html`
- Screens in `APP_CONFIG.onboarding.screens`

## 📝 Important Notes

1. **Web Testing**: Purchase is mocked. Real billing needs Play Store.
2. **Onboarding**: Can be skipped with `?skip=true` for testing
3. **Premium Persistence**: Stored in localStorage (production uses Play Billing validation)
4. **Main Branch**: Keep separate for your personal PWA use

## 🐛 Debug Info

Check console for:
- `⚙️ Config loaded - Premium: false/true`
- `👑 Premium status: false/true`
- `🛒 Mock purchase initiated` (web testing)
- `✅ Premium unlocked!`

## 💡 Pro Tips

1. Test both free and premium flows thoroughly
2. Use Chrome DevTools mobile emulation
3. Test upgrade prompts at task #6
4. Verify onboarding swipe gestures work
5. Check badge display (Free: 3/5 tasks)

---

**Ready for Play Store Submission!** 🎉
