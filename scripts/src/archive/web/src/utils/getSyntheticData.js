
// import routes from "./routes/routes";

// //1 billion - 100,000aires by 2025 march
// const router = FileSystemRouter({
//     style: "nextjs",
//     dir: "./src/routes", // Specify the directory where your routes will be
// });
//improve devops time for 8 billlion people to create a twitter and native bun way to worrydream

// Main fetch handler
import fs from "fs";
import { chromium } from "playwright";
import { BugAntIcon } from "@heroicons/react/24/solid";

class ScrapeTweets {
    static async getLatestTweets(username: string, count: number = 10) {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        const url = `https://twitter.com/${username}`;
        
        await page.goto(url, { waitUntil: 'networkidle' });

        // Wait for tweets to load
        await page.waitForSelector('article div[lang]');

        // Extract tweets
        const tweets = await page.$$eval('article div[lang]', (nodes, count) => {
            return nodes.slice(0, count).map(node => node.innerText);
        }, count);

        await browser.close();

        // Save tweets to a JSON file
        fs.writeFileSync(`./data/${username}_tweets.json`, JSON.stringify(tweets, null, 2), 'utf8');
        return `./data/${username}_tweets.json`
        console.log(`Successfully saved ${tweets.length} tweets to ./data/${username}_tweets.json`);
    }
}

console.log('asdlkfalskdfj')
// Usage
// const has_repost_worrydream = await ScrapeTweets.getLatestTweets("dynamicland1");

// const repost_worrydream = fs.readFileSync(has_repost_worrydream, 'utf8');

// console.log(repost_worrydream);
