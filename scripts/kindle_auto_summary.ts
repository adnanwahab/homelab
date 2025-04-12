import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Configuration
const USER_DATA_DIR = path.join(os.homedir(), '.kindle-automation');
const PROFILE_NAME = 'kindle-profile';
const KINDLE_URL = 'https://read.amazon.com/';

// Credentials - only used if not already logged in
const AMAZON_USERNAME = 'adnan.f.wahab@gmail.com';
const AMAZON_PASSWORD = 'sicp.123';

// Output paths
const SCREENSHOT_DIR = path.join(os.homedir(), 'kindle-screenshots');
const BOOKS_DATA_PATH = path.join(os.homedir(), 'kindle-books.json');

// Settings
const BOOKS_TO_PROCESS = 5;
const PAGES_PER_BOOK = 5; // Extract 5 pages from each book for testing

// Debug mode - set to true for more verbose logging and all screenshots
const DEBUG = true;

async function main() {
  console.log('=== Starting Kindle Content Extraction ===');
  console.log(`Will process ${BOOKS_TO_PROCESS} books, ${PAGES_PER_BOOK} pages each`);
  console.log(`Output will be saved to: ${BOOKS_DATA_PATH}`);
  
  // Ensure directories exist
  if (!fs.existsSync(USER_DATA_DIR)) {
    fs.mkdirSync(USER_DATA_DIR, { recursive: true });
    console.log(`Created directory: ${USER_DATA_DIR}`);
  }
  
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    console.log(`Created directory: ${SCREENSHOT_DIR}`);
  }
  
  // Clear previous screenshots for clean debugging
  if (DEBUG) {
    console.log('Debug mode ON - Clearing previous screenshots');
    const files = fs.readdirSync(SCREENSHOT_DIR);
    for (const file of files) {
      if (file.endsWith('.png')) {
        fs.unlinkSync(path.join(SCREENSHOT_DIR, file));
      }
    }
  }

  // Launch browser with persistent context to maintain login state
  console.log('Launching browser...');
  const browser = await chromium.launchPersistentContext(
    path.join(USER_DATA_DIR, PROFILE_NAME),
    {
      headless: false, // Set to true for production
      slowMo: 100, // Slow down operations for better stability
      viewport: { width: 1280, height: 800 },
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      recordVideo: DEBUG ? { dir: SCREENSHOT_DIR } : undefined
    }
  );
  
  const page = await browser.newPage();
  page.setDefaultTimeout(30000); // 30 seconds timeout
  
  try {
    // Navigate to Kindle
    console.log('Navigating to Kindle Cloud Reader...');
    await page.goto(KINDLE_URL);
    await takeScreenshot(page, 'initial-page');
    
    // Check if we are logged in, if not, handle login
    if (await isLoggedIn(page)) {
      console.log('✅ Already logged in to Kindle');
    } else {
      console.log('Not logged in, handling login process...');
      await handleLogin(page);
      
      // Check login status again
      if (await isLoggedIn(page)) {
        console.log('✅ Successfully logged in');
      } else {
        throw new Error('Login failed - please check credentials or try manually');
      }
    }
    
    // Make sure we're at the library page
    console.log('Ensuring we are at the library page...');
    await ensureLibraryPage(page);
    await page.waitForTimeout(3000);
    await takeScreenshot(page, 'library-page');
    
    // Collect all books data
    const booksData = [];
    
    // Process books
    for (let i = 0; i < BOOKS_TO_PROCESS; i++) {
      console.log(`\n[BOOK ${i+1}/${BOOKS_TO_PROCESS}] Processing book...`);
      
      // If not the first book, go back to library
      if (i > 0) {
        console.log('Navigating back to library...');
        await goToLibrary(page);
        await page.waitForTimeout(2000);
      }
      
      // Find and click on a book
      const bookData = await findAndClickBook(page, i);
      
      if (bookData) {
        console.log(`Selected book: "${bookData.title}"`);
        
        // Extract content from several pages
        console.log(`Extracting ${PAGES_PER_BOOK} pages of content...`);
        const contentData = await extractBookContent(page, PAGES_PER_BOOK);
        
        // Add content to book data
        bookData.content = contentData;
        booksData.push(bookData);
        
        console.log(`✅ Completed book ${i+1}: "${bookData.title}" - extracted ${contentData.pages.length} pages`);
      } else {
        console.log(`⚠️ Could not process book ${i+1}`);
      }
    }
    
    // Save all data to JSON file
    console.log(`\nSaving data for ${booksData.length} books to ${BOOKS_DATA_PATH}`);
    fs.writeFileSync(BOOKS_DATA_PATH, JSON.stringify(booksData, null, 2));
    console.log('✅ Data saved successfully!');
    
    // Close browser
    console.log('Script completed, closing browser in 5 seconds...');
    await page.waitForTimeout(5000);
    await browser.close();
    
  } catch (error) {
    console.error('ERROR:', error);
    await takeScreenshot(page, 'error-state');
    
    // Keep browser open for debugging if there's an error
    console.log('Error occurred. Browser will remain open for 1 minute for debugging...');
    await page.waitForTimeout(60000);
    await browser.close();
  }
}

async function isLoggedIn(page) {
  // Check for various elements that would indicate we're logged in
  console.log('Checking if we are logged in...');
  
  try {
    // Take screenshot for debugging
    await takeScreenshot(page, 'login-status-check');
    
    // Check for common indicators
    const loggedInIndicators = [
      '.your-library',
      '.your-content',
      '.kindle-library',
      '.library-title',
      '.book-cover', 
      '.title-tile',
      'button:has-text("Your Library")'
    ];
    
    for (const selector of loggedInIndicators) {
      const element = await page.$(selector);
      if (element) {
        console.log(`Found logged-in indicator: ${selector}`);
        return true;
      }
    }
    
    // Check page content for common logged-in phrases
    const pageContent = await page.content();
    if (
      pageContent.includes('Sign Out') || 
      pageContent.includes('Sign out') || 
      pageContent.includes('Your Account') ||
      pageContent.includes('Your Library')
    ) {
      console.log('Found logged-in text in page content');
      return true;
    }
    
    // Check for multiple book cover images (library view)
    const images = await page.$$('img');
    let potentialBookCovers = 0;
    
    for (const img of images) {
      const box = await img.boundingBox();
      if (box && box.width > 70 && box.height > 100) {
        potentialBookCovers++;
        if (potentialBookCovers >= 3) {
          console.log('Found multiple book-sized images, likely logged in');
          return true;
        }
      }
    }
    
    console.log('Not logged in');
    return false;
  } catch (error) {
    console.log('Error checking login status:', error.message);
    return false;
  }
}

async function handleLogin(page) {
  console.log('Handling login process...');
  
  try {
    await takeScreenshot(page, 'before-login');
    
    // Check if we need to click a sign-in button
    const signInSelectors = [
      'a:has-text("Sign In")',
      'button:has-text("Sign In")',
      'a:has-text("Sign in with your account")',
      '.a-button-text',
      '[data-action="sign-in"]'
    ];
    
    for (const selector of signInSelectors) {
      const signInButton = await page.$(selector);
      if (signInButton) {
        console.log(`Found sign-in button: ${selector}`);
        await signInButton.click();
        console.log('Clicked sign-in button');
        await page.waitForTimeout(2000);
        await takeScreenshot(page, 'after-signin-click');
        break;
      }
    }
    
    // Enter email
    console.log('Looking for email field...');
    const emailSelectors = [
      '#ap_email',
      'input[type="email"]',
      'input[name="email"]'
    ];
    
    let emailEntered = false;
    for (const selector of emailSelectors) {
      const emailField = await page.$(selector);
      if (emailField) {
        console.log(`Found email field: ${selector}`);
        await emailField.fill(AMAZON_USERNAME);
        console.log(`Entered email: ${AMAZON_USERNAME}`);
        emailEntered = true;
        await takeScreenshot(page, 'after-email');
        
        // Look for continue button
        const continueButton = await page.$('#continue') || await page.$('input[type="submit"]');
        if (continueButton) {
          await continueButton.click();
          console.log('Clicked continue button');
          await page.waitForTimeout(2000);
          await takeScreenshot(page, 'after-continue');
        } else {
          // No continue button, try pressing Enter
          await page.keyboard.press('Enter');
          console.log('Pressed Enter to continue');
          await page.waitForTimeout(2000);
        }
        break;
      }
    }
    
    if (!emailEntered) {
      console.log('⚠️ Could not find email field');
    }
    
    // Enter password
    console.log('Looking for password field...');
    await page.waitForTimeout(1000);
    
    const passwordSelectors = [
      '#ap_password',
      'input[type="password"]',
      'input[name="password"]'
    ];
    
    let passwordEntered = false;
    for (const selector of passwordSelectors) {
      const passwordField = await page.$(selector);
      if (passwordField) {
        console.log(`Found password field: ${selector}`);
        await passwordField.fill(AMAZON_PASSWORD);
        console.log('Entered password');
        passwordEntered = true;
        await takeScreenshot(page, 'after-password');
        
        // Find sign-in submit button
        const signInButton = await page.$('#signInSubmit') || 
                             await page.$('input[type="submit"]') || 
                             await page.$('button[type="submit"]');
        
        if (signInButton) {
          await signInButton.click();
          console.log('Clicked sign-in button');
        } else {
          // No sign-in button, try pressing Enter
          await page.keyboard.press('Enter');
          console.log('Pressed Enter to sign in');
        }
        break;
      }
    }
    
    if (!passwordEntered) {
      console.log('⚠️ Could not find password field');
    }
    
    // Wait for navigation after login
    console.log('Waiting for login to complete...');
    await page.waitForTimeout(8000);
    await takeScreenshot(page, 'after-login-attempt');
    
    // Check if there's any security verification challenge
    const pageContent = await page.content();
    if (
      pageContent.includes('verification') || 
      pageContent.includes('Verification') || 
      pageContent.includes('challenge') || 
      pageContent.includes('security')
    ) {
      console.log('⚠️ Security verification detected - waiting 45 seconds for manual intervention');
      await takeScreenshot(page, 'security-verification');
      await page.waitForTimeout(45000);
    }
    
  } catch (error) {
    console.log('Error during login:', error.message);
    await takeScreenshot(page, 'login-error');
  }
}

async function goToLibrary(page) {
  console.log('Attempting to go to library...');
  
  try {
    // Method 1: Direct URL
    await page.goto(KINDLE_URL);
    await page.waitForTimeout(3000);
    
    // Check if we're at the library
    if (await isAtLibrary(page)) {
      console.log('✅ Successfully navigated to library via direct URL');
      return true;
    }
    
    // Method 2: Click on library links/buttons
    const librarySelectors = [
      'a:has-text("Library")',
      'button:has-text("Library")',
      'a:has-text("Your Library")',
      '.library-button',
      '.go-to-library',
      '.back-button',
      '.home-button'
    ];
    
    for (const selector of librarySelectors) {
      try {
        const libraryLink = await page.$(selector);
        if (libraryLink) {
          console.log(`Found library link: ${selector}`);
          await libraryLink.click();
          console.log('Clicked on library link');
          await page.waitForTimeout(3000);
          
          if (await isAtLibrary(page)) {
            console.log('✅ Successfully navigated to library via UI element');
            return true;
          }
        }
      } catch (error) {
        console.log(`Error clicking ${selector}:`, error.message);
      }
    }
    
    // Method 3: Try to find any navigation or menu buttons
    console.log('Looking for navigation or menu buttons...');
    const navSelectors = [
      '.menu-button',
      '.hamburger-menu',
      '.navigation',
      '.nav-back',
      'button[aria-label="Menu"]',
      'button[aria-label="Back"]'
    ];
    
    for (const selector of navSelectors) {
      try {
        const navButton = await page.$(selector);
        if (navButton) {
          console.log(`Found navigation button: ${selector}`);
          await navButton.click();
          console.log('Clicked navigation button');
          await page.waitForTimeout(2000);
          await takeScreenshot(page, 'after-nav-click');
          
          // Look for library option in any opened menu
          const libraryOption = await page.$('a:has-text("Library")') || 
                                await page.$('button:has-text("Library")');
          
          if (libraryOption) {
            await libraryOption.click();
            console.log('Clicked library option from menu');
            await page.waitForTimeout(3000);
            
            if (await isAtLibrary(page)) {
              console.log('✅ Successfully navigated to library via menu');
              return true;
            }
          }
        }
      } catch (error) {
        console.log(`Error with navigation: ${error.message}`);
      }
    }
    
    console.log('⚠️ Failed to navigate to library');
    await takeScreenshot(page, 'library-navigation-failed');
    return false;
  } catch (error) {
    console.log('Error navigating to library:', error.message);
    return false;
  }
}

async function isAtLibrary(page) {
  // Check if we're at the library page
  try {
    const libraryIndicators = [
      '.library-title',
      '.kindle-library',
      '.your-library',
      '.book-cover',
      '.title-tile'
    ];
    
    for (const selector of libraryIndicators) {
      const indicator = await page.$(selector);
      if (indicator) {
        return true;
      }
    }
    
    // Check for multiple book covers
    const images = await page.$$('img');
    let bookCovers = 0;
    
    for (const img of images) {
      const box = await img.boundingBox();
      if (box && box.width > 70 && box.height > 100) {
        bookCovers++;
        if (bookCovers >= 3) {
          return true;
        }
      }
    }
    
    return false;
  } catch (error) {
    console.log('Error checking if at library:', error.message);
    return false;
  }
}

async function ensureLibraryPage(page) {
  console.log('Ensuring we are on the library page...');
  
  // If already at library, we're good
  if (await isAtLibrary(page)) {
    console.log('✅ Already at library page');
    return true;
  }
  
  // Otherwise, navigate to library
  console.log('Not at library, navigating there...');
  return await goToLibrary(page);
}

async function findAndClickBook(page, bookIndex) {
  console.log(`Finding book #${bookIndex + 1} to click...`);
  
  try {
    await takeScreenshot(page, `before-book-selection-${bookIndex}`);
    
    // First get all potential book elements
    const bookSelectors = [
      '.book-cover',
      '.title-tile',
      '.library-book',
      '.ebook-title',
      'img[alt*="cover"]',
      '.content-img'
    ];
    
    let books = [];
    
    // Try each selector to find books
    for (const selector of bookSelectors) {
      const elements = await page.$$(selector);
      if (elements && elements.length > 0) {
        console.log(`Found ${elements.length} books with selector: ${selector}`);
        books = elements;
        break;
      }
    }
    
    // If no books found with selectors, try getting any sizeable images
    if (books.length === 0) {
      console.log('No books found with standard selectors, looking for images...');
      
      const images = await page.$$('img');
      const bookImages = [];
      
      for (const img of images) {
        const box = await img.boundingBox();
        if (box && box.width > 70 && box.height > 100) {
          bookImages.push(img);
        }
      }
      
      if (bookImages.length > 0) {
        console.log(`Found ${bookImages.length} potential book cover images`);
        books = bookImages;
      }
    }
    
    // If we still don't have any books, fail
    if (books.length === 0) {
      console.log('⚠️ Could not find any books to click');
      await takeScreenshot(page, `no-books-found-${bookIndex}`);
      return null;
    }
    
    // Select which book to click
    const bookToClick = books[bookIndex % books.length];
    
    // Try to get book title before clicking
    let bookTitle = 'Unknown Title';
    
    try {
      // Method 1: Check alt text on image
      const altText = await bookToClick.getAttribute('alt');
      if (altText && altText.length > 0) {
        bookTitle = altText;
      } else {
        // Method 2: Check parent element text
        const parentText = await page.evaluate(el => {
          const parent = el.parentElement;
          return parent ? parent.textContent : '';
        }, bookToClick);
        
        if (parentText && parentText.trim().length > 0) {
          bookTitle = parentText.trim();
        }
      }
    } catch (error) {
      console.log('Error getting book title:', error.message);
    }
    
    // Click the book
    console.log(`Clicking on book: "${bookTitle}"`);
    await bookToClick.click();
    await page.waitForTimeout(3000);
    await takeScreenshot(page, `after-book-click-${bookIndex}`);
    
    // Wait for book to load
    console.log('Waiting for book reader to load...');
    await page.waitForTimeout(5000);
    await takeScreenshot(page, `book-reader-${bookIndex}`);
    
    // Get more book information after opening
    const bookInfo = {
      title: bookTitle,
      author: 'Unknown Author',
      accessed_at: new Date().toISOString(),
      index: bookIndex + 1
    };
    
    // Try to get better book title and author info
    try {
      const titleSelectors = ['.book-title', '.kindle-title', 'h1', '.title'];
      const authorSelectors = ['.book-author', '.kindle-author', '.author', 'a[href*="author"]'];
      
      // Get title
      for (const selector of titleSelectors) {
        const titleElement = await page.$(selector);
        if (titleElement) {
          const title = await titleElement.textContent();
          if (title && title.trim().length > 0) {
            bookInfo.title = title.trim();
            break;
          }
        }
      }
      
      // Get author
      for (const selector of authorSelectors) {
        const authorElement = await page.$(selector);
        if (authorElement) {
          const author = await authorElement.textContent();
          if (author && author.trim().length > 0) {
            bookInfo.author = author.trim();
            break;
          }
        }
      }
      
    } catch (error) {
      console.log('Error getting detailed book info:', error.message);
    }
    
    return bookInfo;
    
  } catch (error) {
    console.log('Error finding and clicking book:', error.message);
    return null;
  }
}

async function extractBookContent(page, pagesToExtract) {
  console.log(`Extracting content from ${pagesToExtract} pages...`);
  
  const contentData = {
    pages: [],
    total_chars: 0,
    extraction_time: new Date().toISOString()
  };
  
  try {
    // For each page we want to extract
    for (let i = 0; i < pagesToExtract; i++) {
      console.log(`Extracting page ${i + 1}...`);
      
      // Take screenshot of current page
      await takeScreenshot(page, `book-page-${i+1}`);
      
      // Get text content from current page
      const pageContent = await extractCurrentPageContent(page);
      
      if (pageContent && pageContent.length > 0) {
        contentData.pages.push({
          page_number: i + 1,
          content: pageContent
        });
        contentData.total_chars += pageContent.length;
        console.log(`Extracted ${pageContent.length} characters from page ${i + 1}`);
      } else {
        console.log(`No content found on page ${i + 1}`);
      }
      
      // If not the last page, turn to next page
      if (i < pagesToExtract - 1) {
        const turnedPage = await turnToNextPage(page);
        if (!turnedPage) {
          console.log('Could not turn to next page, stopping extraction');
          break;
        }
        await page.waitForTimeout(2000);
      }
    }
    
    console.log(`✅ Extracted ${contentData.pages.length} pages with ${contentData.total_chars} total characters`);
    return contentData;
    
  } catch (error) {
    console.log('Error extracting book content:', error.message);
    return contentData;
  }
}

async function extractCurrentPageContent(page) {
  try {
    // Try multiple approaches to get content
    
    // Approach 1: Get text from common content selectors
    const contentSelectors = [
      '.book-content', 
      '.kindle-content', 
      '.content', 
      '.text-content',
      '#kindleReader_content',
      '.textLayer',
      'p'
    ];
    
    for (const selector of contentSelectors) {
      const contentElements = await page.$$(selector);
      if (contentElements && contentElements.length > 0) {
        // Get text from all matching elements
        const textPromises = contentElements.map(el => el.textContent());
        const texts = await Promise.all(textPromises);
        
        // Filter and join meaningful text (longer than 20 chars)
        const filteredTexts = texts
          .filter(text => text && text.trim().length > 20)
          .map(text => text.trim());
        
        if (filteredTexts.length > 0) {
          return filteredTexts.join('\n\n');
        }
      }
    }
    
    // Approach 2: Get all visible text from the page using evaluate
    const pageText = await page.evaluate(() => {
      // Helper function to check if element is visible
      const isVisible = elem => {
        if (!elem) return false;
        const style = window.getComputedStyle(elem);
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               style.opacity !== '0';
      };
      
      // Get all text nodes that are visible and have meaningful content
      const textNodes = [];
      
      // Walk the DOM and find text nodes
      const walk = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        { 
          acceptNode: node => {
            // Skip if parent is not visible
            if (!isVisible(node.parentElement)) return NodeFilter.FILTER_REJECT;
            
            // Skip if empty text
            const text = node.textContent.trim();
            if (!text) return NodeFilter.FILTER_REJECT;
            
            // Skip very short text (likely UI elements)
            if (text.length < 10) return NodeFilter.FILTER_REJECT;
            
            // Skip elements that are likely UI, not content
            const parent = node.parentElement;
            if (parent && (
                parent.tagName === 'BUTTON' || 
                parent.tagName === 'INPUT' || 
                parent.tagName === 'SELECT' || 
                parent.tagName === 'OPTION' ||
                parent.tagName === 'SCRIPT' ||
                parent.tagName === 'STYLE'
            )) {
              return NodeFilter.FILTER_REJECT;
            }
            
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      
      let node;
      while (node = walk.nextNode()) {
        textNodes.push(node.textContent.trim());
      }
      
      // Join all text with newlines
      return textNodes.join('\n');
    });
    
    if (pageText && pageText.length > 50) {
      return pageText;
    }
    
    // Approach 3: As a last resort, get innerHTML and extract text
    const innerHTML = await page.evaluate(() => document.body.innerHTML);
    if (innerHTML) {
      // Simple text extraction - strip HTML tags and clean up
      const textOnly = innerHTML
        .replace(/<[^>]*>/g, ' ') // Replace HTML tags with spaces
        .replace(/\s+/g, ' ')     // Collapse whitespace
        .trim();
      
      if (textOnly.length > 50) {
        return textOnly;
      }
    }
    
    return '';
  } catch (error) {
    console.log('Error extracting page content:', error.message);
    return '';
  }
}

async function turnToNextPage(page) {
  console.log('Turning to next page...');
  
  try {
    // Approach 1: Press right arrow key
    await page.keyboard.press('ArrowRight');
    console.log('Pressed right arrow key');
    await page.waitForTimeout(1000);
    
    // Approach 2: Try clicking next buttons
    const nextSelectors = [
      '.next-button',
      '.kindle-next',
      '.page-next',
      '.next',
      'button:has-text("Next")',
      'button[aria-label="Next page"]'
    ];
    
    for (const selector of nextSelectors) {
      try {
        const nextButton = await page.$(selector);
        if (nextButton) {
          console.log(`Found next button: ${selector}`);
          await nextButton.click();
          console.log('Clicked next button');
          await page.waitForTimeout(1000);
          break;
        }
      } catch (error) {
        // Continue to next selector
      }
    }
    
    // Approach 3: Click on right side of screen
    try {
      const viewportSize = page.viewportSize();
      if (viewportSize) {
        const rightX = viewportSize.width * 0.9; // 90% of the way to the right
        const centerY = viewportSize.height / 2;
        
        console.log(`Clicking on right side of screen at (${rightX}, ${centerY})`);
        await page.mouse.click(rightX, centerY);
        console.log('Clicked on right side of screen');
      }
    } catch (error) {
      console.log('Error clicking right side:', error.message);
    }
    
    return true;
  } catch (error) {
    console.log('Error turning page:', error.message);
    return false;
  }
}

async function takeScreenshot(page, name) {
  if (DEBUG) {
    const filename = `${name}-${Date.now()}.png`;
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename) });
    console.log(`📷 Screenshot saved: ${filename}`);
  }
}

// Run the script
main();