// Import the simple-gpu library from a CDN
import simpleGPU from 'https://cdn.skypack.dev/simple-gpu';

// Function to initialize WebGPU
async function initWebGPU() {
    if (!navigator.gpu) {
        console.error("WebGPU is not supported on this browser.");
        return;
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        console.error("Failed to get GPU adapter.");
        return;
    }

    const device = await adapter.requestDevice();
    console.log("WebGPU device initialized:", device);

    // Use simpleGPU for some operations
    const gpu = new simpleGPU(device);
    // ... perform operations with gpu ...
}

// Call the function to initialize WebGPU
initWebGPU();
