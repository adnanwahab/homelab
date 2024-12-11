import * as utils from "../utils/utils.ts";
import demo_annotation from "../pages/baby-dynamicland/demo-annotator.tsx";

export default async function (req: Request) {
  return await utils.render_pioneer(demo_annotation);
} 