@echo off
echo Building Drishyacity WebView App with Expo...
echo.

REM Check if Android SDK is available
if not exist "%ANDROID_HOME%" (
    echo Error: Android SDK not found. Please install Android Studio and set ANDROID_HOME environment variable.
    echo.
    echo To install Android SDK:
    echo 1. Download and install Android Studio from https://developer.android.com/studio
    echo 2. Set ANDROID_HOME environment variable to your SDK location
    echo 3. Add platform-tools to your PATH
    echo.
    pause
    exit /b 1
)

echo Android SDK found at: %ANDROID_HOME%
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Building Android APK with Expo...
call npx expo run:android --variant release
if %errorlevel% neq 0 (
    echo Error: Failed to build Android APK
    echo.
    echo Alternative: You can also build using EAS Build (cloud build):
    echo 1. Run: npx eas login
    echo 2. Run: npx eas build --platform android --profile preview
    echo.
    pause
    exit /b 1
)

echo.
echo Build completed successfully!
echo.
echo The APK file should be located in:
echo android\app\build\outputs\apk\release\
echo.
pause
