# NewGen Construction - Security Implementation Guide

## Overview
This document outlines the comprehensive security measures implemented to protect the NewGen Construction website against cyber attacks, injection vulnerabilities, and data theft.

---

## Security Features Implemented

### 1. **Content Security Policy (CSP)**
- **Location**: Added to all HTML pages as meta http-equiv tag
- **Protection**: Prevents XSS (Cross-Site Scripting) attacks
- **Configuration**:
  - Restricts script execution to same-origin only
  - Whitelists specific trusted CDNs (cdnjs.cloudflare.com, stackpath.bootstrapcdn.com)
  - Restricts form submissions to FormSubmit.co only
  - Prevents framing of the website
  - Disables unsafe inline scripts where possible

### 2. **XSS (Cross-Site Scripting) Protection**
- **X-XSS-Protection Header**: Enabled for older browsers (IE 8-10)
- **X-Content-Type-Options**: Set to "nosniff" to prevent MIME type sniffing
- **Input Validation**: Frontend validation sanitizes all user inputs

### 3. **SQL Injection Prevention**
- **Input Sanitization**: All form inputs are sanitized before submission
- **Pattern Detection**: Detects and blocks SQL injection patterns:
  - SQL commands (DROP, DELETE, INSERT, UPDATE, UNION, SELECT, ALTER, EXEC)
  - SQL comment syntax (-- and /* */)
  - OR-based injection attempts
- **Character Filtering**: Removes dangerous special characters (<, >, ", ', %, ;, (, ), &, +)
- **Length Limitations**: Input fields have maximum length constraints

### 4. **Form Input Validation**
Each form field is validated according to specific rules:

#### First Name / Last Name:
- **Min Length**: 2 characters
- **Max Length**: 50 characters
- **Allowed Characters**: Letters, numbers, spaces, hyphens, apostrophes, ampersand
- **Regex**: `/^[a-zA-Z0-9\s\-'.&,()]+$/`

#### Email Address:
- **Validation Pattern**: Standard email format
- **Max Length**: 100 characters
- **Regex**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

#### Phone Number:
- **Allowed Characters**: Digits, spaces, hyphens, plus, parentheses, dots
- **Max Length**: 20 characters
- **Regex**: `/^[0-9\s\-\+\(\)\.]+$/`

#### Service / Subject:
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Allowed Characters**: Letters, numbers, spaces, hyphens, apostrophes, ampersand, commas
- **Regex**: `/^[a-zA-Z0-9\s\-'.&,()]+$/`

#### Message / Project Details:
- **Min Length**: 10 characters
- **Max Length**: 2000 characters
- **Protections**:
  - Scans for JavaScript code
  - Detects SQL injection attempts
  - Blocks directory traversal patterns
  - Prevents script injection

### 5. **Suspicious Pattern Detection**
The security module detects and blocks:

#### XSS Attack Patterns:
- Script tags: `<script>...</script>`
- JavaScript protocols: `javascript:`
- Event handlers: `onclick=`, `onerror=`
- Eval functions: `eval()`
- CSS expressions: `expression()`

#### SQL Injection Patterns:
- SQL commands: `DROP`, `DELETE`, `INSERT`, `UPDATE`, `UNION`, `SELECT`, `ALTER`, `EXEC`, `EXECUTE`
- SQL comments: `--` and `/* */`
- OR-based injection: `' OR '1'='1`

#### Other Attack Patterns:
- Directory traversal: `../` sequences
- Path traversal attempts
- Command injection attempts

### 6. **CSRF (Cross-Site Request Forgery) Protection**
- **FormSubmit.co Backend**: Provides built-in CSRF protection
- **Form Method**: POST requests only (not vulnerable to simple CSRF)
- **Form Validation**: Local validation prevents malicious form submissions

### 7. **Data Handling Security**
- **No Credential Storage**: Email is not stored in JavaScript
- **HTTPS Only**: FormSubmit.co uses encrypted HTTPS connections
- **No Client-Side Storage**: Sensitive data is not cached in browser
- **No Tracking Cookies**: No invasive tracking or analytics that compromise privacy

---

## Security Module (js/security.js)

The `security.js` file provides:

### Key Functions:

#### 1. `htmlEncode(str)`
- Converts special characters to HTML entities
- Prevents XSS attacks through text content

#### 2. `sanitizeInput(str)`
- Removes dangerous special characters
- Limits input length (500 chars max)
- Prevents buffer overflow attacks

#### 3. `validateEmail(email)`
- Validates email format using regex
- Ensures proper domain structure

#### 4. `validatePhone(phone)`
- Accepts standard phone number formats
- Validates international phone numbers

#### 5. `validateText(text, minLength, maxLength)`
- Validates text fields with length constraints
- Restricts character sets

#### 6. `validateMessage(message, minLength, maxLength)`
- Validates large text areas
- Scans for suspicious patterns

#### 7. `containsSuspiciousPatterns(str)`
- Detects XSS, SQL injection, and other attack patterns
- Returns true if malicious content detected

#### 8. `validateForm(formData)`
- Comprehensive form validation
- Returns validation results with detailed error messages
- Prevents form submission if validation fails

#### 9. `sanitizeFormData(formData)`
- Sanitizes all form fields before submission
- Applies consistent security rules

#### 10. `initializeFormSecurity()`
- Attaches validation to all FormSubmit forms
- Blocks submission if validation fails
- Shows user-friendly error messages

---

## How It Works - Form Submission Flow

```
User fills form
     ↓
Form submission detected
     ↓
Security module validates each field
     ↓
Check for length constraints
     ↓
Validate format (email, phone, text)
     ↓
Scan for suspicious patterns
     ↓
If validation fails:
  - Prevent form submission
  - Display error messages to user
  ↓
If validation passes:
  - Sanitize all inputs
  - Allow submission to FormSubmit.co
  - Data encrypted via HTTPS
```

---

## Server-Side Security (FormSubmit.co)

The backend email service provides:
- **HTTPS Encryption**: All data transmitted securely
- **Email Validation**: Sender email is verified
- **Spam Protection**: Built-in anti-spam measures
- **Rate Limiting**: Prevents abuse through excessive submissions
- **Data Privacy**: Emails not stored permanently

---

## Compliance & Standards

This implementation follows industry best practices:
- **OWASP Top 10**: Protects against injection and XSS vulnerabilities
- **CWE**: Addresses CWE-89 (SQL Injection) and CWE-79 (XSS)
- **HTML5 Security**: Uses modern HTML5 security features
- **W3C Standards**: Implements W3C Content Security Policy

---

## Testing Security

### For Website Administrators:

#### Test Form Validation:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try these test cases:
   ```javascript
   // Test XSS detection
   document.querySelector('[name="message"]').value = '<script>alert("xss")</script>';
   
   // Test SQL injection detection
   document.querySelector('[name="message"]').value = "'; DROP TABLE users; --";
   
   // Test normal submission (should work)
   document.querySelector('[name="first_name"]').value = "John";
   ```

#### Check Security Headers:
1. Open DevTools > Network tab
2. Submit a form
3. Check the request headers - should show CSP headers

#### Monitor Console:
- Open DevTools > Console tab
- Any blocked submissions will log detailed error messages

---

## User Experience

### When Invalid Data is Detected:

Users will see:
```
Please fix the following errors:

• First name must be 2-50 characters and contain only letters, numbers, and spaces
• Please enter a valid email address
• Message must be 10-2000 characters and cannot contain scripts or SQL commands
```

### When Data is Valid:

- Form submits successfully to FormSubmit.co
- User sees success message
- Redirect to confirmation page

---

## Maintenance & Updates

### Regular Tasks:

1. **Monitor Logs**: Check for unusual form submission attempts
2. **Update Patterns**: Periodically review and update suspicious pattern detection
3. **Security Audits**: Conduct quarterly security reviews
4. **Dependency Updates**: Keep libraries and frameworks current

### Adding New Forms:

When adding new contact forms:
1. Use the same FormSubmit configuration
2. The security module auto-detects all forms
3. Validation applies automatically

---

## Security Checklist

- ✅ CSP headers implemented on all pages
- ✅ XSS protection enabled
- ✅ SQL injection prevention active
- ✅ Input validation enforced
- ✅ Suspicious pattern detection enabled
- ✅ HTTPS encryption in place
- ✅ CSRF protection enabled
- ✅ No sensitive data in frontend code
- ✅ Security module loaded on all pages
- ✅ Form sanitization active

---

## Troubleshooting

### Forms Not Validating:
- Check browser console for errors
- Verify security.js is loaded
- Check that forms use FormSubmit action

### Legitimate Data Rejected:
- Check input length limits
- Review character restrictions
- Ensure proper email/phone format
- Check for accidental special characters

### HTTPS Not Working:
- Ensure website is served over HTTPS
- Check SSL certificate validity
- Verify FormSubmit.co HTTPS connection

---

## Support & Questions

For security concerns or questions:
1. Review this documentation
2. Check browser console for error messages
3. Contact system administrator

---

## Last Updated
January 29, 2026

## Security Audit Status
✅ Passed - All protections implemented and active
