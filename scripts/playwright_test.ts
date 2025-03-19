
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Configuration
const USER_DATA_DIR = path.join(os.homedir(), '.linkedin-automation');
const PROFILE_NAME = 'linkedin-profile';
const LINKEDIN_URL = 'https://www.linkedin.com/';

// Ollama configuration - adjust model as needed
const OLLAMA_MODEL = 'llama3'; // or any other model you have installed

// Load credentials from environment variables for security
// Set these with: export LINKEDIN_USERNAME=your_email LINKEDIN_PASSWORD=your_password
const LINKEDIN_USERNAME = process.env.LINKEDIN_USERNAME || 'mail@adnanwahab.com';
const LINKEDIN_PASSWORD = process.env.LINKEDIN_PASSWORD || 'sicp.123';

async function queryOllama(prompt) {
  try {
    // Check if Ollama is running
    const { stdout, stderr } = await execPromise('curl -s http://localhost:11434/api/version');
    
    // Execute the query to Ollama
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false
      }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error querying Ollama:', error.message);
    console.error('Make sure Ollama is running with: ollama run ' + OLLAMA_MODEL);
    return null;
  }
}

async function analyzePageStructure(html) {
  const prompt = `
  I have the following HTML from a LinkedIn page. 
  Please analyze it and provide the most reliable CSS selectors for:
  1. Username/email input field
  2. Password input field
  3. Sign in/login button
  4. Any indicators that show a user is already logged in
  
  For each element, provide the selector and explain why it's reliable.
  
  HTML:
  ${html.substring(0, 15000)} // Limiting size to avoid token limits
  `;

  console.log('Analyzing page structure with Ollama...');
  const analysis = await queryOllama(prompt);
  return analysis;
}

async function getLoginSelectors(page) {
  // Get the HTML content
  const html = await page.content();
  
  // Ask Ollama to analyze and find the best selectors
  const analysis = await analyzePageStructure(html);
  
  console.log('\n===== OLLAMA ANALYSIS =====');
  console.log(analysis);
  console.log('===========================\n');
  
  // Parse the analysis to extract selectors
  // This is a simple implementation - in production, you might want more robust parsing
  const usernameSelector = analysis.includes('username') || analysis.includes('email') 
    ? analysis.match(/(?:username|email)[^"']*?["']([^"']+)["']/i)?.[1] 
    : 'input[name="session_key"]'; // Fallback

  const passwordSelector = analysis.includes('password') 
    ? analysis.match(/password[^"']*?["']([^"']+)["']/i)?.[1] 
    : 'input[name="session_password"]'; // Fallback

  const loginButtonSelector = analysis.includes('sign in') || analysis.includes('login') 
    ? analysis.match(/(?:sign in|login)[^"']*?["']([^"']+)["']/i)?.[1] 
    : 'button[type="submit"]'; // Fallback

  return {
    usernameSelector,
    passwordSelector,
    loginButtonSelector
  };
}

async function checkLoggedInStatus(page, analysis) {
  // Extract potential logged-in indicators from the analysis
  const possibleIndicators = [
    '.feed-identity-module',
    '.search-global-typeahead',
    '[data-control-name="identity_welcome_message"]',
    '.global-nav__me-photo', // Profile picture often indicates logged-in state
    '.global-nav__nav' // Navigation menu that appears when logged in
  ];

  // Add any indicators suggested by Ollama
  if (analysis && analysis.includes('logged in') && analysis.includes('selector')) {
    const match = analysis.match(/logged in[^"']*?["']([^"']+)["']/i);
    if (match && match[1]) {
      possibleIndicators.push(match[1]);
    }
  }

  // Check for any of these indicators
  for (const selector of possibleIndicators) {
    const element = await page.$(selector);
    if (element) {
      return true;
    }
  }
  
  return false;
}

async function main() {
  try {
    // Ensure user data directory exists
    if (!fs.existsSync(USER_DATA_DIR)) {
      fs.mkdirSync(USER_DATA_DIR, { recursive: true });
      console.log(`Created user data directory: ${USER_DATA_DIR}`);
    }

    // Launch browser with the specific user data directory
    const browser = await chromium.launchPersistentContext(
      path.join(USER_DATA_DIR, PROFILE_NAME),
      {
        headless: false,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
        viewport: null,
      }
    );

    console.log('Browser launched successfully');

    // Get or create a page
    const pages = browser.pages();
    const page = pages.length > 0 ? pages[0] : await browser.newPage();

    // Navigate to LinkedIn
    console.log('Navigating to LinkedIn...');
    await page.goto(LINKEDIN_URL, { waitUntil: 'networkidle' });

    // Get HTML for analysis
    const html = await page.content();
    
    // Analyze with Ollama
    const analysis = await analyzePageStructure(html);
    
    // Check if we're logged in
    const isLoggedIn = await checkLoggedInStatus(page, analysis);

    if (isLoggedIn) {
      console.log('✅ Successfully connected with existing session!');
      
      // Example: Perform actions after login
      console.log('You can now add automation tasks here');
      
    } else {
      console.log('⚠️ Not logged in. Getting login selectors from Ollama...');
      
      // Get selectors for login form
      const { usernameSelector, passwordSelector, loginButtonSelector } = await getLoginSelectors(page);
      
      console.log(`Found login selectors:
      - Username: ${usernameSelector}
      - Password: ${passwordSelector}
      - Login button: ${loginButtonSelector}`);
      
      if (LINKEDIN_USERNAME && LINKEDIN_PASSWORD) {
        console.log('Credentials found in environment variables. Attempting to log in...');
        
        // Fill in the login form
        await page.fill(usernameSelector, LINKEDIN_USERNAME);
        await page.fill(passwordSelector, LINKEDIN_PASSWORD);
        
        // Uncomment to actually perform login - use with caution
        // console.log('Submitting login form...');
        // await page.click(loginButtonSelector);
        // await page.waitForNavigation({ waitUntil: 'networkidle' });
        
        console.log('⚠️ Automated login is disabled for security. Please log in manually.');
      } else {
        console.log('⚠️ Please log in manually in the opened browser.');
        console.log('IMPORTANT: Set credentials as environment variables if you want to enable automated login:');
        console.log('export LINKEDIN_USERNAME=your_email LINKEDIN_PASSWORD=your_password');
      }
      
      console.log('This session will be saved for future use.');
    }

    // Keep browser open to allow for interaction
    await new Promise(resolve => {
      console.log('\nPress Ctrl+C to exit script');
      process.on('SIGINT', async () => {
        console.log('Closing browser...');
        await browser.close();
        resolve();
      });
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
main();