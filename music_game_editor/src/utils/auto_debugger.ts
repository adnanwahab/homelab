
export default function auto_debugger() {    
    const displayError = (error) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-500 text-white p-4 fixed bottom-4 right-4 rounded shadow-lg';
        errorDiv.textContent = error.message || 'An error occurred';
        document.body.appendChild(errorDiv);
        
    // Optional: Remove error after 5 seconds
    //setTimeout(() => errorDiv.remove(), 5000);
  };
  
  // Override console.error
  const originalConsoleError = console.error;
    console.error = (...args) => {
        originalConsoleError.apply(console, args);
        displayError(args[0]);
    };

    window.addEventListener('error', (event) => {
        displayError(event.error);
      });
}