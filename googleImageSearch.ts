import { chromium } from 'playwright';

async function getFirstGoogleImage(searchTerm: string): Promise<string | null> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to Google Images
    await page.goto('https://images.google.com');
    
    // Accept cookies if the dialog appears (for EU users)
    try {
      await page.click('button:has-text("Accept all")');
    } catch (e) {
      // Cookie dialog might not appear in all regions
    }
    
    // Type search term and press enter
    await page.fill('input[name="q"]', searchTerm);
    await page.press('input[name="q"]', 'Enter');
    
    // Wait for results and get first image
    await page.waitForSelector('div[data-ri="0"] img');
    const firstImage = await page.evaluate(() => {
      const img = document.querySelector('div[data-ri="0"] img');
      return img?.src || null;
    });
    
    return firstImage;
  } catch (error) {
    console.error('Error:', error);
    return null;
  } finally {
    await browser.close();
  }
}

// Example usage
const searchTerm = process.argv[2] || 'bun javascript';

getFirstGoogleImage(searchTerm)
  .then(imageUrl => {
    if (imageUrl) {
      console.log('First image URL:', imageUrl);
    } else {
      console.log('No image found');
    }
  }); 