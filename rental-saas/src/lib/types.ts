export type PaymentStatus = "paid" | "pending" | "late";
export type LeaseStatus = "active" | "renewal" | "ended";

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  type: "Appartement" | "Immeuble" | "Maison";
  units: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  owner: string;
}

export interface Tenant {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  propertyId: string;
  unitLabel: string;
  monthlyRent: number;
  balance: number;
  leaseEndDate: string;
  status: "A jour" | "Relance" | "Depot recu";
}

export interface Lease {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  deposit: number;
  status: LeaseStatus;
}

export interface Payment {
  id: string;
  tenantId: string;
  label: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: PaymentStatus;
  method: "Virement" | "Carte" | "Prelevement";
}

export interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
  tone: "default" | "success" | "warning";
}
