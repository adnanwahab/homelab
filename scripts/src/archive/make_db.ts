import { Database } from 'bun:sqlite';

try {
  // Open the database
  const db = new Database('shakespeare.db');
  
  // Prepare the statement
  const stmt = db.prepare(`
    SELECT play, act, scene, plays.text
    FROM playsearch
    INNER JOIN plays ON playsearch.playrowid = plays.rowid
    WHERE playsearch.text MATCH ?;
  `);

  function searchShakespeare(query) {
    try {
      // Execute the query
      const result = stmt.get(query);
      
      if (result) {
        const { play, act, scene, text } = result;
        console.log(`${play} ${act}.${scene}: ${text}`);
        return result;
      }
      
      return null;
    } catch (err) {
      console.error('Query error:', err);
      return null;
    }
  }

  // Example usage:
  searchShakespeare("whether tis nobler");

} catch (err) {
  console.error('Database error:', err);
}

// Remember to close the database when done
// db.close();