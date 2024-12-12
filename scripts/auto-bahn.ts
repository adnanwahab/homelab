

const sites_to_visit = [
    'bumble',
    'outliers',
    'twitter'
]

//outliers
//add new libaries
//chores



import { chromium } from "playwright";
import { createClient } from '@supabase/supabase-js';




let url = "https://ewkxvbgbzikwwudriebh.supabase.co"
let anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a3h2Ymdiemlrd3d1ZHJpZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjYzMDEsImV4cCI6MjA0OTEwMjMwMX0.LjW3EYwo7bg4Za_fGjXKGXS92fPqcAGVJRrbr3Vgh0Y"
const urls = ["https://hnhiring.com/december-2024"];

const supabase = createClient(
  url,
  anon
);

async function scrapeLinks() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const allLinks = new Set<string>();
  
  for (const url of urls) {
    try {
      await page.goto(url);
      
      // Get all links from the page
      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'))
          .map(link => link.href)
          .filter(href => href && href.length > 0);
      });
      
      links.forEach(link => allLinks.add(link));
      
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }
  
  await browser.close();
  return Array.from(allLinks);
}

// Execute and log results
scrapeLinks().then(links => {
    storeLinks(links)
  console.log('Found links:', links);
  
}).catch(console.error);


// https://supabase.com/dashboard/project/ewkxvbgbzikwwudriebh/editor/32546?schema=public
async function storeLinks(links: string[]) {
  const { data: jsonData, error: jsonError } = await supabase
    .from('KV')
    .insert([
      { 
        key: "links",
        value: JSON.stringify(links)
      }
    ])

    console.log(jsonData, jsonError)
    console.log('complete!')
}



//https://github.com/AIHawk-FOSS/Auto_Jobs_Applier_AI_Agent