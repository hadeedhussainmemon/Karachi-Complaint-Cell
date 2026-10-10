'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Home, ClipboardList, Search, LayoutDashboard, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === 'admin';

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'File Issue', href: '/complaint', icon: ClipboardList, hideAdmin: true },
    { name: 'Track', href: '/track', icon: Search, hideAdmin: true },
    { name: 'Admin', href: '/admin', icon: LayoutDashboard, requireAdmin: true },
    { name: 'Profile', href: session ? '#' : '/login', icon: User }, // Simple fallback for profile/login
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          // Access control
          if (item.hideAdmin && isAdmin) return null;
          if (item.requireAdmin && !isAdmin) return null;

          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive 
                  ? 'text-primary dark:text-accent font-bold' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 font-medium'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-primary/10 dark:bg-accent/10' : ''}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
