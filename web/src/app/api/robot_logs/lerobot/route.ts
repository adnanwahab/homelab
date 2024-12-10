import { NextResponse } from "next/server";
import { lerbotLogs, LogEntry } from "../dataStore";

export async function GET() {
  // Returns all lerbot logs as JSON
  return NextResponse.json(lerbotLogs);
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || message.trim() === "") {
      return new NextResponse("Invalid log message", { status: 400 });
    }

    const newLog: LogEntry = { timestamp: Date.now(), message };
    lerbotLogs.push(newLog);

    return NextResponse.json(
      { status: "success", log: newLog },
      { status: 201 },
    );
  } catch (err) {
    return new NextResponse("Invalid JSON", { status: 400 });
  }
}
