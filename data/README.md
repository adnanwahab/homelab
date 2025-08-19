# LinkedIn Job Scraper

A powerful LinkedIn job scraper built with Bun and Playwright that can extract up to 100 job links and save them to JSON files.

## Features

- 🚀 Fast execution with Bun runtime
- 🎭 Browser automation with Playwright
- 📊 Extracts job links, titles, companies, and locations
- 💾 Saves results to structured JSON files
- 🔄 Handles pagination automatically
- 🛡️ Built-in anti-detection measures
- 🍪 Automatic cookie consent handling

## Installation

1. **Install dependencies:**
   ```bash
   cd data
   bun install
   ```

2. **Install Playwright browsers:**
   ```bash
   bunx playwright install chromium
   ```

## Usage

### Basic Usage (Scrape General Jobs)

```bash
bun run scrape_linkedin..js
```

This will:
- Navigate to LinkedIn Jobs page
- Extract up to 100 job links
- Save results to `linkedin_jobs.json`

### Search-Specific Jobs

To scrape jobs for a specific search term, edit the script and uncomment the search function:

```javascript
// In scrape_linkedin..js, change the main() function:
async function main() {
  console.log('🚀 Starting LinkedIn Job Scraper...\n');
  
  // Comment out the general scraper
  // await scrapeLinkedInJobs();
  
  // Uncomment and customize the search scraper
  await scrapeLinkedInJobsBySearch('software engineer');
  
  console.log('\n✨ Scraping completed!');
}
```

### Customization Options

You can modify the script to:

1. **Change search terms:** Edit the `searchTerm` parameter
2. **Adjust scraping speed:** Modify the `slowMo` value (higher = slower but more reliable)
3. **Change output location:** Modify the `outputPath` variable
4. **Enable headless mode:** Set `headless: true` for production use

## Output Format

The scraper generates JSON files with the following structure:

```json
{
  "scrapedAt": "2024-01-15T10:30:00.000Z",
  "totalJobs": 100,
  "jobs": [
    {
      "id": "123456789",
      "url": "https://www.linkedin.com/jobs/view/123456789",
      "title": "Software Engineer",
      "company": "Tech Company Inc",
      "location": "San Francisco, CA",
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## Important Notes

⚠️ **Legal and Ethical Considerations:**
- Respect LinkedIn's Terms of Service
- Use reasonable scraping intervals to avoid overwhelming their servers
- Consider implementing delays between requests
- This tool is for educational purposes only

🔧 **Technical Notes:**
- The script runs in non-headless mode by default for debugging
- Set `headless: true` for production use
- Adjust `slowMo` timing if you encounter rate limiting
- The script includes error handling for common issues

## Troubleshooting

### Common Issues:

1. **"No job links found"**
   - LinkedIn may have changed their HTML structure
   - Try adjusting the CSS selectors in the script
   - Check if you need to log in to LinkedIn

2. **"Rate limiting detected"**
   - Increase the `slowMo` value
   - Add longer delays between page loads
   - Consider using a proxy rotation

3. **"Browser not launching"**
   - Ensure Playwright browsers are installed: `bunx playwright install chromium`
   - Check if you have sufficient system resources

### Performance Tips:

- Use `headless: true` for faster execution
- Reduce `slowMo` value for quicker scraping (but may increase detection risk)
- Consider running during off-peak hours

## License

This project is for educational purposes only. Please respect LinkedIn's Terms of Service and use responsibly. 