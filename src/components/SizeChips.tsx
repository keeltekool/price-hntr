import type { SizeBucket } from "../lib/utils";
import { useI18n } from "../lib/i18n";

interface SizeChipsProps {
  selected: SizeBucket;
  onSelect: (size: SizeBucket) => void;
}

const SIZES: SizeBucket[] = ["small", "regular", "multipack"];

const SIZE_KEYS: Record<SizeBucket, string> = {
  small: "sizeSmall",
  regular: "sizeRegular",
  multipack: "sizeMultipack",
};

export function SizeChips({ selected, onSelect }: SizeChipsProps) {
  const { t } = useI18n();

  return (
    <div className="flex gap-2 pb-4 mb-4">
      {SIZES.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`flex-none px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === size
              ? "bg-on-surface text-surface"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          {t(SIZE_KEYS[size] as any)}
        </button>
      ))}
    </div>
  );
}
