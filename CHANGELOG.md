# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# [v1.0.4](https://github.com/warteamx/lab1-todoApp/compare/v1.0.3...v1.0.4) (2025-09-05)

## 🐛 Bug Fixes

- [`f3736d1`](https://github.com/warteamx/lab1-todoApp/commit/f3736d1) fix(docker): regenerate package-lock.json in Docker build stages

# [v1.0.3](https://github.com/warteamx/lab1-todoApp/compare/v1.0.2...v1.0.3) (2025-09-05)

## 🐛 Bug Fixes

- [`a654108`](https://github.com/warteamx/lab1-todoApp/commit/a654108) fix(ci): resolve npm ci sync issue in Docker build
- [`36d2827`](https://github.com/warteamx/lab1-todoApp/commit/36d2827) fix(ci): resolve rollup optional dependencies issue in test jobs

# [v1.0.2](https://github.com/warteamx/lab1-todoApp/compare/v1.0.1...v1.0.2) (2025-09-05)

## 🐛 Bug Fixes

- [`8ce7ff6`](https://github.com/warteamx/lab1-todoApp/commit/8ce7ff6) fix(ci): add semantic-release outputs to trigger deploy job

# [v1.0.1](https://github.com/warteamx/lab1-todoApp/compare/v1.0.0...v1.0.1) (2025-09-05)

## 🐛 Bug Fixes

- [`7a346ba`](https://github.com/warteamx/lab1-todoApp/commit/7a346ba) fix: resolve npm install warnings and server test failures (Issues: [`#26`](https://github.com/warteamx/lab1-todoApp/issues/26))

# [v1.0.0](https://github.com/warteamx/lab1-todoApp/compare/...v1.0.0) (2025-09-04)

## ⚠ BREAKING CHANGES

- This replaces the existing multi-workflow CI/CD system with a simpler,
  more reliable single-workflow approach that ensures quality gates are respected.

## 🚀 Features

- **ci**: refactor CI/CD with simplified unified pipeline ([e93d3b8](https://github.com/warteamx/lab1-todoApp/commit/e93d3b88cee9b2aa8da537e0144864971ecd12ac))
