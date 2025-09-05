# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


# [v1.0.4](https://github.com/warteamx/lab1-todoApp/compare/v1.0.3...v1.0.4) (2025-09-05)

## 🐛 Bug Fixes
- [`f3736d1`](https://github.com/warteamx/lab1-todoApp/commit/f3736d1)  fix(docker): regenerate package-lock.json in Docker build stages

# [v1.0.3](https://github.com/warteamx/lab1-todoApp/compare/v1.0.2...v1.0.3) (2025-09-05)

## 🐛 Bug Fixes
- [`a654108`](https://github.com/warteamx/lab1-todoApp/commit/a654108)  fix(ci): resolve npm ci sync issue in Docker build 
- [`36d2827`](https://github.com/warteamx/lab1-todoApp/commit/36d2827)  fix(ci): resolve rollup optional dependencies issue in test jobs

# [v1.0.2](https://github.com/warteamx/lab1-todoApp/compare/v1.0.1...v1.0.2) (2025-09-05)

## 🐛 Bug Fixes
- [`8ce7ff6`](https://github.com/warteamx/lab1-todoApp/commit/8ce7ff6)  fix(ci): add semantic-release outputs to trigger deploy job

# [v1.0.1](https://github.com/warteamx/lab1-todoApp/compare/v1.0.0...v1.0.1) (2025-09-05)

## 🐛 Bug Fixes
- [`7a346ba`](https://github.com/warteamx/lab1-todoApp/commit/7a346ba)  fix: resolve npm install warnings and server test failures (Issues: [`#26`](https://github.com/warteamx/lab1-todoApp/issues/26))

## 1.0.0 (2025-09-04)

### ⚠ BREAKING CHANGES

* This replaces the existing multi-workflow CI/CD system with a simpler,
more reliable single-workflow approach that ensures quality gates are respected.

* 🚀 ci: refactor CI/CD with simplified unified pipeline ([e93d3b8](https://github.com/warteamx/lab1-todoApp/commit/e93d3b88cee9b2aa8da537e0144864971ecd12ac))

## [1.1.1] - 2025-09-04

### ✨ Features

- Add health service ([ffff6b66](../../commit/ffff6b6620f0674133f50bbed2cf4367b905496b))
- Refactor Button add tests ([1e14099c](../../commit/1e14099ca7dbfd859de2011bb4123b89efc0f55a))
- Add server log functionality with winston and morgan ([88d97ba9](../../commit/88d97ba9669bca4ed1a632fbb01a005f6169bf4e))
- Implement web file upload for avatar with validation ([b8725398](../../commit/b87253987973f01a6a086847c5943331dcc3b95d))
- Add Upload profile ([669b19d2](../../commit/669b19d2676268ac20dca4416f06122d3a28ecd2))
- enhance todo functionality with create, update, and delete operations; refactor API calls and UI components ([19bad4f7](../../commit/19bad4f75533ca962a7aa8fc0134565813743475))
- integrate React Query and theme provider ([ff8e14c1](../../commit/ff8e14c1d74a536129db69076e34ef3326e1fcd8))
- [server] Add delete functionality for todos ([95c0bd7c](../../commit/95c0bd7cdea2bac39054e4a83b26294b42116e24))
- Implement update functionality for todos, including new schemas and routes ([ebd6dbcc](../../commit/ebd6dbcc9ec48817c7ed3f70ea48a5fb6c3f78f0))
- Create Tasks ([a3a7b445](../../commit/a3a7b44580d0b415e2e302f653d254187c2118ac))
- add auth middleware ([bd6ce6c5](../../commit/bd6ce6c57dc8a542451d8b6e3da85f4e3cb07a79))
- Expo add new todo functionality with input and submission handling ([d434b4ac](../../commit/d434b4ac6e449af6dff43923c85d406c738df4ff))
- expo user can fetch todos from the server ([5d589de9](../../commit/5d589de9ec368780a96035022aec1a07beb79593))
- Initialize Express server with TypeScript and basic DDD ([c22dc55f](../../commit/c22dc55f4c5b9a77c099f44846e09f032d1d2dee))
- Replace AsyncStorage with ExpoSecureStore for Supabase authentication storage ([5350ac83](../../commit/5350ac83ba8bee90da6b74f2bdc9b0060641a3aa))
- Implement authentication flow with Supabase, including sign-in and sign-up screens, and user session management ([fbcea75f](../../commit/fbcea75ffe9e70dad6118e75c1ec9ffb6b3b2779))
- Update app configuration for Supabase integration and add auth session support ([66a932fb](../../commit/66a932fb1260eea9b5b24316e8b4adf4f8debcf4))
- Add auth Supabase ([cef73d39](../../commit/cef73d398312a50063228d27e2b2bb6cdc9df622))
- add login screen with email and Meta (Facebook) authentication using AWS Amplify ([22455985](../../commit/22455985d6791ed857b06013881bb27ad1a38692))
- initialize Express TypeScript server with basic structure and routes ([66de69b5](../../commit/66de69b5eb65540027eb68063296b2c8b0845d9d))
- Update README and HomeScreen title. ([0f3d8abd](../../commit/0f3d8abdb13c82600b097095fbd5b0221ba0a55b))
- Initialize Expo app with essential configurations and reset script ([039953d4](../../commit/039953d4f75901a3f906599ffb77ed61614e9152))

### 🧪 Testing

- add profle tests ([ff17cc29](../../commit/ff17cc296aeba5d48d88b29efb430a23a310db6b))
- Add test suite for todo service ([fde787a8](../../commit/fde787a8009af2207bc37a7a7cb9bfd1a6a9cf7b))
- add ProfileForm test suit ([2d6f8777](../../commit/2d6f87776ef3ffb9df9fa3645e1b34d78714d1b3))
- Add test to AvatarUpload component ([1f80f0e5](../../commit/1f80f0e5adc0a9d16d3f1b584ab7cf6fc519480d))
- tests to View UI component ([2b96736a](../../commit/2b96736a3078016c805b1aab7e681e06631d0c3a))
- Add Test to Text Ui ([67902dde](../../commit/67902ddefd2527d6e2553b3069f0279f10b3f117))
- Add tests to Layout UI ([5a55cc23](../../commit/5a55cc23edcd5253a7f553277da7ee737a8391b4))
- Add Input ui tests ([784155b9](../../commit/784155b94cd20609888e6896044bf03a3c1eb6b4))
- Add header tests ([2868f2ff](../../commit/2868f2fffb577779ab8975b3b2625f9b6c57a1bf))
- Add Card Tests ([3fe39e74](../../commit/3fe39e748e988d5c168195c653de56fe631cc1d4))
