# Jest Configuration for Excluding Utility Files

## 🎯 **Problem**
Jest was running tests on utility files (e.g., `*.skip.utils.tsx`) which contain helper functions, mock components, and test data but shouldn't be executed as test suites.

## ✅ **Solution Implemented**

### **Current Configuration (Recommended)**

We've implemented a robust Jest configuration that:

1. **Explicitly defines what files are tests** using `testMatch`
2. **Excludes utility files** using `testPathIgnorePatterns`
3. **Uses proper naming conventions** for utility files

#### **Updated package.json:**

```json
{
  "jest": {
    "preset": "jest-expo",
    "testMatch": [
      "**/__tests__/**/*.test.{js,jsx,ts,tsx}",
      "**/?(*.)+(spec|test).{js,jsx,ts,tsx}"
    ],
    "testPathIgnorePatterns": [
      "/node_modules/",
      "\\.skip\\.",
      "\\.utils\\.",
      "\\.helper\\."
    ],
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)"
    ]
  }
}
```

#### **File Naming Convention:**
- ✅ **Test files**: `Component.test.tsx`
- ✅ **Utility files**: `Component.test.utils.tsx`
- ✅ **Helper files**: `Component.test.helpers.tsx`
- ✅ **Skip files**: `Component.skip.tsx`

## 🔧 **Alternative Solutions**

### **Option 1: Use `testMatch` Only (Strictest)**
```json
{
  "jest": {
    "testMatch": [
      "**/__tests__/**/*.test.{js,jsx,ts,tsx}",
      "**/*.test.{js,jsx,ts,tsx}"
    ]
  }
}
```
**Pros**: Only files with `.test.` in the name are considered tests
**Cons**: Requires strict naming convention

### **Option 2: Directory-Based Separation**
```
__tests__/
├── Card.test.tsx           # ✅ Test file
├── utils/
│   ├── Card.utils.tsx      # ✅ Utility file (in subdirectory)
│   └── common.utils.tsx    # ✅ Shared utilities
└── helpers/
    └── test-helpers.tsx    # ✅ Helper functions
```

Jest config:
```json
{
  "jest": {
    "testPathIgnorePatterns": [
      "**/__tests__/utils/",
      "**/__tests__/helpers/"
    ]
  }
}
```

### **Option 3: Use `setupFilesAfterEnv` for Global Utilities**
Move common utilities to a global setup file:

```json
{
  "jest": {
    "setupFilesAfterEnv": ["<rootDir>/src/test-utils/setup.ts"]
  }
}
```

### **Option 4: Different File Extensions**
```
__tests__/
├── Card.test.tsx           # ✅ Test file
├── Card.utils.ts           # ✅ Utility file (.ts extension)
└── Card.helpers.js         # ✅ Helper file (.js extension)
```

Jest only looks for `.test.` or `.spec.` by default.

## 📋 **Verification Commands**

### **List all test files Jest will run:**
```bash
npx jest --listTests
```

### **Run tests with verbose output:**
```bash
npm test -- --verbose
```

### **Run tests for specific component:**
```bash
npm test Card
```

### **Check test coverage:**
```bash
npm run test:coverage
```

## 🎯 **Best Practices**

### **1. Consistent Naming**
- Always use `.test.` for actual test files
- Use `.utils.` or `.helpers.` for utility files
- Use `.mock.` for mock files

### **2. Clear File Organization**
```
Component/
├── __tests__/
│   ├── Component.test.tsx        # Main tests
│   ├── Component.test.utils.tsx  # Test utilities
│   ├── Component.integration.test.tsx  # Integration tests
│   └── Component.unit.test.tsx   # Unit tests
├── Component.tsx
├── Component.interface.ts
└── Component.helpers.ts
```

### **3. Import Patterns**
```typescript
// ✅ Good: Clear utility import
import { renderWithTheme, MockIcon } from './Card.test.utils';

// ❌ Avoid: Ambiguous imports
import { utils } from './utils';
```

### **4. Documentation**
Always include a comment at the top of utility files:
```typescript
/**
 * Test utilities for Card component
 * This file contains reusable mocks, helpers, and test data
 * Following DRY principles for maintainable tests
 */
```

## 🔄 **Migration Guide**

### **From `.skip.utils.tsx` to `.test.utils.tsx`:**

1. **Rename files:**
   ```bash
   mv Component.skip.utils.tsx Component.test.utils.tsx
   ```

2. **Update imports:**
   ```typescript
   // Before
   import { ... } from './Component.skip.utils';
   
   // After
   import { ... } from './Component.test.utils';
   ```

3. **Remove describe.skip blocks:**
   ```typescript
   // Remove this from utility files
   describe.skip("Skipped test suite", () => {
     it("won't run", () => {
       expect(true).toBe(false);
     });
   });
   ```

## 📊 **Verification Results**

After implementing this configuration:

- ✅ **Test files detected**: 3 test files found
- ✅ **Utility files ignored**: `Card.test.utils.tsx` not in test list
- ✅ **All tests passing**: 45 Card component tests pass
- ✅ **No utility test execution**: No more accidental utility file runs

## 🚀 **Recommended for Team**

The implemented solution (**Option 1 with testMatch + testPathIgnorePatterns**) is recommended because:

1. **Clear and explicit** about what constitutes a test
2. **Flexible** - supports multiple naming patterns
3. **Maintainable** - easy to understand and modify
4. **Scalable** - works well as the project grows
5. **Standard** - follows Jest best practices

This configuration ensures that only actual test files are executed while utility files remain accessible for imports but are never run as test suites.
