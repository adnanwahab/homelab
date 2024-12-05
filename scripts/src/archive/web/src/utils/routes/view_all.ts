import fs from "fs";
import * as utils from "../utils/utils.ts";

export default function (req: Request) {
    const content = fs.readFileSync(
        "./src/pages/llama-tools/view_all.html",
        "utf8",
    );
    return new Response(utils.Layout(content), {
        headers: { "Content-Type": "text/html" },
    });
}
