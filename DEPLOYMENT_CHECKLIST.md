# Taskra Play Store Deployment Checklist

Complete guide to ship Taskra to Google Play Store. Follow these steps in order.

## Phase 1: Pre-Development Setup ✅

- [x] Create GitHub repository
- [x] Implement freemium system (config.js)
- [x] Build onboarding flow (onboarding.html)
- [x] Create premium upgrade prompts
- [x] Rebrand to "Taskra"
- [x] Test PWA on phone (GitHub Pages)
- [x] Test premium purchase flow (mock)
- [x] Create playstore-dev branch

## Phase 2: TWA Setup 🚀

### A. Install Prerequisites

- [ ] Install Android Studio
  - Download: https://developer.android.com/studio
  - Components: SDK Manager, Build-Tools, Platform-Tools
  
- [ ] Install JDK 11+
  - Download: https://adoptium.net/
  - Verify: `java --version`
  
- [x] Install Bubblewrap CLI
  - Command: `npm install -g @bubblewrap/cli`
  - Verify: `bubblewrap --version`

- [ ] Set ANDROID_HOME environment variable
  ```powershell
  $env:ANDROID_HOME = "C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk"
  ```

### B. Initialize TWA Project

1. [ ] Run Bubblewrap init
   ```powershell
   bubblewrap init --manifest=https://kbteck.github.io/to-do-app/manifest.json
   ```

2. [ ] Answer prompts (see TWA_SETUP_GUIDE.md for details):
   - Package ID: `com.taskra.app`
   - App Name: `Taskra`
   - Start URL: `https://kbteck.github.io/to-do-app/`
   - Theme color: `#2F4F4F`
   - Enable Play Billing: Yes

3. [ ] Verify files created:
   - `twa-manifest.json` ✅ (template created)
   - `android/` folder (created by Bubblewrap)
   - Keystore files (keep secure!)

### C. Domain Verification

1. [ ] Generate SHA-256 fingerprint
   ```powershell
   cd android
   ./gradlew signingReport
   ```

2. [x] Create `.well-known/assetlinks.json` (template created)

3. [ ] Update assetlinks.json with your SHA-256 fingerprint

4. [ ] Deploy to GitHub Pages:
   ```powershell
   git add .well-known/assetlinks.json
   git commit -m "Add assetlinks.json for TWA verification"
   git push origin main
   ```

5. [ ] Verify accessibility:
   - URL: `https://kbteck.github.io/to-do-app/.well-known/assetlinks.json`
   - Should return JSON, not 404

6. [ ] Test verification:
   ```
   https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://kbteck.github.io&relation=delegate_permission/common.handle_all_urls
   ```

### D. Build Android App

1. [ ] Build debug APK (for testing)
   ```powershell
   cd android
   ./gradlew assembleDebug
   ```
   Output: `android/app/build/outputs/apk/debug/app-debug.apk`

2. [ ] Install and test on device
   ```powershell
   adb install app-debug.apk
   ```

3. [ ] Verify TWA works:
   - [ ] App opens fullscreen (not in Chrome UI)
   - [ ] Onboarding displays correctly
   - [ ] Tasks can be created
   - [ ] Notifications work
   - [ ] Premium badge shows
   - [ ] Offline mode works

4. [ ] Build release AAB (for Play Store)
   ```powershell
   ./gradlew bundleRelease
   ```
   Output: `android/app/build/outputs/bundle/release/app-release.aab`

## Phase 3: Google Play Billing Integration 💰

### A. Add Billing Library

1. [ ] Add dependency to `android/app/build.gradle`:
   ```gradle
   dependencies {
       implementation 'com.android.billingclient:billing:6.0.1'
   }
   ```

2. [x] Copy BillingManager.java (created in `android-billing/`)

3. [ ] Add BillingManager to your TWA MainActivity

4. [ ] Inject JavaScript bridge:
   ```java
   webView.addJavascriptInterface(new BillingManager(this, webView), "AndroidBilling");
   ```

5. [x] Update config.js to use PlayBillingTWA class (play-billing-bridge.js created)

### B. Configure Play Console

1. [ ] Create Google Play Console account ([$25 fee](https://play.google.com/console/signup))

2. [ ] Create new app in Play Console
   - App name: Taskra
   - Default language: English (US)
   - App type: App
   - Free or Paid: Free

3. [ ] Set up in-app products:
   - Go to: Monetize → In-app products → Create product
   - Product ID: `premium_unlock`
   - Name: Premium Unlock
   - Description: Unlock unlimited tasks with notifications
   - Price: $4.99 USD
   - Status: Active

4. [ ] Add localized product details (optional)

## Phase 4: Privacy Policy & Legal 📜

- [x] Create privacy policy (privacy-policy.html created)

- [ ] Deploy privacy policy to GitHub Pages:
  ```powershell
  git add privacy-policy.html
  git commit -m "Add privacy policy for Play Store"
  git push origin main
  ```

- [ ] Verify URL: `https://kbteck.github.io/to-do-app/privacy-policy.html`

- [ ] Create support email:
  - [ ] Set up: support@taskra.app (or Gmail)
  - [ ] Add to privacy policy
  - [ ] Add to Play Console

## Phase 5: Play Store Assets 🎨

### A. Required Visual Assets

- [ ] App Icon (512x512)
  - ✅ Have: icon-512.png
  - [ ] Meets requirements (no transparency)

- [ ] Feature Graphic (1024x500)
  - [ ] Design in Canva/Figma
  - [ ] Export as PNG/JPEG
  - [ ] File size < 1MB

- [ ] Phone Screenshots (4-6 recommended)
  - [ ] Screenshot 1: Onboarding/Welcome
  - [ ] Screenshot 2: Main dashboard with tasks
  - [ ] Screenshot 3: Add task form
  - [ ] Screenshot 4: Notifications
  - [ ] Screenshot 5: Dark mode
  - [ ] Screenshot 6: Premium features (optional)

### B. Store Listing Text

- [x] App name: "Taskra - Smart Task Manager" (27 chars)
- [x] Short description (73 chars, max 80)
- [x] Full description (see PLAYSTORE_ASSETS_GUIDE.md)
- [x] Developer contact info
- [x] Privacy policy URL
- [x] Website URL (GitHub repo)

### C. Content Rating

- [ ] Complete questionnaire in Play Console
  - App category: Productivity
  - Target age: Everyone
  - User-generated content: No
  - Shares location: No
  - Payment for features: Yes (in-app purchase)

- [ ] Receive rating (likely "Everyone")

## Phase 6: Play Console Setup 🎮

### A. App Information

1. [ ] Go to: Play Console → Your App → Setup

2. [ ] Fill out all sections:
   - [ ] App details
     - Name: Taskra
     - Category: Productivity
     - Tags: task, todo, productivity, organizer
   
   - [ ] Store listing
     - Short description
     - Full description
     - Screenshots
     - Feature graphic
     - App icon (from manifest)
   
   - [ ] Store settings
     - Contact email: support@taskra.app
     - Website: GitHub repo URL
     - Privacy policy: Privacy policy URL
   
   - [ ] App content
     - Privacy policy link
     - Ads: No ads
     - Content rating: Complete questionnaire
     - Target audience: Everyone
     - Data safety: No data collected

### B. Release Setup

1. [ ] Create internal testing track first (recommended)
   - [ ] Upload AAB
   - [ ] Add testers (your Google accounts)
   - [ ] Test premium purchase
   - [ ] Verify all features work

2. [ ] Create production release
   - [ ] Go to: Production → Create release
   - [ ] Upload `app-release.aab`
   - [ ] Release name: v1.0.0
   - [ ] Release notes:
     ```
     🎉 Welcome to Taskra!
     
     ✨ Features:
     • Create tasks with due dates and times
     • Smart notifications (15-min advance + due time)
     • Priority levels and categories
     • Dark mode support
     • 100% offline capable
     • Free: 5 tasks with notifications
     • Premium: Unlimited tasks ($4.99)
     
     We'd love your feedback!
     ```

3. [ ] Set rollout percentage (start with 20% or 50%)

4. [ ] Review and publish

## Phase 7: Testing & QA ✅

### Internal Testing

- [ ] Install internal test version from Play Store
- [ ] Test premium purchase with test account
- [ ] Verify purchase restores on reinstall
- [ ] Test all features:
  - [ ] Onboarding flow
  - [ ] Task creation (free limit)
  - [ ] Task notifications
  - [ ] Categories and priorities
  - [ ] Dark mode toggle
  - [ ] Offline functionality
  - [ ] Premium purchase
  - [ ] Unlimited tasks after premium
  - [ ] Data persistence

### Pre-Production Checklist

- [ ] No crashes or major bugs
- [ ] All features work as expected
- [ ] Premium purchase flow smooth
- [ ] Notifications reliable
- [ ] App performance acceptable
- [ ] Battery usage reasonable
- [ ] Storage usage minimal
- [ ] Works on different screen sizes
- [ ] Tested on Android 5.0+ (API 21+)

## Phase 8: Launch 🚀

### Submission

1. [ ] Final review of store listing
2. [ ] Verify all assets uploaded
3. [ ] Check privacy policy accessible
4. [ ] Confirm in-app product active
5. [ ] Submit for review

### Review Process

- **Timeline:** 3-7 days for initial review
- **Status:** Check Play Console dashboard
- **If rejected:** Address issues and resubmit

### Post-Approval

- [ ] App appears in Play Store
- [ ] Test downloading from store
- [ ] Verify store listing displays correctly
- [ ] Test premium purchase with real money (small amount)
- [ ] Monitor reviews and ratings
- [ ] Respond to user feedback

## Phase 9: Post-Launch Monitoring 📊

### Week 1

- [ ] Check Play Console daily for:
  - [ ] Install numbers
  - [ ] Crash reports
  - [ ] User reviews
  - [ ] Revenue (premium purchases)

- [ ] Respond to all reviews (good and bad)
- [ ] Fix any critical bugs immediately
- [ ] Monitor ANR (Application Not Responding) rates
- [ ] Track retention metrics

### Ongoing

- [ ] Weekly Play Console check
- [ ] Monthly analytics review
- [ ] Plan feature updates
- [ ] Update screenshots if features change
- [ ] Refresh store description seasonally
- [ ] Respond to user reviews within 24-48 hours

## Phase 10: Updates & Maintenance 🔄

### Updating the App

**For PWA content updates** (no Android update needed):
1. Update PWA on GitHub Pages
2. Users see changes immediately (TWA pulls from web)
3. No Play Store update required

**For Android app updates** (TWA config, icon, billing):
1. Update version in `android/app/build.gradle`:
   ```gradle
   versionCode 2  // Increment by 1 each release
   versionName "1.0.1"  // Semantic versioning
   ```
2. Build new AAB: `./gradlew bundleRelease`
3. Upload to Play Console production track
4. Provide release notes
5. Set rollout percentage
6. Submit for review (faster than initial: 1-3 days)

### Update Strategy

- **PWA updates:** Continuous (hourly/daily if needed)
- **Android updates:** Monthly or as needed for:
  - Bug fixes in TWA layer
  - Billing changes
  - Icon/branding updates
  - Major feature announcements

## Emergency Procedures 🚨

### Critical Bug After Launch

1. **Immediate:**
   - Post announcement in store description
   - Add note to reviews: "Update coming soon"
   - Use Play Console to temporarily halt new installs (if severe)

2. **Fix:**
   - Create hotfix branch
   - Test thoroughly
   - Expedite Play Store review (request in console)

3. **Deploy:**
   - Upload emergency update
   - Request expedited review
   - Monitor closely

### Billing Issues

1. Check Play Console for billing errors
2. Verify product ID matches: `premium_unlock`
3. Test with new Google account
4. Contact Google Play support if needed
5. Provide refunds if users affected

## Success Metrics 📈

Track these KPIs:

- **Downloads:** Target 100 in first week, 1,000 in first month
- **Active users:** Daily and monthly active
- **Retention:** Day 1, Day 7, Day 30
- **Conversion rate:** Free to premium (target 2-5%)
- **Reviews:** Maintain 4+ star average
- **Crash-free rate:** Target 99%+
- **Revenue:** Track premium purchases

## Resources & Links 📚

### Official Documentation
- [TWA Documentation](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [Play Console Help](https://support.google.com/googleplay/android-developer/)
- [Bubblewrap Guide](https://github.com/GoogleChromeLabs/bubblewrap)
- [Play Billing Library](https://developer.android.com/google/play/billing)

### Taskra Documentation
- ✅ TWA_SETUP_GUIDE.md - Detailed TWA instructions
- ✅ PLAYSTORE_ASSETS_GUIDE.md - Asset creation guide
- ✅ privacy-policy.html - Privacy policy (deployed)
- ✅ play-billing-bridge.js - Billing integration
- ✅ android-billing/BillingManager.java - Android billing manager

### Your URLs
- PWA: https://kbteck.github.io/to-do-app/
- GitHub: https://github.com/kbteck/to-do-app
- Privacy Policy: https://kbteck.github.io/to-do-app/privacy-policy.html
- Asset Links: https://kbteck.github.io/to-do-app/.well-known/assetlinks.json

## Quick Command Reference

```powershell
# Navigate to project
cd "C:\Users\Vawick Consulting UG\Desktop\to-do-app-main"

# Switch to playstore branch
git checkout playstore-dev

# Initialize TWA (first time only)
bubblewrap init --manifest=https://kbteck.github.io/to-do-app/manifest.json

# Update TWA config
bubblewrap update --manifest=https://kbteck.github.io/to-do-app/manifest.json

# Build debug APK
cd android
./gradlew assembleDebug

# Build release AAB
./gradlew bundleRelease

# Install on device
adb install app-debug.apk

# Get signing report
./gradlew signingReport

# Check Android devices
adb devices

# View logs
adb logcat -d > logcat.txt
```

## Current Status

**Phase 1:** ✅ Complete
**Phase 2:** 🟡 In Progress (Bubblewrap installed, need Android Studio)
**Phase 3:** 📝 Template Ready (BillingManager.java created)
**Phase 4:** ✅ Complete (privacy-policy.html created)
**Phase 5:** 📋 Planning (assets guide created)
**Phase 6-10:** ⏳ Pending

## Next Immediate Steps

1. Install Android Studio
2. Set up ANDROID_HOME variable
3. Run `bubblewrap init`
4. Generate SHA-256 fingerprint
5. Update and deploy assetlinks.json
6. Build first APK for testing

---

**Good luck with your Play Store launch! 🎉🚀**

Questions? Check the detailed guides or contact support.
