import type { LeaseStatus, PaymentStatus } from "@/lib/types";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function paymentStatusLabel(status: PaymentStatus) {
  switch (status) {
    case "paid":
      return "Paye";
    case "pending":
      return "En attente";
    case "late":
      return "En retard";
  }
}

export function leaseStatusLabel(status: LeaseStatus) {
  switch (status) {
    case "active":
      return "Actif";
    case "renewal":
      return "Renouvellement";
    case "ended":
      return "Termine";
  }
}

export function badgeTone(
  status: PaymentStatus | LeaseStatus | "A jour" | "Relance" | "Depot recu",
) {
  switch (status) {
    case "paid":
    case "active":
    case "A jour":
      return "bg-emerald-100 text-emerald-700 ring-emerald-200";
    case "pending":
    case "renewal":
    case "Depot recu":
      return "bg-sky-100 text-sky-700 ring-sky-200";
    case "late":
    case "Relance":
      return "bg-amber-100 text-amber-700 ring-amber-200";
    case "ended":
      return "bg-zinc-100 text-zinc-700 ring-zinc-200";
  }
}
