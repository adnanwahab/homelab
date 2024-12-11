import { chromium } from "npm:playwright";

async function main() {
  try {
    const browser = await chromium.launch({
      channel: 'chrome'
    });

    const page = await browser.newPage();
    
    await page.goto('https://news.ycombinator.com');
    
    const entries = await page.locator('.athing').all();
    
    for (let i = 0; i < entries.length; i++) {
      const title = await entries[i]
        .locator('td.title > span > a')
        .textContent();
      
      console.log(`${i + 1}: ${title}`);
    }
    
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
    //Deno.exit(1);
  }
}

main().catch((err) => {
  console.error('Error:', err);
  //Deno.exit(1);
});