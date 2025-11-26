# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.0] - 2024-11-26

### Breaking Changes
- **Dropped support for Node.js versions below 20** - minimum version now Node.js 20+
- **Migrated to ES modules** - package.json now includes `"type": "module"`
- **Changed build output** - now using tsup for optimized bundling
- **AWS SDK v3** - migrated from v2, changes to internal S3 client implementation

### Added
- Comprehensive input validation for file uploads:
  - File existence and readability checks
  - Directory vs file validation
  - File size limits (5GB maximum)
  - Helpful error messages for common mistakes
- S3 bucket name format validation with regex checking
- Test coverage infrastructure with c8:
  - Coverage reporting (text, lcov, HTML)
  - Configurable coverage thresholds
  - `test:coverage` script in package.json
- Enhanced documentation:
  - README with badges (tests, npm version, license, Node.js)
  - Features section highlighting key capabilities
  - Comprehensive troubleshooting guide with 5 common issues
  - Complete development setup guide
  - Installation instructions for multiple package managers
- Community documentation:
  - CONTRIBUTING.md with detailed contribution guidelines
  - CODE_OF_CONDUCT.md based on Contributor Covenant v2.1
  - SECURITY.md with security policy and best practices
- Configuration via environment variables:
  - `PUSHFILE_AWS_KEY`
  - `PUSHFILE_AWS_SECRET`
  - `PUSHFILE_S3_BUCKET`
  - `PUSHFILE_CUSTOM_URL`
- `.nvmrc` file specifying Node.js 20
- TypeScript declaration files (`.d.ts`) are now properly exported
- Modern package.json fields:
  - `"types"` field for TypeScript support
  - `"files"` field to control published content
  - Updated `"keywords"` for better npm discoverability

### Changed
- **Migrated from AWS SDK v2 to AWS SDK v3**:
  - Better tree-shaking and smaller bundle sizes
  - Modern TypeScript support
  - Improved performance
  - Updated S3 client initialization and methods
- **Migrated from ESLint/Prettier to Biome**:
  - Faster linting and formatting (single tool)
  - Simpler configuration
  - Better TypeScript integration
- **Modernized build system**:
  - Replaced `tsc` with `tsup` for bundling
  - Generates both CLI and library exports
  - Optimized output with sourcemaps
  - Faster build times
- **Enhanced TypeScript configuration**:
  - Enabled strict mode for better type safety
  - Added `noUncheckedIndexedAccess` for safer array access
  - Added `exactOptionalPropertyTypes` for precise optional handling
  - Added `isolatedModules` for better build tool compatibility
  - Added `verbatimModuleSyntax` for explicit imports/exports
- **Updated GitHub Actions workflow**:
  - Updated to `actions/checkout@v4` and `actions/setup-node@v4`
  - Updated Node.js test matrix to `[20.x, 22.x, 24.x]`
  - Added pnpm setup with `pnpm/action-setup@v2`
  - Added build verification step
  - Added typecheck and format checks to CI
- **Improved error messages**:
  - More descriptive and actionable error messages
  - Better validation error context
  - Clearer configuration instructions
- **Reorganized codebase**:
  - Split functionality into logical modules
  - Better separation of concerns
  - Improved maintainability
- Updated package manager to pnpm 10.22.0
- CHANGELOG now follows "Keep a Changelog" format with comparison links

### Fixed
- TypeScript compilation issues with `exactOptionalPropertyTypes`
- Package entry points now correctly reference built files
- Test configuration to properly exclude test files from TypeScript compilation

### Security
- Updated all dependencies to latest versions
- Removed deprecated AWS SDK v2
- Added input validation to prevent malicious file operations
- Added S3 bucket name validation to prevent injection attacks
- Documented security best practices in SECURITY.md

### Dependencies
- Upgraded `@aws-sdk/client-s3` to ^3.940.0 (from aws-sdk v2)
- Upgraded `chalk` to ^5.6.2
- Upgraded `clipboardy` to ^5.0.1
- Upgraded `commander` to ^14.0.2
- Upgraded `cosmiconfig` to ^9.0.0
- Upgraded `figlet` to ^1.9.4
- Upgraded `inquirer` to ^13.0.1
- Upgraded `mime-types` to ^3.0.2
- Added `@biomejs/biome` 2.3.7 (replacing ESLint/Prettier)
- Added `c8` ^10.1.3 for coverage
- Added `tsup` ^8.5.1 for bundling
- Updated `typescript` to ^5.9.3
- Updated `vitest` to ^4.0.14

## [3.0.1] - 2021-05-20

### Changed
- Updated dependencies to latest versions
  - @types/node to 15.6.0
  - @typescript-eslint/eslint-plugin to 4.24.0
  - @typescript-eslint/parser to 4.24.0
  - aws-sdk to 2.912.0
  - eslint to 7.27.0
  - eslint-plugin-import to 2.23.3
  - inquirer to 8.1.0
  - mocha to 8.4.0
  - prettier to 2.3.0
  - ts-node to 10.0.0

## [3.0.0] - 2021-04-30

### Breaking Changes
- **Dropped support for Node.js v10 (Dubnium)** - minimum version now Node.js 12+

### Changed
- Migrated entire codebase from JavaScript to TypeScript
- Updated dependencies to latest versions:
  - aws-sdk to 2.902.0
  - chalk to 4.1.1
  - commander to 7.2.0
  - hashids to 2.2.8
  - inquirer to 8.0.0
  - mime-types to 2.1.30
  - chai to 4.3.4
  - eslint to 7.25.0
  - eslint-config-airbnb-base to 14.2.1
  - eslint-config-prettier to 8.3.0

### Removed
- Rollup (no longer needed with TypeScript compilation)
- Unnecessary ESLint configurations

## [2.0.2] - 2020-10-10

### Changed
- Updated dependencies to latest versions:
  - @babel/cli to 7.11.6
  - @babel/core to 7.11.6
  - aws-sdk to 2.771.0
  - eslint to 7.11.0
  - eslint-config-prettier to 6.12.0
  - eslint-plugin-import to 2.22.1
  - prettier to 2.1.2
  - rollup to 2.29.0
  - rollup-plugin-terser to 7.0.2
  - uglify-js to 3.11.2

## [2.0.1] - 2020-09-10

### Changed
- Updated dependencies to latest versions:
  - @babel/cli to 7.11.5
  - @babel/core to 7.11.5
  - @babel/polyfill to 7.11.5
  - @babel/preset-env to 7.11.5
  - @babel/register to 7.11.5
  - aws-sdk to 2.743.0
  - commander to 6.1.0
  - eslint to 7.8.0
  - prettier to 2.1.1
  - rollup to 2.26.9
  - rollup-plugin-terser to 7.0.1
  - uglify-js to 3.10.3

## [2.0.0] - 2020-07-15

### Breaking Changes
- **Dropped support for Node.js v8 (Carbon)** - minimum version now Node.js 10+

## [1.2.0] - 2020-07-01

### Changed
- Modified base command structure to match Commander 6.0.0 API changes
- Updated dependencies to latest versions:
  - @babel/cli to 7.10.5
  - @babel/core to 7.10.5
  - @babel/polyfill to 7.10.4
  - @babel/preset-env to 7.10.4
  - @babel/register to 7.10.5
  - aws-sdk to 2.721.0
  - chalk to 4.1.0
  - commander to 6.0.0
  - eslint to 7.5.0
  - eslint-config-airbnb-base to 14.2.0
  - eslint-config-prettier to 6.11.0
  - eslint-plugin-import to 2.22.0
  - eslint-plugin-prettier to 3.1.4
  - figlet to 1.5.0
  - inquirer to 7.3.3
  - mime-types to 2.1.27
  - mocha to 8.0.1
  - prettier to 2.0.5
  - rollup to 2.23.0
  - rollup-plugin-terser to 6.1.0
  - uglify-js to 3.10.0

## [1.1.5] - 2020-02-15

### Changed
- Updated dependencies to latest versions:
  - aws-sdk to 2.620.0
  - clipboardy to 2.2.0
  - commander to 4.1.1
  - hashids to 2.2.1
  - inquirer to 7.0.4
  - mime-types to 2.1.26
  - @babel/cli to 7.8.4
  - @babel/core to 7.8.4
  - @babel/polyfill to 7.8.3
  - @babel/preset-env to 7.8.4
  - @babel/register to 7.8.3
  - eslint to 6.8.0
  - eslint-config-prettier to 6.10.0
  - eslint-plugin-import to 2.20.1
  - mocha to 7.0.1
  - rollup to 1.31.1
  - rollup-plugin-terser to 5.2.0
  - uglify-js to 3.8.0

## [1.1.4] - 2019-12-15

### Changed
- Converting some calls to Promises for future async conversion
- Converted ESLint airbnb config to use "base" version (removed React dependencies)
- Updated dependencies:
  - aws-sdk to 2.597.0
  - rollup to 1.27.14
  - @babel/register to 7.7.7
  - @babel/preset-env to 7.7.7
  - @babel/core to 7.7.7
  - @babel/cli to 7.7.7
  - hashids to 2.1.0
  - prettier to 1.19.1
  - mime-types to 2.1.25
  - chalk to 3.0.0

## [1.1.3] - 2019-11-15

### Changed
- Updated dependencies:
  - @babel/cli to 7.7.0
  - @babel/core to 7.7.2
  - @babel/preset-env to 7.7.1
  - @babel/register to 7.7.0
  - aws-sdk to 2.576.0
  - commander to 4.0.1
  - eslint-config-prettier to 6.7.0
  - rollup to 1.27.3
  - uglify-js to 3.6.9

## [1.1.2] - 2019-10-15

### Changed
- Updated dependencies:
  - @babel/cli to 7.6.4
  - @babel/core to 7.6.4
  - @babel/preset-env to 7.6.3
  - aws-sdk to 2.550.0
  - commander to 3.0.2
  - eslint-config-prettier to 6.4.0
  - eslint-plugin-react to 7.16.0
  - mocha to 6.2.1
  - rollup to 1.24.0
  - uglify-js to 3.6.2

## [1.1.1] - 2019-09-15

### Changed
- Updated dependencies:
  - eslint-config-prettier to 6.3.0
  - hashids to 2.0.1
  - rollup to 1.21.4
  - eslint-plugin-prettier to 3.1.1
  - @babel/cli to 7.6.2
  - aws-sdk to 2.537.0
  - @babel/core to 7.6.2
  - @babel/preset-env to 7.6.2
  - @babel/register to 7.6.2
  - rollup-plugin-terser to 5.1.2

## [1.1.0] - 2019-08-15

### Changed
- Updated dependencies with API changes:
  - hashids to 2.0.0 (API changes - may affect custom commands)
  - commander to 3.0.1 (API changes - may affect custom commands)
  - eslint-config-prettier to 6.2.0
  - aws-sdk to 2.522.0
  - rollup to 1.20.3
  - rollup-plugin-commonjs to 10.1.0
  - inquirer to 7.0.0
  - figlet to 1.2.4
  - eslint-utils to 1.4.2

### Note
Both `commander` and `hashids` had changes to their APIs. This does not affect pushfile's main API, but might affect custom commands for users.

## [1.0.4] - 2019-07-10

### Changed
- Updated dependencies:
  - aws-sdk from 2.492.0 to 2.493.0
  - rollup from 1.16.7 to 1.17.0

## [1.0.3] - 2019-06-15

### Changed
- Minor dependency updates

## [1.0.2] - 2019-06-01

### Changed
- Minor dependency updates

## [1.0.1] - 2019-05-15

### Changed
- Minor dependency updates

## [1.0.0] - 2019-05-01

### Added
- Implemented Dependabot for automated security updates
- Finalized development workflow

### Changed
- Updated all dependencies to latest versions
- Reached maturity for v1.0.0 release

### Note
**Now following Semantic Versioning (SEMVER)**

## [0.6.1] - 2018-12-15

### Changed
- Replaced `copy-paste` with `clipboardy` for better cross-platform clipboard support
- Updated dependencies

## [0.6.0] - 2018-10-01

### Changed
- General improvements and dependency updates

## [0.5.0] - 2018-08-01

### Changed
- General improvements and dependency updates

## [0.4.0] - 2018-06-01

### Changed
- Replaced `Optimist` with `nomnom` for command line argument parsing
- Updated AWS SDK to use `upload` method instead of deprecated `push` method
- Bumped all dependency versions

## [0.3.0] - 2018-03-01

### Changed
- Implemented PushFile using native AWS SDK instead of outdated third-party package

## [0.2.0] - 2017-12-01

### Added
- Feature to make all pushed files public by default

## [0.1.0] - 2017-10-01

### Added
- Initial release
- Basic functionality to upload files to S3
- Generate shareable URLs
- Copy URLs to clipboard

[Unreleased]: https://github.com/joshfinnie/pushfile/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/joshfinnie/pushfile/compare/v3.0.1...v4.0.0
[3.0.1]: https://github.com/joshfinnie/pushfile/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/joshfinnie/pushfile/compare/v2.0.2...v3.0.0
[2.0.2]: https://github.com/joshfinnie/pushfile/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/joshfinnie/pushfile/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/joshfinnie/pushfile/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/joshfinnie/pushfile/compare/v1.1.5...v1.2.0
[1.1.5]: https://github.com/joshfinnie/pushfile/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/joshfinnie/pushfile/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/joshfinnie/pushfile/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/joshfinnie/pushfile/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/joshfinnie/pushfile/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/joshfinnie/pushfile/compare/v1.0.4...v1.1.0
[1.0.4]: https://github.com/joshfinnie/pushfile/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/joshfinnie/pushfile/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/joshfinnie/pushfile/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/joshfinnie/pushfile/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/joshfinnie/pushfile/compare/v0.6.1...v1.0.0
[0.6.1]: https://github.com/joshfinnie/pushfile/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/joshfinnie/pushfile/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/joshfinnie/pushfile/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/joshfinnie/pushfile/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/joshfinnie/pushfile/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/joshfinnie/pushfile/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/joshfinnie/pushfile/releases/tag/v0.1.0
