const fs = require('fs');
const path = require('path');

// Function to ensure a directory exists
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Function to copy a file
const copyFile = (source, destination) => {
    fs.copyFileSync(source, destination);
};

// Main function to create folders and copy files
const createFoldersAndCopyFiles = (baseDir, numberOfFolders, sourceFile) => {
    // // Ensure the source file exists
    // if (!fs.existsSync(sourceFile)) {
    //     console.error(`Source file ${sourceFile} does not exist`);
    //     return;
    // }

    // Create folders and copy files
    for (let i = 1; i <= numberOfFolders; i++) {
        // Create folder name with padding (001, 002, etc.)
        const folderName = String(i).padStart(3, '0');
        const folderPath = path.join(baseDir, folderName);
        
        // Create the folder
        ensureDirectoryExists(folderPath);
        
        // Create destination path for the file
        const destinationFile = path.join(folderPath, 'page.tsx');
        
        // Copy the file
        //copyFile(sourceFile, destinationFile);
        
        console.log(`Created folder ${folderName} and copied page.tsx`);
    }
    
    console.log(`\nCompleted! Created ${numberOfFolders} folders with page.tsx`);
};

// Configuration
const baseDirectory = '../web/public'; // Current directory
const numberOfFolders = 150;
const sourceFilePath = './page.tsx'; // Source page.tsx file

// Execute the script
createFoldersAndCopyFiles(baseDirectory, numberOfFolders, sourceFilePath);