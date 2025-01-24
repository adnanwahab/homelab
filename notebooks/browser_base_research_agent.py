import asyncio
from playwright.async_api import async_playwright

# Replace these with your actual Amazon credentials
AMAZON_EMAIL = 'adnan.f.wahab@gmail.com'
AMAZON_PASSWORD = 'sicp.123'

# Replace with the URL or identifier of the book you want to access
BOOK_URL = 'https://read.amazon.com/?asin=B08BT9H356&ref_=kwl_kr_iv_rec_6'

async def run(playwright):
    browser = await playwright.chromium.launch(headless=True)  # Set headless=True to run in the background
    context = await browser.new_context()
    page = await context.new_page()

    # Navigate to Amazon Read
    await page.goto('https://read.amazon.com/')

    # Click on the sign-in button if not already signed in
    sign_in_button = await page.query_selector('a[href*="ap/signin"]')
    if sign_in_button:
        await sign_in_button.click()

        # Wait for navigation to login page
        await page.wait_for_selector('input#ap_email')

        # Enter email
        await page.fill('input#ap_email', AMAZON_EMAIL)
        await page.click('input#continue')

        # Wait for password field
        await page.wait_for_selector('input#ap_password')

        # Enter password
        await page.fill('input#ap_password', AMAZON_PASSWORD)
        await page.click('input#signInSubmit')

        # Wait for navigation back to read.amazon.com
        await page.wait_for_load_state('networkidle')

    # Navigate to the specific book
    await page.goto(BOOK_URL)

    # Wait for the book content to load
    await page.wait_for_selector('.kp-notebook-content')  # Update selector based on actual content

    # Example: Extract text from the book
    # This will vary depending on how the content is structured
    content = await page.inner_text('.kp-notebook-content')  # Update selector accordingly
    await page.screenshot(path="screenshot.png")

    # Process the extracted content
    print("Extracted Content:")
    print(content)

    # Example: Look up specific facts (simple keyword search)
    facts_to_find = ['what math is used here', 'what are the co-authotrs?', 'what are the references?']
    for fact in facts_to_find:
        if fact in content:
            print(f"Found fact: {fact}")
        else:
            print(f"Fact not found: {fact}")

    # Close browser
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

if __name__ == '__main__':
    asyncio.run(main())
