import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Event } from '@/models/Event';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await Event.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await Event.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
