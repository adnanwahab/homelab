import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    
    const timestamp = new Date().toISOString();
    const logEntry = `\n[${timestamp}]\n${content}\n`;
    
    // Adjust this path based on your project structure
    fs.appendFileSync('editor-history.log', logEntry);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing to file:', error);
    return NextResponse.json(
      { error: 'Failed to write to file' },
      { status: 500 }
    );
  }
} 