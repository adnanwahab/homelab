import { promisify } from 'util';

export async function GET(request: Request) {
  try {

    return Response.json({ message: 'Hello, World!' });

    // Get the example path from the request body
    const body = await request.json();
    const examplePath = body.examplePath || 'default-example';

    // Make request to Deno server
    const denoResponse = await fetch(`http://localhost:8000/${examplePath}`, {
      method: 'GET',
    });

    if (!denoResponse.ok) {
      const errorData = await denoResponse.json();
      return Response.json({ error: errorData.error }, { status: denoResponse.status });
    }

    // Forward the Deno server response
    const data = await denoResponse.json();
    return Response.json(data);

  } catch (error) {
    return Response.json(
      { error: 'Failed to communicate with WebGPU server' },
      { status: 500 }
    );
  }
} 