import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function scrapeLinkedInJobs() {
  const browser = await chromium.launch({ 
    headless: false, // Set to true for production
    slowMo: 1000 // Slow down actions to avoid detection
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Navigating to LinkedIn Jobs...');
    
    // Go to LinkedIn jobs page
    await page.goto('https://www.linkedin.com/jobs/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for the page to load
    await page.waitForTimeout(3000);
    
    // Check if we need to handle login popup or cookie consent
    try {
      // Handle cookie consent if it appears
      const cookieButton = page.locator('button[aria-label="Accept all cookies"], button:has-text("Accept"), button:has-text("Accept all")');
      if (await cookieButton.isVisible()) {
        await cookieButton.click();
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.log('No cookie consent found or already handled');
    }
    
    const jobLinks = [];
    let pageNumber = 1;
    const maxPages = 10; // Adjust based on how many jobs per page
    
    while (jobLinks.length < 100 && pageNumber <= maxPages) {
      console.log(`Scraping page ${pageNumber}...`);
      
      // Wait for job listings to load
      await page.waitForTimeout(2000);
      
      // Extract job links from current page
      const currentPageLinks = await page.evaluate(() => {
        const links = [];
        const jobCards = document.querySelectorAll('a[href*="/jobs/view/"], a[href*="/jobs/collections/"], .job-search-card');
        
        jobCards.forEach((card) => {
          const linkElement = card.tagName === 'A' ? card : card.querySelector('a[href*="/jobs/"]');
          if (linkElement && linkElement.href) {
            const jobId = linkElement.href.match(/\/jobs\/view\/(\d+)/)?.[1] || 
                         linkElement.href.match(/\/jobs\/collections\/[^\/]+\/(\d+)/)?.[1];
            
            if (jobId) {
              links.push({
                id: jobId,
                url: linkElement.href,
                title: linkElement.textContent?.trim() || 'Unknown Title',
                timestamp: new Date().toISOString()
              });
            }
          }
        });
        
        return links;
      });
      
      // Add unique links to our collection
      currentPageLinks.forEach(link => {
        if (!jobLinks.find(existing => existing.id === link.id)) {
          jobLinks.push(link);
        }
      });
      
      console.log(`Found ${currentPageLinks.length} jobs on page ${pageNumber}, total: ${jobLinks.length}`);
      
      // Try to go to next page if we haven't reached 100 jobs
      if (jobLinks.length < 100) {
        try {
          // Look for next page button
          const nextButton = page.locator('button[aria-label="Next"], button:has-text("Next"), .artdeco-pagination__button--next');
          const isNextDisabled = await nextButton.getAttribute('disabled');
          
          if (isNextDisabled === null && await nextButton.isVisible()) {
            await nextButton.click();
            await page.waitForTimeout(3000);
            pageNumber++;
          } else {
            console.log('No more pages available or next button disabled');
            break;
          }
        } catch (e) {
          console.log('Could not navigate to next page:', e.message);
          break;
        }
      }
    }
    
    // Save results to JSON file
    const outputPath = join(process.cwd(), 'data', 'linkedin_jobs.json');
    const outputData = {
      scrapedAt: new Date().toISOString(),
      totalJobs: jobLinks.length,
      jobs: jobLinks
    };
    
    writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    console.log(`\n✅ Successfully scraped ${jobLinks.length} job links!`);
    console.log(`📁 Saved to: ${outputPath}`);
    
    // Display first few jobs as preview
    console.log('\n📋 Preview of scraped jobs:');
    jobLinks.slice(0, 5).forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} (ID: ${job.id})`);
    });
    
    if (jobLinks.length > 5) {
      console.log(`... and ${jobLinks.length - 5} more jobs`);
    }
    
  } catch (error) {
    console.error('❌ Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

// Alternative approach: Search for specific jobs
async function scrapeLinkedInJobsBySearch(searchTerm = 'software engineer') {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log(`Searching for jobs with term: "${searchTerm}"`);
    
    // Go to LinkedIn jobs search
    await page.goto(`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(searchTerm)}`, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    await page.waitForTimeout(3000);
    
    // Handle cookie consent
    try {
      const cookieButton = page.locator('button[aria-label="Accept all cookies"], button:has-text("Accept"), button:has-text("Accept all")');
      if (await cookieButton.isVisible()) {
        await cookieButton.click();
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.log('No cookie consent found or already handled');
    }
    
    const jobLinks = [];
    let pageNumber = 1;
    const maxPages = 10;
    
    while (jobLinks.length < 100 && pageNumber <= maxPages) {
      console.log(`Scraping page ${pageNumber}...`);
      
      await page.waitForTimeout(2000);
      
      // Extract job links with more detailed information
      const currentPageLinks = await page.evaluate(() => {
        const links = [];
        const jobCards = document.querySelectorAll('.job-search-card, .job-card-container, [data-job-id]');
        
        jobCards.forEach((card) => {
          const linkElement = card.querySelector('a[href*="/jobs/view/"]') || card.closest('a[href*="/jobs/view/"]');
          if (linkElement && linkElement.href) {
            const jobId = linkElement.href.match(/\/jobs\/view\/(\d+)/)?.[1];
            
            if (jobId) {
              const titleElement = card.querySelector('.job-search-card__title, .job-card-list__title, h3');
              const companyElement = card.querySelector('.job-search-card__subtitle, .job-card-container__company-name, .job-card-container__primary-description');
              const locationElement = card.querySelector('.job-search-card__location, .job-card-container__metadata-item');
              
              links.push({
                id: jobId,
                url: linkElement.href,
                title: titleElement?.textContent?.trim() || 'Unknown Title',
                company: companyElement?.textContent?.trim() || 'Unknown Company',
                location: locationElement?.textContent?.trim() || 'Unknown Location',
                timestamp: new Date().toISOString()
              });
            }
          }
        });
        
        return links;
      });
      
      // Add unique links
      currentPageLinks.forEach(link => {
        if (!jobLinks.find(existing => existing.id === link.id)) {
          jobLinks.push(link);
        }
      });
      
      console.log(`Found ${currentPageLinks.length} jobs on page ${pageNumber}, total: ${jobLinks.length}`);
      
      // Navigate to next page
      if (jobLinks.length < 100) {
        try {
          const nextButton = page.locator('button[aria-label="Next"], button:has-text("Next"), .artdeco-pagination__button--next');
          const isNextDisabled = await nextButton.getAttribute('disabled');
          
          if (isNextDisabled === null && await nextButton.isVisible()) {
            await nextButton.click();
            await page.waitForTimeout(3000);
            pageNumber++;
          } else {
            console.log('No more pages available');
            break;
          }
        } catch (e) {
          console.log('Could not navigate to next page:', e.message);
          break;
        }
      }
    }
    
    // Save results
    const outputPath = join(process.cwd(), 'data', `linkedin_jobs_${searchTerm.replace(/\s+/g, '_')}.json`);
    const outputData = {
      searchTerm,
      scrapedAt: new Date().toISOString(),
      totalJobs: jobLinks.length,
      jobs: jobLinks
    };
    
    writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    console.log(`\n✅ Successfully scraped ${jobLinks.length} job links for "${searchTerm}"!`);
    console.log(`📁 Saved to: ${outputPath}`);
    
    // Preview
    console.log('\n📋 Preview of scraped jobs:');
    jobLinks.slice(0, 5).forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company} (${job.location})`);
    });
    
  } catch (error) {
    console.error('❌ Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting LinkedIn Job Scraper...\n');
  
  // You can choose which function to run:
  
  // Option 1: Scrape general jobs
  await scrapeLinkedInJobs();
  
  // Option 2: Scrape jobs by search term (uncomment to use)
  // await scrapeLinkedInJobsBySearch('software engineer');
  
  console.log('\n✨ Scraping completed!');
}

// Run the script
main().catch(console.error);
