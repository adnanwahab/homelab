import { AccessToken } from "livekit-server-sdk";

import { renderToString } from "react-dom/server";
import odyssey from "./odyssey/robotics-odyssey.js";

import fs from "fs";
import { renderToString } from "react-dom/server";
import { WebhookReceiver } from "livekit-server-sdk";
import { LiveKitClient } from "livekit-server-sdk";
const utils = {};
utils.render_pioneer = render_pioneer;

async function render_pioneer(tool: Function) {
    const content = tool();
    const stream = await renderToString(content);
    const layoutOutput = Layout(stream);

    return new Response(layoutOutput, {
        headers: { "Content-Type": "text/html" },
    });
}

export { render_pioneer };

import { $ } from "bun";

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;
const wsUrl = process.env.LIVEKIT_WS_URL;

const home = process.env.HOME;

const derp = `${home}/derp`;

const start_audio_publish = async function () {
    const timestamp = Date.now();
    const outputPath = `${derp}/recordings/audio-${timestamp}.mp3`;
};

const start_audio_egress = async function () {
    const timestamp = Date.now();
    const outputPath = `${derp}/recordings/audio-${timestamp}.mp3`;

    const result = await $`lk egress start \
      --url ${wsUrl} \
      --api-key ${apiKey} \
      --api-secret ${apiSecret} \
      --audio-only \
      --output ${outputPath}`;

    console.log("Audio egress started:", result);
    return outputPath;
};
export { start_audio_egress };
const start_egress_screeshare = async function () {};

// const json_keys = await $`op item list --tags api --format json`.json()
// const shit = `#!/bin/bash

// # Fetch all item IDs tagged with 'api'
// item_ids=$(op item list --tags api --format json | jq -r '.[].id')

// # Loop through each item ID and retrieve the notes
// for id in $item_ids; do
//   # Get the item details in JSON
//   item_details=$(op item get "$id" --format json)

//   # Extract the title and notes
//   title=$(echo "$item_details" | jq -r '.overview.title')
//   notes=$(echo "$item_details" | jq -r '.notesPlain')

//   echo "------------------------------"
//   echo "Title: $title"
//   echo "Notes:"
//   echo "$notes"
//   echo "------------------------------"
// done`

const fetchApiItems = async () => {
    const itemIds = await $`op item list --tags api --format json`.json();

    for (const item of itemIds) {
        const itemDetails =
            await $`op item get ${item.id} --format json`.json();

        const title = itemDetails.overview.title;
        const notes = itemDetails.notesPlain;

        console.log("------------------------------");
        console.log("Title:", title);
        console.log("Notes:", notes);
        console.log("------------------------------");
    }
};

// Call the function to fetch items
//   const api_keys = await fetchApiItems();
//   console.log('api_keys', api_keys)

const receiver = new WebhookReceiver("apikey", "apisecret");

export const webhook_receiver = async (c: Context) => {
    console.log("Webhook received:");

    const auth_header = c.req.header("Authorization");
    //console.log('auth_header', auth_header)
    //console.log(c.json())

    return c.json({ success: true });
};

async function connect_to_livekit(options: { identity: string }) {
    console.log("options", options);

    // Default identity if not provided
    if (!options.identity) {
        options.identity =
            "anonymous" + Math.random().toString(36).substring(2, 15);
    }

    // Creating a new AccessToken
    const token = new AccessToken(apiKey, apiSecret, {
        identity: options.identity,
    });

    // Add grant to the token (e.g., room access)
    token.addGrant({
        room: "example-room", // Replace with your actual room name
        roomJoin: true,
        canPublish: true,
    });

    // Generate the JWT token
    const jwt = await token.toJwt();

    // Return token and WebSocket URL
    return { token: jwt, wsUrl };
}

export const Layout = (content: string) => {
    return fs
        .readFileSync("src/utils/layout.html", "utf8")
        .replace("{{content}}", content)
        .toString();
};

//  <a class="float-right" href="https://buy.stripe.com/test_28o6oZelUe8g2HubII">pay via stripe </a><
//after 1k signups - lower price to course by 10% by 1k till $5 for life.
//only need 20k per year -  (20k / 100) = (goal: 200per year) - rest -> reinveest to hardware
//1 buy per day = all beings (awaken + flourish)
//1000 users is 1000/20 = 50 years of free service.

export const indexPage = `<div>
    <h1> hono index </h1>
    <div>
    <li> add magic iframe -- htmx + some observable links --- grid %s
    <li> auto refresh like vite
    <li> add livekit screenshare
     holman
    </div>
  </div>`;

export const livekit_connect = async (c) => {
    console.log("livekit_connect");

    // Identity creation with timestamp to avoid conflicts
    const jsonData = { identity: "voice to prompt?" + Date.now() };
    const identity = jsonData.identity;

    if (!identity) {
        return c.text("Identity parameter is missing", 400);
    }

    // Connecting to LiveKit
    const json = await connect_to_livekit(jsonData);
    //console.log('Generated token and wsUrl:', json);

    return new Response(JSON.stringify(json), {
        headers: { "Content-Type": "application/javascript" },
    });
};

// the wizards are humans too -- shodan was right.
const blog = `<div class="bg-slate-900 font-white">
  <div class="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none h-full">
    <div class="w-[108rem] flex-none flex justify-end">
      <picture>
        <source srcset="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif" type="image/avif" />
        <img src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png" alt="" class="w-[90rem] flex-none max-w-none block" decoding="async" />
      </picture>
    </div>
  </div>
  <div class="text-center space-y-5 border-gray-700 border-2-b border-slate-700"></div>
  <div class="flex min-h-full bg-slate-900">
    <div class="flex w-full flex-col">
      <div class="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        <div class="hidden md:relative md:block md:flex-none border-gray-700 border-r-2">
          <div class="absolute inset-y-0 right-0 w-[50vw]"></div>
          <div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
          <div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block"></div>
          <div class="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-24 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
            <nav class="text-base lg:text-sm">
              <ul role="list" class="space-y-9">
                <li>
                  <ul role="list" class="mt-2 space-y-2 lg:mt-4 lg:space-y-4">
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500" href="/">Posts</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/about">About</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="https://twitter.com/adnan_wahab_">Twitter</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/subscribe">Subscribe</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/">___</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="mt-8 relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
          <div class="bg-gray-900 text-gray-400">
              <div><a href="/odyssey">Robotics Odyssey</a></div>
    <div><a href="/llama-tools">llamatools</a></div>
    <div><a href="/blag">blag</a></div>
            <div class="container mx-auto px-4">
              <section class="mb-6">
                <h2 id="memory-updated" class="text-3xl font-bold mb-4">
                  <a id="memory-updated" href="https://robotics-odysey.com"> i dedicated my life to turning bret's dreams into reality.</a>
                </h2>
                <ul class="list-none pl-0 space-y-2">
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline"></a>
                  </li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4">Robotics Sensors</h2>
                <ul class="list-none pl-0 space-y-2">
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">zed-2i</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">realsense</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">roomba</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">lidar</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">camera</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">flash_compute_observableHQ_all_pages</a></li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4">Robotic Manipulators</h2>
                <ul class="list-none pl-0 space-y-2">
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline">trossen</a>
                    <a href="https://github.com/wuphilipp/gello_mechanical">GitHub Link</a>
                  </li>
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline">gello</a>
                    <a href="https://github.com/wuphilipp/gello_mechanical">GitHub Link</a>
                  </li>
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline">shadow</a>
                    <a href="https://github.com/wuphilipp/gello_mechanical">GitHub Link</a>
                  </li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4">Robotic Locomotion</h2>
                <ul class="list-none pl-0 space-y-2">
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">roomba</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">segway</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">wheelchair</a></li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4"></h2>
                <ul class="list-none pl-0 space-y-2">
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline"></a></li>
                </ul>
              </section>

              <section class="mb-6">
                <section class="">
                  <div><a href="/llama-tools">LLama Tools</a></div>
                  <div><a href="/cgi-tools">Computer Graphics Tools</a></div>
                  <div><a href="/hardware-tools">Hardware Tools</a></div>
                </section>
                <a href="/blag-archive" class="border border-gray-600 py-2 px-4 text-gray-400 hover:bg-gray-800 inline-block">View full archive (174 essays)</a>
                <section class="py-6 border-t border-gray-700 mt-12 border-t-2">
                  <h2 class="text-3xl font-bold mb-4 text-gray-400">Get new essays sent to you</h2>
                  <p class="text-xl text-gray-400 mb-4">Subscribe to my receive updates on Robotic Hardware, Published twice weekly.</p>
                  <form action="#" method="post" class="mb-4">
                    <div class="flex space-x-2">
                      <input type="email" placeholder="Your email address" class="flex-1 p-3 bg-gray-800 border border-gray-600 text-gray-400" />
                      <button type="submit" class="bg-green-900 text-white py-2 px-4 hover:bg-green-600">Subscribe</button>
                    </div>
                  </form>
                </section>
              </section>
            </div>
          </div>
        </div>

        <div id="display" class="relative flex h-full max-w-full flex-1 flex-col overflow-hidden hidden"></div>
      </div>
      <!-- put footer here -->
    </div>
  </div>
</div>`;

export { blog };

//import { Resend } from "resend";

export const marketing_email = async function send_marketing_email(req) {
    //const c = await req.json()
    const audiences = "a94e80be-6a92-4fef-80ba-6c1323b61e29";
    const _ = "re_YkM77Ljq_9iGMj7wQG1EBjqUpuNxDf3k7";
    //const resend = new Resend(_);
    const resend = false;
    const to = "adnan@llama-tools.com";
    const subject = "resend 2 million oct 28";
    const html = "<h1>hello</h1>";
    const result = await resend?.emails?.send({
        from: "awahab@hashirama.art",
        to,
        subject,
        html,
    });
    let json_response = {};

    if (result.error) {
        json_response = { hello: "world" };
        //marcus phillips founder of codecamp - abstraction is the best skill - but not till you accrue unconscoisu  competence thorugh hors of manual labor
    } else {
        json_response = result;
    }

    return new Response(JSON.stringify(json_response), {
        headers: { "Content-Type": "text/html" },
    });
    // https://paulbuchheit.blogspot.com/2014/07/the-technology.html

    return c.json(result);
};

console.log(process.cwd());

async function magic_llama(msg) {
    const result = await ollama.chat({
        model: "llama3.1",
        prompt: msg,
    });
    return result;
}

export { magic_llama };

async function generate_blog() {
    const modules = [
        "assembly-disassembly.md  kinematics-dynamics.md  preventative-maintenance.md",
        "camera-calibration.md",
        "object-detection.md",
        "vision-transformers.md",
        "attention-mechanisms.md",
        "llms-vs-classical.md",
        "agri-logistics.md",
        "cat-food.md",
        "house-garden.md",
        "Science-Math-Magic.md",
        "simulation-and-ui.md",
        "real-world-applications.md",
        "robotics-odyssey.md",
        "llama-tools.md",
        "blag.md",
    ];

    const result = await Promise.all(
        modules.map(async (module) => {
            const response = await magic_llama(
                `generate a blog post about the topic ${module}`,
            );
            return (
                response.message ||
                response.content ||
                response.response ||
                JSON.stringify(response)
            );
        }),
    );
    console.log(result);
    //fs.writeFileSync('./src/llama-tools/blog.md', result.join('\n\n'))
}

async function generateJetsonDocs() {
    const topics = [
        "Initial setup and hardware requirements",
        "Installing JetPack SDK",
        "Setting up CUDA and cuDNN",
        "Power modes and thermal management",
        "Common troubleshooting steps",
    ];

    const systemPrompt = `You are a technical documentation expert. Create clear, step-by-step documentation for Jetson Orin installation.
    Include command examples, prerequisites, and troubleshooting tips. Format the output in markdown.`;

    const docs = await Promise.all(
        topics.map(async (topic) => {
            const result = await ollama.chat({
                model: "llama3.1",
                messages: [
                    { role: "system", content: systemPrompt },
                    {
                        role: "user",
                        content: `Generate documentation section for: ${topic}`,
                    },
                ],
            });
            console.log(result);
            return {
                topic,
                content: result.message.content,
            };
        }),
    );

    // Combine all sections into a single markdown document
    const fullDoc = docs
        .map(
            (section) => `
  ## ${section.topic}

  ${section.content}
  `,
        )
        .join("\n\n");

    // Write to file
    fs.writeFileSync("./jetson-orin-guide.md", fullDoc);
    return fullDoc;
}

export { generateJetsonDocs };

export { generate_blog };
// }

// console.log('render_dist')

//   fs.rmdirSync('dist', { recursive: true });
//   fs.mkdirSync('dist');
//   //fs.writeFileSync('dist/index.html', Layout(indexPage))
//   const is_html = await odyssey()
//   console.log('is_html', is_html)
//   fs.writeFileSync('dist/index.html', Layout(is_html))

//mario party
// mario kart
// mario galaxy - odyssey -
//paper mario

function webhooks(app) {
    return {
        resend: async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
        livekit: async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
        github: async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
        twitter: async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
        twitch: async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
        stripe: async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
        dockerhub: async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
        observablehq: async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
        discord: async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
        "google-drive": async (c) => {
            const body = await c.req.json();
            console.log(body);
            return c.text("ok");
        },
    };
}

function progress_bar(req: Request) {
    const progress = fs.readdirSync("../scripts/papers").length / 30000;
    const content = `
    <div>
      <h1>Progress Bar - # of research papers + diagrams that are good</h1>
      ${progress}%
      <br/>
      <div>how papers render? 1</div>
      <iframe src="/demo-annotator" className="w-full h-full" width="100%" height="100%"></iframe>
    </div>
  `;
    return new Response(content, {
        headers: { "Content-Type": "text/html" },
    });
}

function extractExecutableCode(text: string) {
    const codeBlocks = [];
    const regex = /```javascript([\s\S]*?)```/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        codeBlocks.push(match[1].trim());
    }

    return codeBlocks.join("\n");
}

export { extractExecutableCode };
function diagram_handler(req: Request) {
    const index = req.url.split("/diagrams/")[1];
    const content = fs.readFileSync(
        `/home/adnan/derp/diagrams/${index}`,
        "utf8",
    );
    const code = extractExecutableCode(content);
    const script = `<script type="module">${code}</script>`;

    return new Response(script, {
        headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
export { diagram_handler };

import demo_annotation from "../baby-dynamicland/demo-annotator.tsx";

function demo_annotator(req: Request) {
    return new Response(utils.Layout(demo_annotation()), {
        headers: { "Content-Type": "text/html" },
    });
}

async function signup_odyssey(req: Request) {
    const formData = await req.formData();
    const email = formData.get("email");

    if (email && typeof email === "string") {
        fs.appendFileSync("./signups.txt", `${email}\n`);

        const congrats = `
      <h1>Congrats ${email}!</h1>
      <p>You've been added to the preview list for the robotics odyssey.</p>
      <a href="https://roboticsuniversity.observablehq.cloud/robotics-odyssey/">Watch the trailer</a>
    `;

        return new Response(congrats, {
            headers: { "Content-Type": "text/html" },
        });
    } else {
        return new Response("Invalid email address.", {
            status: 400,
            headers: { "Content-Type": "text/html" },
        });
    }
}


const pioneer_content = `
  <div>
    <h1>Pioneer</h1>
    <a href="https://www.domoai.app/create/video?gad_source=1&gclid=Cj0KCQjwj4K5BhDYARIsAD1Ly2rgUNOaVO510MWPsKkXzagHI4ZuqQoDWbEGs8hffGpW0zhkbTJ1ulwaAhYoEALw_wcB">Create Video</a>
  </div>
  <a href="https://elevenlabs.io/app/sound-effects/generate">Sound Effects Generator</a>
`;

async function proxy(req: Request) {
    const url = req.url.split("/proxy/?url=")[1];
    if (url) {
        const response = await fetch(url);
        return new Response(response.body, {
            headers: {
                "Content-Type":
                    response.headers.get("Content-Type") || "text/plain",
            },
        });
    } else {
        return new Response("No URL provided.", { status: 400 });
    }
}

async function figma_proxy(req: Request) {
    const figmaUrl =
        "https://www.figma.com/board/hymIV9nVS7ASGwoT69H2jb/Untitled?node-id=0-1&node-type=canvas&t=BLsjr9tFdImv2aFM-0";
    const figmaResponse = await fetch(figmaUrl);

    return new Response(figmaResponse.body, {
        status: figmaResponse.status,
        headers: {
            "Content-Type":
                figmaResponse.headers.get("Content-Type") || "text/html",
        },
    });
}

async function llama_zed(req: Request) {
    const content = fs.readFileSync(
        "./src/pages/llama-tools/view_all.html",
        "utf8",
    );
    return new Response(content, {
        headers: { "Content-Type": "text/html" },
    });
}

function share_tools(req: Request) {
    const content = fs.readFileSync(
        "./src/pages/llama-tools/livekit_share.html",
        "utf8",
    );
    return new Response(content, {
        headers: { "Content-Type": "text/html" },
    });
}

async function handleJoin(req: Request) {
    const urlObj = new URL(req.url);
    const email = urlObj.searchParams.get("email");
    console.log(email);
    const data = email + "\n";
    if (email) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (true) {
            // Append the email to a text file synchronously
            fs.appendFileSync("./emails.txt", data);
            return new Response("Email saved successfully!", {
                headers: { "Content-Type": "text/plain" },
            });
        } else {
            return new Response("Invalid email address.", {
                status: 400,
                headers: { "Content-Type": "text/plain" },
            });
        }
    } else {
        return new Response("Email parameter is missing.", {
            status: 400,
            headers: { "Content-Type": "text/plain" },
        });
    }
}

function autoDoc() {
    const allFiles = fs.readdirSync("./src/pages/").concat([
        // 'proxy',
        // 'docs',
        // 'progress',
        "lessons",
    ]);
    const links = allFiles
        .map((file) => `<div><a href="/${file}">${file}</a></div>`)
        .join("");

    //const links = ['https://hashirama.blog/llama-tools/'].map(file => `<div><a href="${file}">${file}</a></div>`).join('');
    //const links = `<div><a href="https://hashirama.blog/llama-tools/">llama-tools</a></div>`;
    return new Response(links, {
        headers: { "Content-Type": "text/html" },
    });
}

export { autoDoc };

function handle_derp(pathname: string) {
    const base_path = "/home/adnan";
    const _path = path.join(base_path, pathname);

    if (fs.existsSync(_path)) {
        if (fs.lstatSync(_path).isDirectory()) {
            const files = fs.readdirSync(_path);
            const links = files
                .map((file) => {
                    const actual_path = path.join(pathname, file);
                    return `<div><a href="${actual_path}">${actual_path}</a></div>`;
                })
                .join("");
            return new Response(links, {
                headers: { "Content-Type": "text/html" },
            });
        } else {
            const content = fs.readFileSync(_path);
            const mimeType = getMimeType(_path);
            return new Response(content, {
                headers: { "Content-Type": mimeType },
            });
        }
    } else {
        return new Response("Not Found", { status: 404 });
    }
}

async function serveLesson(req: Request, url: URL): Promise<Response> {
    const pathname = url.pathname;
    const targetUrl = `http://127.0.0.1:3000${pathname}${url.search}`;
    const path = pathname.split("/lessons/")[1];
    console.log(path);
    // Determine Content-Type based on file extension
    let contentType = "text/html";
    // if (path.includes(".js")) {
    //     contentType = "application/javascript";
    // } else if (path.includes(".css")) {
    //     contentType = "text/css";
    // }

    console.log("Proxying request to", targetUrl);

    // Create a proxy request
    const proxyRequest = new Request(targetUrl, {
        method: req.method,
        headers: req.headers,
        body: req.method === "GET" || req.method === "HEAD" ? null : req.body,
        redirect: "follow",
    });

    const proxyResponse = await fetch(proxyRequest);

    // Return the proxy response with appropriate Content-Type
    const headers = new Headers(proxyResponse.headers);
    headers.set("Content-Type", contentType);

    return new Response(proxyResponse.body, {
        status: proxyResponse.status,
        headers: headers,
    });
}
export { serveLesson };
import getMimeType from "./GetMimeType.ts";
import path from "path";
// Serve static files from /public
function serveStaticFile(pathname: string): Response {
    const publicPath = path.join(process.cwd(), pathname);
    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
        const fileContent = fs.readFileSync(publicPath);
        const ext = path.extname(publicPath).toLowerCase();
        const contentType = getMimeType(ext) || "application/octet-stream";
        return new Response(fileContent, {
            headers: { "Content-Type": contentType },
        });
    } else {
        return new Response("Not Found", { status: 404 });
    }
}
export { serveStaticFile };
