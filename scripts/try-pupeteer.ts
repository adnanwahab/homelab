// oauthPlaygroundAutomation.js

const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false, // Set to false to see the browser actions
    args: ['--start-maximized'],
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Navigate to OAuth 2.0 Playground
  await page.goto('https://developers.google.com/oauthplayground/', { waitUntil: 'networkidle2' });

  // Click on the gear icon to open settings
  await page.waitForSelector('button[aria-label="OAuth 2.0 Playground Settings"]', { timeout: 60000 });
  await page.click('button[aria-label="OAuth 2.0 Playground Settings"]');

  // Select "Use your own OAuth credentials"
  await page.waitForSelector('input#use_own_oauth_credentials', { visible: true });
  await page.click('input#use_own_oauth_credentials');

  // Enter Client ID and Client Secret
  const CLIENT_ID = 'YOUR_CLIENT_ID';
  const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';

  await page.type('input#oauth-client-id', CLIENT_ID);
  await page.type('input#oauth-client-secret', CLIENT_SECRET);

  // Close settings
  await page.click('button#oauth-playground-settings-close');

  // Select Gmail API scopes
  await page.waitForSelector('textarea#oauth-authorization-scopes', { visible: true });
  await page.click('textarea#oauth-authorization-scopes', { clickCount: 3 });
  await page.keyboard.press('Backspace'); // Clear existing scopes

  // Enter desired scopes
  const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    // Add other scopes as needed
  ];

  await page.type('textarea#oauth-authorization-scopes', SCOPES.join(' '));

  // Click "Authorize APIs"
  await page.click('button#authorize-apis');

  // At this point, manual interaction is likely required:
  // - Log in to Google account
  // - Grant permissions
  // These steps involve user interaction and may include CAPTCHAs or 2FA

  // Wait for user to authorize and exchange tokens
  console.log('Please complete the authorization in the opened browser window.');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Optionally, you can extract tokens if the page structure allows
  // However, Google may have protections against scraping tokens

  // Close the browser after some time or based on conditions
  // await browser.close();
})();