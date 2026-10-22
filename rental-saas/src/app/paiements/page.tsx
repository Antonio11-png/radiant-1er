import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getTenantById, payments } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PaymentsPage() {
  const paidTotal = payments.reduce((sum, payment) => sum + payment.paidAmount, 0);
  const billedTotal = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const outstanding = billedTotal - paidTotal;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-white/50 bg-white p-6 shadow-sm shadow-slate-200">
          <p className="text-sm text-slate-500">Facture ce mois</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">
            {formatCurrency(billedTotal)}
          </p>
        </article>
        <article className="rounded-3xl border border-white/50 bg-white p-6 shadow-sm shadow-slate-200">
          <p className="text-sm text-slate-500">Encaisse</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">
            {formatCurrency(paidTotal)}
          </p>
        </article>
        <article className="rounded-3xl border border-white/50 bg-white p-6 shadow-sm shadow-slate-200">
          <p className="text-sm text-slate-500">Reste a recevoir</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">
            {formatCurrency(outstanding)}
          </p>
        </article>
      </section>

      <SectionCard
        title="Journal des paiements"
        description="Base du module de quittances, rapprochement bancaire et relances."
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Locataire</th>
                <th className="px-4 py-3 font-medium">Echeance</th>
                <th className="px-4 py-3 font-medium">Mode</th>
                <th className="px-4 py-3 font-medium">Encaisse</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {payments.map((payment) => {
                const tenant = getTenantById(payment.tenantId);

                return (
                  <tr key={payment.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-950">{payment.label}</p>
                      <p className="text-slate-500">
                        {formatCurrency(payment.amount)}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {tenant?.fullName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(payment.dueDate)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{payment.method}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatCurrency(payment.paidAmount)}
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
        title="Regles metier a ajouter"
        description="Prochaines etapes produit pour aller au-dela du MVP."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Relances automatiques J+3 et J+7",
            "Generation PDF des quittances",
            "Rapprochement bancaire semi-automatique",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
