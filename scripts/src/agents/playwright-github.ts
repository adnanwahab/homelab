// playwright-github.ts
import { webkit } from "playwright";
import { write } from "fs/promises";

async function scrapeGitHubRepos() {
  // Launch webkit (Safari) in headed mode
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const allRepos = [];

  try {
    for (let pageNum = 1; pageNum <= 10; pageNum++) {
      await page.goto(
        `https://github.com/search?q=topic%3Aplaywright&type=repositories&s=stars&o=desc&p=${pageNum}`,
        { waitUntil: "networkidle" }, // Wait until network is idle
      );

      // Make it slower and more visible
      await page.waitForSelector(".repo-list-item", { timeout: 5000 });

      const pageRepos = await page.evaluate(() => {
        const repoList = [];
        const repoElements = document.querySelectorAll(".repo-list-item");

        repoElements.forEach((repo) => {
          const titleElement = repo.querySelector(".v-align-middle");
          const descriptionElement = repo.querySelector(".mb-1");
          const statsElements = repo.querySelectorAll(".mr-3");

          const repoData = {
            name: titleElement?.textContent?.trim() || "",
            url: titleElement?.href || "",
            description: descriptionElement?.textContent?.trim() || "",
            stars: statsElements[0]?.textContent?.trim() || "0",
            forks: statsElements[1]?.textContent?.trim() || "0",
            updatedAt: statsElements[2]?.textContent?.trim() || "",
          };

          repoList.push(repoData);
        });

        return repoList;
      });

      allRepos.push(...pageRepos);
      console.log(
        `Scraped page ${pageNum} - Found ${pageRepos.length} repositories`,
      );

      // Longer delay to make it more visible
      await page.waitForTimeout(2000);
    }

    // Save the data to a JSON file
    await write(
      "./playwright-repos.json",
      JSON.stringify(allRepos, null, 2),
      "utf-8",
    );

    console.log(
      `Successfully scraped ${allRepos.length} repositories in total`,
    );
  } catch (error) {
    console.error("Error scraping repositories:", error);
  } finally {
    // Keep the browser open for a few seconds before closing
    await page.waitForTimeout(3000);
    await browser.close();
  }
}

// Run the scraper
scrapeGitHubRepos();
