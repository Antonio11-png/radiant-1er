"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Tableau de bord" },
  { href: "/biens", label: "Biens" },
  { href: "/locataires", label: "Locataires" },
  { href: "/paiements", label: "Paiements" },
];

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_transparent_35%),linear-gradient(180deg,_#f8fafc,_#eef2ff)] text-slate-950">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[260px_1fr] lg:px-6">
        <aside className="rounded-[2rem] border border-white/60 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
              RentFlow
            </p>
            <h1 className="mt-3 text-2xl font-semibold">Gestion locative</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              MVP SaaS pour piloter vos biens, vos locataires et vos encaissements.
            </p>
          </div>

          <nav className="mt-8 space-y-2">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-white text-slate-950"
                      : "text-slate-200 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-3xl bg-slate-900 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Cible MVP
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>Biens et lots</li>
              <li>Locataires et baux</li>
              <li>Loyers et retards</li>
            </ul>
          </div>
        </aside>

        <main className="flex flex-col rounded-[2rem] border border-white/60 bg-white/65 p-5 shadow-xl shadow-slate-200 backdrop-blur lg:p-8">
          <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-sky-700">Vue bailleur</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight">
                Pilotage du portefeuille locatif
              </h2>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              21 lots, 19 occupes, suivi temps reel pret pour Supabase
            </div>
          </header>

          <div className="mt-6 flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
