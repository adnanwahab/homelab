import { NextResponse } from "next/server";
import { chromium } from "@playwright/test";

export async function POST(request) {
  const { origin, destination, date } = await request.json();

  if (!origin || !destination || !date) {
    return NextResponse.json(
      { error: "Missing required parameters." },
      { status: 400 },
    );
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });

    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to flight site
    const flightUrl =
      process.env.FLIGHT_WEBSITE_URL || "https://www.example-flights.com";
    await page.goto(flightUrl);

    // Interact with the page:
    // - Fill in origin
    // - Fill in destination
    // - Select date
    // - Click the search button

    await page.fill("#origin-input", origin);
    await page.fill("#destination-input", destination);
    await page.click("#date-picker");
    await page.fill("#date-picker", date);
    await page.click("#search-button");

    // Wait for results to load (adjust selectors and waits as necessary)
    await page.waitForSelector(".flight-result", { timeout: 10000 });

    // Extract flight data
    const flights = await page.$$eval(".flight-result", (results) => {
      return results.map((el) => {
        const airline =
          el.querySelector(".airline-name")?.textContent.trim() || "";
        const price = el.querySelector(".price")?.textContent.trim() || "";
        const departureTime =
          el.querySelector(".departure-time")?.textContent.trim() || "";
        const arrivalTime =
          el.querySelector(".arrival-time")?.textContent.trim() || "";
        return { airline, price, departureTime, arrivalTime };
      });
    });

    return NextResponse.json({ flights }, { status: 200 });
  } catch (error) {
    console.error("Flight scraping error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
