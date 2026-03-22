import { useState, useEffect } from "react";
import type { Category } from "./lib/alkoholiks-sdk";
import { api } from "./lib/api";
import { useI18nState, I18nProvider } from "./lib/i18n";
import { TopBar } from "./components/TopBar";
import { BottomNav } from "./components/BottomNav";
import { DealsView } from "./views/DealsView";
import { SearchView } from "./views/SearchView";

type Tab = "deals" | "search";

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>("deals");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.getCategories().then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="bg-surface min-h-screen pb-20">
      <TopBar />
      <main className="px-4 mt-4 max-w-md mx-auto">
        {activeTab === "deals" ? (
          <DealsView
            onSearchFocus={() => setActiveTab("search")}
            categories={categories}
          />
        ) : (
          <SearchView
            onBack={() => setActiveTab("deals")}
            categories={categories}
          />
        )}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

function App() {
  const i18n = useI18nState();

  return (
    <I18nProvider value={i18n}>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
