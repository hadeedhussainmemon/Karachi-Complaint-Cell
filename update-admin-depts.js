const fs = require('fs');

// 1. Update Admin Layout (Sidebar)
try {
  let layout = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');
  if (!layout.includes('/admin/departments')) {
    if (!layout.includes('Building2')) {
      layout = layout.replace('Globe }', 'Globe, Building2 }');
    }
    layout = layout.replace(
      /{ title: 'Website CMS', path: '\/admin\/cms', icon: Globe },/,
      "{ title: 'Website CMS', path: '/admin/cms', icon: Globe },\n    { title: 'Departments', path: '/admin/departments', icon: Building2 },"
    );
    layout = layout.replace(
      /if \(item\.title === 'Website CMS' && session\?\.user\?\.role !== 'superadmin'\) {/,
      "if ((item.title === 'Website CMS' || item.title === 'Departments') && session?.user?.role !== 'superadmin') {"
    );
    fs.writeFileSync('src/app/admin/layout.tsx', layout, 'utf8');
    console.log('Sidebar updated');
  }
} catch(e) { console.error('Layout error', e); }

// 2. Update Dropdown in AdminComplaintsClient.tsx
try {
  let client = fs.readFileSync('src/components/AdminComplaintsClient.tsx', 'utf8');
  if (client.includes('const DEPARTMENTS = [')) {
    client = client.replace(
      'export default function AdminComplaintsClient({ initialComplaints }: AdminComplaintsClientProps) {',
      'export default function AdminComplaintsClient({ initialComplaints }: AdminComplaintsClientProps) {\n  const [departmentsList, setDepartmentsList] = React.useState<any[]>([]);\n  React.useEffect(() => {\n    fetch(`/api/departments`).then(res => res.json()).then(data => { if(data.success) setDepartmentsList(data.data); });\n  }, []);\n'
    );
    client = client.replace(/const DEPARTMENTS = \[[\s\S]*?\];/g, '');
    client = client.replace(/DEPARTMENTS\.map\(\(dept\)/g, 'departmentsList.map((dept)');
    client = client.replace(
      /<SelectItem key=\{dept\} value=\{dept\}>/g,
      '<SelectItem key={dept._id || dept.name} value={dept.name}>'
    );
    client = client.replace(
      /\{dept\}\s*<\/SelectItem>/g,
      '{dept.name} {dept.acronym ? `(${dept.acronym})` : ""}\n                            </SelectItem>'
    );
    fs.writeFileSync('src/components/AdminComplaintsClient.tsx', client, 'utf8');
    console.log('Dropdown updated');
  }
} catch(e) { console.error('Dropdown error', e); }

// 3. Seed some default Karachi departments
const seedCode = `
import mongoose from 'mongoose';
import dbConnect from './src/lib/dbConnect.ts';
import { Department } from './src/models/Department.ts';

async function seed() {
  await dbConnect();
  const count = await Department.countDocuments();
  if (count === 0) {
    await Department.insertMany([
      { name: 'K-Electric', acronym: 'KE' },
      { name: 'Karachi Water & Sewerage Board', acronym: 'KWSB' },
      { name: 'Sindh Solid Waste Management Board', acronym: 'SSWMB' },
      { name: 'Sui Southern Gas Company', acronym: 'SSGC' },
      { name: 'Karachi Metropolitan Corporation', acronym: 'KMC' }
    ]);
    console.log('Seeded Karachi departments');
  }
  process.exit();
}
seed();
`;
fs.writeFileSync('seed-depts.js', seedCode);
