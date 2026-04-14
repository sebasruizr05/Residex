'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  Key,
  AlertCircle,
  ShieldCheck,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = 'admin' | 'resident';

export default function RegisterPage() {
  const { register } = useAuth();
  const [role, setRole] = useState<Role>('resident');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    inviteCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register({
        ...form,
        role,
        inviteCode: role === 'resident' ? form.inviteCode : undefined,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 bg-white/5 rounded-full" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={2}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight">Residex</span>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Únete a tu<br />comunidad
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
              Regístrate como administrador para gestionar tu conjunto, o como residente con el código de tu unidad.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5" />,
                title: 'Administrador',
                desc: 'Gestiona unidades, crea códigos de acceso y controla tu conjunto.',
              },
              {
                icon: <Home className="w-5 h-5" />,
                title: 'Residente',
                desc: 'Usa el código de tu unidad para acceder a todos los servicios.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-blue-200 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-blue-200 text-sm">
          © 2026 Residex. Todos los derechos reservados.
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-start justify-center p-6 sm:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2}>
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-800">Residex</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Crear cuenta</h2>
            <p className="text-slate-500 mt-1">Completa tu información para comenzar</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-slate-100 rounded-xl">
            {(['resident', 'admin'] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  'flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all',
                  role === r
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700',
                )}
              >
                {r === 'admin' ? (
                  <ShieldCheck className="w-4 h-4" />
                ) : (
                  <Home className="w-4 h-4" />
                )}
                {r === 'admin' ? 'Administrador' : 'Residente'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700" htmlFor="firstName">
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Juan"
                    className={cn(
                      'w-full pl-10 pr-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400',
                      'bg-slate-50 focus:bg-white outline-none transition-all',
                      'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
                    )}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700" htmlFor="lastName">
                  Apellido
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="García"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400',
                    'bg-slate-50 focus:bg-white outline-none transition-all',
                    'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
                  )}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400',
                    'bg-slate-50 focus:bg-white outline-none transition-all',
                    'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
                  )}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700" htmlFor="phone">
                Teléfono <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+57 300 000 0000"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400',
                    'bg-slate-50 focus:bg-white outline-none transition-all',
                    'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
                  )}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mín. 6 caracteres"
                  className={cn(
                    'w-full pl-10 pr-12 py-3 rounded-xl border text-slate-900 placeholder-slate-400',
                    'bg-slate-50 focus:bg-white outline-none transition-all',
                    'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Invite code – only for residents */}
            {role === 'resident' && (
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700" htmlFor="inviteCode">
                  Código de invitación
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="inviteCode"
                    name="inviteCode"
                    type="text"
                    required
                    value={form.inviteCode}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        inviteCode: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="Ej: A3F9B2C1"
                    maxLength={8}
                    className={cn(
                      'w-full pl-10 pr-4 py-3 rounded-xl border text-slate-900 placeholder-slate-400 tracking-widest font-mono',
                      'bg-slate-50 focus:bg-white outline-none transition-all',
                      'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
                    )}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  El código te lo proporciona el administrador de tu conjunto.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full py-3 px-4 rounded-xl font-semibold text-white transition-all mt-2',
                'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]',
                'focus:outline-none focus:ring-4 focus:ring-blue-500/30',
                'disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
              )}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creando cuenta...
                </span>
              ) : (
                'Crear cuenta'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
