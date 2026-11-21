import type { Inquiry, Quotation } from "@/types";

const INQUIRY_KEY = "smart-apparel-inquiries";
const QUOTATION_KEY = "smart-apparel-quotations";

export function createReference(prefix: "INQ" | "QT") {
  const stamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}

export function getInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(INQUIRY_KEY) || "[]") as Inquiry[]; }
  catch { return []; }
}

export function saveInquiry(inquiry: Inquiry) {
  const items = getInquiries();
  localStorage.setItem(INQUIRY_KEY, JSON.stringify([inquiry, ...items]));
}

export function getQuotations(): Quotation[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(QUOTATION_KEY) || "[]") as Quotation[]; }
  catch { return []; }
}

export function saveQuotation(quotation: Quotation) {
  const items = getQuotations();
  localStorage.setItem(QUOTATION_KEY, JSON.stringify([quotation, ...items]));
}
