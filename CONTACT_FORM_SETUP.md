# Contact Form Setup Guide

## What Was Changed

### 1. **Contact Form (contact.html)**
- Removed unreliable `mailto:` action
- Added required field validation to all form inputs
- Changed email input type from `text` to `email` for client-side validation
- Added form IDs to all fields for JavaScript reference
- Integrated Toastr notification library for user feedback

### 2. **Frontend Validation & Submission (js/contact-form.js)**
- Validates all fields are filled before submission
- Validates email format using regex
- Shows error toasts for validation failures
- Sends form data via AJAX to backend endpoint
- Shows success message with toast notification
- Clears form on successful submission
- Prevents multiple submissions with button disable/enable

### 3. **Backend Email Handler (mail/send_email.php)**
- Receives POST data from frontend
- Sanitizes and validates all inputs on server-side
- Sends formatted HTML email to company (newgenconst102@gmail.com)
- Sends confirmation email to user
- Returns JSON response for AJAX handling
- Includes error handling and HTTP status codes

## Features Implemented

✅ **Field Validation**
- All fields required (Name, Email, Subject, Message)
- Email format validation
- Both client-side and server-side validation

✅ **User Feedback (Toast Notifications)**
- Success message: "Message sent successfully! We will get back to you soon."
- Error messages for validation failures
- Network error handling
- Auto-dismiss after 5 seconds with close button

✅ **Email Sending**
- Beautiful HTML formatted emails
- Sends to company inbox
- Sends confirmation email to user
- Shows sender's email in reply-to header

✅ **Security**
- Input sanitization (htmlspecialchars, filter_var)
- Method validation (POST only)
- XSS protection
- Email injection prevention

## Requirements

### Server Requirements
- PHP 5.4 or higher
- Mail function enabled on server
- SMTP configured (or mail relay service)

### Browser Requirements
- JavaScript enabled
- Modern browser with fetch/AJAX support

## Installation Instructions

1. **Upload Files**
   - The files are already in place:
     - `/contact.html` - Updated contact form
     - `/js/contact-form.js` - Frontend handler
     - `/mail/send_email.php` - Backend handler

2. **Test the Form**
   - Navigate to `contact.html`
   - Try submitting without filling fields (should show validation error)
   - Fill all fields and click "Send Message"
   - Should see success toast notification
   - Check email inbox for message

3. **Optional: Configure Email Settings**
   - Open `mail/send_email.php`
   - Change `$to = 'newgenconst102@gmail.com'` if needed
   - Adjust confirmation email template if desired

## How It Works

```
User fills form
    ↓
Submits form
    ↓
Frontend validates all fields (contact-form.js)
    ↓
If invalid → Show error toast, stop
    ↓
If valid → Send AJAX request to /mail/send_email.php
    ↓
Backend validates & sanitizes data (send_email.php)
    ↓
If invalid → Return error JSON
    ↓
If valid → Send two emails:
   - To company inbox
   - Confirmation to user
    ↓
Return success JSON
    ↓
Frontend shows success toast & clears form
```

## Toast Notifications Styling

Toastr is integrated with the following settings:
- Position: Top Right
- Auto-close: 5 seconds
- Shows close button
- Progress bar indicator
- Smooth fade in/out animations

## Troubleshooting

### Emails not being sent?
1. Check PHP error logs for mail() function errors
2. Verify server has mail function enabled
3. Check SMTP configuration on server
4. Whitelist sender domain with hosting provider

### Form not submitting?
1. Check browser console for JavaScript errors
2. Verify `/mail/send_email.php` is accessible
3. Check CORS headers if cross-origin requests needed
4. Ensure JavaScript is enabled in browser

### Toast notifications not showing?
1. Check browser console for errors
2. Verify Toastr CDN is loading properly
3. Check internet connection (CDN requires connection)

### Validation not working?
1. Check browser console for JavaScript errors
2. Verify form field IDs match JavaScript selectors
3. Check HTML5 required attributes

## Files Modified/Created

- ✏️ Modified: `contact.html`
- ✨ Created: `js/contact-form.js`
- ✨ Created: `mail/send_email.php`

## Browser Compatibility

Works on:
- Chrome 30+
- Firefox 24+
- Safari 6+
- Edge (all versions)
- IE 10+ (with polyfills for Promise)

## Future Enhancements

Consider implementing:
- Database logging of contact requests
- Admin dashboard to view messages
- Email templates customization
- Rate limiting to prevent spam
- CAPTCHA verification
- Multi-language support
