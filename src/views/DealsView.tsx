import { useState, useEffect, useCallback } from "react";
import type { Product, Category } from "../lib/alkoholiks-sdk";
import { api } from "../lib/api";
import { getDiscountPercent } from "../lib/utils";
import { useI18n } from "../lib/i18n";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { DealCard } from "../components/DealCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { ErrorBanner } from "../components/ErrorBanner";

interface DealsViewProps {
  onSearchFocus: () => void;
  categories: Category[];
}

export function DealsView({ onSearchFocus, categories }: DealsViewProps) {
  const { t } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getProducts({ on_sale: true, limit: 200 });
      const sorted = res.data.sort(
        (a, b) => getDiscountPercent(b) - getDiscountPercent(a)
      );
      setProducts(sorted);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("errorUnavailable"));
      }
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <>
      {error && (
        <ErrorBanner message={error} onDismiss={() => setError(null)} />
      )}

      <SearchBar value="" onChange={() => {}} onFocus={onSearchFocus} />

      <div className="mb-6">
        <h2 className="text-[22px] font-semibold tracking-tight text-on-surface">
          {t("todaysDeals")}
        </h2>
        <p className="text-sm text-on-surface-variant">
          {t("productsOnSale", { count: filtered.length })}
        </p>
      </div>

      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="grid grid-cols-1 gap-3">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((product) => (
              <DealCard
                key={`${product.store}-${product.id}`}
                product={product}
              />
            ))}
      </div>
    </>
  );
}
