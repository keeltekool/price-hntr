import type { StoreId } from "../lib/alkoholiks-sdk";
import { STORES, STORE_ORDER } from "../constants/stores";

interface StoreChipsProps {
  selected: StoreId | null;
  onSelect: (storeId: StoreId | null) => void;
}

export function StoreChips({ selected, onSelect }: StoreChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-2">
      {STORE_ORDER.map((id) => {
        const store = STORES[id];
        const isActive = selected === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(isActive ? null : id)}
            className={`flex-none flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "text-white"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            }`}
            style={isActive ? { backgroundColor: store.color } : undefined}
          >
            <img src={store.logoPath} alt="" className="w-4 h-4" />
            {store.name}
          </button>
        );
      })}
    </div>
  );
}
