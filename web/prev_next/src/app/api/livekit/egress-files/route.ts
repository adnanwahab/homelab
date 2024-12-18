import { NextResponse } from 'next/server';
import { getEgressFiles } from '@/lib/egressStore';

export async function GET() {
  return NextResponse.json(getEgressFiles());
}