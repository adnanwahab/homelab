
import fs from 'fs/promises';
import path from 'path';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const CACHE_DIR = path.resolve('.', 'cache');
const CACHE_FILE = path.join(CACHE_DIR, 'wikipedia.json');
const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary/Next.js';

export default async function handler(req, res) {
  try {
    // Ensure the cache directory exists
    await fs.mkdir(CACHE_DIR, { recursive: true });

    let useCache = false;
    try {
      // Get file stats to check its age
      const stats = await fs.stat(CACHE_FILE);
      const age = Date.now() - stats.mtimeMs;
      if (age < CACHE_DURATION) {
        useCache = true;
      }
    } catch (error) {
      // Cache file doesn't exist or can't be accessed
    }

    let data;
    if (useCache) {
      // Read data from cache
      data = await fs.readFile(CACHE_FILE, 'utf8');
      console.log('Serving data from cache.');
    } else {
      // Fetch data from Wikipedia
      const response = await fetch(WIKIPEDIA_API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data from Wikipedia');
      }
      data = await response.text();
      // Write data to cache
      await fs.writeFile(CACHE_FILE, data, 'utf8');
      console.log('Fetched data from Wikipedia and cached it.');
    }

    // Set appropriate headers and send the response
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (error) {
    console.error('Error in /api/wiki-proxy:', error);
    res.status(500).json({ error: error.message });
  }
}