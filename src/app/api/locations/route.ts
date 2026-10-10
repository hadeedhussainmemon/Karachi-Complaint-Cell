import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { TourismLocation } from '@/models/TourismLocation';

export async function GET() {
  try {
    await dbConnect();
    const items = await TourismLocation.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await TourismLocation.create(body);
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
