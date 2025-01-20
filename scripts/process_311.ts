#!/usr/bin/env bun

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import Database from "bun:sqlite";
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

///////////////////////////
// CONFIGURATION
///////////////////////////
const CSV_PATH = "/home/adnan/derp/map_data/311_nyc.csv";       // Your input CSV file
const OUTPUT_DIR = "/home/adnan/derp/map_data/";      ;     // Folder to store the per-year JSON files
const DB_PATH = "data.db";           // SQLite DB file path (can also use ":memory:")

///////////////////////////
// PREPARE OUTPUT DIR
///////////////////////////
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR);
}

///////////////////////////
// SETUP SQLITE DB
///////////////////////////
const db = new Database(DB_PATH);

// Re-create the table each time (so this script is repeatable)
db.run("DROP TABLE IF EXISTS nyc_data");
db.run(`
  CREATE TABLE nyc_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    row_json TEXT NOT NULL,
    year INTEGER
  )
`);

///////////////////////////
// READ AND PARSE THE CSV
///////////////////////////

// Create a readline interface
const fileStream = createReadStream(CSV_PATH, { encoding: 'utf8' });
const rl = createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

// First we'll get the headers
let headers: string[] = [];
let isFirstLine = true;

// Find a column that looks like a date (modify as needed)
const dateIndex = headers.findIndex((h) => h.toLowerCase().includes("date"));
if (dateIndex === -1) {
  console.warn("No 'date' column found in headers! You may need to adjust the script.");
}

// Prepare an INSERT statement (stores the whole row as JSON, plus the parsed year)
const insertStmt = db.prepare(`
  INSERT INTO nyc_data (row_json, year)
  VALUES (?, ?)
`);

// Process the file line by line
for await (const line of rl) {
  if (isFirstLine) {
    headers = line.split(',');
    isFirstLine = false;
    continue;
  }

  const rowLine = line.trim();
  if (!rowLine) continue; // Skip empty lines

  const columns = rowLine.split(",");
  // Skip if columns are incomplete
  if (columns.length < headers.length) {
    continue;
  }

  // Build a row object {header: value, ...}
  const rowObj = {};
  for (let colIndex = 0; colIndex < headers.length; colIndex++) {
    rowObj[headers[colIndex].trim()] = columns[colIndex].trim();
  }

  // Attempt to parse the year from the identified 'date' column
  let yearVal = null;
  if (dateIndex !== -1) {
    const dateStr = columns[dateIndex].trim();
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        yearVal = d.getFullYear();
      }
    } catch {
      // If parsing fails, yearVal remains null
    }
  }

  // Insert into SQLite
  insertStmt.run(JSON.stringify(rowObj), yearVal);
}

///////////////////////////
// WRITE OUT JSON PER YEAR
///////////////////////////
// Get all distinct years (excluding null)
const distinctYears = db.query(`
  SELECT DISTINCT year 
  FROM nyc_data 
  WHERE year IS NOT NULL
  ORDER BY year
`).all();

// For each distinct year, fetch rows and write them to JSON
for (const { year } of distinctYears) {
  const rows = db.query(`
    SELECT row_json 
    FROM nyc_data
    WHERE year = ?
  `).all(year);

  // Convert the stored JSON strings back to objects
  const parsedRows = rows.map((r) => JSON.parse(r.row_json));

  // Write to a file named e.g. "2022.json"
  const outPath = join(OUTPUT_DIR, `${year}.json`);
  writeFileSync(outPath, JSON.stringify(parsedRows, null, 2), "utf8");

  console.log(`Wrote ${parsedRows.length} rows to ${outPath}`);
}

// Clean up
db.close();