'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Package,
  MessageSquare,
  Calendar,
  Bell,
  ChevronRight,
  Building2,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  iconBg: string;
}

const quickActions: QuickAction[] = [
  {
    label: 'Paquetería',
    description: 'Consulta tus entregas pendientes',
    href: '/dashboard/resident/packages',
    icon: <Package className="w-6 h-6" />,
    color: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    label: 'PQRS',
    description: 'Reporta incidencias o solicitudes',
    href: '/dashboard/resident/pqrs',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'text-violet-600',
    iconBg: 'bg-violet-50',
  },
  {
    label: 'Reservas',
    description: 'Reserva zonas comunes',
    href: '/dashboard/resident/reservations',
    icon: <Calendar className="w-6 h-6" />,
    color: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
  {
    label: 'Anuncios',
    description: 'Noticias y comunicados',
    href: '/dashboard/resident/announcements',
    icon: <Bell className="w-6 h-6" />,
    color: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
];

// Placeholder announcements
const announcements = [
  {
    id: 1,
    title: 'Corte de agua programado',
    date: '15 de abril, 2026',
    body: 'Se realizará mantenimiento de la red hidráulica el sábado de 8am a 12pm.',
    type: 'warning',
  },
  {
    id: 2,
    title: 'Reunión de copropietarios',
    date: '20 de abril, 2026',
    body: 'Asamblea ordinaria de copropietarios en el salón comunal a las 6pm.',
    type: 'info',
  },
];

export default function ResidentDashboard() {
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {greeting}, {user?.firstName} 👋
        </h1>
        <p className="text-slate-500 mt-1">Aquí tienes un resumen de tu hogar</p>
      </div>

      {/* Unit info card */}
      {user?.unitId ? (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <p className="text-blue-200 text-sm">Mi unidad</p>
              <p className="font-bold text-xl">Unidad registrada</p>
              <p className="text-blue-200 text-sm mt-0.5">ID: {user.unitId.slice(0, 8)}…</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-semibold text-amber-900 text-sm">Sin unidad asignada</p>
            <p className="text-amber-700 text-xs mt-0.5">
              Contacta a tu administrador para obtener un código de acceso.
            </p>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="font-semibold text-slate-900 mb-4">Accesos rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', action.iconBg, action.color)}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900">{action.label}</p>
                <p className="text-sm text-slate-500 mt-0.5">{action.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div>
        <h2 className="font-semibold text-slate-900 mb-4">Anuncios recientes</h2>
        <div className="space-y-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className={cn(
                'bg-white border rounded-2xl p-5',
                a.type === 'warning' ? 'border-amber-200' : 'border-slate-200',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{a.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.date}</p>
                </div>
                <span className={cn(
                  'text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0',
                  a.type === 'warning'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-blue-100 text-blue-700',
                )}>
                  {a.type === 'warning' ? 'Aviso' : 'Info'}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
