const fs = require('fs');
const path = require('path');

const generateCrudPage = (title, icon, apiPath, fields) => {
  return `'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ${icon}, Plus, Trash2, Loader2 } from 'lucide-react';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    else if (status === 'authenticated') {
      if (session?.user?.role !== 'superadmin') router.push('/admin');
      else fetchItems();
    }
  }, [status, session, router]);

  const fetchItems = async () => {
    try {
      const res = await fetch('${apiPath}');
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('${apiPath}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) { setFormData({}); fetchItems(); }
    } catch (error) { console.error(error); } finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      const res = await fetch(\`${apiPath}/\${id}\`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchItems();
    } catch (error) { console.error(error); }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-3 bg-primary/10 rounded-lg"><${icon} className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">Manage ${title}</h1>
        </div>

        <Card>
          <CardHeader><CardTitle>Add New ${title}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${fields.map(f => `
                <div className="space-y-1 ${f.full ? 'md:col-span-2' : ''}">
                  <label className="text-sm font-medium">${f.label}</label>
                  <Input value={formData.${f.key} || ''} onChange={(e) => setFormData({...formData, ${f.key}: e.target.value})} required={${f.req}} />
                </div>
              `).join('')}
              <div className="md:col-span-2">
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add Record'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                ${fields.map(f => `<th className="px-4 py-3">${f.label}</th>`).join('')}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b">
                  ${fields.map(f => `<td className="px-4 py-3">{item.${f.key}}</td>`).join('')}
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item._id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}`;
};

// Ensure directories exist
['categories', 'districts', 'news', 'events', 'tourism'].forEach(dir => {
  fs.mkdirSync(path.join('src/app/admin', dir), { recursive: true });
});

// Generate Pages
fs.writeFileSync('src/app/admin/categories/page.tsx', generateCrudPage('Categories', 'Tag', '/api/categories', [
  { key: 'name', label: 'Category Name', req: true, full: true }
]));

fs.writeFileSync('src/app/admin/districts/page.tsx', generateCrudPage('Districts', 'Map', '/api/districts', [
  { key: 'name', label: 'District Name', req: true, full: true }
]));

fs.writeFileSync('src/app/admin/news/page.tsx', generateCrudPage('News', 'Newspaper', '/api/news', [
  { key: 'title', label: 'Title', req: true, full: true },
  { key: 'category', label: 'Category', req: false, full: false },
  { key: 'url', label: 'Read More URL', req: false, full: false }
]));

fs.writeFileSync('src/app/admin/events/page.tsx', generateCrudPage('Events', 'Tent', '/api/events', [
  { key: 'title', label: 'Event Title', req: true, full: true },
  { key: 'location', label: 'Location', req: true, full: false },
  { key: 'date', label: 'Date (YYYY-MM-DD)', req: false, full: false }
]));

fs.writeFileSync('src/app/admin/tourism/page.tsx', generateCrudPage('Tourism Locations', 'MapPin', '/api/locations', [
  { key: 'name', label: 'Location Name', req: true, full: false },
  { key: 'district', label: 'District', req: true, full: false },
  { key: 'type', label: 'Type (e.g. Park, Beach)', req: false, full: false }
]));

console.log('Admin UI Pages generated!');
