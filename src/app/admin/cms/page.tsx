'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CMSPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    const role = (session?.user as any)?.role;
    if (status === 'authenticated' && role !== 'superadmin') {
      alert('Access Denied. Only Technical Admins can access the CMS.');
      router.push('/admin');
      return;
    }

    if (status === 'authenticated' && role === 'superadmin') {
      fetchCMSData();
    }
  }, [status, session]);

  const fetchCMSData = async () => {
    try {
      const res = await fetch('/api/cms');
      const data = await res.json();
      if (data.success && data.data) {
        setFormData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert('Website Content Updated Successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save content.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <main className="flex-1 p-6 lg:p-10 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="text-primary" /> Content Management System (CMS)
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage global website texts. Changes reflect immediately on the frontend.</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Home Page (Hero Section)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">Hero Title Line 1</label>
              <Input value={formData.heroTitle1 || ''} onChange={(e) => setFormData({...formData, heroTitle1: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">Hero Title Line 2 (Highlighted)</label>
              <Input value={formData.heroTitle2 || ''} onChange={(e) => setFormData({...formData, heroTitle2: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-gray-500">Hero Description</label>
              <Textarea value={formData.heroDesc || ''} onChange={(e) => setFormData({...formData, heroDesc: e.target.value})} className="rounded-xl" rows={3} />
            </div>
          </div>

          <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 mt-8">Buttons & Calls to Action</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">Explore Button Text</label>
              <Input value={formData.exploreBtnText || ''} onChange={(e) => setFormData({...formData, exploreBtnText: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">Submit Complaint Button Text</label>
              <Input value={formData.submitBtnText || ''} onChange={(e) => setFormData({...formData, submitBtnText: e.target.value})} className="rounded-xl" />
            </div>
          </div>

          <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 mt-8">Footer & Contact Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-gray-500">Footer About Text</label>
              <Textarea value={formData.footerAbout || ''} onChange={(e) => setFormData({...formData, footerAbout: e.target.value})} className="rounded-xl" rows={2} />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-gray-500">Physical Address</label>
              <Input value={formData.contactAddress || ''} onChange={(e) => setFormData({...formData, contactAddress: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">Phone / Helpline</label>
              <Input value={formData.contactPhone || ''} onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">Email Address</label>
              <Input value={formData.contactEmail || ''} onChange={(e) => setFormData({...formData, contactEmail: e.target.value})} className="rounded-xl" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
