import fs from "fs";
import { chromium } from "playwright";

const data = fs.readFileSync('research_papers.json', 'utf8');

// Define contacts array at the top level
const contacts = JSON.parse(data);
if (!fs.existsSync('./scholar_data')) {
    fs.mkdirSync('./scholar_data');
  }
  //https://scholar.google.com/citations?user=J_veo1sAAAAJ&hl=en&oi=sra
contacts.forEach(async contact => {
    console.log(contact.name);
    
    try {
      // Execute scholarly.py with the contact name
      const { execSync } = require('child_process');
      const scholarlyResult = execSync(`uv run  scholar.py "${contact.name}"`, { encoding: 'utf8' });
      
      // Parse the Python script output as JSON
      const scholarData = JSON.parse(scholarlyResult);
      
      // Save to a JSON file named after the contact
      const filename = `./scholar_data/${contact.name.replace(/[^a-z0-9]/gi, '_')}.json`;
      fs.writeFileSync(filename, JSON.stringify(scholarData, null, 2));
      
      console.log(`Saved scholar data for ${contact.name}`);
    } catch (error) {
      console.error(`Error processing ${contact.name}:`, error.message);
    }
  });

  async function scrapePDFs() {
    const scholarUrls = [];
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    for (const contact of contacts) {
      try {
        const scholarLink = await findScholarProfile(contact.name);
        if (scholarLink) {
          scholarUrls.push(scholarLink);
          console.log(`Found scholar profile for ${contact.name}: ${scholarLink}`);
          
          // Process the scholar profile immediately
          await processScholarProfile(page, scholarLink);
        }
      } catch (error) {
        console.error(`Error processing contact ${contact.name}:`, error);
      }
    }

    await browser.close();
    return scholarUrls;
  }

  // Add new function to process each scholar profile
  async function processScholarProfile(page, scholarUrl) {
    await page.goto(scholarUrl, { waitUntil: 'networkidle' });
    
    // Get all paper links
    const papers = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('.gsc_a_at'));
      return links.map(link => ({
        title: link.textContent,
        href: link.href
      }));
    });

    // Create downloads directory if it doesn't exist
    if (!fs.existsSync('./downloads')) {
      fs.mkdirSync('./downloads');
    }

    // Visit each paper page and try to find PDF links
    for (const paper of papers) {
      try {
        await page.goto(paper.href, { waitUntil: 'networkidle' });
        
        // Look for PDF links
        const pdfLinks = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a[href*=".pdf"]'));
          return links.map(link => link.href);
        });

        console.log(`Found ${pdfLinks.length} PDFs for: ${paper.title}`);
        
        // Download PDFs
        for (let [index, pdfUrl] of pdfLinks.entries()) {
          const filename = `./downloads/${paper.title.replace(/[^a-z0-9]/gi, '_')}_${index}.pdf`;
          
          const pdfResponse = await page.goto(pdfUrl);
          if (pdfResponse.ok()) {
            const buffer = await pdfResponse.body();
            fs.writeFileSync(filename, buffer);
            console.log(`Downloaded: ${filename}`);
          }
        }
      } catch (error) {
        console.error(`Error processing ${paper.title}:`, error.message);
      }
    }
  }

  // Run the scraper
  const scholarUrls = await scrapePDFs().catch(console.error);

console.log(scholarUrls)

//const scholars_urls = JSON.parse(data).map(item => item.profile_link);

const scholars_urls = [
    'https://scholar.google.com/citations?user=_MsNwIsAAAAJ&hl=en',
    'https://scholar.google.com.hk/citations?user=ZKtYLHwAAAAJ&hl=th'
]

// Remove browser-specific code (downloadBlob, getContactsFromPage, getAllContacts)
// as they won't work in Node.js environment
