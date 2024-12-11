import * as utils from "../../utils/utils.ts";

export default async function (req: Request) {
  const url = new URL(req.url);
  return await utils.serveLesson(req, url);
} 