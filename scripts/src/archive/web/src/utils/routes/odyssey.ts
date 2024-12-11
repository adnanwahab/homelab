import * as utils from "../utils/utils.ts";
import odyssey from "../pages/odyssey/robotics-odyssey.js";

export default function (req: Request) {
  return utils.render_pioneer(odyssey);
}