import { useI18n } from "../lib/i18n";

type Tab = "deals" | "search";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t } = useI18n();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-[20px] flex justify-around items-center h-16 pb-safe z-50 border-t border-outline-variant/20">
      <button
        onClick={() => onTabChange("deals")}
        className={`flex flex-col items-center justify-center pt-1 transition-all duration-200 ${
          activeTab === "deals"
            ? "text-primary border-t-2 border-primary scale-105"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        <span
          className="material-symbols-outlined"
          style={
            activeTab === "deals"
              ? { fontVariationSettings: "'FILL' 1" }
              : undefined
          }
        >
          local_fire_department
        </span>
        <span className="text-[11px] font-medium mt-0.5">{t("deals")}</span>
      </button>
      <button
        onClick={() => onTabChange("search")}
        className={`flex flex-col items-center justify-center pt-1 transition-all duration-200 ${
          activeTab === "search"
            ? "text-primary border-t-2 border-primary scale-105"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        <span
          className="material-symbols-outlined"
          style={
            activeTab === "search"
              ? { fontVariationSettings: "'FILL' 1" }
              : undefined
          }
        >
          search
        </span>
        <span className="text-[11px] font-medium mt-0.5">{t("search")}</span>
      </button>
    </nav>
  );
}
