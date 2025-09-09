# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


# [v1.1.1](https://github.com/warteamx/lab1-todoApp/compare/v1.1.0...v1.1.1) (2025-09-09)

## 🐛 Bug Fixes
- [`0562f56`](https://github.com/warteamx/lab1-todoApp/commit/0562f56)  fix(openapi): Update server configuration for HTTP-only serving and enhance Swagger UI functionality

# [v1.1.0](https://github.com/warteamx/lab1-todoApp/compare/v1.0.4...v1.1.0) (2025-09-08)

## ✨ New Features
- [`cb3a54d`](https://github.com/warteamx/lab1-todoApp/commit/cb3a54d)  feat(docs): add emoji support to documentation titles and update content 
- [`78fa2c1`](https://github.com/warteamx/lab1-todoApp/commit/78fa2c1)  feat(ui): enhance welcome message with emojis and add version button in NavigationHeader modal 
- [`903b7aa`](https://github.com/warteamx/lab1-todoApp/commit/903b7aa)  feat(coverage): enhance coverage reporting for client and server, update CI/CD workflow, and add Codecov configuration 
- [`024d633`](https://github.com/warteamx/lab1-todoApp/commit/024d633)  feat(semver): Simplify changelog and versioning system 
- [`14c1221`](https://github.com/warteamx/lab1-todoApp/commit/14c1221)  feat(env): Enhance environment variable management and setup scripts 
- [`cdd2091`](https://github.com/warteamx/lab1-todoApp/commit/cdd2091)  feat(docs): Add documentation structure 
- [`cdb5a9d`](https://github.com/warteamx/lab1-todoApp/commit/cdb5a9d)  feat(security): Enhance Helmet configuration for Swagger UI and improve path resolution for OpenAPI files 

## 🐛 Bug Fixes
- [`9b8dace`](https://github.com/warteamx/lab1-todoApp/commit/9b8dace)  fix(client): version component 
- [`6656d2e`](https://github.com/warteamx/lab1-todoApp/commit/6656d2e)  fix(lint): replace eslint --fix with npm lint:fix for client and server

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
