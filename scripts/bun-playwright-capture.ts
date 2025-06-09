// bun-playwright-capture-gifs.js

import { chromium } from 'playwright';

// Helper to run shell commands (ffmpeg)
const exec = (cmd) =>
  new Promise((resolve, reject) => {
    Bun.spawn([ "bash", "-c", cmd ]).exited.then(resolve, reject);
  });

const BASE_URL = "https://www.adnanwahab.com";
const DEMOS_URL = `${BASE_URL}/demos`;
const OUTPUT_DIR = "./demo-gifs";
const FRAMES = 20; // Number of frames for each gif
const DURATION = 2; // seconds to record

await Bun.write(OUTPUT_DIR + "/.keep", ""); // Ensure folder exists

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(DEMOS_URL);

// Get all demo links
const links = await page.$$eval("a", anchors =>
  anchors.map(a => a.href).filter(href => /\/demos\/\d+$/.test(href))
);

for (const link of links) {
  const id = link.split("/").pop();
  const shotDir = `${OUTPUT_DIR}/shots_${id}`;
  await Bun.write(shotDir + "/.keep", ""); // mkdir -p
  const page2 = await browser.newPage();
  await page2.goto(link);
  // Set consistent viewport
  await page2.setViewportSize({ width: 800, height: 600 });

  // Take FRAMES over DURATION seconds
  for (let i = 0; i < FRAMES; i++) {
    await page2.screenshot({ path: `${shotDir}/frame_${i}.png` });
    await new Promise(r => setTimeout(r, (DURATION * 1000) / FRAMES));
  }
  await page2.close();

  // Use ffmpeg to create GIF
  const gifPath = `${OUTPUT_DIR}/demo_${id}.gif`;
  await exec(`ffmpeg -y -hide_banner -loglevel error -f image2 -framerate ${FRAMES/DURATION} -i ${shotDir}/frame_%d.png -vf "scale=800:-1" ${gifPath}`);

  // Optionally: Remove the frames
  // await exec(`rm -rf ${shotDir}`);
  console.log(`Saved GIF: ${gifPath}`);
}

await browser.close();
console.log("Done.");
