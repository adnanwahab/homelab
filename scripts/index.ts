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
<li><a href="/tools/setup_desktop">Setup Desktop 1</a></li>
<li><a href="/tools/mailwind">Setup Desktop 2</a></li>
<li><a href="/tools/deno_webgpu">Deno WebGPU </a></li>
<li><a href="/tools/ollama">ollama 200,000 requests </a></li>
<li><a href="/tools/git_visualizer">git visualizer </a></li>
<ul>
</div>
</body>
  </html>
`;

// const server = Bun.serve({
//   port: 8000,
//   async fetch(req) {
//     const url = new URL(req.url);

//     if (url.pathname === "/tools/setup_desktop") {
//       const result = await setup_desktop();

//       return new Response(result, {
//         headers: {
//           "Content-Type": "text/html",
//         },
//       });
//     }

//     if (url.pathname === "/tools/test") {
//     }

//     return new Response(index_html, {
//       headers: {
//         "Content-Type": "text/html",
//       },
//     });
//   },
// });

// console.log(`Server is running on http://localhost:${server.port}`);
