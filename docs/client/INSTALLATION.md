# Installation Guide

This document provides step-by-step instructions for setting up the Expo Lab client application.

## Prerequisites

Before installing the application, ensure you have the following tools installed:

- **Node.js** (version 18 or later)
- **npm** or **yarn** package manager
- **Git** for version control
- **Expo CLI** (optional but recommended)

### Platform-Specific Requirements

#### iOS Development

- **Xcode** (latest version recommended)
- **iOS Simulator** (included with Xcode)
- **macOS** (required for iOS development)

#### Android Development

- **Android Studio**
- **Android SDK** (API level 21 or higher)
- **Android Emulator** or physical Android device

#### Web Development

- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/martinrebo/expo-lab.git
cd expo-lab/client
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Install Expo CLI (Optional)

For enhanced development experience:

```bash
npm install -g @expo/cli
```

### 4. Environment Configuration

Create a `.env.local` file in the client root directory (if needed):

```bash
# Example environment variables
EXPO_PUBLIC_API_URL=http://localhost:3000
```

**Note**: Environment variables in Expo must be prefixed with `EXPO_PUBLIC_` to be accessible in the client code.

## Development Setup

### Starting the Development Server

Run the following command to start the Expo development server:

```bash
npm start
# or
npx expo start
```

This will open the Expo Developer Tools in your browser with options to:

- Run on iOS Simulator
- Run on Android Emulator
- Run on Web Browser
- Scan QR code with Expo Go app on physical device

### Platform-Specific Commands

#### iOS Simulator

```bash
npm run ios
# or
npx expo start --ios
```

#### Android Emulator

```bash
npm run android
# or
npx expo start --android
```

#### Web Browser

```bash
npm run web
# or
npx expo start --web
```

## Development Tools

### Expo Go App (Physical Devices)

For quick testing on physical devices without building:

1. Install **Expo Go** from App Store (iOS) or Google Play Store (Android)
2. Start the development server (`npm run client:start`)
3. Scan the QR code displayed in terminal or browser
4. The app will load in Expo Go

### Development Build (Recommended for Production Features)

For apps using native code or libraries not supported by Expo Go:

1. Configure EAS Build in `eas.json`
2. Run development build command:
   ```bash
   npx eas build --profile development --platform ios
   npx eas build --profile development --platform android
   ```

## Verification

After installation, verify everything is working:

### 1. Check Dependencies

```bash
npm list --depth=0
```

### 2. Run Linting

```bash
npm run lint
```

### 3. Run Tests

```bash
npm test
```

### 4. Check TypeScript

```bash
npx tsc --noEmit
```

## Troubleshooting

### Common Issues

#### Metro Bundler Issues

```bash
# Clear Metro cache
npx expo start -c
```

#### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### iOS Simulator Issues

```bash
# Reset iOS Simulator
npx expo install --fix
```

#### Android Emulator Issues

- Ensure Android SDK is properly configured
- Check that virtual device is running
- Verify USB debugging is enabled (for physical devices)

### Environment Issues

#### Port Conflicts

If port 8081 is in use:

```bash
npx expo start --port 8082
```

#### Network Issues

For development on physical devices, ensure your computer and device are on the same network.

### Getting Help

- **Expo Documentation**: https://docs.expo.dev/
- **Community Forum**: https://forums.expo.dev/
- **Discord**: https://chat.expo.dev/
- **GitHub Issues**: Report project-specific issues

## Next Steps

After successful installation:

1. Read the [Architecture Guide](./ARCHITECTURE.md) to understand the project structure
2. Review the [Testing Guide](./TESTING.md) for testing workflows
3. Check the [README-client.md](./README-client.md) for development guidelines

## Build Configuration

The project includes several build configurations:

### Development Build

- Includes debugging tools
- Hot reload enabled
- Source maps included

### Production Build

```bash
# Web production build
npm run build:web

# Native production builds (requires EAS)
npx eas build --profile production
```

### Build Profiles

Configured in `eas.json`:

- **development**: For testing with development builds
- **preview**: For internal testing and QA
- **production**: For app store releases

For detailed build configuration, refer to the [EAS Build documentation](https://docs.expo.dev/build/introduction/).
