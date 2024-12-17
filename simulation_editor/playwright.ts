import { chromium } from "playwright";

async function main() {
  try {
    // Launch the browser
    const browser = await chromium.launch();
    
    // Create a new page
    const page = await browser.newPage();
    
    // Navigate to the URL
    await page.goto("https://musicgame2025.netlify.com", {
      waitUntil: "domcontentloaded"
    });
    
    // Take screenshot
    await page.screenshot({ path: "foo.png" });
    
    // Clean up
    await browser.close();
    
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

main();