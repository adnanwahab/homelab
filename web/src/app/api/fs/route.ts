import { Glob } from "bun";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const glob = new Glob("**/*.ts");

// Scans the current working directory and each of its sub-directories recursively

export default function handler(req: NextRequest, res: NextResponse) {
  const files = glob.scan("public/thumbnails/**/*.png");
  return NextResponse.json({ files });
}
