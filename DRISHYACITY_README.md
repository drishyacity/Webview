# Drishyacity WebView App

A robust React Native WebView application for Drishyacity with comprehensive error handling, offline support, and Play Store ready configuration.

## Features

- **Robust WebView**: Loads https://drishyacity.netlify.app with full functionality
- **Error Handling**: Comprehensive error handling for network issues and unavailable pages
- **Offline Support**: Detects network connectivity and shows appropriate messages
- **Auto Navigation**: Automatically returns to home page when links are unavailable
- **Pull to Refresh**: Users can refresh the page by pulling down
- **Back Navigation**: Smart back button handling with fallback to home page
- **Splash Screen**: Custom splash screen with app logo
- **Crash Prevention**: Built with stability in mind to prevent crashes
- **Device Compatibility**: Optimized for various Android devices and screen sizes

## App Details

- **App Name**: Drishyacity
- **Package Name**: com.drishyacity.viraj
- **Target URL**: https://drishyacity.netlify.app
- **Minimum Android Version**: API 21 (Android 5.0)
- **Target Android Version**: API 34 (Android 14)

## Prerequisites

Before building the app, ensure you have:

1. **Node.js** (v18 or higher)
2. **React Native CLI** (`npm install -g react-native-cli`)
3. **Android Studio** with Android SDK
4. **Java Development Kit (JDK)** 11 or higher
5. **Android device or emulator** for testing

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set up Android Environment**:
   - Install Android Studio
   - Set up Android SDK (API 21-34)
   - Create an Android Virtual Device (AVD) or connect a physical device
   - Enable USB Debugging on physical device

3. **Configure Environment Variables** (Windows):
   ```cmd
   set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
   set PATH=%PATH%;%ANDROID_HOME%\emulator;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
   ```

## Building the App

### Debug Build (for testing)

1. **Start Metro Bundler**:
   ```bash
   npx react-native start
   ```

2. **Run on Android** (in a new terminal):
   ```bash
   npx react-native run-android
   ```

### Release Build (for Play Store)

1. **Generate Release APK**:
   ```bash
   cd android
   gradlew assembleRelease
   ```

2. **Generate Release AAB** (recommended for Play Store):
   ```bash
   cd android
   gradlew bundleRelease
   ```

The release files will be generated in:
- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

## Key Components

### Error Handling
- Network connectivity monitoring
- Automatic retry mechanisms
- User-friendly error messages
- Fallback to home page for broken links

### Performance Optimizations
- Hardware acceleration enabled
- Large heap enabled for better performance
- Proguard optimization for release builds
- Multi-dex support for large applications

### Security Features
- Network security configuration
- HTTPS enforcement
- Secure WebView settings
- Proper permission handling

## Troubleshooting

### Common Issues

1. **Java Path Issues**:
   - Ensure JAVA_HOME is set correctly
   - Use JDK 11 or higher

2. **Android SDK Issues**:
   - Verify ANDROID_HOME is set
   - Install required SDK platforms and build tools

3. **Build Failures**:
   - Clean the project: `cd android && gradlew clean`
   - Clear Metro cache: `npx react-native start --reset-cache`

4. **Device Connection Issues**:
   - Enable USB Debugging
   - Check device authorization
   - Verify ADB connection: `adb devices`

## Play Store Submission

The app is configured for Play Store submission with:
- Proper package name and versioning
- Optimized release builds
- Required permissions only
- Proguard optimization
- Multi-architecture support

Before submission:
1. Generate a signed release build
2. Test on multiple devices
3. Verify all features work offline/online
4. Check app performance and stability

## Architecture

The app uses:
- React Native WebView for web content display
- NetInfo for network connectivity detection
- React Native Splash Screen for app launch
- Custom error handling and navigation logic
- Optimized Android configurations for stability

## Support

For issues or questions, please refer to the React Native documentation or contact the development team.
