import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);

// Configuration
const USER_DATA_DIR = path.join(os.homedir(), '.kindle-automation');
const PROFILE_NAME = 'kindle-profile';
const KINDLE_URL = 'https://read.amazon.com/';

// Credentials
const AMAZON_USERNAME = 'adnan.f.wahab@gmail.com';
const AMAZON_PASSWORD = 'sicp.123';

// Define the screenshot path
const SCREENSHOT_DIR = path.join(os.homedir(), 'kindle-screenshots');
const SCREENSHOT_PATH = path.join(SCREENSHOT_DIR, `kindle-screenshot-${new Date().toISOString().replace(/:/g, '-')}.png`);
const BOOK_DATA_PATH = path.join(os.homedir(), 'book.json');

async function main() {
  try {
    // Ensure directories exist
    if (!fs.existsSync(USER_DATA_DIR)) {
      fs.mkdirSync(USER_DATA_DIR, { recursive: true });
      console.log(`Created user data directory: ${USER_DATA_DIR}`);
    }

    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
      console.log(`Created screenshot directory: ${SCREENSHOT_DIR}`);
    }

    // Launch browser
    const browser = await chromium.launchPersistentContext(
      path.join(USER_DATA_DIR, PROFILE_NAME),
      {
        headless: false, // Set to true for production
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        viewport: { width: 1280, height: 800 },
      }
    );

    console.log('Browser launched successfully');

    // Get or create a page
    const pages = browser.pages();
    const page = pages.length > 0 ? pages[0] : await browser.newPage();

    // Set longer timeouts
    page.setDefaultTimeout(60000); // 60 seconds

    // Navigate to Kindle
    console.log('Navigating to Kindle...');
    await page.goto(KINDLE_URL);
    
    // Take a screenshot after initial load
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'initial-page.png') });
    console.log('✅ Initial page loaded - screenshot saved');
    
    // Check if we're already logged in
    const isLoggedIn = await checkLoggedInStatus(page);

    if (isLoggedIn) {
      console.log('✅ Already logged in to Kindle!');
    } else {
      console.log('Not logged in. Looking for sign-in buttons...');
      
      // Take debug screenshot
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'before-signin.png') });

      // Try clicking "Sign in with your account" button with more robust approach
      try {
        // Method 1: Try text content approach
        const signInButtons = await page.$$('a, button, [role="button"]');
        let buttonClicked = false;
        
        for (const button of signInButtons) {
          const textContent = await button.textContent();
          if (textContent && (
              textContent.includes('Sign in with your account') || 
              textContent.includes('Sign in') || 
              textContent.includes('Login')
            )) {
            console.log(`Found button with text: "${textContent.trim()}"`);
            await button.click();
            buttonClicked = true;
            console.log('Sign-in button clicked');
            
            // Wait for page to stabilize
            await page.waitForTimeout(3000);
            await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'after-signin-click.png') });
            break;
          }
        }
        
        if (!buttonClicked) {
          console.log('No text-based sign-in button found, trying selectors...');
          
          // Method 2: Try various selectors
          const buttonSelectors = [
            'a[data-signin-button="true"]', 
            '.signin-button', 
            '.sign-in',
            'button:has-text("Sign in")',
            'a:has-text("Sign in")',
            '[href*="signin"]',
            '.a-button-text'
          ];
          
          for (const selector of buttonSelectors) {
            try {
              const button = await page.$(selector);
              if (button) {
                console.log(`Found sign-in button with selector: ${selector}`);
                await button.click();
                console.log('Sign-in button clicked via selector');
                
                // Wait for page to stabilize
                await page.waitForTimeout(3000);
                await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'after-signin-selector-click.png') });
                buttonClicked = true;
                break;
              }
            } catch (err) {
              console.log(`Error with selector ${selector}: ${err.message}`);
            }
          }
        }
        
        if (!buttonClicked) {
          console.log('⚠️ Could not find any sign-in button. Attempting to proceed anyway...');
        }
        
      } catch (err) {
        console.log(`Error finding sign-in button: ${err.message}`);
        // Continue anyway as we might be on the login page already
      }
      
      // Wait for navigation and take a screenshot to see where we are
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'before-email-input.png') });
      
      // Fill in email
      console.log('Attempting to fill in email...');
      
      const emailSelectors = [
        'input[type="email"]', 
        'input[name="email"]', 
        '#ap_email',
        '#email',
        'input[name="username"]',
        'input.a-input-text'
      ];
      
      let emailFieldFound = false;
      for (const selector of emailSelectors) {
        try {
          const emailField = await page.$(selector);
          if (emailField) {
            console.log(`Found email field with selector: ${selector}`);
            
            // Clear the field first
            await page.click(selector, { clickCount: 3 }); // Triple click to select all
            await page.keyboard.press('Backspace');
            
            // Type the email
            await page.fill(selector, AMAZON_USERNAME);
            console.log(`Typed email: ${AMAZON_USERNAME}`);
            emailFieldFound = true;
            
            // Take screenshot after email input
            await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'after-email-input.png') });
            break;
          }
        } catch (err) {
          console.log(`Error with email selector ${selector}: ${err.message}`);
        }
      }
      
      if (!emailFieldFound) {
        console.log('⚠️ Email field not found - taking debug screenshot');
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'email-field-not-found.png') });
        
        // Dump page content for debugging
        const html = await page.content();
        fs.writeFileSync(path.join(SCREENSHOT_DIR, 'page-content.html'), html);
        console.log('Saved page HTML for debugging');
      }
      
      // Click continue button if present
      console.log('Looking for continue button...');
      await page.waitForTimeout(1000);
      
      const continueButtonSelectors = [
        '#continue', 
        '.a-button-input',
        'button:has-text("Continue")',
        'input[type="submit"]',
        'button[type="submit"]',
        '.a-button-inner',
        '.a-button'
      ];
      
      let continueButtonFound = false;
      for (const selector of continueButtonSelectors) {
        try {
          const continueButton = await page.$(selector);
          if (continueButton) {
            console.log(`Found continue button with selector: ${selector}`);
            await continueButton.click();
            console.log('Clicked continue button');
            continueButtonFound = true;
            
            // Take screenshot after clicking continue
            await page.waitForTimeout(3000);
            await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'after-continue-click.png') });
            break;
          }
        } catch (err) {
          console.log(`Error with continue button selector ${selector}: ${err.message}`);
        }
      }
      
      if (!continueButtonFound) {
        console.log('No continue button found, may already be at password screen');
      }
      
      // Wait for navigation and take screenshot to see where we are
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'before-password-input.png') });
      
      // Fill in password
      console.log('Attempting to fill in password...');
      
      const passwordSelectors = [
        'input[type="password"]', 
        'input[name="password"]', 
        '#ap_password',
        '#password'
      ];
      
      let passwordFieldFound = false;
      for (const selector of passwordSelectors) {
        try {
          const passwordField = await page.$(selector);
          if (passwordField) {
            console.log(`Found password field with selector: ${selector}`);
            
            // Clear the field first
            await page.click(selector, { clickCount: 3 }); // Triple click to select all
            await page.keyboard.press('Backspace');
            
            // Type the password
            await page.fill(selector, AMAZON_PASSWORD);
            console.log('Password entered');
            passwordFieldFound = true;
            
            // Take screenshot after password input (masked for security)
            await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'after-password-input.png') });
            break;
          }
        } catch (err) {
          console.log(`Error with password selector ${selector}: ${err.message}`);
        }
      }
      
      if (!passwordFieldFound) {
        console.log('⚠️ Password field not found - taking debug screenshot');
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'password-field-not-found.png') });
      }
      
      // Click sign-in button
      console.log('Looking for sign-in/submit button...');
      
      const signInButtonSelectors = [
        '#signInSubmit', 
        '.a-button-input', 
        '[type="submit"]',
        'button:has-text("Sign-In")',
        'button:has-text("Sign In")',
        'button:has-text("Login")',
        'input[type="submit"]',
        '.a-button-inner',
        'form .a-button'
      ];
      
      let signInButtonFound = false;
      for (const selector of signInButtonSelectors) {
        try {
          const signInButton = await page.$(selector);
          if (signInButton) {
            console.log(`Found sign-in button with selector: ${selector}`);
            await signInButton.click();
            console.log('Clicked sign-in button');
            signInButtonFound = true;
            break;
          }
        } catch (err) {
          console.log(`Error with sign-in button selector ${selector}: ${err.message}`);
        }
      }
      
      if (!signInButtonFound) {
        console.log('⚠️ Sign-in button not found - taking debug screenshot');
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'signin-button-not-found.png') });
        
        // Try pressing Enter key as a fallback
        console.log('Trying to press Enter key as fallback...');
        await page.keyboard.press('Enter');
      }
      
      // Wait for navigation after login
      console.log('Waiting for navigation after login...');
      try {
        await page.waitForTimeout(10000); // Wait 10 seconds
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'after-login-attempt.png') });
        
        // Check if login was successful
        const loginSuccessful = await checkLoggedInStatus(page);
        if (loginSuccessful) {
          console.log('✅ Successfully logged in to Kindle!');
        } else {
          console.log('⚠️ Login might require additional verification or failed.');
          console.log('Taking another screenshot and waiting for manual intervention...');
          await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'verification-needed.png') });
          
          // Wait for manual intervention
          console.log('Waiting 45 seconds for manual intervention if needed...');
          await page.waitForTimeout(45000);
        }
      } catch (err) {
        console.log(`Error during navigation after login: ${err.message}`);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'login-navigation-error.png') });
      }
    }

    // Wait for library to fully load
    console.log('Waiting for Kindle library to load completely...');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'library-loaded.png') });

    // Now let's find and click the first book
    console.log('Looking for books in the library...');
    
    // Various selectors that might find books in the Kindle library
    const bookSelectors = [
      '.book-cover',
      '.title-tile',
      '.library-book',
      '.book-container',
      '.ebook-title',
      '.book-image',
      '.book',
      '.content-img',
      'img[alt*="cover"]',
      '.library-item'
    ];
    
    let bookFound = false;
    let bookTitle = '';
    let bookAuthor = '';
    
    // Try to find and click the first book
    for (const selector of bookSelectors) {
      try {
        const books = await page.$$(selector);
        if (books && books.length > 0) {
          console.log(`Found ${books.length} books with selector: ${selector}`);
          
          // Get title if possible
          try {
            const titleElement = await books[0].$('parent::*');
            if (titleElement) {
              const text = await titleElement.textContent();
              bookTitle = text ? text.trim() : 'Unknown Title';
              console.log(`First book appears to be: "${bookTitle}"`);
            }
          } catch (err) {
            console.log('Could not extract book title');
          }
          
          // Click the first book
          console.log('Clicking on the first book...');
          await books[0].click();
          bookFound = true;
          
          // Take screenshot after clicking book
          await page.waitForTimeout(3000);
          await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'after-book-click.png') });
          break;
        }
      } catch (err) {
        console.log(`Error with book selector ${selector}: ${err.message}`);
      }
    }
    
    if (!bookFound) {
      console.log('⚠️ No books found - trying alternative approach');
      
      // Try to find any clickable items that might be books
      try {
        const allImages = await page.$$('img');
        if (allImages && allImages.length > 0) {
          console.log(`Found ${allImages.length} images, clicking the first one that might be a book...`);
          
          // Click on the first substantial image (likely a book cover)
          for (const img of allImages) {
            const box = await img.boundingBox();
            if (box && box.width > 80 && box.height > 100) {
              console.log(`Clicking on image with dimensions ${box.width}x${box.height}`);
              await img.click();
              bookFound = true;
              
              // Take screenshot after clicking 
              await page.waitForTimeout(3000);
              await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'after-image-click.png') });
              break;
            }
          }
        }
      } catch (err) {
        console.log(`Error with alternative book finding approach: ${err.message}`);
      }
    }
    
    if (!bookFound) {
      console.log('⚠️ Could not find any books to click');
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'no-books-found.png') });
    } else {
      // Wait for the book reader to load
      console.log('Waiting for book reader to load...');
      await page.waitForTimeout(8000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'book-reader-loaded.png') });
      
      // Try to gather metadata about the book
      console.log('Gathering book metadata...');
      
      // Try to get book title from various places
      if (!bookTitle) {
        try {
          const titleSelectors = [
            '.book-title', 
            '.kindle-title', 
            'h1', 
            '.title', 
            'title'
          ];
          
          for (const selector of titleSelectors) {
            const titleElement = await page.$(selector);
            if (titleElement) {
              bookTitle = await titleElement.textContent();
              bookTitle = bookTitle ? bookTitle.trim() : 'Unknown Title';
              console.log(`Book title: "${bookTitle}"`);
              break;
            }
          }
        } catch (err) {
          console.log(`Error getting book title: ${err.message}`);
          bookTitle = 'Unknown Title';
        }
      }
      
      // Try to get author
      try {
        const authorSelectors = [
          '.book-author', 
          '.kindle-author', 
          '.author', 
          'a[href*="author"]'
        ];
        
        for (const selector of authorSelectors) {
          const authorElement = await page.$(selector);
          if (authorElement) {
            bookAuthor = await authorElement.textContent();
            bookAuthor = bookAuthor ? bookAuthor.trim() : 'Unknown Author';
            console.log(`Book author: "${bookAuthor}"`);
            break;
          }
        }
      } catch (err) {
        console.log(`Error getting book author: ${err.message}`);
        bookAuthor = 'Unknown Author';
      }
      
      // Get current page number if available
      let currentPage = 'Unknown';
      try {
        const pageSelectors = [
          '.page-number', 
          '.kindle-page', 
          '.page', 
          '.location'
        ];
        
        for (const selector of pageSelectors) {
          const pageElement = await page.$(selector);
          if (pageElement) {
            currentPage = await pageElement.textContent();
            currentPage = currentPage ? currentPage.trim() : 'Unknown';
            console.log(`Current page: "${currentPage}"`);
            break;
          }
        }
      } catch (err) {
        console.log(`Error getting page number: ${err.message}`);
      }
      
      // Get a small sample of the current page text for metadata only (not copying content)
      let firstPageSample = '';
      try {
        // Get a small sample of text (first few words only)
        const contentSelectors = [
          '.book-content', 
          '.kindle-content', 
          '.content', 
          '.text-content',
          'p'
        ];
        
        for (const selector of contentSelectors) {
          const contentElements = await page.$$(selector);
          if (contentElements && contentElements.length > 0) {
            // Get text from the first paragraph or content element
            const fullText = await contentElements[0].textContent();
            
            if (fullText) {
              // Take just the first few words as a sample (to avoid copyright issues)
              const words = fullText.trim().split(/\s+/);
              if (words.length > 0) {
                // Just get first 5-8 words as a sample
                const sampleSize = Math.min(5 + Math.floor(Math.random() * 4), words.length);
                firstPageSample = words.slice(0, sampleSize).join(' ') + '...';
                console.log(`First page sample: "${firstPageSample}"`);
                break;
              }
            }
          }
        }
      } catch (err) {
        console.log(`Error getting page sample: ${err.message}`);
      }
      
      // Create a book metadata object
      const bookData = {
        title: bookTitle,
        author: bookAuthor,
        accessed_at: new Date().toISOString(),
        current_page: currentPage,
        sample: firstPageSample,
        metadata: {
          device: 'Kindle Web Reader',
          url: page.url()
        }
      };
      
      // Save the book metadata to a JSON file
      console.log(`Saving book metadata to ${BOOK_DATA_PATH}...`);
      fs.writeFileSync(BOOK_DATA_PATH, JSON.stringify(bookData, null, 2));
      console.log('✅ Book metadata saved successfully!');
      
      // Take a final screenshot of the book page
      console.log('Taking screenshot of the book page...');
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'book-page.png'), fullPage: true });
    }

    // Keep browser open for inspection
    console.log('Script completed. Browser will remain open for 30 seconds...');
    await page.waitForTimeout(30000);
    await browser.close();
    console.log('Browser closed.');

  } catch (error) {
    console.error('Error:', error);
  }
}

async function checkLoggedInStatus(page) {
  try {
    // Take a screenshot for debugging login status
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'login-status-check.png') });
    
    // Try various selectors that might indicate we're logged in to Kindle
    const loggedInIndicators = [
      // Common Kindle/Amazon logged-in indicators
      '.kindle-library',
      '.your-library',
      '.your-account',
      '.your-content',
      '.user-profile',
      '.account-dropdown',
      // Check for personalized greeting
      '.nav-line-1-container',
      // Any library content
      '.library-content',
      '.book-tile',
      // Check for sign-out button
      '#nav-item-signout',
      'a[href*="signout"]'
    ];

    for (const selector of loggedInIndicators) {
      const element = await page.$(selector);
      if (element) {
        console.log(`Found logged-in indicator: ${selector}`);
        return true;
      }
    }
    
    // Also check for presence of "Sign Out" text
    const pageContent = await page.content();
    if (pageContent.includes('Sign Out') || pageContent.includes('sign out')) {
      console.log('Found "Sign Out" text in page content');
      return true;
    }
    
    console.log('No logged-in indicators found');
    return false;
  } catch (err) {
    console.log(`Error checking login status: ${err.message}`);
    return false;
  }
}

// Run the script
main();