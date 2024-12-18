import { NextResponse } from "next/server";
import { zed2iLogs, LogEntry } from "../dataStore";

export async function GET() {
  // Returns all ZED 2i logs as JSON
  return NextResponse.json(zed2iLogs);
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || message.trim() === "") {
      return new NextResponse("Invalid log message", { status: 400 });
    }

    const newLog: LogEntry = { timestamp: Date.now(), message };
    zed2iLogs.push(newLog);

    return NextResponse.json(
      { status: "success", log: newLog },
      { status: 201 },
    );
  } catch (err) {
    return new NextResponse("Invalid JSON", { status: 400 });
  }
}
