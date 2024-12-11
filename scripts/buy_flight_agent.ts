// script.js
import { chromium } from 'playwright'; // If Bun with NPM deps is supported, else add via bunfig or external

async function parseFlightInfoWithOllama(html) {
  // Prompt the LLM to parse flight details from HTML
  const prompt = `
You are an assistant that can parse HTML of a flight search result page and extract structured information.
Given the following HTML, extract the departure city, arrival city, date, flight number, and price:

HTML:
${html}

Output as JSON with keys: departure_city, arrival_city, date, flight_number, price.
If any detail is missing, try to infer from context.
  `;

  const response = await fetch('http://localhost:11411/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      model: "llama2", // or whatever model you have in Ollama
      // Additional params can be added as needed
    }),
  });

  const reader = response.body.getReader();
  let result = "";
  while (true) {
    const {value, done} = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);
  }

  // Ollama’s stream should return text. We assume final chunk is JSON.
  // Parse the last JSON-looking portion. In some cases, you might want to refine parsing.
  let jsonResult;
  try {
    jsonResult = JSON.parse(result.trim());
  } catch (e) {
    console.error("Failed to parse JSON from LLM result:", result);
    return null;
  }

  return jsonResult;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to the flight booking site (placeholder)
  await page.goto('https://example-flight-booking.com');

  // Suppose you search for a flight:
  await page.fill('#from', 'New York (JFK)');
  await page.fill('#to', 'Los Angeles (LAX)');
  await page.fill('#depart-date', '2025-05-15');
  await page.click('#search-button');

  // Wait for results to load
  await page.waitForSelector('.flight-result');

  // Get the entire HTML of the results page
  const html = await page.content();

  // Parse flight info using Ollama
  const flightInfo = await parseFlightInfoWithOllama(html);
  console.log("Extracted Flight Info:", flightInfo);

  if (!flightInfo) {
    console.error("No flight info extracted.");
    await browser.close();
    return;
  }

  // Now suppose we have flight details, we choose one:
  // Let's assume flightInfo includes "flight_number" that we can use to select the correct result
  await page.click(`.flight-result[data-flight-number="${flightInfo.flight_number}"] .select-flight-button`);

  // Proceed with booking
  await page.fill('#passenger-name', 'John Doe');
  await page.fill('#passenger-age', '30');
  await page.fill('#credit-card', '4111111111111111'); // Test card number (dummy)
  await page.fill('#cc-expiry', '12/28');
  await page.fill('#cc-cvv', '123');

  // Finalize the purchase
  await page.click('#buy-button');

  // Wait for confirmation
  await page.waitForSelector('#confirmation-number');
  const confirmationNumber = await page.textContent('#confirmation-number');
  console.log("Booking completed. Confirmation number:", confirmationNumber);

  await browser.close();
})();