# Security Policy

## Supported Versions

We take security seriously and actively maintain the following versions of pushfile:

| Version | Supported          |
| ------- | ------------------ |
| 4.x     | :white_check_mark: |
| 3.x     | :x:                |
| < 3.0   | :x:                |

We recommend always using the latest version to ensure you have the most recent security updates.

## Reporting a Vulnerability

We appreciate responsible disclosure of security vulnerabilities. If you discover a security issue, please follow these steps:

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, report security vulnerabilities by emailing:

**[josh@jfin.us](mailto:josh@jfin.us)**

Please include the following information in your report:

1. **Description**: Clear description of the vulnerability
2. **Impact**: What an attacker could potentially do
3. **Steps to Reproduce**: Detailed steps to reproduce the issue
4. **Affected Versions**: Which versions are affected
5. **Proof of Concept**: Code or commands that demonstrate the vulnerability (if applicable)
6. **Suggested Fix**: Your ideas for fixing the issue (optional)

### What to Expect

When you report a vulnerability, here's what you can expect:

1. **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
2. **Investigation**: We will investigate and validate the issue
3. **Updates**: We will keep you informed of our progress
4. **Timeline**: We aim to address critical vulnerabilities within 7 days
5. **Credit**: With your permission, we will credit you in the security advisory

### Security Update Process

1. We will confirm the vulnerability and determine its severity
2. We will develop and test a fix
3. We will release a security update
4. We will publish a security advisory
5. We will update this document if needed

## Security Best Practices

When using pushfile, follow these security best practices:

### Protecting AWS Credentials

1. **Never commit credentials** to version control
2. **Use environment variables** for sensitive configuration:
   ```bash
   export PUSHFILE_AWS_KEY="your-key"
   export PUSHFILE_AWS_SECRET="your-secret"
   export PUSHFILE_S3_BUCKET="your-bucket"
   ```
3. **Use IAM roles** when running on AWS infrastructure
4. **Apply least privilege** - only grant necessary S3 permissions:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:PutObjectAcl"
         ],
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

### Configuration File Security

1. **Protect config files** with appropriate permissions:
   ```bash
   chmod 600 ~/.pushfile.json
   chmod 600 .pushfilerc.json
   ```
2. **Add to .gitignore**:
   ```gitignore
   .pushfilerc.json
   .pushfile.json
   ```
3. **Don't share** config files containing credentials

### S3 Bucket Security

1. **Review bucket policies** regularly
2. **Enable bucket versioning** to recover from accidents
3. **Use bucket encryption** for sensitive files
4. **Monitor access logs** for suspicious activity
5. **Be aware** that files are uploaded with `public-read` ACL

### Input Validation

Pushfile includes built-in validation for:
- File existence and readability
- File size limits (5GB maximum)
- S3 bucket name format
- Configuration completeness

## Known Security Considerations

### Public File Access

By default, pushfile uploads files with `public-read` ACL, making them publicly accessible. This is intentional for the use case of sharing files, but be aware:

- **Do not upload sensitive files** unless you intend them to be public
- **Review files before uploading** to ensure they don't contain sensitive data
- **Use bucket policies** to restrict access if needed

### AWS Credentials Storage

- Credentials are stored in plain text in configuration files
- On Unix-like systems, use file permissions to restrict access
- Consider using AWS IAM roles instead of static credentials when possible

## Security Audit History

### Version 4.0.0 (2024)
- Migrated to AWS SDK v3 (improved security and maintenance)
- Added comprehensive input validation
- Implemented S3 bucket name validation
- Added file size limits
- Enabled strict TypeScript mode

## Vulnerability Disclosure Policy

We follow the principle of responsible disclosure:

1. **Confidentiality**: We will keep your identity confidential unless you request otherwise
2. **No Legal Action**: We will not pursue legal action against security researchers who:
   - Report vulnerabilities in good faith
   - Do not exploit vulnerabilities beyond what's necessary to demonstrate the issue
   - Do not access or modify data belonging to others
   - Follow this disclosure process
3. **Recognition**: We will acknowledge your contribution (with your permission)

## Security Tools

This project uses:

- **Biome**: For code quality and catching potential issues
- **TypeScript**: With strict mode for type safety
- **c8**: For test coverage to ensure code paths are tested
- **GitHub Dependabot**: For automated dependency updates

## Contact

For security-related questions or concerns:

- **Email**: [josh@jfin.us](mailto:josh@jfin.us)
- **GitHub**: [@joshfinnie](https://github.com/joshfinnie)

For general questions or non-security issues, please use [GitHub Issues](https://github.com/joshfinnie/pushfile/issues).

## Additional Resources

- [AWS Security Best Practices](https://aws.amazon.com/security/best-practices/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

Thank you for helping keep pushfile and its users safe!
