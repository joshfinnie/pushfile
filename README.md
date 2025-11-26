# pushfile

[![Tests](https://github.com/joshfinnie/pushfile/workflows/Tests/badge.svg)](https://github.com/joshfinnie/pushfile/actions)
[![npm version](https://badge.fury.io/js/pushfile.svg)](https://www.npmjs.com/package/pushfile)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)

A fast, modern Node.js command-line tool that uploads files to Amazon S3 and instantly copies the URL to your clipboard. Built with TypeScript and the AWS SDK v3.

## Features

- Upload files to S3 with a single command
- Automatic URL copying to clipboard
- Support for unique file hashing (cache-busting)
- Interactive configuration wizard
- Environment variable support
- Modern ES modules and TypeScript
- Comprehensive input validation
- Helpful error messages
- Built with AWS SDK v3 for optimal performance

## Requirements

- **Node.js 20 or higher** (uses modern ES modules)
- AWS account with S3 access
- Valid AWS credentials

## Installation

Install globally using your preferred package manager:

```bash
# Using npm
npm install -g pushfile

# Using pnpm
pnpm add -g pushfile

# Using yarn
yarn global add pushfile
```

## Configuration

You have two options to configure pushfile:

### Option 1: Configuration File (Recommended)

Run the interactive configuration wizard:

```bash
pushfile --configure
```

This creates a `.pushfilerc.json` file in your project directory with:

```json
{
  "awsKey": "your-aws-access-key",
  "awsSecret": "your-aws-secret-key",
  "s3Bucket": "your-bucket-name",
  "customURL": "https://your-cdn.com"  // optional
}
```

### Option 2: Environment Variables

Set these environment variables instead of using a config file:

```bash
export PUSHFILE_AWS_KEY="your-aws-access-key"
export PUSHFILE_AWS_SECRET="your-aws-secret-key"
export PUSHFILE_S3_BUCKET="your-bucket-name"
export PUSHFILE_CUSTOM_URL="https://your-cdn.com"  # optional
```

### Getting AWS Credentials

1. Go to the [AWS IAM Console](https://console.aws.amazon.com/iam/home?#security_credential)
2. Create a new IAM user with programmatic access
3. Attach the `AmazonS3FullAccess` policy (or create a custom policy with S3 write permissions)
4. Save your Access Key ID and Secret Access Key

## Usage

### Basic Usage

Upload a file to S3 and copy the URL to your clipboard:

```bash
pushfile /path/to/file.ext
```

### CLI Options

```bash
pushfile [options] <file>

Options:
  -V, --version      Output the version number
  -h, --help         Display help information
  -c, --configure    Create or update your configuration file
  -u, --unique       Generate a unique hash for the uploaded file
```

### Examples

**Upload a file:**
```bash
pushfile cat.jpg
# URL automatically copied to clipboard
# Output: File is available at https://s3.amazonaws.com/your-bucket/MzgYBx...jpg
```

**Upload with unique filename:**
```bash
pushfile -u screenshot.png
# Generates a unique hash each time (useful for cache busting)
```

**Configure pushfile:**
```bash
pushfile --configure
# Starts interactive configuration wizard
```

## Troubleshooting

### "Configuration incomplete" error

**Problem:** You get an error about incomplete configuration.

**Solution:** Either run `pushfile --configure` or set environment variables:
```bash
export PUSHFILE_AWS_KEY="your-key"
export PUSHFILE_AWS_SECRET="your-secret"
export PUSHFILE_S3_BUCKET="your-bucket"
```

### "File not found" error

**Problem:** pushfile can't find your file.

**Solution:**
- Check the file path is correct
- Use absolute paths or ensure you're in the correct directory
- Verify the file exists: `ls /path/to/file`

### "Invalid S3 bucket name" error

**Problem:** Your bucket name doesn't meet AWS requirements.

**Solution:** S3 bucket names must:
- Be 3-63 characters long
- Start and end with a lowercase letter or number
- Contain only lowercase letters, numbers, dots, and hyphens

### "Access Denied" or permission errors

**Problem:** AWS rejects your upload.

**Solution:**
- Verify your AWS credentials are correct
- Ensure your IAM user has S3 write permissions
- Check the bucket exists and you have access to it

### File uploads but URL doesn't work

**Problem:** File uploads successfully but the URL returns 403 Forbidden.

**Solution:** Check your S3 bucket's permissions. Pushfile uploads files with `public-read` ACL, so ensure:
- Your bucket allows public read access
- Block Public Access settings aren't preventing public reads

## Development

This project is built with TypeScript and uses modern tooling.

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/joshfinnie/pushfile.git
cd pushfile
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the project:
```bash
pnpm run build
```

### Development Commands

```bash
# Build the project
pnpm run build

# Watch mode (rebuild on changes)
pnpm run dev

# Run tests
pnpm test

# Run tests with coverage
pnpm run test:coverage

# Type checking
pnpm run typecheck

# Format code with Biome
pnpm run format

# Run all checks (CI)
pnpm run ci
```

### Testing Local Changes

Link the local package to test your changes:

```bash
pnpm run link
pushfile /path/to/test-file
```

### Project Structure

```
pushfile/
├── src/
│   ├── cli.ts        # CLI entry point
│   └── helpers.ts    # Core functionality
├── test/
│   └── helpers.spec.ts
├── dist/             # Compiled output
├── tsconfig.json     # TypeScript config
├── tsup.config.ts    # Build config
└── biome.json        # Linting/formatting config
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Josh Finnie** - [josh@jfin.us](mailto:josh@jfin.us)

### Contributors

- Will Laurance
- Matthew Chase Whittemore

## Changelog

[See CHANGELOG.md](CHANGELOG.md)
