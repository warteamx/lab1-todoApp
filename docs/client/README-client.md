# Expo Lab Client 📱

Welcome to the Expo Lab client application! This is a cross-platform React Native app built with [Expo SDK 53](https://expo.dev) that runs on iOS, Android, and Web.

## Features

- 🔐 **Authentication**: Secure user authentication with Supabase
- 👤 **Profile Management**: User profiles with avatar upload
- ✅ **Todo Management**: Task management functionality
- 🎨 **UI Components**: Custom design system with theming
- 🌐 **Cross-Platform**: Single codebase for mobile and web
- 🧪 **Testing**: Comprehensive test suite with Jest

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Choose your platform**

   In the output, you'll find options to open the app in a:
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go) - Limited sandbox for trying out app development

4. **Start developing**

   Edit files in the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction) with Expo Router.

## 📚 Documentation

Comprehensive guides to help you understand and work with the Expo Lab client:

### 🚀 [Installation Guide](./INSTALLATION.md)

Complete setup instructions including prerequisites, environment configuration, and platform-specific requirements. Covers development tools, troubleshooting, and build configurations.

### 🏗️ [Architecture Guide](./ARCHITECTURE.md)

Deep dive into the app's Clean Architecture, folder structure, and design patterns. Learn about component organization, state management, API integration, and best practices.

### 🧪 [Testing Guide](./TESTING.md)

Comprehensive testing strategies including unit tests, component tests, and integration tests. Covers Jest configuration, testing utilities, coverage reports, and CI/CD integration.

### 📋 [Profile Features Overview](./PROFILE_FEATURES.md)

Detailed documentation of the profile management system including avatar upload, form validation, and real-time data management with TanStack Query.

## Development Commands

```bash
# Start development server
npm start

# Platform-specific development
npm run ios          # iOS Simulator
npm run android      # Android Emulator
npm run web          # Web Browser

# Code quality
npm run lint         # Check code style
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Build
npm run build:web    # Build for web deployment
```

## Project Structure

```
client/
├── app/                    # File-based routing (Expo Router)
│   ├── (auth)/            # Authentication screens
│   ├── (user)/            # Protected user screens
│   └── _layout.tsx        # Root layout with providers
├── components/            # Reusable UI components
│   ├── ui/               # Base design system components
│   └── modules/          # Feature-specific components
├── api/                  # TanStack Query hooks & API calls
├── providers/            # React Context providers
├── themes/               # Design system (colors, typography, spacing)
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
└── docs/                 # Documentation files
```

## Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript for type safety
- **Routing**: Expo Router (file-based routing)
- **State Management**: TanStack Query + React Context
- **Authentication**: Supabase Auth
- **Styling**: Custom design system with theme support
- **Testing**: Jest + React Native Testing Library
- **Code Quality**: ESLint + Prettier

## Environment Setup

The app connects to a local API server by default. Make sure the server is running:

```bash
# In the server directory
cd ../server
npm install
npm run server:dev
```

The client will connect to `http://localhost:3000` by default. You can configure this in your environment variables if needed.

## Reset Project (Clean Slate)

If you want to start with a fresh project structure:

```bash
npm run reset-project
```

This command moves the current implementation to **app-example** and creates a blank **app** directory for you to start fresh.

## Learn More

### Expo Resources

- [Expo Documentation](https://docs.expo.dev/) - Learn fundamentals and advanced topics
- [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/) - Step-by-step tutorial for universal apps
- [Expo Router Guide](https://docs.expo.dev/router/introduction/) - File-based routing documentation

### Community & Support

- [Expo GitHub](https://github.com/expo/expo) - Open source platform and contributions
- [Expo Discord](https://chat.expo.dev) - Community chat and support
- [Expo Forums](https://forums.expo.dev/) - Technical discussions and Q&A

### Development Resources

- [React Native Documentation](https://reactnative.dev/) - Core React Native concepts
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript best practices
- [TanStack Query](https://tanstack.com/query/latest) - Server state management
- [Supabase Documentation](https://supabase.com/docs) - Authentication and database

## Contributing

1. Read the [Architecture Guide](./ARCHITECTURE.md) to understand the codebase
2. Follow the [Testing Guide](./TESTING.md) for writing tests
3. Run `npm run lint:fix` before committing
4. Ensure all tests pass with `npm test`

## Troubleshooting

Having issues? Check the [Installation Guide](./INSTALLATION.md#troubleshooting) for common solutions or refer to the individual documentation files for specific topics.

---

**Happy coding!** 🚀 For detailed setup instructions, architecture details, and testing guidelines, explore the documentation links above.
