import { serve } from "bun";
import { createClient } from "@clickhouse/client";

//   <iframe width="900" height="500" src="jupyter.cgi-tools.dev"></iframe>

const html = `hello world - zoox 2025 awahab

  <ul>
  <li><a href="https://jupyter.cgi-tools.dev/lab/workspaces" target="_blank">Jupyter</a>
  <li><a href="#idk" target="_blank">ML machine learning UNreal Engine</a>
  <li><a href="#idk" target="_blank">ML with unity robotics</a>


  <li> <a href="#idk" target="_blank">UNreal Engine</a>


  <li><a href="https://files.cooperative-robotics.com/intermediate_representation/robotics_knowledge_book_of_future/driving/" target="_blank">Zoox Driving Repo</a>
</ul>
  `;

function handler(request) {
    // 5. Return the HTML response
    return new Response(html, {
        headers: {
            "Content-Type": "text/html",
        },
    });
}

// 6. Start the Bun server
const server = serve({
    fetch: handler,
    port: 8000,
});

console.log(`Server running at http://localhost:${server.port}`);
