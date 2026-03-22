import type { Product } from "./alkoholiks-sdk";

export function getLowestPrice(product: Product): number {
  const prices = [product.regularPrice];
  if (product.cardPrice !== null) prices.push(product.cardPrice);
  if (product.campaignPrice !== null) prices.push(product.campaignPrice);
  return Math.min(...prices);
}

export function getDiscountPercent(product: Product): number {
  const lowest = getLowestPrice(product);
  if (lowest >= product.regularPrice) return 0;
  return Math.round(((product.regularPrice - lowest) / product.regularPrice) * 100);
}

export function formatPrice(price: number): string {
  return price.toFixed(2) + " \u20ac";
}

export function formatUnitPrice(price: number | null): string | null {
  if (price === null) return null;
  return price.toFixed(2) + " \u20ac/L";
}
