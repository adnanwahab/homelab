import odyssey from './pages/odyssey/robotics-odyssey.js' // course conte

import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from "path";
import * as utils from './utils/utils.js'

async function build_odyssey() {
    const llamaContent = odyssey();
    const stream = await renderToString(llamaContent);

    const layoutOutput = utils.Layout(stream);

    fs.writeFileSync('./dist/index.html', layoutOutput);

    const publicDir = path.join(process.cwd(), 'public');
    const distDir = path.join(process.cwd(), 'dist');

    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
    }

    // fs.readdirSync(publicDir).forEach(file => {
    //     const srcFile = path.join(publicDir, file);
    //     const destFile = path.join(distDir, file);
    //     fs.copyFileSync(srcFile, destFile);
    // });
}

build_odyssey();



// https://37signals.com/15
// kindle -> pdf -> diagram -> shareable gif/mp4/img 
// trogdor qwantz -> worry dream bookshelf -> img -> iframe -> customize in english 




function screenshot_tool() {
    //git visualizer ->  output of script -> do that for 20,000 datums
}



console.log("Build complete");


// export async function onRequest(context) {
//     // const urlParams = new URL(context.request.url).searchParams;
//     // const url = urlParams.get("url");
  
//     // if (!url) {
//     //   return new Response("No URL provided.", { status: 400 });
//     // }
  
//     await context.env.CRAWLER_QUEUE.send({
//       url,
//     });
  
//     return new Response(
//       `Sent! Go to <pages URL>.pages.dev/page/${encodeURIComponent(
//         url
//       )} to see results`
//     );
//   }




  