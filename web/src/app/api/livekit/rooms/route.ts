import { NextResponse } from 'next/server';
import { roomService } from '@/lib/livekit';

export async function GET() {
  const rooms = await roomService.listRooms();
  const roomDetails = await Promise.all(rooms.map(async (room) => {
    const participants = await roomService.listParticipants(room.name);
    return {
      name: room.name,
      participants: participants.map(p => ({
        identity: p.identity,
        joinedAt: p.joinedAt
      }))
    };
  }));

  return NextResponse.json(roomDetails);
}