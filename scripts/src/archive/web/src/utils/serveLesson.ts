import { Request, Response } from "bun";

export async function serveLesson(req: Request, url: URL): Promise<Response> {
    const pathname = url.pathname;
    const targetUrl = `http://127.0.0.1:3000${pathname}${url.search}`;
    const path = pathname.split("/lessons/")[1];
    console.log(path);

    // Determine Content-Type based on file extension
    let contentType = "text/html";
    // Uncomment and modify as needed
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