import { formatCurrency } from "@/lib/utils/helpers";

export function perInstallment(price: number): number {
  return price / 3;
}

export function formatKokoInstallment(price: number): string {
  const installment = perInstallment(price);
  const formatted = installment.toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `or 3 × රු${formatted} with Koko`;
}

export function formatKokoPrice(price: number): string {
  return `${formatCurrency(price, "LKR")} / 3 months`;
}
