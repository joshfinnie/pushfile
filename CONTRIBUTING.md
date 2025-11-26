# Contributing to pushfile

Thank you for your interest in contributing to pushfile! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pushfile.git
   cd pushfile
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/joshfinnie/pushfile.git
   ```

## Development Setup

### Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build the project:
   ```bash
   pnpm run build
   ```

3. Link the package locally for testing:
   ```bash
   pnpm run link
   ```

### Development Commands

- `pnpm run build` - Build the project with tsup
- `pnpm run dev` - Watch mode (rebuild on changes)
- `pnpm test` - Run tests
- `pnpm run test:coverage` - Run tests with coverage report
- `pnpm run typecheck` - Run TypeScript type checking
- `pnpm run format` - Format code with Biome
- `pnpm run format:ci` - Check formatting (CI mode)
- `pnpm run ci` - Run all checks (tests, typecheck, format)

## Making Changes

### Branching Strategy

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/issue-description
   ```

2. Use descriptive branch names:
   - `feature/` for new features
   - `fix/` for bug fixes
   - `docs/` for documentation changes
   - `refactor/` for code refactoring
   - `test/` for test additions or modifications

### Commit Messages

We follow conventional commit format:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting, missing semicolons, etc.
- `refactor:` code restructuring
- `test:` adding or updating tests
- `chore:` maintenance tasks

Examples:
```
feat: add support for custom S3 regions
fix: handle file permission errors gracefully
docs: update README with new configuration options
```

## Coding Standards

### TypeScript

- This project uses TypeScript with strict mode enabled
- All code must pass type checking: `pnpm run typecheck`
- Use explicit types where it improves readability
- Avoid `any` types (caught by Biome)

### Code Style

- We use [Biome](https://biomejs.dev/) for linting and formatting
- Run `pnpm run format` before committing to auto-fix issues
- All code must pass: `pnpm run format:ci`
- Follow existing code patterns and conventions

### Best Practices

- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Handle errors gracefully with meaningful messages
- Validate user input at system boundaries
- Avoid over-engineering - keep solutions simple

## Testing

### Writing Tests

- Tests are located in the `test/` directory
- Use Vitest for testing
- Write tests for new features and bug fixes
- Aim for good test coverage (we use c8)

### Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm run test:coverage

# Watch mode (for development)
pnpm run dev
```

### Test Requirements

- All new features should include tests
- Bug fixes should include a test that reproduces the issue
- Tests should be clear and well-documented
- All tests must pass before submitting a PR

## Submitting Changes

### Pull Request Process

1. Update your fork with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Ensure all checks pass:
   ```bash
   pnpm run ci
   ```

3. Push your changes to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```

4. Open a Pull Request on GitHub

### PR Requirements

Your pull request should:

- [ ] Pass all CI checks (tests, type checking, formatting)
- [ ] Include tests for new functionality
- [ ] Update documentation if needed
- [ ] Have a clear description of changes
- [ ] Reference any related issues (e.g., "Fixes #123")
- [ ] Follow the project's code style
- [ ] Not introduce breaking changes (unless discussed)

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Related Issues
Fixes #(issue number)
```

## Reporting Bugs

### Before Submitting a Bug Report

- Check if the bug has already been reported in [Issues](https://github.com/joshfinnie/pushfile/issues)
- Ensure you're using the latest version
- Try to reproduce the issue with minimal steps

### Bug Report Template

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Minimal steps to reproduce the issue
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**:
   - pushfile version
   - Node.js version
   - Operating system
6. **Error Messages**: Full error messages or logs
7. **Additional Context**: Screenshots, config files, etc.

## Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature has already been suggested
2. Open an issue with the `enhancement` label
3. Clearly describe the feature and its use case
4. Explain why this feature would be useful
5. Consider implementation approaches if possible

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Why is this feature needed?

## Proposed Implementation
Ideas on how to implement (optional)

## Alternatives Considered
Other approaches you've thought about
```

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the `question` label
- Reach out to the maintainers

## Recognition

Contributors will be recognized in:
- The project's README
- Release notes for their contributions
- Git history

Thank you for contributing to pushfile!
