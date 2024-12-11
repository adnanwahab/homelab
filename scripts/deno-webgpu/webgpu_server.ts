//https://webgpu.github.io/webgpu-samples/?sample=computeBoids
import { serve } from "https://deno.land/std/http/server.ts";

const EXAMPLES_DIR = "./webgpu-examples";

// Add function to load all example modules
import shadow from "./webgpu-examples/shadow/mod.ts";
import { boids } from "./webgpu-examples/exporter.ts";


let examples = {
    boids,
    shadow
};
console.log(examples);
async function handleRequest(request: Request): Promise<Response> {
  try {

    const url = new URL(request.url);
    const examplePath = url.pathname.slice(1);
    
    if (!examplePath) {
      // Return list of available examples
      return new Response(JSON.stringify({
        examples: Array.from(Object.keys(examples))
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const fullPath = examples[examplePath]
    if (!fullPath) {
      return new Response(JSON.stringify({
        error: `Example '${examplePath}' not found`,
        availableExamples: Array.from(Object.keys(examples))
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Run the example as a child process
    const process = 
    
    
    
    fullPath === 'boids' ?
    await boids(Math.random() * 100) :
    await shadow();
    const output = process.stdout;
    const errors = process.stderr;
    const png = process.png;
    //const { stdout, stderr } = await process.output();

    // Convert Uint8Arrays to strings
    //const output = new TextDecoder().decode(stdout);
    //const errors = new TextDecoder().decode(stderr);

    return new Response(JSON.stringify({
      output,
      errors,
      png,
      path: fullPath
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const port = 8000;
console.log(`Server running on http://localhost:${port}`);
serve(handleRequest, { port });