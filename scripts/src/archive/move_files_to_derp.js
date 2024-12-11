// move_files.js

import { promises as fs } from 'fs';
import path from 'path';

async function moveFiles(srcDir, destDir) {
  // Ensure the destination directory exists
  await fs.mkdir(destDir, { recursive: true });

  async function traverseDir(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        // Recursively traverse subdirectories
        await traverseDir(fullPath);
      } else if (entry.isFile()) {
        // Check if the file has .ipynb or .py extension
        const ext = path.extname(entry.name);
        if (ext === '.ipynb' || ext === '.py') {
          // Move the file to the destination directory
          const destPath = path.join(destDir, entry.name);
          await fs.rename(fullPath, destPath);
          console.log(`Moved: ${fullPath} -> ${destPath}`);
        }
      }
    }
  }

  await traverseDir(srcDir);
}

// Usage: bun move_files.js /path/to/source /path/to/destination

if (process.argv.length !== 4) {
  console.error('Usage: bun move_files.js <source_directory> <destination_directory>');
  process.exit(1);
}

const srcDir = process.argv[2];
const destDir = process.argv[3];

moveFiles(srcDir, destDir)
  .then(() => console.log('All files moved successfully.'))
  .catch((err) => {
    console.error('Error moving files:', err);
    process.exit(1);
  });
