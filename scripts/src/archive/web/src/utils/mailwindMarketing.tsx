

import { renderToString } from "react-dom/server";

function SimplestEmail() {
return new Array(700).fill('').map((_, i) => <img src={`https://files.hashirama.blog/seeing/cropped_image_${i % 99}.png`} />)  
}
import { Resend } from "resend";

// gif 

export const marketing_email = async function send_marketing_email(req) {
    //const c = await req.json()
    const audiences = "a94e80be-6a92-4fef-80ba-6c1323b61e29";
    const _ = "re_YkM77Ljq_9iGMj7wQG1EBjqUpuNxDf3k7";
    const resend = new Resend(_);
    //const resend = false
    const to = "adnan@llama-tools.com";
    const subject = "resend 2 million oct 28";
    //const html = "<h1>hello</h1>";

    const html = renderToString(<SimplestEmail />)
    console.log(html)
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
console.log('marketing_email')

await marketing_email()