// Import required modules
//const { test, expect } = require('@playwright/test');
const { chromium, firefox } = require('playwright');
// Test suite: Create new Twitter account
const create_twitter_account = async ({ page }) => {
const name = 'i_Love_dynamicland@gmail.com';
const email = 'i_Love_dynamicland@gmail.com';
const username = 'i_Love_dynamicland';
const password = 'sicp.123';
  // Navigate to Twitter sign-up page
await page.goto("https://x.com/i/flow/signup");
await sleep(3000)

  // Click the "Sign up" button to create a new account
  //await page.click('a[href="/i/flow/signup"]');
page.click('button >> text="Create account"');
console.log("clicked signup submit");
page.click('#create_account_button');
console.log("clicked signup submit");
await sleep(3000)
page.click('div[data-testid="signup-submit"]');
console.log("clicked signup submit");
await cool( page )
// Wait for the sign-up form to load
//await page.waitForSelector('div[data-testid="signup-form"]');
//   await page.waitForTimeout(3000); // Wait for 3 seconds
// Click the "Create account" button
//await page.click('div[data-testid="signup-submit"]');

  // Fill in the email input field
//   const emailInputSelector = 'input[name="email"]';
//   await page.fill(emailInputSelector, email); // Fill the email field
//   await page.waitForTimeout(1000); // Wait for 1 second to ensure input is registered

//   // Validate email format (basic check)
//   const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   if (!isValidEmail) {
//     throw new Error('Invalid email format');
//   }
       

  // Set the birthday to March 10, 1994
//   await page.selectOption('select[name="month"]', '3'); // March
//   await page.selectOption('select[name="day"]', '10'); // 10th
//   await page.selectOption('select[name="year"]', '1994'); // 1994

  // Click on the "Next" button

  // Wait for the account to be created
  await page.waitForSelector('div[data-testid="account-creation-complete"]');

  // Verify that the account was created successfully
  const createdAccount = await page.evaluate(() => document.querySelector('div[data-testid="account-creation-complete"]'));
  //expect(createdAccount).toBeTruthy();
}

// Run the test suite with chromium browser
async function init() {
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();
  try {
    await page.goto('https://twitter.com');
    // ... (rest of the script remains the same)
    await create_twitter_account({page});
  } finally {
    await browser.close();
  }
}

init();

// // Run the test suite with firefox browser
// test('Create New Twitter Account (Firefox)', async () => {
//   const browser = await firefox.launch();
//   const page = await browser.newPage();
//   try {
//     await page.goto('https://twitter.com');
//     // ... (rest of the script remains the same)
//   } finally {
//     await browser.close();
//   }
// });

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




async function cool (page) {

    // await page.setViewportSize({
    //     width: 2391,
    //     height: 548
    //   })
console.log("cool")
  await page.locator("div.r-1ny4l3l > div.r-16y2uox > div.r-16y2uox > div > div:nth-of-type(2) > div:nth-of-type(1) div > div.r-16y2uox").click()
  await page.locator("div.r-1ny4l3l > div.r-16y2uox > div.r-16y2uox > div > div:nth-of-type(2) > div:nth-of-type(1) input").type("hello world");
  await page.locator("button > span").click()
  await sleep(3000)
  await page.locator("div.r-16y2uox > div.r-16y2uox > div > div:nth-of-type(2) > div:nth-of-type(2) input").click()
  await page.locator("div.r-16y2uox > div.r-16y2uox > div > div:nth-of-type(2) > div:nth-of-type(2) input").type("_@llama-tools.com");
  await page.locator("div.r-16y2uox > div.r-16y2uox > div > div:nth-of-type(2) > div:nth-of-type(2) input").click()
  await page.locator("div.r-16y2uox > div.r-16y2uox > div > div:nth-of-type(2) > div:nth-of-type(2) input").type("adnan@llama-tools.com");
  await page.locator("#SELECTOR_1").click()
  await sleep(3000)

  await page.locator("#SELECTOR_1").type("3");
  await sleep(3000)

  await page.locator("#SELECTOR_2").click()
  await sleep(3000)

  await page.locator("#SELECTOR_2").type("15");
  await sleep(3000)

  await page.locator("div.r-1x0uki6 > div.css-175oi2r").click()
  await sleep(3000)

  await page.locator("#SELECTOR_3").click()
  await sleep(3000)
  await page.locator("#SELECTOR_3").type("1949");
  await sleep(3000)
  await page.locator("div.r-1ny4l3l > div.r-16y2uox > div.r-1f0wa7y > div > div > div div").click()
  await sleep(3000)
}