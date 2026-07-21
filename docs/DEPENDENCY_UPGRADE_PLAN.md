# 📦 Dependency Upgrade Plan

This document tracks the planned and completed dependency upgrades across the frontend (Expo/React Native) and backend (Node.js/Express) for the **lab1-todoApp** project.

> **Closes:** [#44](https://github.com/warteamx/lab1-todoApp/issues/44)

---

## 📋 Current State (as of July 2026)

### Node.js Runtime

| Context           | Before         | After          |
| ----------------- | -------------- | -------------- |
| `engines` (all)   | >=20.0.0       | >=22.0.0       |
| CI workflow       | 20             | 22             |
| Docker base image | node:20-alpine | node:22-alpine |

### Backend (server/)

| Package               | Before  | After   | Type  |
| --------------------- | ------- | ------- | ----- |
| express               | 5.1.0   | 5.2.1   | patch |
| @supabase/supabase-js | 2.52.0  | 2.110.7 | minor |
| cors                  | 2.8.5   | 2.8.6   | patch |
| pg                    | 8.16.3  | 8.22.0  | minor |
| postgres              | 3.4.7   | 3.4.9   | patch |
| helmet                | ^8.1.0  | ^8.3.0  | minor |
| morgan                | ^1.10.1 | ^1.11.0 | minor |
| multer                | ^2.0.2  | ^2.2.0  | minor |
| winston               | ^3.17.0 | ^3.19.0 | minor |
| yaml                  | ^2.8.0  | ^2.9.0  | minor |

### Frontend (client/)

| Package                       | Before  | After    | Type  |
| ----------------------------- | ------- | -------- | ----- |
| expo                          | ~53.0.9 | ~53.0.27 | patch |
| expo-auth-session             | ~6.2.0  | ~6.2.1   | patch |
| expo-blur                     | ~14.1.4 | ~14.1.5  | patch |
| expo-constants                | ~17.1.6 | ~17.1.8  | patch |
| expo-font                     | ~13.3.1 | ~13.3.2  | patch |
| expo-linking                  | ~7.1.5  | ~7.1.7   | patch |
| expo-router                   | ~5.0.6  | ~5.0.7   | patch |
| expo-secure-store             | ~14.2.3 | ~14.2.4  | patch |
| expo-splash-screen            | ~0.30.8 | ~0.30.10 | patch |
| expo-symbols                  | ~0.4.4  | ~0.4.5   | patch |
| expo-system-ui                | ~5.0.7  | ~5.0.11  | patch |
| jest-expo                     | ~53.0.9 | ~53.0.14 | patch |
| @supabase/supabase-js         | ^2.50.1 | ^2.110.7 | minor |
| @tanstack/react-query         | ^5.83.0 | ^5.101.3 | minor |
| @tanstack/eslint-plugin-query | ^5.81.2 | ^5.101.3 | minor |

### Bug Fixes

| Area   | Fix                                                                                                                                                                  |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| server | Added `@rollup/rollup-linux-x64-gnu` to `optionalDependencies` to fix vitest failing on Linux CI runners (was previously only listing `@rollup/rollup-darwin-arm64`) |

---

## 🚧 Deferred Upgrades (Future Work)

These upgrades involve breaking changes or sequential migration steps and are deferred to follow-up issues.

### Expo SDK: 53 → 57

**Risk:** HIGH — requires sequential migration through SDK 54, 55, 56, 57.

| SDK | Key React Native Version | Notable Changes                    |
| --- | ------------------------ | ---------------------------------- |
| 53  | 0.79                     | Current baseline                   |
| 54  | 0.80                     | New architecture default; Hermes 2 |
| 55  | 0.81                     | Fabric & JSI stabilization         |
| 56  | 0.83                     | Metro 0.82, new bundler APIs       |
| 57  | 0.86                     | Latest; full new architecture      |

**Steps:**

1. Run `npx expo install --fix` after each SDK bump to align companion packages
2. Follow the [official Expo upgrade guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
3. Validate navigation, gestures, animations, and native modules at each step
4. Update `babel.config.js`, `metro.config.js`, `app.json` / `app.config.ts` as needed
5. Run all tests and a manual device/simulator smoke test after each step

**Packages that change significantly at SDK 57:**

| Package              | SDK 53    | SDK 57  |
| -------------------- | --------- | ------- |
| react-native         | 0.79.2    | 0.86.x  |
| expo-router          | ~5.0.x    | ~57.0.x |
| expo-auth-session    | ~6.2.x    | ~57.0.x |
| All expo-\* packages | 14.x–17.x | 57.0.x  |

### react-native-async-storage: 2 → 3

**Risk:** MEDIUM — v3 introduces API changes.

- `AsyncStorage.getItem()` no longer accepts a callback; use Promise/async-await only
- Review all usages in `client/` before upgrading

### react-native-url-polyfill: 2 → 4

**Risk:** LOW — review peer dependency changes and usage in `client/lib/supabase.ts`.

### Node.js: 22 → 24

**Risk:** LOW — Node.js 24 becomes LTS in October 2026.

- Monitor LTS announcement and update `engines`, CI, and Dockerfile when stable

---

## ✅ Validation Checklist

### Backend

- [x] Server lint passes (`npm run lint` in `server/`)
- [x] All 38 server tests pass (`npm run test` in `server/`)
- [x] Server builds without errors (`npm run build` in `server/`)
- [ ] Docker image builds successfully (`docker build -t lab1-todoapp-server .` in `server/`)
- [ ] API health endpoint responds after container start

### Frontend

- [x] Client lint passes (`npm run lint` in `client/`)
- [x] Client tests pass (`npm run test:ci` in `client/`)
- [x] Client web build passes (`npm run build` in `client/`)
- [ ] `expo start` launches without errors (iOS, Android, Web)
- [ ] Navigation and authentication flows work end-to-end
- [ ] Supabase data fetch and mutation work correctly

### CI/CD

- [x] CI uses Node.js 22 (updated in `.github/workflows/ci-cd.yml`)
- [ ] CI test-and-lint job passes on the PR
- [ ] No new security advisories on updated packages

---

## 🔐 Security Notes

- Updated `@supabase/supabase-js` from 2.52.0 → 2.110.7 addresses multiple upstream dependency security fixes
- Updated `pg` from 8.16.3 → 8.22.0 includes connection security hardening
- All target versions were checked against the GitHub Advisory Database — no known vulnerabilities found

---

## 📚 References

- [Expo SDK upgrade walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- [React Native upgrade helper](https://react-native-community.github.io/upgrade-helper/)
- [Node.js release schedule](https://nodejs.org/en/about/previous-releases)
- [Supabase JS changelog](https://github.com/supabase/supabase-js/blob/master/CHANGELOG.md)
