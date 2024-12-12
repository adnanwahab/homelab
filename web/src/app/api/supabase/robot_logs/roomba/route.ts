import { NextResponse } from "next/server";
import { roombaLogs, LogEntry } from "../dataStore";

export async function GET() {
  // Returns all roomba logs as JSON
  return NextResponse.json(roombaLogs);
}

export async function POST(request: Request) {
  // Expecting a JSON body: { message: string }
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || message.trim() === "") {
      return new NextResponse("Invalid log message", { status: 400 });
    }

    const newLog: LogEntry = { timestamp: Date.now(), message };
    roombaLogs.push(newLog);

    return NextResponse.json(
      { status: "success", log: newLog },
      { status: 201 },
    );
  } catch (err) {
    return new NextResponse("Invalid JSON", { status: 400 });
  }
}
