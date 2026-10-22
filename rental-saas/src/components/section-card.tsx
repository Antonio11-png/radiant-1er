import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}

export function SectionCard({
  title,
  description,
  action,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-white/50 bg-white p-6 shadow-sm shadow-slate-200">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
