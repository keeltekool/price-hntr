import type { StoreId } from "../lib/alkoholiks-sdk";
import { STORES } from "../constants/stores";

interface StoreBadgeProps {
  storeId: StoreId;
}

export function StoreBadge({ storeId }: StoreBadgeProps) {
  const store = STORES[storeId];

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: store.color }}
      />
      <span className="text-[11px] font-medium text-on-surface-variant">
        {store.name}
      </span>
    </div>
  );
}
