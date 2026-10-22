import type {
  DashboardMetric,
  Lease,
  Payment,
  Property,
  Tenant,
} from "@/lib/types";

export const properties: Property[] = [
  {
    id: "prop-paris-rivoli",
    name: "Residence Rivoli",
    address: "12 rue de Rivoli",
    city: "Paris",
    type: "Immeuble",
    units: 12,
    occupiedUnits: 11,
    monthlyRevenue: 17650,
    owner: "SCI Horizon",
  },
  {
    id: "prop-lyon-terreaux",
    name: "Les Terreaux",
    address: "8 place des Terreaux",
    city: "Lyon",
    type: "Appartement",
    units: 6,
    occupiedUnits: 6,
    monthlyRevenue: 8920,
    owner: "Patrimoine Durand",
  },
  {
    id: "prop-lille-gare",
    name: "Villa Gare Lille",
    address: "24 rue de Tournai",
    city: "Lille",
    type: "Maison",
    units: 3,
    occupiedUnits: 2,
    monthlyRevenue: 3210,
    owner: "Invest Nord",
  },
];

export const tenants: Tenant[] = [
  {
    id: "tenant-alex-martin",
    fullName: "Alex Martin",
    email: "alex.martin@example.com",
    phone: "06 11 22 33 44",
    propertyId: "prop-paris-rivoli",
    unitLabel: "B12",
    monthlyRent: 1450,
    balance: 0,
    leaseEndDate: "2027-02-28",
    status: "A jour",
  },
  {
    id: "tenant-sarah-benali",
    fullName: "Sarah Benali",
    email: "sarah.benali@example.com",
    phone: "06 55 87 42 16",
    propertyId: "prop-lyon-terreaux",
    unitLabel: "A03",
    monthlyRent: 1320,
    balance: 0,
    leaseEndDate: "2026-12-31",
    status: "Depot recu",
  },
  {
    id: "tenant-ines-diallo",
    fullName: "Ines Diallo",
    email: "ines.diallo@example.com",
    phone: "07 69 88 10 10",
    propertyId: "prop-paris-rivoli",
    unitLabel: "C08",
    monthlyRent: 1590,
    balance: 620,
    leaseEndDate: "2026-11-30",
    status: "Relance",
  },
  {
    id: "tenant-luc-moreau",
    fullName: "Luc Moreau",
    email: "luc.moreau@example.com",
    phone: "06 02 03 04 05",
    propertyId: "prop-lille-gare",
    unitLabel: "Maison 2",
    monthlyRent: 1180,
    balance: 0,
    leaseEndDate: "2027-06-30",
    status: "A jour",
  },
];

export const leases: Lease[] = [
  {
    id: "lease-rivoli-b12",
    propertyId: "prop-paris-rivoli",
    tenantId: "tenant-alex-martin",
    startDate: "2025-03-01",
    endDate: "2027-02-28",
    deposit: 2900,
    status: "active",
  },
  {
    id: "lease-terreaux-a03",
    propertyId: "prop-lyon-terreaux",
    tenantId: "tenant-sarah-benali",
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    deposit: 2640,
    status: "renewal",
  },
  {
    id: "lease-rivoli-c08",
    propertyId: "prop-paris-rivoli",
    tenantId: "tenant-ines-diallo",
    startDate: "2023-12-01",
    endDate: "2026-11-30",
    deposit: 3180,
    status: "renewal",
  },
  {
    id: "lease-lille-2",
    propertyId: "prop-lille-gare",
    tenantId: "tenant-luc-moreau",
    startDate: "2025-07-01",
    endDate: "2027-06-30",
    deposit: 2360,
    status: "active",
  },
];

export const payments: Payment[] = [
  {
    id: "pay-oct-alex",
    tenantId: "tenant-alex-martin",
    label: "Loyer octobre 2026",
    dueDate: "2026-10-05",
    amount: 1450,
    paidAmount: 1450,
    status: "paid",
    method: "Virement",
  },
  {
    id: "pay-oct-sarah",
    tenantId: "tenant-sarah-benali",
    label: "Loyer octobre 2026",
    dueDate: "2026-10-05",
    amount: 1320,
    paidAmount: 1320,
    status: "paid",
    method: "Prelevement",
  },
  {
    id: "pay-oct-ines",
    tenantId: "tenant-ines-diallo",
    label: "Loyer octobre 2026",
    dueDate: "2026-10-05",
    amount: 1590,
    paidAmount: 970,
    status: "late",
    method: "Carte",
  },
  {
    id: "pay-oct-luc",
    tenantId: "tenant-luc-moreau",
    label: "Loyer octobre 2026",
    dueDate: "2026-10-05",
    amount: 1180,
    paidAmount: 0,
    status: "pending",
    method: "Virement",
  },
];

const totalUnits = properties.reduce((sum, property) => sum + property.units, 0);
const occupiedUnits = properties.reduce(
  (sum, property) => sum + property.occupiedUnits,
  0,
);
const collected = payments.reduce((sum, payment) => sum + payment.paidAmount, 0);
const billed = payments.reduce((sum, payment) => sum + payment.amount, 0);
const lateAmount = payments
  .filter((payment) => payment.status === "late")
  .reduce((sum, payment) => sum + payment.amount - payment.paidAmount, 0);

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Encaissement du mois",
    value: `${Math.round((collected / billed) * 100)}%`,
    trend: `${collected.toLocaleString("fr-FR")} EUR collectes`,
    tone: "success",
  },
  {
    label: "Taux d'occupation",
    value: `${Math.round((occupiedUnits / totalUnits) * 100)}%`,
    trend: `${occupiedUnits}/${totalUnits} lots occupes`,
    tone: "default",
  },
  {
    label: "Impayes a relancer",
    value: `${lateAmount.toLocaleString("fr-FR")} EUR`,
    trend: "1 dossier prioritaire",
    tone: "warning",
  },
  {
    label: "Baux a renouveler",
    value: `${leases.filter((lease) => lease.status === "renewal").length}`,
    trend: "Dans les 90 prochains jours",
    tone: "default",
  },
];

export const recentActions = [
  "Quittance envoyee a Sarah Benali",
  "Relance automatique programmee pour Ines Diallo",
  "Appartement B12 marque comme paye",
  "Depot de garantie controle pour Les Terreaux",
];

export const upcomingTasks = [
  {
    title: "Verifier le dossier Ines Diallo",
    dueLabel: "Aujourd'hui",
  },
  {
    title: "Renouveler le bail A03",
    dueLabel: "Dans 3 jours",
  },
  {
    title: "Publier le lot libre a Lille",
    dueLabel: "Cette semaine",
  },
];

export function getPropertyById(propertyId: string) {
  return properties.find((property) => property.id === propertyId);
}

export function getTenantById(tenantId: string) {
  return tenants.find((tenant) => tenant.id === tenantId);
}
