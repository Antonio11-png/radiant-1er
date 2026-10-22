import type { DashboardMetric } from "@/lib/types";

const toneClasses: Record<DashboardMetric["tone"], string> = {
  default: "bg-slate-950 text-white",
  success: "bg-emerald-600 text-white",
  warning: "bg-amber-500 text-slate-950",
};

export function StatCard({ label, value, trend, tone }: DashboardMetric) {
  return (
    <article className="rounded-3xl border border-white/50 bg-white p-6 shadow-sm shadow-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}
        >
          KPI
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-600">{trend}</p>
    </article>
  );
}
