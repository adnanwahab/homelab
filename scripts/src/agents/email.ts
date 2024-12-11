import { chromium } from 'playwright';



async function loginToGmail() {
  const browser = await chromium.launch({ headless: false }); // Set to true in production
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to Gmail
    await page.goto('https://gmail.com');

    // Type email
    await page.fill('input[type="email"]', 'eggnog.wahab@gmail.com');
    await page.click('button:has-text("Next")');

    // Wait for password field and type password
    await page.waitForSelector('input[type="password"]', { timeout: 5000 });
    await page.fill('input[type="password"]', 'sicp.123');
    await page.click('button:has-text("Next")');

    // Wait for Gmail to load
    await page.waitForURL('https://mail.google.com/mail/u/0/#inbox');
    
    console.log('Successfully logged in to Gmail');
    
    // Keep the browser open for testing
    // await browser.close(); // Uncomment in production

  } catch (error) {
    console.error('Login failed:', error);
    await browser.close();
  }
}

// Run the login function
loginToGmail();
