import type { Product } from "../lib/alkoholiks-sdk";
import { getLowestPrice, formatPrice, getDiscountPercent } from "../lib/utils";
import { StoreBadge } from "./StoreBadge";
import { DiscountBadge } from "./DiscountBadge";
import { useI18n } from "../lib/i18n";

interface ComparisonCardProps {
  product: Product;
  isCheapest: boolean;
}

export function ComparisonCard({ product, isCheapest }: ComparisonCardProps) {
  const { t } = useI18n();
  const lowestPrice = getLowestPrice(product);
  const discountPercent = getDiscountPercent(product);
  const hasDiscount = discountPercent > 0;

  return (
    <div
      className={`bg-surface-container-lowest p-3 rounded-xl border flex gap-4 items-center active:scale-[0.97] transition-transform ${
        isCheapest
          ? "border-primary-fixed bg-primary-fixed/10"
          : "border-outline-variant/20"
      }`}
    >
      <div className="w-14 h-14 rounded-lg bg-surface-container-low flex-shrink-0 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30">
            <span className="material-symbols-outlined text-[24px]">
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
          {hasDiscount && <DiscountBadge percent={discountPercent} />}
        </div>
        <div className="flex items-baseline gap-2 mt-1.5">
          <span
            className={`text-base font-bold ${isCheapest ? "text-primary" : "text-on-surface"}`}
          >
            {formatPrice(lowestPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-on-surface-variant line-through decoration-error/30">
              {formatPrice(product.regularPrice)}
            </span>
          )}
          {isCheapest && (
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed uppercase tracking-wider">
              {t("cheapest")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
