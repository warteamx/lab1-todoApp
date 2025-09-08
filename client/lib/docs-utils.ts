// Documentation utilities for loading and processing markdown files

import { Platform } from 'react-native';

export interface DocFile {
  id: string;
  title: string;
  filename: string;
  emoji: string;
  content?: string;
}

// Static list of documentation files
const DOC_FILES: Omit<DocFile, 'content'>[] = [
  {
    id: 'architecture',
    title: 'Architecture',
    filename: 'ARCHITECTURE.md',
    emoji: '🏗️',
  },
  {
    id: 'installation',
    title: 'Installation Guide',
    filename: 'INSTALLATION.md',
    emoji: '🚀',
  },
  {
    id: 'profile-features',
    title: 'Profile Features',
    filename: 'PROFILE_FEATURES.md',
    emoji: '👤',
  },
  {
    id: 'readme',
    title: 'Client README',
    filename: 'README-client.md',
    emoji: '📄',
  },
  {
    id: 'testing',
    title: 'Testing Guide',
    filename: 'TESTING.md',
    emoji: '🧪',
  },
];

// Get list of available documentation files
export const getDocsList = (): Omit<DocFile, 'content'>[] => {
  return DOC_FILES;
};

// Get documentation file by ID
export const getDocById = (id: string): Omit<DocFile, 'content'> | null => {
  return DOC_FILES.find(doc => doc.id === id) || null;
};

// Load markdown content dynamically
export const loadDocContent = async(filename: string): Promise<string> => {
  try {
    // For now, we'll return sample content for each document
    // In a production app, you might want to fetch this from a server
    // or bundle the markdown files as static assets

    const sampleContent: Record<string, string> = {
      'ARCHITECTURE.md': `# 🏗️ Architecture Overview

This document outlines the architecture of the Todo App. Check the full documentation on [GitHub](https://github.com/warteamx/lab1-todoApp).

## 📱 Frontend Architecture

The client application is built with:
- **Expo SDK 53** 📦 - React Native framework
- **TypeScript** 🔷 - Type-safe development
- **Expo Router** 🧭 - File-based navigation
- **Supabase** 🗄️ - Backend as a Service
- **React Query** 🔄 - Data fetching and caching

## 📁 Folder Structure

\`\`\`
client/
├── app/                 # 🧭 Routes (Expo Router)
├── components/          # 🧩 Reusable UI components
├── hooks/              # 🪝 Custom React hooks
├── lib/                # 🛠️ Utilities and configurations
├── providers/          # 🎯 Context providers
└── themes/             # 🎨 Design system
\`\`\`

## 🧩 Component Architecture

Our components follow a modular approach:
- **UI Components** 🔧 - Low-level, reusable components
- **Module Components** 📦 - Feature-specific components
- **Layout Components** 🏗️ - Page structure components

## 🎛️ State Management

- **React Query** 🔄 for server state
- **React Context** 🎯 for theme and auth
- **Local state** 📍 with useState for component state`,

      'INSTALLATION.md': `# 🚀 Installation Guide

Follow these steps to set up the development environment. Check the full updated documentation on [GitHub](https://github.com/warteamx/lab1-todoApp).

## ✅ Prerequisites

- Node.js 18+ 🟢
- npm or yarn 📦
- Expo CLI (optional but recommended) ⚡

## 📋 Installation Steps

1. **📥 Clone the repository**
\`\`\`bash
git clone <repository-url>
cd todo-app/client
\`\`\`

2. **📦 Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **🎯 Start the development server**
\`\`\`bash
npm start
\`\`\`

4. **📱 Run on different platforms**
\`\`\`bash
# 🍎 iOS Simulator
npm run ios

# 🤖 Android Emulator
npm run android

# 🌐 Web browser
npm run web
\`\`\`

## ⚙️ Environment Setup

Create a \`.env\` file with your Supabase credentials:
\`\`\`
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
\`\`\``,

      'PROFILE_FEATURES.md': `# 👤 Profile Features

This document describes the user profile functionality. Check the full documentation on [GitHub](https://github.com/warteamx/lab1-todoApp).

## ✨ Features Overview

### 🖼️ Avatar Management
- Upload profile pictures 📸
- Automatic image resizing 🔄
- Fallback to default avatars 👤

### 📝 Profile Information
- Display name editing ✏️
- Email management 📧
- Account status indicators 🟢

### ⚙️ Settings Integration
- Theme preferences 🎨
- Account management 👤
- Privacy controls 🔒

## 🛠️ Implementation Details

The profile system uses:
- **Supabase Storage** 🗄️ for avatar uploads
- **React Query** 🔄 for data synchronization
- **Custom hooks** 🪝 for form validation

### 🧩 Key Components

- \`ProfileForm\` 📝 - Main profile editing form
- \`AvatarUpload\` 📸 - Image upload component
- \`ProfileAvatar\` 👤 - Display component

## 💡 Usage Examples

\`\`\`tsx
import { ProfileForm } from '@/components/modules/ProfileForm';

function ProfilePage() {
  return <ProfileForm />;
}
\`\`\``,

      'README-client.md': `# 📱 Todo App Client

A cross-platform React Native application built with Expo. Check the full documentation on [GitHub](https://github.com/warteamx/lab1-todoApp).

## 🌟 Overview

This is the client application for our Todo App, featuring:
- Modern React Native development with Expo 📦
- Cross-platform compatibility (iOS, Android, Web) 🌐
- Type-safe development with TypeScript 🔷
- Comprehensive testing suite 🧪
- Custom design system 🎨

## 🚀 Getting Started

### ⚡ Development Setup
1. Install dependencies: \`npm install\` 📦
2. Start the dev server: \`npm start\` 🎯
3. Use Expo Go app or simulator to view 📱

### 📜 Available Scripts
- \`npm start\` 🎯 - Start development server
- \`npm run ios\` 🍎 - Run on iOS simulator
- \`npm run android\` 🤖 - Run on Android emulator
- \`npm run web\` 🌐 - Run in web browser
- \`npm test\` 🧪 - Run test suite
- \`npm run lint\` 🔍 - Run ESLint

## 🏗️ Architecture

Built with modern React Native best practices:
- File-based routing with Expo Router 🧭
- Component-driven development 🧩
- Theme system for consistent design 🎨
- Modular folder structure 📁

## 🛠️ Technologies

- **Expo SDK 53** 📦 - React Native platform
- **TypeScript** 🔷 - Type safety
- **Supabase** 🗄️ - Backend services
- **React Query** 🔄 - Data fetching
- **Jest** 🧪 - Testing framework`,

      'TESTING.md': `# 🧪 Testing Guide

This document covers testing strategies and best practices. Check the full documentation on [GitHub](https://github.com/warteamx/lab1-todoApp).

## 🛠️ Testing Stack

- **Jest** 🃏 - Test runner and assertions
- **React Native Testing Library** 📱 - Component testing
- **Expo Jest** ⚡ - Expo-specific testing utilities

## 🔬 Test Types

### 🧪 Unit Tests
Test individual functions and components in isolation.

\`\`\`tsx
import { render, screen } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

test('renders button with title', () => {
  render(<Button title="Click me" />);
  expect(screen.getByText('Click me')).toBeTruthy();
});
\`\`\`

### 🔄 Integration Tests
Test component interactions and data flow.

### 🌍 E2E Tests
Test complete user workflows (planned).

## 🚀 Running Tests

\`\`\`bash
# ▶️ Run all tests
npm test

# 👀 Run tests in watch mode
npm run test:watch

# 📊 Run tests with coverage
npm run test:coverage

# 🤖 Run tests in CI mode
npm run test:ci
\`\`\`

## ✅ Best Practices

1. **Test behavior, not implementation** 🎯
2. **Use descriptive test names** 📝
3. **Keep tests focused and small** 🔬
4. **Mock external dependencies** 🎭
5. **Test error scenarios** ⚠️

## 📁 File Organization

\`\`\`
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── __tests__/
│           └── Button.test.tsx 🧪
\`\`\``,
    };

    return (
      sampleContent[filename] ||
      `# 📄 ${filename}

This document is currently being loaded... ⏳

The markdown rendering system is working! 🎉 This content is being displayed using our custom theme-aware markdown renderer.

## ✨ Features

- ✅ Cross-platform rendering (iOS, Android, Web, Desktop)
- ✅ Theme integration with app colors and typography 🎨
- ✅ Responsive design 📱
- ✅ Easy navigation from the settings modal 🧭

## 🚀 Next Steps

To load actual file content, you would:
1. Bundle markdown files as static assets 📦
2. Use a build-time plugin to import them 🔧
3. Or fetch them from a server/CDN 🌐

For now, this demonstrates the markdown rendering capabilities! 💪`
    );
  } catch (error) {
    console.error('Error loading document:', error);
    throw error;
  }
};

// Create a formatted title from filename
export const formatDocTitle = (filename: string): string => {
  return filename
    .replace('.md', '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
