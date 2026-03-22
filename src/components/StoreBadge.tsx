import type { StoreId } from "../lib/alkoholiks-sdk";
import { STORES } from "../constants/stores";

interface StoreBadgeProps {
  storeId: StoreId;
}

export function StoreBadge({ storeId }: StoreBadgeProps) {
  const store = STORES[storeId];

  return (
    <div className="flex items-center gap-1.5">
      <img
        src={store.logoPath}
        alt={store.name}
        className="w-4 h-4 flex-shrink-0"
      />
      <span className="text-[11px] font-medium text-on-surface-variant">
        {store.name}
      </span>
    </div>
  );
}
