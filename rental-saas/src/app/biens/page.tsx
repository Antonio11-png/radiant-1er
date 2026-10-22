import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getPropertyById, getTenantById, leases, properties } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Biens et lots"
        description="Vision portefeuille avec occupation, revenus et propriete."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {properties.map((property) => {
            const occupancyRate = Math.round(
              (property.occupiedUnits / property.units) * 100,
            );

            return (
              <article
                key={property.id}
                className="rounded-3xl border border-slate-200 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      {property.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {property.address}, {property.city}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                    {property.type}
                  </span>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-500">Occupation</dt>
                    <dd className="font-semibold text-slate-950">
                      {property.occupiedUnits}/{property.units} lots
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-500">Taux d&apos;occupation</dt>
                    <dd className="font-semibold text-slate-950">
                      {occupancyRate}%
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-500">Revenu mensuel</dt>
                    <dd className="font-semibold text-slate-950">
                      {formatCurrency(property.monthlyRevenue)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-500">Proprietaire</dt>
                    <dd className="font-semibold text-slate-950">
                      {property.owner}
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard
        title="Baux en cours"
        description="Chaque bail peut ensuite etre synchronise avec Supabase et les quittances."
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Bien</th>
                <th className="px-4 py-3 font-medium">Locataire</th>
                <th className="px-4 py-3 font-medium">Periode</th>
                <th className="px-4 py-3 font-medium">Depot</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {leases.map((lease) => {
                const property = getPropertyById(lease.propertyId);
                const tenant = getTenantById(lease.tenantId);

                return (
                  <tr key={lease.id}>
                    <td className="px-4 py-3 font-medium text-slate-950">
                      {property?.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {tenant?.fullName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(lease.startDate)} - {formatDate(lease.endDate)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatCurrency(lease.deposit)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge leaseStatus={lease.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
