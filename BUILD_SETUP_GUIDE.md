# Drishyacity WebView App - Complete Build Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [EAS Account Setup](#eas-account-setup)
4. [Building APK & AAB](#building-apk--aab)
5. [Account Management](#account-management)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software:
1. **Node.js** (v18 or higher)
   ```bash
   # Download from: https://nodejs.org/
   node --version  # Should show v18+
   npm --version   # Should show 9+
   ```

2. **Git**
   ```bash
   # Download from: https://git-scm.com/
   git --version
   ```

3. **EAS CLI**
   ```bash
   npm install -g @expo/eas-cli
   eas --version
   ```

4. **Expo CLI** (Optional but recommended)
   ```bash
   npm install -g @expo/cli
   expo --version
   ```

---

## 🚀 Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/drishyacity/Webview.git
cd Webview
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Setup
```bash
# Check for any issues
npx expo-doctor

# Should show: "15/15 checks passed. No issues detected!"
```

---

## 👤 EAS Account Setup

### 1. Create/Login to Expo Account
```bash
# Login to existing account
eas login

# OR create new account
eas register
```

### 2. Initialize EAS Project
```bash
# Link project to EAS
eas init

# Follow prompts:
# - Select existing project or create new
# - Choose project name: "drishyacity-webview"
```

### 3. Configure Build Credentials
```bash
# Generate Android keystore (first time only)
eas credentials

# Select:
# - Android
# - Production
# - Set up new keystore
# - Follow prompts to create keystore
```

---

## 📱 Building APK & AAB

### Build Commands:

#### 1. Build APK (Direct Installation)
```bash
npx eas build --platform android --profile production-apk
```

#### 2. Build AAB (Google Play Store)
```bash
npx eas build --platform android --profile production
```

#### 3. Build Both (Sequential)
```bash
# Build APK first
npx eas build --platform android --profile production-apk

# Then build AAB
npx eas build --platform android --profile production
```

### Build Profiles (eas.json):
```json
{
  "cli": {
    "version": ">= 12.0.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    },
    "production-apk": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

---

## 🔄 Account Management

### Change EAS Account:
```bash
# Logout current account
eas logout

# Login with new account
eas login

# Re-initialize project
eas init
```

### Remove Project from EAS:
```bash
# Unlink project
eas project:delete

# Confirm deletion when prompted
```

### Change Project Owner:
```bash
# Transfer project to different account
eas project:transfer

# Follow prompts to enter new owner's email
```

---

## 🛠️ Development Commands

### Local Development:
```bash
# Start development server
npx expo start

# Start with specific platform
npx expo start --android
npx expo start --web
```

### Testing:
```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

### Code Quality:
```bash
# Check for issues
npx expo-doctor

# Format code
npm run format

# Lint code
npm run lint
```

---

## 📦 Required Packages

### Core Dependencies:
```json
{
  "expo": "~52.0.0",
  "react": "18.3.1",
  "react-native": "0.76.1",
  "react-native-webview": "13.12.2",
  "expo-status-bar": "~2.0.0",
  "expo-constants": "~17.0.0",
  "expo-network": "~7.0.0",
  "expo-splash-screen": "~0.29.0"
}
```

### Dev Dependencies:
```json
{
  "@babel/core": "^7.25.2",
  "@types/react": "~18.3.12",
  "typescript": "^5.3.0",
  "jest": "^29.2.1",
  "@testing-library/react-native": "^12.0.0"
}
```

### Install All at Once:
```bash
npm install expo@~52.0.0 react@18.3.1 react-native@0.76.1 react-native-webview@13.12.2 expo-status-bar@~2.0.0 expo-constants@~17.0.0 expo-network@~7.0.0 expo-splash-screen@~0.29.0
```

---

## 🔧 Configuration Files

### app.json (Key Settings):
```json
{
  "expo": {
    "name": "Drishyacity",
    "slug": "drishyacity-webview",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.drishyacity.viraj",
      "permissions": ["INTERNET", "ACCESS_NETWORK_STATE"]
    },
    "newArchEnabled": true
  }
}
```

---

## ⚠️ Troubleshooting

### Common Issues:

#### 1. Build Fails - Keystore Issues:
```bash
# Reset credentials
eas credentials --clear-cache
eas credentials
```

#### 2. "Project not found" Error:
```bash
# Re-initialize project
eas init
```

#### 3. Version Conflicts:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Expo Go Compatibility:
```bash
# Check SDK version compatibility
npx expo install --check
```

### Build Status Check:
```bash
# Check build status
eas build:list

# View specific build
eas build:view [BUILD_ID]
```

---

## 📞 Support

### Useful Links:
- **Expo Documentation:** https://docs.expo.dev/
- **EAS Build Guide:** https://docs.expo.dev/build/introduction/
- **React Native WebView:** https://github.com/react-native-webview/react-native-webview

### Commands Quick Reference:
```bash
# Setup
npm install -g @expo/eas-cli
eas login
eas init

# Build
npx eas build --platform android --profile production-apk  # APK
npx eas build --platform android --profile production      # AAB

# Development
npx expo start
npx expo-doctor

# Account
eas logout
eas login
```

---

## 🔐 Security & Best Practices

### Keystore Management:
- **NEVER** commit keystore files to Git
- Keep backup of keystore in secure location
- Use different keystores for development/production

### Environment Variables:
```bash
# Set environment for builds
export EXPO_PUBLIC_API_URL="https://drishyacity.com"
```

### Git Best Practices:
```bash
# Always check .gitignore includes:
/android
/ios
*.keystore
*.jks
.env
```

---

## 🚀 Quick Start Checklist

### For New Machine Setup:
- [ ] Install Node.js (v18+)
- [ ] Install Git
- [ ] Install EAS CLI: `npm install -g @expo/eas-cli`
- [ ] Clone repository: `git clone https://github.com/drishyacity/Webview.git`
- [ ] Install dependencies: `npm install`
- [ ] Login to EAS: `eas login`
- [ ] Verify setup: `npx expo-doctor`
- [ ] Test build: `npx eas build --platform android --profile production-apk`

### For Existing Project:
- [ ] Pull latest changes: `git pull origin main`
- [ ] Update dependencies: `npm install`
- [ ] Check for issues: `npx expo-doctor`
- [ ] Build: `npx eas build --platform android --profile production`

---

**📝 Note:** Keep your EAS credentials secure and never share your keystore files publicly.

**🎯 Pro Tip:** Always test builds on development profile before creating production builds to save build minutes.
