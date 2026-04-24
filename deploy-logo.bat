@echo off
echo ============================================
echo   Taskra Logo Deployment to Phone
echo ============================================
echo.
echo This will:
echo 1. Commit new logo files
echo 2. Push to main branch (your phone PWA)
echo 3. Push to playstore-dev branch
echo.
pause

echo.
echo Adding logo files...
git add icon-192.png icon-512.png logo.svg generate-logo.html LOGO_SETUP.md

echo Committing changes...
git commit -m "Update Taskra logo with red dot branding"

echo.
echo Pushing to playstore-dev...
git push origin playstore-dev

echo.
echo Switching to main branch...
git checkout main

echo Copying logo files to main...
git checkout playstore-dev -- icon-192.png icon-512.png logo.svg

echo Committing to main...
git add icon-192.png icon-512.png logo.svg
git commit -m "Update Taskra logo with red dot branding"

echo Pushing to main (GitHub Pages - your phone)...
git push origin main

echo.
echo Returning to playstore-dev...
git checkout playstore-dev

echo.
echo ============================================
echo   ✅ Logo deployed successfully!
echo ============================================
echo.
echo Your phone PWA will update in 2-3 minutes.
echo To see it immediately:
echo   1. Close the app completely
echo   2. Clear browser cache
echo   3. Reopen the app
echo.
echo Or reinstall PWA:
echo   1. Remove app from home screen
echo   2. Visit: https://kbteck.github.io/to-do-app/
echo   3. Install fresh
echo.
pause
