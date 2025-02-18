import { chromium } from 'playwright';
import { mkdir, existsSync } from 'fs';

async function captureAmazonReading() {
  // Launch the browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to Amazon's reading page
    await page.goto('https://read.amazon.com');

    // Wait for and fill in the login form
    await page.waitForSelector('#ap_email');
    await page.fill('#ap_email', 'adnan.f.wahab@gmail.com');
    await page.click('#ap_password');
    await page.fill('#ap_password', 'sicp.0987');
    
    // Click the sign-in button
    await page.click('#signInSubmit');

    // Wait for the page to load after login
    await page.waitForSelector('.library-content', { timeout: 30000 });

    // Create screenshots directory if it doesn't exist
    if (!existsSync('screenshots')) {
      mkdir('screenshots', { recursive: true }, (err) => {
        if (err) throw err;
      });
    }

    // Take a screenshot and save it with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `screenshots/amazon_reading_${timestamp}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });

    console.log(`Screenshot saved to: ${screenshotPath}`);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// Run the function
captureAmazonReading();