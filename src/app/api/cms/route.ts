import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { SiteContent } from '@/models/SiteContent';

export async function GET() {
  try {
    await dbConnect();
    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create({}); // Creates default document
    }
    return NextResponse.json({ success: true, data: content });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    let content = await SiteContent.findOne();
    if (content) {
      content = await SiteContent.findOneAndUpdate({}, body, { new: true });
    } else {
      content = await SiteContent.create(body);
    }
    return NextResponse.json({ success: true, data: content });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
