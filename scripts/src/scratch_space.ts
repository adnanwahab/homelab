


const url = "https://www.amazon.com/hz/mycd/digital-console/contentlist/booksAll/dateDsc/";

const template = `
<html>
<body>
<h1>Hello World</h1>
<button>Click me</button>
<div id="logs"></div>
<script type="module">
  document.querySelector("button").addEventListener("click", async () => {
    const response = await fetch("/playwright")
    const text = await response.text()
    document.querySelector("#logs").textContent = text
  });
</script>
</body>
</html>
`


const server = Bun.serve({
    port: 3000,
    fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/playwright") {
            return new Response("it worked!");
        }


      return new Response(template, {
        headers: { "Content-Type": "text/html" },
      });
    },
  });
  
  console.log(`Listening on ${server.url}`);



  import { chromium } from "playwright";

async function scrapeAmazonBooks() {
  const browser = await chromium.launch({ headless: false }); // headless:false to see the browser
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to Amazon
    await page.goto(url);

    // Wait for user to login manually (since this is a protected page)
    // You might want to implement proper authentication handling
    await page.waitForTimeout(30000); // 30 seconds to login manually

    // Wait for the books list to load
    await page.waitForSelector('.contentList-item', { timeout: 60000 });

    // Extract book information
    const books = await page.evaluate(() => {
      const bookElements = document.querySelectorAll('.contentList-item');
      return Array.from(bookElements).map(book => ({
        title: book.querySelector('.title')?.textContent?.trim(),
        author: book.querySelector('.author')?.textContent?.trim(),
        purchaseDate: book.querySelector('.purchaseDate')?.textContent?.trim(),
      }));
    });

    console.log('Found books:', books);
    return books;

  } catch (error) {
    console.error('Error scraping Amazon:', error);
  } finally {
    await browser.close();
  }
}

// Run the scraper
scrapeAmazonBooks();