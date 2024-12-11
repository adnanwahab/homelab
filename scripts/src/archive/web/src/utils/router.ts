import fs from "fs";
import path from "path";
import { serveLesson } from "./utils/serveLesson.ts";
import { getPublicIP } from "./utils/getPublicIP.ts";
import odyssey from "./pages/odyssey/robotics-odyssey.js";
import { renderToString } from "react-dom/server";
import llama_tools from "./pages/llama-tools/after_login.js";
import blag from "./pages/hardware_documentation_blog/";
import simulation_tools from "./pages/simulation-tools/";
import deno_webgpu from "./pages/deno-webgpu/";
import baby_dynamicland from "./pages/baby-dynamicland/baby-dynamicland.jsx";
import demo_annotation from "./pages/baby-dynamicland/demo-annotator.tsx";
// import AutoGif from './pages/odyssey/Auto_gif.tsx';
import getMimeType from "./utils/getMimeType.ts";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = "https://dynabot.dev/github/callback";
// https://jsfiddle.net/designsystemweb/37c2mryj/4/
// https://folklore.org/Creative_Think.html
// https://hakim.se/
// https://jsfiddle.net/hakim/Ht6Ym/
const baseName = `https://gpu.jerboa-kokanue.ts.net`;
const routes = {
    "/api": function () {
        const content = Object.keys(routes)
            .map((_) => {
                return `<a href="${baseName}${_}">${baseName}${_}</a>`;
            })
            .join("<br>");

        return new Response(content, {
            headers: { "Content-Type": "text/html" },
        });
    },
    "/api/github_login/": function () {
        return new Response("okay", {
            headers: { "content-type": "text/html" },
        });
    },
};

function router(pathname) {
    if (pathname in routes) {
        return routes[pathname](pathname);
    }
}

export default router;

// async function handleFetch(req: Request): Promise<Response> {
//     console.log("fetch");
//     const ip = await getPublicIP();
//     const url = new URL(req.url);
//     const pathname = url.pathname;
//     //console.log(`Your public IP address is: ${ip}`);
//     console.log(req.url);

//     const publicDir = path.join(process.cwd(), 'public');

//     //console.log('pathname', fs.readdirSync(publicDir));
//     const url = new URL(request.url);
//     const pathname = url.pathname === "/" ? "/index.html" : url.pathname;

//     try {
//       const file = Bun.file(`${PUBLIC_DIR}${pathname}`);
//       return new Response(file, {
//         headers: {
//           "Content-Type": getMimeType(pathname),
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       return new Response("404 Not Found", { status: 404 });
//     }
//   },

//     // if (url.pathname === "/lessons") {
//     //     console.log('lessons');
//     //     return new Response(Bun.file(path.join(publicDir, 'lessons/dist/index.html')), {
//     //         headers: { "Content-Type": "text/html" },
//     //     });
//     // }

//     // if (url.pathname === "/odyssey") {
//     //     console.log("odyssey");
//     //     console.log(renderToString(odyssey));
//     //     return new Response(renderToString(odyssey), {
//     //         headers: { "Content-Type": "text/html" },
//     //     });
//     // }

//     if (url.pathname === "/github/callback") {
//         const code = url.searchParams.get("code");
//         if (!code) {
//             return new Response("No code provided", { status: 400 });
//         }

//         // Exchange code for access token
//         const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
//             method: "POST",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 client_id: GITHUB_CLIENT_ID,
//                 client_secret: GITHUB_CLIENT_SECRET,
//                 code: code,
//                 redirect_uri: REDIRECT_URI,
//             }),
//         });

//         const tokenData = await tokenResponse.json();

//         if (tokenData.error) {
//             return new Response(`Authentication failed: ${tokenData.error}`, { status: 400 });
//         }

//         // Get user data
//         const userResponse = await fetch("https://api.github.com/user", {
//             headers: {
//                 "Authorization": `Bearer ${tokenData.access_token}`,
//                 "Accept": "application/json",
//             },
//         });

//         const userData = await userResponse.json();

//         // Here you would typically:
//         // 1. Create a session
//         // 2. Store user info in your database
//         // 3. Set cookies or return JWT

//         // For now, we'll redirect to home with a temporary cookie
//         return new Response(null, {
//             status: 302,
//             headers: {
//                 "Location": "/",
//                 "Set-Cookie": `github_user=${userData.login}; Path=/; HttpOnly; Secure; SameSite=Strict`
//             }
//         });
//     }

//     // Serve static files from /public
//     if (pathname.startsWith("/public")) {
//           console.log(pathname);
//         if (pathname.length === '/public') {
//             return new Response(fs.readdirSync('./'), {
//                 headers: { "Content-Type": "text/plain" },
//             });
//         }
//         //return new Response(Bun.file(pathname));

//     }

//     // Default response if no route matches
//     return new Response("Not Found!", { status: 404 });
// }
