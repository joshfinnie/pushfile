# TODO: Modernization Tasks for pushfile

This document outlines all the tasks needed to bring the pushfile package up to modern standards.

## Critical Issues

### 1. Migrate from AWS SDK v2 to v3

- [x] Replace `aws-sdk` with `@aws-sdk/client-s3`
- [x] Update S3 client initialization code in `src/helpers.ts`
- [x] Update all S3 method calls to use v3 API
- [x] Update types from `aws-sdk` to `@aws-sdk/client-s3`
- [ ] Test upload functionality after migration
- [x] Remove `aws-sdk` from dependencies

**Why**: AWS SDK v2 entered maintenance mode and will eventually be deprecated. v3 has better tree-shaking, smaller bundle sizes, and modern TypeScript support.

### 2. Fix Build Tool Configuration - Use Biome

- [x] Update package.json scripts to use Biome instead of ESLint
  - Change `"format": "eslint --fix src"` to `"format": "biome check --write src"`
  - Change `"format:ci": "eslint src"` to `"format:ci": "biome ci src"`
- [x] Remove any ESLint dependencies from package.json if present
- [x] Remove any .eslintrc\* config files if present

**Why**: You've migrated from ESLint/Prettier to Biome, but the package.json scripts still reference ESLint. This causes build failures.

### 3. Resolve TypeScript Module System Conflict

- [x] Decision needed: Keep CommonJS or migrate to ESM?
- [x] If migrating to ESM: Update tsconfig.json to use `"module": "esnext"` and add `"type": "module"` to package.json
- [x] Update bin file if migrating to ESM

**Why**: biome.json enforces no CommonJS but tsconfig.json outputs CommonJS.

## TypeScript Configuration

### 4. Enable Strict Mode

- [x] Change `"strict": false` to `"strict": true` in tsconfig.json
- [x] Fix any type errors that appear
- [x] Add explicit return types to functions
- [x] Fix any `any` types (biome already flags them)

**Why**: Strict mode catches many common bugs at compile time and improves code quality.

### 5. Fix TypeScript Output Directory

- [x] Change `"outDir": "../dist"` to `"outDir": "./dist"` in tsconfig.json
- [x] Add `dist/` to .gitignore if not already present

**Why**: The output should be relative to the project root, not parent directory.

### 6. Improve TypeScript Configuration

- [x] Add `"declaration": true` for generating .d.ts files
- [x] Add `"declarationMap": true` for better IDE support
- [x] Add `"sourceMap": true` for debugging
- [x] Consider adding `"noUncheckedIndexedAccess": true` for safer array access

## Package.json Improvements

### 7. Update Node.js Version Requirements

- [x] Update `"engines": {"node": ">=10"}` to `"engines": {"node": ">=18"}`
- [x] Create `.nvmrc` file with `18` or `20` (LTS versions)
- [x] Update package.json to specify minimum npm/pnpm versions

**Why**: Node 10 reached EOL in April 2021. Node 18+ is now the minimum supported LTS version.

### 8. Fix Package Entry Points

- [x] Change `"main": "bin/pushfile"` to `"main": "./dist/pushfile.js"`
- [ ] Add `"types": "./dist/pushfile.d.ts"`
- [ ] Consider adding `"exports"` field for modern Node.js:

  ```json
  "exports": {
    ".": {
      "types": "./dist/pushfile.d.ts",
      "default": "./dist/pushfile.js"
    }
  }
  ```

### 9. Add Modern Package Fields

- [x] Add `"files": ["dist", "bin"]` to control what gets published
- [x] Add `"publishConfig": {"access": "public"}` if publishing to npm
- [x] Add `"keywords"` array for better npm discoverability

### 10. Update or Remove npm-watch

- [x] The `"watch"` field references `src/*.js` but files are now `.ts`
- [x] Consider removing and using `tsc --watch` directly
- [x] Update the watch path to `src/*.ts` if keeping it

## Testing Improvements

### 11. Modernize Test Code

- [x] Replace deprecated `.substr()` with `.substring()` or `.slice()` in `test/helpers.spec.ts:27`
- [ ] Add more test coverage for edge cases
- [ ] Consider adding tests for the main pushfile function

### 12. Add Test Coverage

- [ ] Install `c8` for coverage reporting
- [ ] Add `"coverage"` script: `"coverage": "c8 vitest"`
- [ ] Add coverage thresholds
- [ ] Upload coverage to codecov.io or coveralls

### 13. Add Type Checking to Tests

- [x] Add `"typecheck"` script: `"typecheck": "tsc --noEmit"`
- [x] Run type checking in CI before tests

## GitHub Actions & CI/CD

### 14. Update GitHub Actions Workflow

- [x] Update `.github/workflows/tests.yml`:
  - Replace `actions/checkout@v2` with `actions/checkout@v4`
  - Replace `actions/setup-node@v1` with `actions/setup-node@v4`
  - Update Node.js version matrix to `[18.x, 20.x, 22.x]`
  - Add pnpm setup using `pnpm/action-setup@v2`
  - Change `npm install` to `pnpm install`
  - Change `npm run` to `pnpm run`
  - Change `npm test` to `pnpm test`
- [x] Add build step to verify TypeScript compilation
- [x] Add `pnpm run build` before tests

### 15. Add Additional CI Checks

- [x] Add type checking job to workflow
- [x] Add Biome check job (linting + formatting)
- [ ] Add coverage reporting step
- [ ] Consider adding automated dependency updates check

### 16. Update Dependabot Configuration

- [x] Change `.github/dependabot.yml` from `npm` to `pnpm`
- [ ] Add GitHub Actions updates:

  ```yaml
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
  ```

### 17. Add Release Automation

- [ ] Add semantic-release or release-please for automated releases
- [ ] Create release workflow in `.github/workflows/release.yml`
- [ ] Add conventional commit linting with commitlint

## Documentation

### 18. Improve README.md

- [ ] Add badges (build status, npm version, license, etc.)
- [ ] Update installation instructions (mention pnpm)
- [ ] Add Node.js version requirement clearly
- [ ] Add screenshot or demo GIF
- [ ] Add troubleshooting section
- [ ] Document all CLI options clearly
- [ ] Add API documentation if package can be used as a library
- [ ] Update development section to mention TypeScript

### 19. Add CONTRIBUTING.md

- [ ] Create contribution guidelines
- [ ] Document code style requirements
- [ ] Explain how to run tests
- [ ] Describe PR process
- [ ] Link to code of conduct

### 20. Add CODE_OF_CONDUCT.md

- [ ] Use Contributor Covenant or similar standard
- [ ] Specify contact methods for reporting issues

### 21. Add SECURITY.md

- [ ] Define security policy
- [ ] Specify supported versions
- [ ] Provide responsible disclosure instructions
- [ ] Add contact information for security issues

### 22. Improve CHANGELOG.md

- [ ] Ensure it follows Keep a Changelog format
- [ ] Add links to compare versions
- [ ] Document breaking changes clearly
- [ ] Add dates to all versions

## Code Quality Tools

### 23. Add Git Hooks

- [ ] Install husky: `pnpm add -D husky`
- [ ] Add lint-staged for pre-commit hooks
- [ ] Run Biome check on staged files before commit
- [ ] Run type checking before push
- [ ] Add prepare script: `"prepare": "husky install"`

## Code Improvements

### 26. Improve Error Handling

- [x] Review `src/helpers.ts` for proper error handling
- [x] Add try-catch blocks where needed
- [x] Provide meaningful error messages
- [x] Consider using a proper error handling library

### 27. Add Input Validation

- [ ] Validate file paths before uploading
- [ ] Check file exists and is readable
- [ ] Validate S3 bucket configuration
- [ ] Add helpful error messages for common mistakes

### 28. Improve Configuration Management

- [x] Consider using cosmiconfig for more flexible config
- [x] Support environment variables for AWS credentials
- [ ] Document all configuration options
- [ ] Add config validation

### 29. Add Logging

- [ ] Consider adding debug logging with `debug` package
- [ ] Add verbose mode flag
- [ ] Improve console output formatting

## Optional Enhancements

### 30. Consider Modern Features

- [ ] Add progress bar for large file uploads
- [ ] Support uploading multiple files at once
- [ ] Support S3 presigned URLs
- [ ] Add retry logic for failed uploads
- [ ] Support custom ACLs and metadata

### 31. Add Integration Tests

- [ ] Test with LocalStack
- [ ] Test config file creation
- [ ] Test unique filename generation

### 32. Performance Improvements

- [ ] Consider streaming for large files
- [ ] Add file size limits
- [ ] Optimize hash generation for large files

### 33. Bundle Size Optimization

- [ ] Analyze bundle size with package size analyzer
- [ ] Consider replacing heavy dependencies
- [x] Use AWS SDK v3 for better tree-shaking

### 34. Add Internationalization

- [ ] Extract strings for i18n if needed
- [ ] Consider adding locale support

## Priority Recommendations

**High Priority** (Do these first):

**Medium Priority** (Important for quality): 7. Add test coverage (#12) 8. Update package entry points (#8) 9. Add pre-commit hooks (#23) 10. Improve README (#18) 11. Add SECURITY.md (#21) 12. Resolve module system conflict (#3)

**Low Priority** (Nice to have): 13. Everything else in optional enhancements 14. Internationalization (#34)
