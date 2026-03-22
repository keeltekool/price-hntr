import { useState, useEffect, useRef, useCallback } from "react";
import type { Product, Category } from "../lib/alkoholiks-sdk";
import { api } from "../lib/api";
import { getLowestPrice } from "../lib/utils";
import { useI18n } from "../lib/i18n";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { ComparisonCard } from "../components/ComparisonCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { EmptyState } from "../components/EmptyState";
import { ErrorBanner } from "../components/ErrorBanner";

interface SearchViewProps {
  onBack: () => void;
  categories: Category[];
}

export function SearchView({ onBack, categories }: SearchViewProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const search = useCallback(
    async (q: string, category: string | null) => {
      if (q.length < 2) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const params: { category?: string; limit: number } = { limit: 100 };
        if (category) params.category = category;
        const res = await api.searchProducts(q, params);
        const sorted = res.data.sort(
          (a, b) => getLowestPrice(a) - getLowestPrice(b)
        );
        setResults(sorted);
        setHasSearched(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t("errorUnavailable"));
        }
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      search(query, selectedCategory);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, selectedCategory, search]);

  const cheapestPrice =
    results.length > 0 ? getLowestPrice(results[0]) : Infinity;

  return (
    <>
      {error && (
        <ErrorBanner message={error} onDismiss={() => setError(null)} />
      )}

      <SearchBar
        value={query}
        onChange={setQuery}
        showBack
        onBack={onBack}
        autoFocus
      />

      {hasSearched && (
        <div className="mb-6">
          <h2 className="text-[22px] font-semibold tracking-tight text-on-surface leading-tight">
            {t("resultsFor", { query })}
          </h2>
          <p className="text-sm text-on-surface-variant font-medium mt-1">
            {t("productsFound", { count: results.length })}
          </p>
        </div>
      )}

      {hasSearched && (
        <CategoryChips
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      )}

      <div className="grid grid-cols-1 gap-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : hasSearched && results.length === 0 ? (
          <EmptyState />
        ) : (
          results.map((product) => (
            <ComparisonCard
              key={`${product.store}-${product.id}`}
              product={product}
              isCheapest={getLowestPrice(product) === cheapestPrice}
            />
          ))
        )}
      </div>
    </>
  );
}
