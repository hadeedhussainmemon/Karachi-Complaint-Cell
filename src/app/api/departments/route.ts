import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Department } from '@/models/Department';

export async function GET() {
  try {
    await dbConnect();
    const departments = await Department.find().sort({ name: 1 });
    return NextResponse.json({ success: true, data: departments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const department = await Department.create(body);
    return NextResponse.json({ success: true, data: department });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
