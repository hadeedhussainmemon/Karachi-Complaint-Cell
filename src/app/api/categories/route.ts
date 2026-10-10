import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Category } from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();
    const items = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await Category.create(body);
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
