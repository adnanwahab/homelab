const { chromium } = require("playwright"); // or 'firefox', 'webkit'


//  chromium-browser --remote-debugging-port=9222

(async () => {
    // Connect to the existing browser session using the WebSocket debugger URL
    const browser = await chromium.connect({
        //wsEndpoint: "ws://localhost:9222/devtools/browser/1234-5678-abcdefg", // Replace this with the actual URL
    });

    // Now you can interact with the existing browser
    const page = await browser.newPage();
    await page.goto("https://example.com");

    // You can continue to interact with the page as needed.
})();
