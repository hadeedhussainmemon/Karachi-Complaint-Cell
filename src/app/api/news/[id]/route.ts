import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { News } from '@/models/News';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await News.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await News.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
