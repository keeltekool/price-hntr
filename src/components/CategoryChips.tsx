import type { Category } from "../lib/alkoholiks-sdk";
import { useI18n } from "../lib/i18n";

interface CategoryChipsProps {
  categories: Category[];
  selected: string;
  onSelect: (categoryId: string) => void;
  showAll?: boolean;
}

export function CategoryChips({
  categories,
  selected,
  onSelect,
  showAll,
}: CategoryChipsProps) {
  const { lang, t } = useI18n();

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-4">
      {showAll && (
        <button
          onClick={() => onSelect("")}
          className={`flex-none px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === ""
              ? "bg-on-surface text-surface"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          {t("all" as any)}
        </button>
      )}
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex-none px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            selected === cat.id
              ? "bg-on-surface text-surface"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          {lang === "et" ? cat.name : cat.name_en}
        </button>
      ))}
    </div>
  );
}
