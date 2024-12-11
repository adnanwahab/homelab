import * as utils from "../../utils/utils.ts";

export default async function (req: Request) {
  return utils.serveStaticFile(req.url);
} 