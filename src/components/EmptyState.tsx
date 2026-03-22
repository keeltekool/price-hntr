import { useI18n } from "../lib/i18n";

export function EmptyState() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-4">
        search_off
      </span>
      <p className="text-base font-medium text-on-surface">{t("noResults")}</p>
      <p className="text-sm text-on-surface-variant mt-1">
        {t("noResultsHint")}
      </p>
    </div>
  );
}
