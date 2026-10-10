import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Event } from '@/models/Event';

export async function GET() {
  try {
    await dbConnect();
    const items = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await Event.create(body);
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
