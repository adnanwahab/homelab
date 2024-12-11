import * as utils from "../utils/utils.ts";

export default function (req: Request) {
  return new Response(utils.pioneer_content, {
    headers: { "Content-Type": "text/html" },
  });
} 