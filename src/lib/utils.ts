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

// --- Size bucketing ---

export type SizeBucket = "small" | "regular" | "multipack";

const MULTIPACK_PATTERN = /\d+\s*[x*]\s*\d+/i;

export function getSizeBucket(product: Product): SizeBucket {
  // Check multipack first — name pattern takes priority
  if (MULTIPACK_PATTERN.test(product.name) || MULTIPACK_PATTERN.test(product.volume)) {
    return "multipack";
  }
  if (product.volumeML !== null && product.volumeML >= 1000) {
    return "multipack";
  }
  if (product.volumeML !== null && product.volumeML >= 400) {
    return "regular";
  }
  // Default: small (covers 200-399ml, or unknown volume)
  return "small";
}

export function formatVolume(product: Product): string {
  if (product.volume) return product.volume;
  if (product.volumeML !== null) {
    return product.volumeML >= 1000
      ? (product.volumeML / 1000).toFixed(1) + "L"
      : product.volumeML + "ml";
  }
  return "";
}
