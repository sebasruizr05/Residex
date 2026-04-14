'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  Home,
  Key,
  Building2,
  Users,
  Package,
  MessageSquare,
  Calendar,
  LogOut,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Inicio', href: '/dashboard/admin', icon: <Home className="w-5 h-5" />, adminOnly: true },
  { label: 'Unidades', href: '/dashboard/admin/units', icon: <Building2 className="w-5 h-5" />, adminOnly: true },
  { label: 'Códigos de acceso', href: '/dashboard/admin/codes', icon: <Key className="w-5 h-5" />, adminOnly: true },
  { label: 'Residentes', href: '/dashboard/admin/residents', icon: <Users className="w-5 h-5" />, adminOnly: true },
  { label: 'Inicio', href: '/dashboard/resident', icon: <Home className="w-5 h-5" /> },
  { label: 'Paquetería', href: '/dashboard/resident/packages', icon: <Package className="w-5 h-5" /> },
  { label: 'PQRS', href: '/dashboard/resident/pqrs', icon: <MessageSquare className="w-5 h-5" /> },
  { label: 'Reservas', href: '/dashboard/resident/reservations', icon: <Calendar className="w-5 h-5" /> },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const isAdmin = user?.role === 'admin';

  const items = navItems.filter((item) =>
    isAdmin ? item.adminOnly : !item.adminOnly,
  );

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-slate-900 text-white min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-xl font-bold">Residex</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800',
              )}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-4 h-4 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl mb-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
            {user?.firstName?.[0]?.toUpperCase()}
            {user?.lastName?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
