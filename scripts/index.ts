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


<br>

<li><a href="/tools/flirtflow">flirtflow = playwright bumble + hinge</a></li>
<li><a href="/tools/music_game">music game + rl</a></li>


<br>

<li><a href="/tools/deno_webgpu">Deno WebGPU render dynamic content to make it easy to iterate</a></li>
<ul>
</div>
</body>
  </html>
`;

function one_password_5_agents_1_password() {
    return 'one password 5 agents 1 password'
}

import { Resend } from 'resend';




async function mailwind() {
    const resend_api_key = `re_gPBiq268_5gRCCNH2bLAwyaXQ6qJ6qLfJ`
    const email = `eggnog.wahab@gmail.com`
    const subject = `Hello World!`
    const body = `Hello World!`

    const resend = new Resend(resend_api_key);

    const data = await resend.emails.send({
        from: 'adnan@human-advancement-institute.org',
        to: ['eggnog.wahab@gmail.com'],
        subject: 'Comedy comic-book - 7 part series',
        html: '<strong>It works!</strong>'
      });

      return JSON.stringify(data);
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
