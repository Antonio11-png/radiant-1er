import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getPropertyById, tenants } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function TenantsPage() {
  const balanceTotal = tenants.reduce((sum, tenant) => sum + tenant.balance, 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-white/50 bg-white p-6 shadow-sm shadow-slate-200">
          <p className="text-sm text-slate-500">Locataires actifs</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">
            {tenants.length}
          </p>
        </article>
        <article className="rounded-3xl border border-white/50 bg-white p-6 shadow-sm shadow-slate-200">
          <p className="text-sm text-slate-500">Solde a recouvrer</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">
            {formatCurrency(balanceTotal)}
          </p>
        </article>
        <article className="rounded-3xl border border-white/50 bg-white p-6 shadow-sm shadow-slate-200">
          <p className="text-sm text-slate-500">Fin de bail proche</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">2</p>
        </article>
      </section>

      <SectionCard
        title="Annuaire locataires"
        description="Coordonnees, statut de paiement et date de fin de bail."
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Locataire</th>
                <th className="px-4 py-3 font-medium">Logement</th>
                <th className="px-4 py-3 font-medium">Loyer</th>
                <th className="px-4 py-3 font-medium">Solde</th>
                <th className="px-4 py-3 font-medium">Fin de bail</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {tenants.map((tenant) => {
                const property = getPropertyById(tenant.propertyId);

                return (
                  <tr key={tenant.id}>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-950">
                          {tenant.fullName}
                        </p>
                        <p className="text-slate-500">{tenant.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {property?.name} - {tenant.unitLabel}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatCurrency(tenant.monthlyRent)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatCurrency(tenant.balance)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(tenant.leaseEndDate)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge label={tenant.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        title="Dossiers sensibles"
        description="Bloc utile pour relances, pieces et prochaines actions."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {tenants
            .filter((tenant) => tenant.balance > 0 || tenant.status === "Relance")
            .map((tenant) => (
              <article
                key={tenant.id}
                className="rounded-3xl border border-slate-200 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      {tenant.fullName}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">{tenant.phone}</p>
                  </div>
                  <StatusBadge label={tenant.status} />
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Solde a relancer:{" "}
                  <span className="font-semibold text-slate-950">
                    {formatCurrency(tenant.balance)}
                  </span>
                </p>
              </article>
            ))}
        </div>
      </SectionCard>
    </div>
  );
}
