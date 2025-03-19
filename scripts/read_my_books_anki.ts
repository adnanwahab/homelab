// Amazon Book Reader Script
// This script helps navigate through pages of a book on read.amazon.com
// Usage: Open the book on read.amazon.com, then run this script in your browser console

(function() {
    // Configuration
    const config = {
      autoTurnPage: true,         // Automatically turn pages
      pageDelay: 5000,            // Delay between page turns (in milliseconds)
      saveProgress: true,         // Save reading progress to localStorage
      bookId: null,               // Will be extracted from URL
      currentPage: 0,             // Start page
      totalPages: 0               // Will be determined from the page
    };
  
    // Initialize
    function init() {
      // Extract book ID from URL
      const urlMatch = window.location.href.match(/\/read\/([a-zA-Z0-9_-]+)/);
      if (urlMatch && urlMatch[1]) {
        config.bookId = urlMatch[1];
        console.log(`Book ID detected: ${config.bookId}`);
      } else {
        console.error("Could not detect book ID from URL. Are you on read.amazon.com?");
        return false;
      }
  
      // Try to load saved progress
      if (config.saveProgress) {
        loadProgress();
      }
  
      // Detect total pages
      detectTotalPages();
  
      // Set up key controls
      setupKeyControls();
  
      // Create UI
      createUI();
  
      // If auto-turn is enabled, start it
      if (config.autoTurnPage) {
        startAutoTurn();
      }
  
      return true;
    }
  
    // Detect total pages in the book
    function detectTotalPages() {
      // This will need to be adjusted based on the actual structure of read.amazon.com
      // Looking for page numbers in the UI
      const pageElements = document.querySelectorAll('.kindle-page-number, .page-number');
      if (pageElements.length > 0) {
        const lastPageElement = pageElements[pageElements.length - 1];
        const pageText = lastPageElement.textContent;
        const pageMatch = pageText.match(/(\d+)\s*\/\s*(\d+)/);
        
        if (pageMatch && pageMatch[2]) {
          config.totalPages = parseInt(pageMatch[2], 10);
          console.log(`Total pages detected: ${config.totalPages}`);
        }
      }
      
      if (!config.totalPages) {
        // Fallback: look for a different UI pattern
        const progressBar = document.querySelector('.progress-bar, .reader-progress');
        if (progressBar && progressBar.getAttribute('aria-valuemax')) {
          config.totalPages = parseInt(progressBar.getAttribute('aria-valuemax'), 10);
          console.log(`Total pages detected from progress bar: ${config.totalPages}`);
        } else {
          console.warn("Could not detect total pages. Some features may not work correctly.");
        }
      }
    }
  
    // Turn to the next page
    function nextPage() {
      // Find and click the next page button
      const nextButtons = document.querySelectorAll('.next-page, .kindle-next-button, [aria-label="Next Page"]');
      if (nextButtons.length > 0) {
        nextButtons[0].click();
        config.currentPage++;
        updateUI();
        saveProgress();
        return true;
      } else {
        console.warn("Next page button not found");
        return false;
      }
    }
  
    // Turn to the previous page
    function prevPage() {
      // Find and click the previous page button
      const prevButtons = document.querySelectorAll('.prev-page, .kindle-prev-button, [aria-label="Previous Page"]');
      if (prevButtons.length > 0) {
        prevButtons[0].click();
        config.currentPage = Math.max(0, config.currentPage - 1);
        updateUI();
        saveProgress();
        return true;
      } else {
        console.warn("Previous page button not found");
        return false;
      }
    }
  
    // Save reading progress to localStorage
    function saveProgress() {
      if (config.saveProgress && config.bookId) {
        localStorage.setItem(`amazon-reader-${config.bookId}`, JSON.stringify({
          currentPage: config.currentPage,
          timestamp: new Date().toISOString()
        }));
        console.log(`Progress saved: Page ${config.currentPage}`);
      }
    }
  
    // Load reading progress from localStorage
    function loadProgress() {
      if (config.bookId) {
        const savedData = localStorage.getItem(`amazon-reader-${config.bookId}`);
        if (savedData) {
          try {
            const data = JSON.parse(savedData);
            config.currentPage = data.currentPage;
            console.log(`Progress loaded: Page ${config.currentPage}`);
            
            // Try to navigate to the saved page
            goToPage(config.currentPage);
          } catch (e) {
            console.error("Error loading saved progress", e);
          }
        }
      }
    }
  
    // Go to a specific page
    function goToPage(pageNum) {
      // This implementation depends on the structure of read.amazon.com
      // It might need a different approach based on the actual UI
      
      // Method 1: Try to use page input if available
      const pageInput = document.querySelector('input.page-input, input.kindle-page-input');
      if (pageInput) {
        pageInput.value = pageNum;
        pageInput.dispatchEvent(new Event('change', { bubbles: true }));
        pageInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        config.currentPage = pageNum;
        updateUI();
        return true;
      }
      
      // Method 2: Click next page until we reach the desired page
      // This is less efficient but might work as a fallback
      const currentPageText = document.querySelector('.kindle-page-number, .page-number')?.textContent;
      const currentPageMatch = currentPageText?.match(/(\d+)\s*\/\s*/);
      if (currentPageMatch && currentPageMatch[1]) {
        const current = parseInt(currentPageMatch[1], 10);
        if (current < pageNum) {
          // Need to go forward
          const pagesToGo = pageNum - current;
          console.log(`Going forward ${pagesToGo} pages to reach page ${pageNum}`);
          
          let pagesNavigated = 0;
          const navigateNext = () => {
            if (pagesNavigated < pagesToGo) {
              if (nextPage()) {
                pagesNavigated++;
                setTimeout(navigateNext, 300);
              }
            }
          };
          
          navigateNext();
          return true;
        } else if (current > pageNum) {
          // Need to go backward
          const pagesToGo = current - pageNum;
          console.log(`Going backward ${pagesToGo} pages to reach page ${pageNum}`);
          
          let pagesNavigated = 0;
          const navigatePrev = () => {
            if (pagesNavigated < pagesToGo) {
              if (prevPage()) {
                pagesNavigated++;
                setTimeout(navigatePrev, 300);
              }
            }
          };
          
          navigatePrev();
          return true;
        }
        // If current === pageNum, we're already there
        return true;
      }
      
      console.warn("Could not navigate to page, page input not found");
      return false;
    }
  
    // Set up keyboard controls for navigation
    function setupKeyControls() {
      document.addEventListener('keydown', (e) => {
        // Right arrow or space for next page
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          nextPage();
        }
        
        // Left arrow for previous page
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevPage();
        }
        
        // Toggle auto-turn with 'a'
        if (e.key === 'a') {
          toggleAutoTurn();
        }
      });
    }
  
    // Auto-turn pages
    let autoTurnInterval = null;
  
    function startAutoTurn() {
      if (!autoTurnInterval) {
        console.log(`Starting auto-turn with ${config.pageDelay}ms delay`);
        autoTurnInterval = setInterval(() => {
          nextPage();
        }, config.pageDelay);
        
        // Update UI to show auto-turn is active
        const autoButton = document.getElementById('amazon-reader-auto');
        if (autoButton) {
          autoButton.textContent = 'Pause Auto-Turn';
          autoButton.classList.add('active');
        }
      }
    }
  
    function stopAutoTurn() {
      if (autoTurnInterval) {
        console.log('Stopping auto-turn');
        clearInterval(autoTurnInterval);
        autoTurnInterval = null;
        
        // Update UI to show auto-turn is inactive
        const autoButton = document.getElementById('amazon-reader-auto');
        if (autoButton) {
          autoButton.textContent = 'Start Auto-Turn';
          autoButton.classList.remove('active');
        }
      }
    }
  
    function toggleAutoTurn() {
      if (autoTurnInterval) {
        stopAutoTurn();
      } else {
        startAutoTurn();
      }
    }
  
    // Create UI controls
    function createUI() {
      // Create control panel
      const panel = document.createElement('div');
      panel.id = 'amazon-reader-controls';
      panel.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
  
      // Add control elements
      panel.innerHTML = `
        <div id="amazon-reader-info">
          Page: <span id="amazon-reader-page">${config.currentPage}</span>${config.totalPages ? ' / ' + config.totalPages : ''}
        </div>
        <div id="amazon-reader-buttons">
          <button id="amazon-reader-prev">◀ Prev</button>
          <button id="amazon-reader-auto">${autoTurnInterval ? 'Pause Auto-Turn' : 'Start Auto-Turn'}</button>
          <button id="amazon-reader-next">Next ▶</button>
        </div>
        <div id="amazon-reader-speed">
          Auto-Turn Delay: <input type="range" id="amazon-reader-delay" min="1000" max="15000" step="500" value="${config.pageDelay}">
          <span id="amazon-reader-delay-value">${config.pageDelay / 1000}s</span>
        </div>
      `;
  
      document.body.appendChild(panel);
  
      // Add event listeners to buttons
      document.getElementById('amazon-reader-prev').addEventListener('click', prevPage);
      document.getElementById('amazon-reader-next').addEventListener('click', nextPage);
      document.getElementById('amazon-reader-auto').addEventListener('click', toggleAutoTurn);
      
      // Add event listener to delay slider
      const delaySlider = document.getElementById('amazon-reader-delay');
      delaySlider.addEventListener('input', () => {
        config.pageDelay = parseInt(delaySlider.value, 10);
        document.getElementById('amazon-reader-delay-value').textContent = `${config.pageDelay / 1000}s`;
        
        // Restart auto-turn if it's active
        if (autoTurnInterval) {
          stopAutoTurn();
          startAutoTurn();
        }
      });
    }
  
    // Update UI with current state
    function updateUI() {
      const pageElement = document.getElementById('amazon-reader-page');
      if (pageElement) {
        pageElement.textContent = config.currentPage;
      }
    }
  
    // Initialize the script
    if (init()) {
      console.log('Amazon Book Reader initialized successfully!');
    } else {
      console.error('Failed to initialize Amazon Book Reader');
    }
  })();