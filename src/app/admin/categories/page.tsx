'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Tag, Plus, Trash2, Loader2 } from 'lucide-react';
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
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/categories', {
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
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchItems();
    } catch (error) { console.error(error); }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-3 bg-primary/10 rounded-lg"><Tag className="h-6 w-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">Manage Categories</h1>
        </div>

        <Card>
          <CardHeader><CardTitle>Add New Categories</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">Category Name</label>
                  <Input value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} required={true} />
                </div>
              
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
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 py-3">{item.name}</td>
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
}