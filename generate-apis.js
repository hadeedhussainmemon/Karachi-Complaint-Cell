const fs = require('fs');
const path = require('path');

const entities = [
  { name: 'Category', route: 'categories' },
  { name: 'District', route: 'districts' },
  { name: 'News', route: 'news' },
  { name: 'Event', route: 'events' },
  { name: 'TourismLocation', route: 'locations' }
];

entities.forEach(entity => {
  // Collection route
  const apiDir = `src/app/api/${entity.route}`;
  fs.mkdirSync(apiDir, { recursive: true });
  
  const routeCode = `import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ${entity.name} } from '@/models/${entity.name}';

export async function GET() {
  try {
    await dbConnect();
    const items = await ${entity.name}.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await ${entity.name}.create(body);
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
`;
  fs.writeFileSync(path.join(apiDir, 'route.ts'), routeCode);

  // Single item route
  const apiIdDir = `src/app/api/${entity.route}/[id]`;
  fs.mkdirSync(apiIdDir, { recursive: true });
  
  const routeIdCode = `import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ${entity.name} } from '@/models/${entity.name}';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await ${entity.name}.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await ${entity.name}.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
`;
  fs.writeFileSync(path.join(apiIdDir, 'route.ts'), routeIdCode);
});

// Update Sidebar Layout
try {
  let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');
  
  // Add missing icons
  if (!layout.includes('Tag,')) {
    layout = layout.replace(/Globe, Building2 }/g, 'Globe, Building2, Tag, Map, Newspaper, Tent }');
  }
  
  // Replace the old layout links if they exist or just append them
  const newLinks = `
    { title: 'Website CMS', path: '/admin/cms', icon: Globe },
    { title: 'Departments', path: '/admin/departments', icon: Building2 },
    { title: 'Categories', path: '/admin/categories', icon: Tag },
    { title: 'Districts', path: '/admin/districts', icon: Map },
    { title: 'News (PR)', path: '/admin/news', icon: Newspaper },
    { title: 'Events', path: '/admin/events', icon: Tent },
    { title: 'Tourism', path: '/admin/tourism', icon: MapPin },
  `;
  
  // Strip out old manual entries to avoid duplication
  layout = layout.replace(/\{\s*title:\s*'Website CMS'[\s\S]*?icon:\s*Building2\s*\},/g, '');
  layout = layout.replace(/\{\s*title:\s*'Categories'[\s\S]*?icon:\s*MapPin\s*\},/g, '');
  
  // Just inject cleanly
  if (!layout.includes('/admin/categories')) {
    layout = layout.replace(
      /const menuItems = \[/,
      'const menuItems = [' + newLinks
    );
  }
  
  // Superadmin gate
  layout = layout.replace(
    /if \(\(item\.title === 'Website CMS' \|\| item\.title === 'Departments'\) && session\?\.user\?\.role !== 'superadmin'\) \{/g,
    "const superAdminOnly = ['Website CMS', 'Departments', 'Categories', 'Districts', 'News (PR)', 'Events', 'Tourism'];\n            if (superAdminOnly.includes(item.title) && session?.user?.role !== 'superadmin') {"
  );
  
  fs.writeFileSync('src/app/admin/layout.tsx', layout, 'utf8');
} catch(e) { console.log(e); }

console.log('APIs and Sidebar created successfully!');
