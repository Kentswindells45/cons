Thank you for using our template!

For more awesome templates please visit https://colorlib.com/wp/templates/

Copyright information for the template can't be altered/removed unless you purchase a license.
More information about the license is available here: https://colorlib.com/wp/licence/

Removing copyright information without the license will result in suspension of your hosting and/or domain name(s).

================================================================================
GOOGLE MAPS SETUP INSTRUCTIONS
================================================================================

To enable Google Maps functionality on your website, you need to obtain a Google Maps API key:

1. Go to the Google Cloud Console: https://console.cloud.google.com/
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
4. Create credentials (API Key)
5. Optionally restrict the API key to your domain for security
6. Replace "YOUR_API_KEY" in all HTML files with your actual API key

The HTML files that need to be updated are:
- index.html
- about.html
- services.html
- project.html
- contact.html
- blog.html
- blog-single.html

If you don't set up a valid API key, the map will show a fallback message instead of the interactive Google Map.
