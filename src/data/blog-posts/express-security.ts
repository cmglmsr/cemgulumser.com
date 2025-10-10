import { BlogPost } from '../../types/blog';

const post: BlogPost = {
  id: 'express-security',
  blogId: 1,
  title: 'Building Secure Web Applications with Express.js',
  slug: 'building-secure-web-applications-expressjs',
  excerpt: 'Learn how to implement security best practices in Express.js applications, including input validation, authentication, and protection against common vulnerabilities.',
  content: `# Building Secure Web Applications with Express.js

In today's digital landscape, web application security is more critical than ever. As a security engineer, I've seen countless applications fall victim to common vulnerabilities that could have been easily prevented.

## The Importance of Input Validation

One of the most fundamental security practices is proper input validation. Never trust user input, even if it comes from your own frontend.

\`\`\`javascript
const express = require('express');
const { body, validationResult } = require('express-validator');

app.post('/api/users', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/),
  body('name').trim().isLength({ min: 1, max: 50 }).escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process validated input
});
\`\`\`

## Authentication and Session Management

Implementing secure authentication is crucial for protecting user data and application resources.

\`\`\`javascript
const session = require('express-session');
const helmet = require('helmet');

app.use(helmet());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
\`\`\`

## Protection Against Common Attacks

### SQL Injection Prevention
Always use parameterized queries or prepared statements:

\`\`\`javascript
// Bad - vulnerable to SQL injection
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// Good - parameterized query
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
\`\`\`

### XSS Protection
Sanitize and escape user-generated content:

\`\`\`javascript
const validator = require('validator');

const sanitizeInput = (input) => {
  return validator.escape(validator.trim(input));
};
\`\`\`

## Rate Limiting and DoS Protection

Implement rate limiting to prevent abuse and DoS attacks:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
\`\`\`

## Security Headers

Use security headers to protect against various attacks:

\`\`\`javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));
\`\`\`

## Conclusion

Security should be built into your application from the ground up, not added as an afterthought. By implementing these practices, you can significantly reduce the risk of security vulnerabilities in your Express.js applications.

Remember: security is an ongoing process, not a one-time implementation. Stay updated with the latest security practices and regularly audit your applications for potential vulnerabilities.`,
  coverImage: '/images/blog/express-security.jpg',
  images: ['/images/blog/express-security-demo.jpg', '/images/blog/security-headers.jpg'],
  author: {
    name: 'Mustafa Cem Gülümser',
    avatar: '/images/profile/profile.jpg'
  },
  publishedAt: '2024-12-15T10:00:00Z',
  updatedAt: '2024-12-15T10:00:00Z',
  tags: ['Express.js', 'Security', 'Web Development', 'Node.js', 'Authentication'],
  category: 'cybersecurity',
  readTime: 8,
  featured: true,
  published: true,
  externalLinks: {
    github: 'https://github.com/cmglmsr/express-security-example',
    npm: 'https://www.npmjs.com/package/rtguard'
  },
  seo: {
    title: 'Building Secure Web Applications with Express.js - Security Best Practices',
    description: 'Learn how to implement security best practices in Express.js applications, including input validation, authentication, and protection against common vulnerabilities.',
    keywords: ['Express.js', 'Web Security', 'Node.js', 'Authentication', 'Input Validation', 'XSS Protection', 'SQL Injection']
  }
};

export default post;

