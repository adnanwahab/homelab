import { serve } from "bun";

const html = `hello world - zoox 2025 awahab`;

function handler(request) {
  // 5. Return the HTML response
  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

// const server = serve({
//   fetch: handler,
//   port: 8000,
// });

const urls = [
  "http://nytimes.com",
  "https://vizcom.ai",
  "https://twitter.com/vizcom",
];

//loop is sequential
//async calls to fetch --- suspends the UI / main thread
//eevennt loops reanimates the thread

//take a list --- async for each

//starts n network requests
//event loops ticks and sees - no cpu work left ot do - resume on finished requests

/// Bun.Spawn -
//this whole file ---- async --

//Bun.Exec()//child procesess

//always at 50 urls
//promise.all --

//dependencey between the different fetch

const iterator = Promise.all(urls.map(getHtml));

//iterator.then((html) => console.log(html));

for (let page of iterator) {
  console.log(page.content);
}
//playwright

async function parseUrls(urls: string[]) {
  let hasReferenceToVizCom = {};

  for (let url of urls) {
    //async -- suspend and resume
    const html = await getHTML(url);
    if (html.includes("vizcom")) {
      hasReferenceToVizCom[url] = true;
    } else {
      hasReferenceToVizCom[url] = false;
    }
  }
  //promise.all(urls.map(getHTML));
  return Object.entries(hasReferenceToVizCom)
    .filter((pair) => pair[1] == true)
    .map((pair) => pair[0]);
}

const getHTML = async (url) => {
  const req = await fetch(url);
  const html = await req.text();
  //console.log(html);
  return html;
};
const result = await parseUrls(urls);
console.log(result);
//axios

//playwright - reequests -- fetch HTTP

//parseUrls

// import { createClient } from "@clickhouse/client";

// //   <iframe width="900" height="500" src="jupyter.cgi-tools.dev"></iframe>

// const html = `hello world - zoox 2025 awahab

//   <ul>
//   <li><a href="https://jupyter.cgi-tools.dev/lab/workspaces" target="_blank">Jupyter</a>
//   <li><a href="#idk" target="_blank">ML machine learning UNreal Engine</a>
//   <li><a href="#idk" target="_blank">ML with unity robotics</a>

//   <li> <a href="#idk" target="_blank">UNreal Engine</a>

//   <li><a href="https://files.cooperative-robotics.com/intermediate_representation/robotics_knowledge_book_of_future/driving/" target="_blank">Zoox Driving Repo</a>
// </ul>
//   `;

// // 6. Start the Bun server
// const server = serve({
//     fetch: handler,
//     port: 8000,
// });

// console.log(`Server running at http://localhost:${server.port}`);
