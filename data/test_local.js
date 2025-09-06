// Simple HTML Bun Server
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);
    
    // Serve different routes
    if (url.pathname === "/") {
      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }
    
    if (url.pathname === "/api/hello") {
      return new Response(JSON.stringify({ message: "Hello from Bun!" }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    
    // 404 for other routes
    return new Response("Not Found", { status: 404 });
  },
});

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tourlab.ai</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 10px;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        .info {
            margin-top: 30px;
            padding: 20px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Simple Bun Server</h1>
        <p>Welcome to your simple HTML Bun server! This server is running on Bun and serving this beautiful HTML page.</p>
        
        <div style="text-align: center;">
            <a href="/api/hello" class="button">Test API Endpoint</a>
            <a href="/" class="button">Refresh Page</a>
        </div>
        
        <div class="info">
            <h3>Server Information:</h3>
            <ul>
                <li><strong>Runtime:</strong> Bun</li>
                <li><strong>Port:</strong> 3000</li>
                <li><strong>Status:</strong> Running</li>
                <li><strong>Features:</strong> HTML serving, API endpoints, Static file serving</li>
            </ul>
        </div>
    </div>

    <script>
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Simple Bun Server loaded successfully!');
            
            // Add click handler for API button
            const apiButton = document.querySelector('a[href="/api/hello"]');
            apiButton.addEventListener('click', async function(e) {
                e.preventDefault();
                try {
                    const response = await fetch('/api/hello');
                    const data = await response.json();
                    alert('API Response: ' + data.message);
                } catch (error) {
                    alert('Error: ' + error.message);
                }
            });
        });
    </script>
</body>
</html>
`;

console.log(`🚀 Server running at http://localhost:${server.port}`);
console.log(`📄 HTML page available at http://localhost:${server.port}`);
console.log(`🔗 API endpoint available at http://localhost:${server.port}/api/hello`);
