import fs from "fs";

export default function (req: Request) {
  const content = fs.readFileSync("./src/pages/api/index.html", "utf8");
  return new Response(content, {
    headers: { "Content-Type": "text/html" },
  });
} 