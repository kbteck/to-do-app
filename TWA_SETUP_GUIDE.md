# Taskra - TWA (Trusted Web Activity) Setup Guide

This guide walks you through packaging your Taskra PWA as an Android app for Google Play Store distribution.

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ Node.js installed (already have v22.20.0)
- ✅ Bubblewrap CLI installed (already done: `npm install -g @bubblewrap/cli`)
- ✅ Android Studio installed ([Download here](https://developer.android.com/studio))
- ✅ JDK 11 or higher ([Download here](https://adoptium.net/))
- ✅ Google Play Console account ([$25 one-time fee](https://play.google.com/console/signup))
- ✅ Your PWA hosted and accessible (GitHub Pages: https://kbteck.github.io/to-do-app/)

## 🚀 Step 1: Verify Android Studio Setup

1. **Install Android Studio**: Download from https://developer.android.com/studio
2. **Install SDK Tools**:
   - Open Android Studio
   - Go to Tools → SDK Manager
   - Install:
     - Android SDK Command-line Tools
     - Android SDK Build-Tools (latest version)
     - Android SDK Platform-Tools
3. **Set Environment Variables** (PowerShell):
   ```powershell
   # Add to your PowerShell profile
   $env:ANDROID_HOME = "C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk"
   $env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\cmdline-tools\latest\bin"
   ```
4. **Verify Installation**:
   ```powershell
   adb --version
   ```

## 🎯 Step 2: Initialize TWA Project with Bubblewrap

Run Bubblewrap init in your project directory:

```powershell
bubblewrap init --manifest=https://kbteck.github.io/to-do-app/manifest.json
```

### Answer the prompts:

| Prompt | Answer |
|--------|--------|
| **Domain** | `kbteck.github.io` |
| **URL path** | `/to-do-app/` |
| **Application name** | `Taskra` |
| **Package ID** | `com.taskra.app` |
| **Host** | `kbteck.github.io` |
| **Start URL** | `https://kbteck.github.io/to-do-app/` |
| **Theme Color** | `#2F4F4F` |
| **Background Color** | `#F0FFF0` |
| **Icon URL** | `https://kbteck.github.io/to-do-app/icon-512.png` |
| **Maskable Icon** | `https://kbteck.github.io/to-do-app/icon-512.png` |
| **Splash screen** | Yes |
| **Fallback** | `CUSTOM_TABS` |
| **Orientation** | `portrait` |

This will create:
- `twa-manifest.json` - TWA configuration
- `android/` folder - Android project files
- Signing keys (keep these secret!)

## 🔐 Step 3: Digital Asset Links (Domain Verification)

Create `.well-known/assetlinks.json` on your website to verify domain ownership.

1. **Generate SHA-256 fingerprint**:
   ```powershell
   cd android
   ./gradlew signingReport
   ```
   Copy the SHA-256 fingerprint from the output.

2. **Create assetlinks.json** (already created in this repo):
   ```json
   [{
     "relation": ["delegate_permission/common.handle_all_urls"],
     "target": {
       "namespace": "android_app",
       "package_name": "com.taskra.app",
       "sha256_cert_fingerprints": [
         "YOUR_SHA256_FINGERPRINT_HERE"
       ]
     }
   }]
   ```

3. **Deploy to GitHub Pages**:
   - Create folder: `.well-known/`
   - Add file: `assetlinks.json`
   - Commit and push to `main` branch
   - Verify at: `https://kbteck.github.io/to-do-app/.well-known/assetlinks.json`

4. **Test Domain Verification**:
   ```
   https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://kbteck.github.io&relation=delegate_permission/common.handle_all_urls
   ```

## 🛠️ Step 4: Build the Android App

```powershell
cd android
./gradlew assembleRelease
```

This creates: `android/app/build/outputs/apk/release/app-release.apk`

### For App Bundle (recommended for Play Store):
```powershell
./gradlew bundleRelease
```

This creates: `android/app/build/outputs/bundle/release/app-release.aab`

## 🔑 Step 5: Sign the App (Production)

For Play Store, you need to sign your app:

1. **Create Upload Key** (if not already done by Bubblewrap):
   ```powershell
   keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
   ```

2. **Configure Signing** in `android/app/build.gradle`:
   ```gradle
   signingConfigs {
       release {
           storeFile file("../../upload-keystore.jks")
           storePassword "YOUR_KEYSTORE_PASSWORD"
           keyAlias "upload"
           keyPassword "YOUR_KEY_PASSWORD"
       }
   }
   ```

3. **Keep Keystore Safe**: Back up `upload-keystore.jks` and passwords securely!

## 📱 Step 6: Test the APK

```powershell
adb install android/app/build/outputs/apk/release/app-release.apk
```

Test:
- App opens to your PWA
- Onboarding flow works
- Premium purchase flow (will need Play Store setup for real billing)
- Notifications work
- Offline functionality

## 🎮 Step 7: Google Play Billing Integration

Replace the mock billing in `config.js` with real Google Play Billing:

1. **Add Dependency** to `android/app/build.gradle`:
   ```gradle
   dependencies {
       implementation 'com.android.billingclient:billing:6.0.1'
   }
   ```

2. **Create Billing Bridge** (see `play-billing-bridge.js` in this repo)

3. **Configure Product in Play Console**:
   - Product ID: `premium_unlock`
   - Type: One-time purchase
   - Price: $4.99 USD

## 📊 Step 8: Create Play Store Listing

### Required Assets:

1. **App Icon** (512x512px) - Use `icon-512.png`
2. **Feature Graphic** (1024x500px)
3. **Screenshots** (minimum 2):
   - Phone: 16:9 or 9:16 aspect ratio
   - Tablet (optional): Different screenshots for tablets
4. **Short Description** (80 characters max):
   ```
   Smart task manager with notifications, priorities, and offline support.
   ```
5. **Full Description** (4000 characters max):
   ```
   Taskra - Your Smart Task Manager

   Stay organized with Taskra, a beautiful and powerful task management app designed for productivity.

   ✨ KEY FEATURES:
   • Create tasks with due dates and times
   • Set priority levels (High, Medium, Low)
   • Organize with 7 categories
   • Smart notifications (15-min advance + due time alerts)
   • Works 100% offline
   • Dark mode support
   • Search and filter tasks
   • Clean, distraction-free interface

   💎 FREE VERSION:
   • Create up to 5 tasks with notifications
   • All core features included
   • No ads, ever!

   ⭐ PREMIUM UPGRADE ($4.99):
   • Unlimited tasks with notifications
   • One-time payment, yours forever
   • No subscriptions!

   🔒 PRIVACY FIRST:
   • No account required
   • All data stored locally on your device
   • No tracking or analytics
   • Your tasks never leave your phone

   📱 PERFECT FOR:
   • Daily to-do lists
   • Work project management
   • Shopping lists
   • Personal goal tracking
   • Study schedules
   • Household tasks

   Download Taskra today and take control of your tasks!
   ```

### Content Rating:
- Fill out the questionnaire (likely "Everyone" rating)

### Pricing & Distribution:
- Free with in-app purchases
- Select countries for distribution

## 🚀 Step 9: Upload to Play Console

1. **Create App** in Play Console
2. **Fill Required Forms**:
   - App details
   - Store listing
   - Privacy policy URL: `https://kbteck.github.io/to-do-app/privacy-policy.html`
3. **Upload AAB**:
   - Go to Production → Create Release
   - Upload `app-release.aab`
4. **Set up In-App Products**:
   - Create product: `premium_unlock`
   - Price: $4.99 USD
   - Title: "Premium Unlock"
   - Description: "Unlock unlimited tasks with notifications"
5. **Submit for Review**

### Review Timeline:
- Initial review: 3-7 days
- Updates: Usually 1-3 days

## 🐛 Troubleshooting

### Issue: Domain verification fails
**Solution**: 
- Verify assetlinks.json is accessible
- Check SHA-256 fingerprint matches
- Wait 24 hours for Google to recheck

### Issue: App opens in Chrome instead of fullscreen
**Solution**: Domain verification not working. Check assetlinks.json.

### Issue: Billing doesn't work in test app
**Solution**: 
- Use internal testing track in Play Console
- Add your Google account as internal tester
- Install from Play Store internal test link

### Issue: Build fails
**Solution**:
```powershell
cd android
./gradlew clean
./gradlew assembleRelease
```

## 📝 Maintenance

### Updating the App:

1. **Update PWA** on GitHub Pages first
2. **Test PWA** works correctly
3. **Update twa-manifest.json** if needed:
   ```powershell
   bubblewrap update --manifest=https://kbteck.github.io/to-do-app/manifest.json
   ```
4. **Bump version** in `android/app/build.gradle`:
   ```gradle
   versionCode 2  // Increment by 1
   versionName "1.0.1"  // Semantic versioning
   ```
5. **Build and upload** new AAB to Play Store

### TWA Updates Automatically:
- Users always see latest PWA version
- Only update Android app when changing TWA config (splash, icons, etc.)
- Content updates happen instantly through your PWA!

## 📚 Resources

- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [TWA Quick Start Guide](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [Play Console Help](https://support.google.com/googleplay/android-developer/)
- [Digital Asset Links](https://developers.google.com/digital-asset-links/v1/getting-started)
- [Google Play Billing](https://developer.android.com/google/play/billing)

## ✅ Pre-Launch Checklist

Before submitting to Play Store:

- [ ] Privacy policy deployed and accessible
- [ ] assetlinks.json deployed and verified
- [ ] App icon and screenshots prepared
- [ ] Store listing written
- [ ] App tested on real device
- [ ] Premium purchase tested (internal testing)
- [ ] Notifications work correctly
- [ ] Offline mode tested
- [ ] Content rating completed
- [ ] Age-appropriate for rating
- [ ] Target Android API level meets requirements
- [ ] Keystore backed up securely

## 🎉 Launch Day!

Once approved:
1. Monitor reviews and feedback
2. Respond to user reviews
3. Track installations in Play Console
4. Monitor crash reports
5. Plan feature updates

**Good luck with your launch! 🚀**
