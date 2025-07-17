# 🚀 Drishyacity WebView - Commands Reference

## 📱 Build Commands

### APK Build (Direct Installation)
```bash
npx eas build --platform android --profile production-apk
```

### AAB Build (Google Play Store)
```bash
npx eas build --platform android --profile production
```

### Preview Build (Testing)
```bash
npx eas build --platform android --profile preview
```

---

## 🔧 Setup Commands

### Initial Setup
```bash
# Install EAS CLI globally
npm install -g @expo/eas-cli

# Clone repository
git clone https://github.com/drishyacity/Webview.git
cd Webview

# Install dependencies
npm install

# Login to EAS
eas login

# Initialize project
eas init
```

### Verification
```bash
# Check project health
npx expo-doctor

# Check EAS status
eas whoami

# List builds
eas build:list
```

---

## 👤 Account Management

### Login/Logout
```bash
# Login
eas login

# Logout
eas logout

# Check current user
eas whoami
```

### Project Management
```bash
# Initialize new project
eas init

# Delete project
eas project:delete

# Transfer project
eas project:transfer
```

---

## 🔑 Credentials Management

### Android Keystore
```bash
# Manage credentials
eas credentials

# Clear credentials cache
eas credentials --clear-cache

# View credentials
eas credentials --platform android
```

---

## 🛠️ Development Commands

### Local Development
```bash
# Start development server
npx expo start

# Start for Android
npx expo start --android

# Start for web
npx expo start --web

# Clear cache and start
npx expo start --clear
```

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- --testNamePattern="App"
```

---

## 📦 Package Management

### Install Dependencies
```bash
# Install all dependencies
npm install

# Install specific package
npx expo install react-native-webview

# Update dependencies
npx expo install --check
npx expo install --fix
```

### Clean Installation
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🔄 Git Commands

### Basic Git Operations
```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to repository
git push origin main

# Pull latest changes
git pull origin main
```

### Repository Management
```bash
# Clone repository
git clone https://github.com/drishyacity/Webview.git

# Change remote origin
git remote remove origin
git remote add origin https://your-token@github.com/username/repo.git

# Check remotes
git remote -v
```

---

## 🔍 Debugging Commands

### Build Debugging
```bash
# View build logs
eas build:view [BUILD_ID]

# List all builds
eas build:list

# Cancel running build
eas build:cancel [BUILD_ID]
```

### Local Debugging
```bash
# Check Metro bundler
npx expo start --port 8081

# Reset Metro cache
npx expo start --clear

# Check for common issues
npx expo-doctor
```

---

## 📊 Monitoring Commands

### Build Status
```bash
# Check build queue
eas build:list --status=in-queue

# Check completed builds
eas build:list --status=finished

# Check failed builds
eas build:list --status=errored
```

### Project Info
```bash
# Show project info
eas project:info

# Show build configuration
cat eas.json

# Show app configuration
cat app.json
```

---

## ⚡ Quick Actions

### Emergency Commands
```bash
# Quick health check
npx expo-doctor && eas whoami

# Quick build APK
npx eas build --platform android --profile production-apk --non-interactive

# Quick build AAB
npx eas build --platform android --profile production --non-interactive

# Reset everything
eas logout && eas login && eas init
```

### One-liner Setups
```bash
# Complete setup for new machine
npm install -g @expo/eas-cli && git clone https://github.com/drishyacity/Webview.git && cd Webview && npm install

# Quick dependency update
npx expo install --check && npx expo install --fix

# Quick build both formats
npx eas build --platform android --profile production-apk && npx eas build --platform android --profile production
```

---

## 🔧 Configuration Commands

### Update App Version
```bash
# Update version in app.json
# Then rebuild with:
npx eas build --platform android --profile production --clear-cache
```

### Environment Setup
```bash
# Set environment variables
export EXPO_PUBLIC_API_URL="https://drishyacity.com"

# Check environment
env | grep EXPO
```

---

## 📱 Device Testing

### Install APK
```bash
# Download and install APK from build URL
# Or use ADB:
adb install path/to/your-app.apk
```

### Expo Go Testing
```bash
# Start development server
npx expo start

# Scan QR code with Expo Go app
```

---

## 🆘 Emergency Fixes

### Build Failing
```bash
# Clear all caches
npx expo start --clear
eas credentials --clear-cache
rm -rf node_modules package-lock.json
npm install
```

### Credentials Issues
```bash
# Reset credentials
eas credentials --clear-cache
eas credentials
# Follow prompts to recreate keystore
```

### Project Not Found
```bash
# Re-initialize project
eas logout
eas login
eas init
```

---

## 📋 Pre-Build Checklist

```bash
# 1. Check project health
npx expo-doctor

# 2. Verify login
eas whoami

# 3. Check configuration
cat eas.json

# 4. Update dependencies
npm install

# 5. Test locally
npx expo start

# 6. Build
npx eas build --platform android --profile production-apk
```

---

**💡 Pro Tips:**
- Always run `npx expo-doctor` before building
- Use `--non-interactive` flag for automated builds
- Keep build logs for debugging: `eas build:view [BUILD_ID]`
- Use preview builds for testing before production
