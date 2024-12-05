import * as utils from "../utils/utils.ts";
import blag from "../pages/hardware_documentation_blog/";

export default function (req: Request) {
  return utils.render_pioneer(blag);
} 