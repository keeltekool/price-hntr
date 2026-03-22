import type { Product } from "../lib/alkoholiks-sdk";
import { getLowestPrice, formatPrice, formatVolume } from "../lib/utils";
import { StoreBadge } from "./StoreBadge";

interface DealCardProps {
  product: Product;
}

export function DealCard({ product }: DealCardProps) {
  const lowestPrice = getLowestPrice(product);
  const volume = formatVolume(product);

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
        <h3 className="text-sm font-semibold text-on-surface truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <StoreBadge storeId={product.store} />
          {volume && (
            <span className="text-[11px] text-on-surface-variant">{volume}</span>
          )}
        </div>
        <div className="mt-2">
          <span className="text-base font-bold text-primary">
            {formatPrice(lowestPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
