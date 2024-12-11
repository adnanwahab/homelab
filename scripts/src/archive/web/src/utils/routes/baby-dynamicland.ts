import * as utils from "../utils/utils.ts";
import baby_dynamicland from "../pages/baby-dynamicland/baby-dynamicland.jsx";
import { renderToString } from "react-dom/server";

export default function (req: Request) {
  const content = utils.Layout(renderToString(baby_dynamicland()));
  return new Response(content, {
    headers: { "Content-Type": "text/html" },
  });
} 