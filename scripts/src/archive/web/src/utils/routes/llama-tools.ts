import * as utils from "../utils/utils.ts";
import llama_tools from "../pages/llama-tools/after_login.js";
import { renderToString } from "react-dom/server";

export default async function (req: Request) {
  const content = llama_tools();
  const stream = await renderToString(content);
  const layoutOutput = utils.Layout(stream);
  return new Response(layoutOutput, {
    headers: { "Content-Type": "text/html" },
  });
} 