import { useRef } from "react";
import { useI18n } from "../lib/i18n";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  showBack?: boolean;
  onBack?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onFocus,
  showBack,
  onBack,
  autoFocus,
}: SearchBarProps) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative mb-6 flex items-center gap-2">
      {showBack && (
        <button
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-container-high transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-on-surface">
            arrow_back
          </span>
        </button>
      )}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
            search
          </span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          autoFocus={autoFocus}
          className="w-full h-12 pl-12 pr-10 bg-surface-container-highest border-none rounded-xl text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none"
          placeholder={t("searchPlaceholder")}
        />
        {value && (
          <button
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              close
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
