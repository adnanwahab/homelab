import { chromium } from 'playwright';
import fs from 'fs';

async function captureScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the local URL
  await page.goto('http://localhost:8000/music_game/183_levels/level_1');
  
  // Ensure the directory exists
  const screenshotDir = `${process.env.HOME}/Desktop/screenshots`;
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }
  
  // Take screenshot
  await page.screenshot({
    path: `${screenshotDir}/game_level_1.png`,
    fullPage: true
  });

  await browser.close();
}

// Run the script
captureScreenshot().catch(console.error); 