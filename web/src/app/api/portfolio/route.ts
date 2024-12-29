import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';    
const images = fs.readdirSync(path.join(process.cwd(), 'public', 'images'));

export async function GET(request: Request) {
 
    return NextResponse.json(images);
}   