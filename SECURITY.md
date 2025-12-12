# Security Policy

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in the DEECEE HAIR repository, please report it responsibly.

### How to Report

**Do not** open a public GitHub issue for security vulnerabilities. Instead, please follow these steps:

1. **Email us** at `deeceehair0@gmail.com` with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Any suggested fixes (if you have them)

2. **Include the following details:**
   - Your name and contact information
   - Affected version(s)
   - When you discovered the vulnerability

### Response Timeline

- We will acknowledge receipt of your report within **48 hours**
- We will provide a status update within **7 days**
- We aim to release a security patch within **14 days** for critical vulnerabilities
- We will credit you in the security advisory (unless you prefer to remain anonymous)

## Supported Versions

| Version | Status | Support Until |
|---------|--------|-----------------|
| 0.1.x | Active Development | Current |

## Security Best Practices

### For Users
- Keep your dependencies updated by running `npm update`
- Use environment variables for sensitive credentials (`.env.local`)
- Never commit `.env.local` or private keys to the repository
- Enable two-factor authentication on your GitHub account

### For Developers
- Run `npm audit` regularly to check for vulnerabilities
- Use the latest stable versions of Next.js, React, and Firebase
- Review security policies before deploying to production
- Follow OWASP security guidelines for web applications

## Dependencies

This project uses the following security-critical dependencies:
- **Firebase**: For authentication and database operations
- **SendGrid**: For email notifications
- **Next.js**: For the web framework

We monitor these dependencies for security updates and apply patches promptly.

## Known Issues

None currently known. If you find a vulnerability, please report it following the process above.

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Firebase Security Best Practices](https://firebase.google.com/docs/security)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)

---

**Last Updated:** December 2025
