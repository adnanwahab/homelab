import setup_desktop from "./setup_desktop";

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
<a href="/tools/setup_desktop">Setup Desktop 1</a>
<a href="/tools/mailwind">Setup Desktop 2</a>

<a href="/tools/mailwind">Deno WebGPU </a>
<a href="/tools/mailwind">ollama 200,000 requests </a>
<a href="/tools/git_visualizer">git visualizer </a>
<ul>
</div>
</body>
  </html>
`;

const server = Bun.serve({
  port: 8000,
  async fetch(req) {
    const url = new URL(req.url);

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
