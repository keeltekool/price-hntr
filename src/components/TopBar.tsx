import { useI18n } from "../lib/i18n";

export function TopBar() {
  const { lang, toggleLang, t } = useI18n();

  return (
    <header className="bg-surface/80 backdrop-blur-[20px] sticky top-0 z-50 flex justify-between items-center w-full px-4 h-14">
      <div className="flex items-center gap-2">
        <span
          className="material-symbols-outlined text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          payments
        </span>
        <h1 className="text-base font-semibold text-on-surface">
          {t("appName")}
        </h1>
      </div>
      <button
        onClick={toggleLang}
        className="text-sm font-medium text-on-surface-variant hover:opacity-80 transition-opacity"
      >
        {lang === "en" ? "EN | ET" : "ET | EN"}
      </button>
    </header>
  );
}
