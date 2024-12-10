export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

import { NextResponse } from "next/server";
// import { Client } from "@notionhq/client";

// export async function GET() {
//   const notion = new Client({ auth: process.env.NOTION_SECRET });
//   const databaseId = process.env.NOTION_DATABASE_ID;

//   if (!databaseId) {
//     return NextResponse.json(
//       { error: "No database ID provided." },
//       { status: 400 },
//     );
//   }

//   try {
//     const response = await notion.databases.query({ database_id: databaseId });
//     return NextResponse.json({ data: response.results }, { status: 200 });
//   } catch (error) {
//     console.error("Notion query error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
