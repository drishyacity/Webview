# Drishyacity WebView App - Build Instructions

This is an Expo React Native application that displays the Drishyacity website in a WebView with offline support and error handling.

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **npm** or **yarn**
3. **Expo CLI** (installed globally)

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Start Development Server
```bash
npm start
# or
npx expo start
```

This will start the Metro bundler and show a QR code. You can:
- Scan the QR code with Expo Go app on your phone
- Press 'w' to open in web browser
- Press 'a' to open Android emulator (if available)
- Press 'i' to open iOS simulator (if available)

### Web Development
```bash
npm run web
# or
npx expo start --web
```

## Building for Production

### Web Build
```bash
npx expo export --platform web
```
The web build will be created in the `dist` folder.

### Android APK Build

#### Option 1: Local Build (Requires Android SDK)
1. Install Android Studio and Android SDK
2. Set environment variables:
   - `ANDROID_HOME` = path to Android SDK
   - Add `platform-tools` to PATH
3. Run the build script:
   ```bash
   build-android.bat
   ```

#### Option 2: EAS Build (Cloud Build - Recommended)
1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
2. Login to Expo:
   ```bash
   npx eas login
   ```
3. Build APK:
   ```bash
   npx eas build --platform android --profile preview
   ```

### iOS Build (macOS only)
```bash
npx eas build --platform ios --profile preview
```

## Project Structure

- `App.tsx` - Main application component with WebView
- `app.json` - Expo configuration
- `eas.json` - EAS Build configuration
- `assets/` - App icons and splash screens
- `package.json` - Dependencies and scripts

## Features

- WebView displaying Drishyacity website
- Offline detection and error handling
- Pull-to-refresh functionality
- Android back button support
- Custom splash screen
- Network connectivity monitoring

## Configuration

The app is configured to load `https://drishyacity.netlify.app` by default. You can change this URL in `App.tsx` by modifying the `WEBSITE_URL` constant.

## Troubleshooting

### Android Build Issues
- Ensure Android SDK is properly installed
- Check ANDROID_HOME environment variable
- Make sure platform-tools are in PATH
- Try cleaning the project: `npx expo run:android --clear`

### Web Build Issues
- Make sure all web dependencies are installed
- Clear Metro cache: `npx expo start --clear`

### General Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update Expo CLI: `npm install -g @expo/cli@latest`

## Support

For issues related to Expo, visit: https://docs.expo.dev/
For React Native WebView issues, visit: https://github.com/react-native-webview/react-native-webview
