import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import {
  dashboardMetrics,
  getPropertyById,
  getTenantById,
  payments,
  properties,
  recentActions,
  upcomingTasks,
} from "@/lib/mock-data";
import { hasSupabaseEnv } from "@/lib/supabase";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function Home() {
  const latePayments = payments.filter((payment) => payment.status !== "paid");

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
              Tableau de bord
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Centralise ta gestion de location dans une seule interface.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Ce MVP affiche un portefeuille, les locataires, les baux et les
              encaissements avec des donnees de demonstration prêtes a etre
              remplacees par Supabase.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
            <p className="text-sm text-slate-300">Mode de donnees</p>
            <p className="mt-2 text-2xl font-semibold">
              {hasSupabaseEnv() ? "Supabase connecte" : "Demo locale"}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {hasSupabaseEnv()
                ? "Variables d'environnement detectees."
                : "Ajoute les cles Supabase pour brancher la base reelle."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <SectionCard
          title="Portefeuille immobilier"
          description="Synthese par bien et performance mensuelle."
          action={
            <a
              href="/biens"
              className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Voir tous les biens
            </a>
          }
        >
          <div className="space-y-4">
            {properties.map((property) => (
              <article
                key={property.id}
                className="grid gap-4 rounded-3xl border border-slate-200 p-5 lg:grid-cols-[1fr_auto_auto]"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {property.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {property.address}, {property.city}
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    {property.type} gere par {property.owner}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Occupation</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    {property.occupiedUnits}/{property.units}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Loyer mensuel</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    {formatCurrency(property.monthlyRevenue)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Actions a suivre"
          description="Taches prioritaires sur les prochains jours."
        >
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="font-medium text-slate-950">{task.title}</p>
                <p className="mt-1 text-sm text-slate-500">{task.dueLabel}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-3xl bg-amber-50 p-4 text-sm text-amber-900">
            1 impaye partiel detecte, une relance doit partir automatiquement.
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <SectionCard
          title="Loyers a surveiller"
          description="Paiements en attente ou en retard."
          action={
            <a
              href="/paiements"
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Ouvrir le suivi
            </a>
          }
        >
          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Locataire</th>
                  <th className="px-4 py-3 font-medium">Echeance</th>
                  <th className="px-4 py-3 font-medium">Montant</th>
                  <th className="px-4 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {latePayments.map((payment) => {
                  const tenant = getTenantById(payment.tenantId);
                  return (
                    <tr key={payment.id}>
                      <td className="px-4 py-3 font-medium text-slate-950">
                        {tenant?.fullName}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatDate(payment.dueDate)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatCurrency(payment.amount - payment.paidAmount)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge paymentStatus={payment.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard
          title="Activite recente"
          description="Evenements a tracer dans le produit."
        >
          <div className="space-y-3">
            {recentActions.map((action) => (
              <div
                key={action}
                className="flex items-start gap-3 rounded-3xl border border-slate-200 p-4"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                <p className="text-sm text-slate-700">{action}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Vue locataires"
        description="Etat des contrats et suivi des soldes."
        action={
          <a
            href="/locataires"
            className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Gerer les locataires
          </a>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {payments.slice(0, 2).map((payment) => {
            const tenant = getTenantById(payment.tenantId);
            const property = tenant ? getPropertyById(tenant.propertyId) : null;

            return (
              <article
                key={payment.id}
                className="rounded-3xl border border-slate-200 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {tenant?.fullName}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {property?.name} - {tenant?.unitLabel}
                    </p>
                  </div>
                  <StatusBadge label={tenant?.status} />
                </div>
                <dl className="mt-4 grid gap-3 text-sm text-slate-600">
                  <div className="flex justify-between gap-4">
                    <dt>Loyer</dt>
                    <dd className="font-medium text-slate-950">
                      {tenant ? formatCurrency(tenant.monthlyRent) : "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Prochaine echeance</dt>
                    <dd className="font-medium text-slate-950">
                      {formatDate(payment.dueDate)}
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
