import * as utils from "../utils/utils.ts";
import simulation_tools from "../pages/simulation-tools/";

export default function (req: Request) {
  return new Response(utils.Layout(simulation_tools()), {
    headers: { "Content-Type": "text/html" },
  });
} 