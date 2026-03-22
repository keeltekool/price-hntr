import { useI18nState, I18nProvider } from "./lib/i18n";

function App() {
  const i18n = useI18nState();

  return (
    <I18nProvider value={i18n}>
      <div className="bg-surface text-on-surface min-h-screen p-4">
        <h1 className="text-primary font-bold text-xl">{i18n.t("appName")}</h1>
      </div>
    </I18nProvider>
  );
}

export default App;
