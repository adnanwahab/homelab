import * as utils from "../utils/utils.ts";

export default async function (req: Request) {
  return await utils.livekit_connect({ identity: "asdfasf" });
} 