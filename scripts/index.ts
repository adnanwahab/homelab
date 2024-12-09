import setup_desktop from "./src/setup_desktop";
import parallel_ollama from "./src/parallel-ollama";

const scripts = [
  setup_desktop,
  parallel_ollama,
];


setup_desktop()


const index_html = `
  <html>
  <head>
  <script src="https://cdn.tailwindcss.com"></script>

  </head>
  <body class="bg-gray-100">
  <div>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <ul>
<li><a href="/tools/mailwind">Click to send an email to eggnog.wahab@gmail.com</a></li>

<li><a href="/tools/deno_webgpu">Deno WebGPU render dynamic content to make it easy to iterate</a></li>
<ul>
</div>
</body>
  </html>
`;


function mailwind() {
return 'email sent'
}

function deno_webgpu() {
return 'deno webgpu'
}   

const server = Bun.serve({
  port: 8000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/tools/mailwind") {
      const result = await mailwind();
      return new Response(result, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }


    if (url.pathname === "/tools/deno_webgpu") {
        const result = await deno_webgpu();
        return new Response(result, {
          headers: {
            "Content-Type": "text/html",
          },
        });
      }

    if (url.pathname === "/tools/setup_desktop") {
      const result = await setup_desktop();

      return new Response(result, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    if (url.pathname === "/tools/test") {
    }

    return new Response(index_html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log(`Server is running on http://localhost:${server.port}`);
