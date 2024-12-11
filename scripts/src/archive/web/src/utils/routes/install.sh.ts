import fs from "fs";

export default function (req: Request) {
  return new Response(Bun.file("/home/adnan/homelab/scripts/install.sh"));
} 