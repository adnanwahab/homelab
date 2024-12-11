import * as utils from "../utils/utils.ts";
import deno_webgpu from "../pages/deno-webgpu/";

export default function (req: Request) {
  return new Response(utils.Layout(deno_webgpu()), {
    headers: { "Content-Type": "text/html" },
  });
} 