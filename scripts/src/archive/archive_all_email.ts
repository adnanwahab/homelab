///twitter, yutube, email, observable, github, linkedin, reddit, hackernews, 
//get lots of data -> ray trace -> blog -> cross post -> retweet -> repeat daily.
//https://playwright.dev/community/welcome
// Import Playwright
import { chromium } from 'playwright';



function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Use Playwright with existing Chrome to visit observablehq.com
async function fetch_observable() {
  // Path to your Google Chrome executable
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  // Path to your Chrome user data directory
  const userDataDir = '~/Library/Application Support/Google/Chrome';

  // Launch Chrome with your existing user profile
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    executablePath: chromePath,
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to observablehq.com
  await page.goto('https://observablehq.com');


  await sleep(10000);
  // Perform any additional actions here

  // Close the browser when done
  //await browser.close();
}



///login to email -- download all 


///login to youtube - download all


//login to observale download all 






import { chromium } from 'playwright';
import fs from 'fs';

async function fetch_worrydream() {
  const startUrl = 'https://worrydream.com/';
  const maxDepth = 5;
  const visitedUrls = new Set<string>();
  const urlQueue: { url: string; depth: number }[] = [{ url: startUrl, depth: 1 }];

  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  while (urlQueue.length > 0) {
    const { url, depth } = urlQueue.shift()!;
    if (visitedUrls.has(url) || depth > maxDepth) {
      continue;
    }

    console.log(`Crawling (${depth}/${maxDepth}): ${url}`);
    visitedUrls.add(url);

    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      // Extract all links on the page
      const links = await page.$$eval('a[href]', anchors =>
        anchors.map(a => (a as HTMLAnchorElement).href)
      );

      // Process and enqueue new links
      for (const link of links) {
        const normalizedLink = new URL(link, url).toString();
        if (
          !visitedUrls.has(normalizedLink) &&
          normalizedLink.startsWith(startUrl)
        ) {
          urlQueue.push({ url: normalizedLink, depth: depth + 1 });
        }
      }

    } catch (error) {
      console.error(`Error crawling ${url}:`, error);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  // Optionally, write the visited URLs to a file
  fs.writeFileSync('visited_urls.txt', Array.from(visitedUrls).join('\n'));

}



fetch_observable()

//"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222