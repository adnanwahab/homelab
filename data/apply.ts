// auto‑apply‑list‑links.ts
import { chromium } from 'playwright';

async function getJobLinks() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://hnhiring.com/july-2025', { waitUntil: 'networkidle' });

  // Grab all links in the main jobs listing container
  const links = await page.$$eval('a', (anchors) =>
    anchors
      .map((a) => a.href)
      .filter((href) => href.includes('://'))
  );

  // Optionally dedupe
  const unique = Array.from(new Set(links));
  await browser.close();

  return unique;
}

(async () => {
  const links = await getJobLinks();
  console.log(`Found ${links.length} unique links:`);
  links.forEach((l) => console.log(l));
})();
