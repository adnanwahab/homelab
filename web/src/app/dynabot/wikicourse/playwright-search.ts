// // web/src/pages/odyssey/playwright-search.tsx
// import fs from "fs";
// import { chromium } from "playwright";
// import path from "path";

// // https://playwright.dev/docs/puppeteer#cheat-sheet

// function sleep(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function googleSearch(searchQuery) {
//   const cacheFile = `public/tmp/query-${searchQuery}.json`;
//   if (fs.existsSync(cacheFile)) {
//     return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
//   }

//   const browser = await chromium.launch({ headless: true });
//   const page = await browser.newPage();

//   // Update the URL to filter for large images
//   const url = `https://www.google.com/search?tbm=isch&tbs=isz:l&q=${encodeURIComponent(searchQuery)}`;
//   await page.goto(url);

//   await sleep(1000);

//   console.log(`Search results for "${searchQuery}"`);

//   // Extract image sources along with their dimensions
//   const imagesInfo = await page.$$eval('img', imgs =>
//     imgs
//       .filter(img => img.src && img.src.startsWith('http'))
//       .map(img => ({
//         src: img.src,
//         width: img.naturalWidth,
//         height: img.naturalHeight
//       }))
//   );

//   // Find the image with the largest area
//   const largestImage = imagesInfo.reduce((largest, img) => {
//     const imgArea = img.width * img.height;
//     const largestArea = largest.width * largest.height;
//     return imgArea > largestArea ? img : largest;
//   }, imagesInfo[0]);

//   if (!largestImage) {
//     console.error('No images found for the query.');
//     await browser.close();
//     return [];
//   }

//   // Download the largest image
//   try {
//     const imagePage = await browser.newPage();
//     await imagePage.goto(largestImage.src, { waitUntil: 'networkidle' });
//     const buffer = await imagePage.screenshot({ fullPage: true });
//     const fileName = `${searchQuery}-largest.png`;
//     fs.writeFileSync(`tmp/${fileName}`, buffer);
//     console.log(`Saved the largest image as ${fileName}`);
//     await imagePage.close();
//   } catch (error) {
//     console.error(`Failed to download largest image ${largestImage.src}:`, error);
//   }

//   fs.writeFileSync(cacheFile, JSON.stringify([largestImage.src], null, 2));

//   await browser.close();
//   return [largestImage.src];
// }

// // Example usage
// export default googleSearch;

// // make a repl - send screenshots - alan tree vision
