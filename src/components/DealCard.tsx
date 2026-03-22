import type { Product } from "../lib/alkoholiks-sdk";
import { getLowestPrice, getDiscountPercent, formatPrice } from "../lib/utils";
import { StoreBadge } from "./StoreBadge";
import { DiscountBadge } from "./DiscountBadge";

interface DealCardProps {
  product: Product;
}

export function DealCard({ product }: DealCardProps) {
  const lowestPrice = getLowestPrice(product);
  const discountPercent = getDiscountPercent(product);
  const hasDiscount = discountPercent > 0;

  return (
    <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20 flex gap-4 items-center active:scale-[0.97] transition-transform">
      <div className="w-16 h-16 rounded-lg bg-surface-container-low flex-shrink-0 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30">
            <span className="material-symbols-outlined text-[28px]">
              local_drink
            </span>
          </div>
        )}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-on-surface truncate pr-2">
            {product.name}
          </h3>
          {hasDiscount && <DiscountBadge percent={discountPercent} />}
        </div>
        <div className="mt-1">
          <StoreBadge storeId={product.store} />
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base font-bold text-primary">
            {formatPrice(lowestPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-on-surface-variant line-through decoration-error/30">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
