# To make your own dynabot.dev:
```bash
# install tailscale
# install deno
curl dynabot.dev/install
```
or for english/chinese language developers
```
dynabot.dev/download
```
add your demos here --- put wherever and we'll import them into course\_content -> hosts as hashirama.blog/lessons

# Matierals required to build robot:
| Qt | Part | 🇺🇸 USA | 🇮🇹 Italy | 🇬🇧 UK | 🇳🇱 NL | Notes |
|---:|:-----|:---------|:-----------|:--------|:--------|:------|
| 1 | NVIDIA Jetson Nano | NVIDIA store | | | | You can use 2Gb or 4Gb version. Buy this alternative carrier: SEEED studio |
| 1 | MicroSD card 64Gb | $9.99 Amazon | Amazon | Amazon | Amazon | |
| 1 | 128GB NVM3 M.2 PCLe SSD | | | | | Only for SEEED STUDIO carrier NVMe M.2 |
| 1 | Wi-Fi Dongle 5Ghz | $13.90 Amazon | Amazon | Amazon | Amazon | |
| 1 | Power Bank | $29.99 Amazon | Amazon | Amazon | Amazon | Power Bank dimensioning |
| 2 | Pololu Micro Gearbox | $25.75 Amazon | Amazon | Amazon | Amazon | Pololu 6V 150RPM, alternative: aliexpress.com |
| 1 | Adafruit motor control | $29.10 Amazon | Amazon | Amazon | Amazon | DC Motor + Stepper FeatherWing Add-on, alternative: aliexpress.com |
| 2 | oled display | $5 Amazon | Amazon | Amazon | Amazon | 128x64px 0.06in I2C, Best price pack: 3 display |
| 6 | Ball bearings F686ZZ | $7.49 Amazon | Amazon | Amazon | Amazon | alternative: aliexpress.com |
| 10 | Magnets 4x2mm | $10.99 Amazon | | | Amazon | alternative: aliexpress.com |
| - | Expansion board | | | | | Expansion board |
| - | 3D parts | | | | | 3D filaments |
| - | Hex M2 Screw set | $10 Amazon | | | | Screw set |
- ---- Total = $141 base w/ 100 jetson nano
extras = arm by trossen or lerobot by hugging face
# How WorryDream invented the future of robotics UI and Education for biotech, nuclear fusion and beyond!
1970 -Alan kay + his 25 friends created 60 Trillion in USD in 5 years - thats more than 10 nvidias saudi aramco and 250 million years of dino saur fermentation using their mind!
2016 - OpenAI was made when Alan Kay met with YCResearch
2017 - Alan Kay said Sam Altman = "the builder of civilization"
2019-- Alan kay asked https://internetat50.com/references/Kay_How.pdf HOW?
2022 - WorryDream Answered - Dynamicland.
---
> In the Spring of 2016, VPRI joined as part of Y Combinator Research's (YCR) HARC -- Human Advancement Research Community.
> HARC was founded based on conversations between Alan Kay and Sam Altman of  ycr.org   -----  http://www.vpri.org/
> - https://web.archive.org/web/20170914174755/https://harc.ycr.org/
>
> — *_Alan Kay talking about bret victor_*
> “one of the greatest user interface design minds in the world today”
>
> — *_Edward Tuft_* recognized Bret as
> “design theory wizard, at the cutting edge of interface designs for programming, seeing, reasoning”
**# Magic Ink predicted the future - 2005 - tools that anticipate not obey.**

![https://worrydream.com/SeeingSpaces/SeeingSpaces.jpg](https://worrydream.com/SeeingSpaces/SeeingSpaces.jpg)
## Our only Goal = 10,000x Followers of Dynamicland.org + worrydream + his friends from 50k to 500m
# To support this project please follow [ worrydream ](https://x.com/worrydream) + [ smd.nano ](https://x.com/smdnano) + [ dynamicland ](https://x.com/Dynamicland1)
https://distill.pub/2021/understanding-gnns/
[![3D Manipulation of Molecular Machines](https://img.youtube.com/vi/_gXiVOmaVSo/maxresdefault.jpg)](https://youtu.be/_gXiVOmaVSo)
![https://worrydream.com/MagicInk/p/logo.png](https://worrydream.com/MagicInk/p/logo.png)
<<<<<<< HEAD
=======
>>>>>>> b1b1bf5 (cool beans)


async function handleFetch(req: Request): Promise<Response> {
    console.log("fetch");
    const ip = await getPublicIP();

    const url = new URL(req.url);
    const pathname = url.pathname;
    //console.log(`Your public IP address is: ${ip}`);
    console.log(req.url);

    const publicDir = path.join(process.cwd(), 'public');

    //console.log('pathname', fs.readdirSync(publicDir));
    if (url.pathname === "/") {
        return new Response(Bun.file("./src/index.html"), {
            headers: { "Content-Type": "text/html" },
        });
    }

    if (pathname === "/api/login") {

    //const matched = router.match(req);
    if (pathname === "/favicon.ico") return new Response("");



      const viewAllContent = fs.readFileSync(
        "./src/pages/llama-tools/view_all.html",
        "utf8",
      );
      return new Response(utils.Layout(viewAllContent), {
        headers: { "Content-Type": "text/html" },
      });

    if (url.pathname === '/lessons') {

        return serveLesson(req, url);
    }

    if (url.pathname === "/odyssey") {
        console.log("odyssey");
        return renderToString(odyssey);

    }

    // case "/odyssey":
    //   console.log("odyssey");
    //   return utils.render_pioneer(odyssey);

    // case "/simulation-tools":
    //   return new Response(utils.Layout(simulation_tools()), {
    //     headers: { "Content-Type": "text/html" },
    //   });

    // case "/livekit_connect":
    //   return await utils.livekit_connect({ identity: "asdfasf" });

    // case "/llama-tools": {
    //   const llamaContent = llama_tools();
    //   const stream = await renderToString(llamaContent);
    //   const layoutOutput = utils.Layout(stream);
    //   return new Response(layoutOutput, {
    //     headers: { "Content-Type": "text/html" },
    //   });
    // }




const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = "https://dynabot.dev/github/callback";

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
// console.log(pathname);
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
>>>>>>> 3fd2ad3 (simplify)
<<<<<<< HEAD:web/src/readme.md
https://openai.com/index/learning-to-reason-with-llms/
=======
https://files.hashirama.blog/blog/Collaboration_.jpg
https://files.hashirama.blog/seeing/cropped_image_116.png
https://www.jasondavies.com/

https://gist.github.com/adnanwahab/bf2d23f8d522aa7737d037d79cba9ae0

100 * 100 - app idea = 10,000 prompts = 10,000 cursor (ollama+cursor-mini) = host them all - hand review - each rating = tune your eval.
do 100 manual reviews = all autoscore - reduce bias.

A better hogwarts would have all students be in a different school every year - this would !?


1. pro-self-anti-other bias.
2.
3.
4.
5.
>>>>>>> 9a3372e (cool):readme.md
