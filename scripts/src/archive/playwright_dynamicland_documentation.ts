import { chromium } from 'playwright';
import fs from 'fs';

async function getAllLinksFromDynamicLand() {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const startUrl = 'https://dynamicland.org/';
    const visited = new Set<string>();
    const allLinks = new Set<string>();
    const maxDepth = 2; // You can adjust the depth as needed

    async function crawlPage(url: string, depth: number) {
        if (visited.has(url) || depth > maxDepth) {
            return;
        }

        visited.add(url);

        try {
            const page = await context.newPage();
            await page.goto(url);
            console.log(`Visiting: ${url}`);

            const links = await page.$$eval('a', anchors => anchors.map(a => a.href));
            await page.close();

            for (const link of links) {
                if (!link.startsWith('http')) {
                    continue; // Skip non-HTTP links
                }

                allLinks.add(link);
                await crawlPage(link, depth + 1);
            }
        } catch (error) {
            console.error(`Error visiting ${url}: ${error}`);
        }
    }

    await crawlPage(startUrl, 0);

    fs.writeFileSync('links.json', JSON.stringify(Array.from(allLinks), null, 2));

    await browser.close();
}

getAllLinksFromDynamicLand();