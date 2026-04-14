'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import {
  Building2,
  Key,
  Users,
  TrendingUp,
  Plus,
  Copy,
  Check,
  AlertCircle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Unit {
  id: string;
  number: string;
  building: string;
  floor?: number;
}

interface InviteCode {
  id: string;
  code: string;
  isUsed: boolean;
  createdAt: string;
  unit: Unit;
  expiresAt?: string;
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center gap-5">
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', color)}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'p-1.5 rounded-lg transition-all',
        copied ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
      )}
      title="Copiar código"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [units, setUnits] = useState<Unit[]>([]);
  const [codes, setCodes] = useState<InviteCode[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Create unit modal state
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [unitForm, setUnitForm] = useState({ number: '', building: '', floor: '' });
  const [unitError, setUnitError] = useState('');
  const [unitLoading, setUnitLoading] = useState(false);

  // Create code modal state
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const [u, c] = await Promise.all([
        api.get<Unit[]>('/units'),
        api.get<InviteCode[]>('/invite-codes/my-codes'),
      ]);
      setUnits(u);
      setCodes(c);
    } catch {
      // handled
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleCreateUnit(e: React.FormEvent) {
    e.preventDefault();
    setUnitError('');
    setUnitLoading(true);
    try {
      await api.post('/units', {
        number: unitForm.number,
        building: unitForm.building,
        floor: unitForm.floor ? parseInt(unitForm.floor) : undefined,
      });
      setShowUnitModal(false);
      setUnitForm({ number: '', building: '', floor: '' });
      await loadData();
    } catch (err: unknown) {
      setUnitError(err instanceof Error ? err.message : 'Error al crear unidad');
    } finally {
      setUnitLoading(false);
    }
  }

  async function handleCreateCode(e: React.FormEvent) {
    e.preventDefault();
    setCodeError('');
    setCodeLoading(true);
    try {
      await api.post('/invite-codes', { unitId: selectedUnitId });
      setShowCodeModal(false);
      setSelectedUnitId('');
      await loadData();
    } catch (err: unknown) {
      setCodeError(err instanceof Error ? err.message : 'Error al crear código');
    } finally {
      setCodeLoading(false);
    }
  }

  const activeCodes = codes.filter((c) => !c.isUsed);
  const usedCodes = codes.filter((c) => c.isUsed);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Bienvenido, {user?.firstName} 👋
        </h1>
        <p className="text-slate-500 mt-1">Panel de administración – Residex</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Unidades registradas"
          value={isLoadingData ? '—' : units.length}
          icon={<Building2 className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Códigos activos"
          value={isLoadingData ? '—' : activeCodes.length}
          icon={<Key className="w-6 h-6 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          title="Códigos usados"
          value={isLoadingData ? '—' : usedCodes.length}
          icon={<Users className="w-6 h-6 text-violet-600" />}
          color="bg-violet-50"
        />
        <StatCard
          title="Total códigos"
          value={isLoadingData ? '—' : codes.length}
          icon={<TrendingUp className="w-6 h-6 text-amber-600" />}
          color="bg-amber-50"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Units card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <h2 className="font-semibold text-slate-900">Unidades</h2>
              <p className="text-sm text-slate-500 mt-0.5">Gestiona las unidades del conjunto</p>
            </div>
            <button
              onClick={() => setShowUnitModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nueva
            </button>
          </div>
          <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
            {isLoadingData ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : units.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Building2 className="w-10 h-10 mb-2 opacity-40" />
                <p className="text-sm">No hay unidades registradas</p>
              </div>
            ) : (
              units.map((unit) => (
                <div key={unit.id} className="flex items-center px-6 py-4 gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm">
                      Unidad {unit.number}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {unit.building}{unit.floor ? ` · Piso ${unit.floor}` : ''}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Invite codes card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <h2 className="font-semibold text-slate-900">Códigos de acceso</h2>
              <p className="text-sm text-slate-500 mt-0.5">Genera códigos para tus residentes</p>
            </div>
            <button
              onClick={() => setShowCodeModal(true)}
              disabled={units.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Generar
            </button>
          </div>
          <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
            {isLoadingData ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : codes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Key className="w-10 h-10 mb-2 opacity-40" />
                <p className="text-sm">No hay códigos generados</p>
              </div>
            ) : (
              codes.map((c) => (
                <div key={c.id} className="flex items-center px-6 py-4 gap-4">
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
                    c.isUsed ? 'bg-slate-100' : 'bg-emerald-50',
                  )}>
                    <Key className={cn('w-4 h-4', c.isUsed ? 'text-slate-400' : 'text-emerald-600')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-mono font-semibold text-slate-900 text-sm tracking-wider">
                        {c.code}
                      </p>
                      {!c.isUsed && <CopyButton text={c.code} />}
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      Unidad {c.unit?.number} · {c.unit?.building}
                    </p>
                  </div>
                  <span className={cn(
                    'text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0',
                    c.isUsed
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-emerald-100 text-emerald-700',
                  )}>
                    {c.isUsed ? 'Usado' : 'Activo'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Unit Modal */}
      {showUnitModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Nueva unidad</h3>
              <button onClick={() => setShowUnitModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateUnit} className="p-6 space-y-4">
              {unitError && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl p-3 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {unitError}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Número de unidad</label>
                <input
                  type="text"
                  required
                  value={unitForm.number}
                  onChange={(e) => setUnitForm((p) => ({ ...p, number: e.target.value }))}
                  placeholder="101, 201-A, etc."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Torre / Bloque</label>
                <input
                  type="text"
                  required
                  value={unitForm.building}
                  onChange={(e) => setUnitForm((p) => ({ ...p, building: e.target.value }))}
                  placeholder="Torre A, Bloque 1, etc."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Piso <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <input
                  type="number"
                  value={unitForm.floor}
                  onChange={(e) => setUnitForm((p) => ({ ...p, floor: e.target.value }))}
                  placeholder="3"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUnitModal(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={unitLoading}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {unitLoading ? 'Creando...' : 'Crear unidad'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Generar código de acceso</h3>
              <button onClick={() => setShowCodeModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCode} className="p-6 space-y-4">
              {codeError && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl p-3 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {codeError}
                </div>
              )}
              <p className="text-sm text-slate-500">
                Se generará un código único de 8 caracteres. Compártelo con el residente para que pueda registrarse.
              </p>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Selecciona la unidad</label>
                <select
                  required
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                >
                  <option value="">-- Elige una unidad --</option>
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      Unidad {u.number} · {u.building}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCodeModal(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={codeLoading}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60"
                >
                  {codeLoading ? 'Generando...' : 'Generar código'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
