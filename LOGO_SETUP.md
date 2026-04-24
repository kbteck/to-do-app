# Taskra Logo Setup Instructions

## Quick Logo Generation (EASIEST METHOD)

1. **Open the Logo Generator:**
   - File `generate-logo.html` should already be open in your browser
   - If not, double-click it to open

2. **Download Icons:**
   - Click "Generate Logos" button (if not already shown)
   - You'll see two icons: `icon-192.png` and `icon-512.png`
   - Click the "💾 Save Image" button under each icon
   - Save them to your project folder (replace existing icons)

3. **Deploy to Phone:**
   ```powershell
   # From your project directory
   git add icon-192.png icon-512.png logo.svg
   git commit -m "Update Taskra logo with red dot branding"
   
   # Deploy to main branch (your phone PWA)
   git checkout main
   git cherry-pick HEAD~1  # Or manually copy icons
   git push origin main
   
   # Return to playstore-dev
   git checkout playstore-dev
   git push origin playstore-dev
   ```

## Alternative: Online SVG to PNG Converter

If the HTML generator doesn't work:

1. **Go to:** https://cloudconvert.com/svg-to-png
2. **Upload:** `logo.svg` from your project
3. **Convert to PNG:**
   - First conversion: 192×192 pixels → Save as `icon-192.png`
   - Second conversion: 512×512 pixels → Save as `icon-512.png`
4. **Replace** old icons in your project folder

## Alternative: Browser Developer Tools

1. **Open** `generate-logo.html` in Chrome/Edge
2. **Right-click** on each icon preview image
3. **Select** "Save image as..."
4. **Save** as `icon-192.png` and `icon-512.png`

## After Replacing Icons

The icon files to replace:
- `icon-192.png` (192×192 px)
- `icon-512.png` (512×512 px)

These are referenced in:
- `manifest.json` (for PWA)
- `index.html` (apple-touch-icon)

## Verify on Phone

After pushing to GitHub (main branch):

1. **Wait 2-3 minutes** for GitHub Pages to deploy
2. **Hard refresh** your PWA on phone:
   - Close app completely
   - Clear browser cache for the app
   - Reopen app
3. **Or reinstall PWA:**
   - Remove app from home screen
   - Visit your GitHub Pages URL
   - Install fresh

The new logo with red dot should appear!

## Logo Files Created

- ✅ `generate-logo.html` - Interactive logo generator (PNG export)
- ✅ `logo.svg` - SVG version (scalable, for web)
- ⏳ `icon-192.png` - You need to generate this
- ⏳ `icon-512.png` - You need to generate this

## Design Details

**Logo Specification:**
- Font: System default (bold)
- Text: "Taskra"
- Text Color: #1C2833 (dark navy)
- Red Dot: #FF0000
- Dot Position: Over the letter "a"
- Dot Size: ~12% of font size
- Background: White (#FFFFFF)

**Icon Sizes:**
- 192×192: For Android home screen, splash screen
- 512×512: For app stores, high-res displays

---

**Need help?** The HTML generator is the easiest method - it's already open in your browser!
