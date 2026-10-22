import { badgeTone, leaseStatusLabel, paymentStatusLabel } from "@/lib/utils";
import type { LeaseStatus, PaymentStatus } from "@/lib/types";

type BadgeLabel = "A jour" | "Relance" | "Depot recu";

interface StatusBadgeProps {
  label?: BadgeLabel;
  paymentStatus?: PaymentStatus;
  leaseStatus?: LeaseStatus;
}

export function StatusBadge({
  label,
  paymentStatus,
  leaseStatus,
}: StatusBadgeProps) {
  const computedLabel =
    label ??
    (paymentStatus
      ? paymentStatusLabel(paymentStatus)
      : leaseStatusLabel(leaseStatus ?? "active"));
  const tone = badgeTone(label ?? paymentStatus ?? leaseStatus ?? "A jour");

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${tone}`}
    >
      {computedLabel}
    </span>
  );
}
