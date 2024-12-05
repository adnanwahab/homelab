import * as utils from "../utils/utils.ts";
import AutoGif from "../pages/odyssey/Auto_gif.tsx";

export default function (req: Request) {
  return utils.render_pioneer(AutoGif);
} 