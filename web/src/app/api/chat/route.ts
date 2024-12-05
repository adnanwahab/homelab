import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { message } = await request.json();

    // Call the Ollama API
    const botResponse = await callOllamaAPI(message);

    // Log the conversation
    await logConversation({ user: message, bot: botResponse });

    return NextResponse.json({ response: botResponse });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to process the message.' }, { status: 500 });
  }
}

async function callOllamaAPI(userMessage) {
  // Stub response - remove when ready to connect to real API
  return "There are 7 days in a week";
}

async function logConversation(conversation) {
  const logFilePath = path.join(process.cwd(), 'conversation_log.json');

  let existingLogs = [];
  try {
    const fileData = await fs.readFile(logFilePath, 'utf8');
    existingLogs = JSON.parse(fileData);
  } catch (err) {
    // File doesn't exist or is invalid, start with an empty array
    existingLogs = [];
  }

  existingLogs.push(conversation);

  await fs.writeFile(logFilePath, JSON.stringify(existingLogs, null, 2));
}