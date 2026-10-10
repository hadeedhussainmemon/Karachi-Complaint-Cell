const fs = require('fs');
const path = require('path');

// 1. Create Department Model
const modelCode = `import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  acronym: { type: String, required: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);
`;
fs.mkdirSync('src/models', { recursive: true });
fs.writeFileSync('src/models/Department.ts', modelCode);

// 2. Create API Route for GET/POST (app/api/departments/route.ts)
const apiDir = 'src/app/api/departments';
fs.mkdirSync(apiDir, { recursive: true });
const apiCode = `import { NextResponse } from 'next/server';
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
`;
fs.writeFileSync(path.join(apiDir, 'route.ts'), apiCode);

// 3. Create API Route for DELETE/PUT (app/api/departments/[id]/route.ts)
const apiIdDir = 'src/app/api/departments/[id]';
fs.mkdirSync(apiIdDir, { recursive: true });
const apiIdCode = `import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Department } from '@/models/Department';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await Department.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
`;
fs.writeFileSync(path.join(apiIdDir, 'route.ts'), apiIdCode);
console.log("Backend structure created!");
