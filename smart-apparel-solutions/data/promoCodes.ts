
export interface PromoCodeResult {
  valid: boolean;
  code: string;
  discount: number;
  message: string;
}

const PROMO_CODES = {
  SAS10: {
    type: "percentage",
    value: 10,
  },
  SAS500: {
    type: "fixed",
    value: 500,
  },
} as const;

export function validatePromoCode(
  input: string,
  subtotal: number
): PromoCodeResult {
  const code = input.trim().toUpperCase();

  if (!code) {
    return {
      valid: false,
      code: "",
      discount: 0,
      message: "Please enter a promo code.",
    };
  }

  if (subtotal <= 0) {
    return {
      valid: false,
      code,
      discount: 0,
      message: "Your cart subtotal must be greater than zero.",
    };
  }

  const promo = PROMO_CODES[code as keyof typeof PROMO_CODES];

  if (!promo) {
    return {
      valid: false,
      code,
      discount: 0,
      message: "This promo code is invalid.",
    };
  }

  const calculatedDiscount =
    promo.type === "percentage"
      ? Math.round((subtotal * promo.value) / 100)
      : promo.value;

  const discount = Math.min(calculatedDiscount, subtotal);

  return {
    valid: true,
    code,
    discount,
    message: `Promo code ${code} applied successfully!`,
  };
}
