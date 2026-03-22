import { useState, useEffect, useCallback } from "react";
import type { Product, Category, StoreId } from "../lib/alkoholiks-sdk";
import { api } from "../lib/api";
import { getSizeBucket, getLowestPrice, type SizeBucket } from "../lib/utils";
import { useI18n } from "../lib/i18n";
import { STORE_ORDER } from "../constants/stores";
import { SearchBar } from "../components/SearchBar";
import { StoreChips } from "../components/StoreChips";
import { CategoryChips } from "../components/CategoryChips";
import { SizeChips } from "../components/SizeChips";
import { DealCard } from "../components/DealCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { ErrorBanner } from "../components/ErrorBanner";

const MAX_RESULTS = 75;
const DEFAULT_CATEGORY = "\u00f5lu"; // Beer

interface DealsViewProps {
  onSearchFocus: () => void;
  categories: Category[];
}

export function DealsView({ onSearchFocus, categories }: DealsViewProps) {
  const { t } = useI18n();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedStore, setSelectedStore] = useState<StoreId | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [selectedSize, setSelectedSize] = useState<SizeBucket>("regular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(
    async (category: string) => {
      setLoading(true);
      setError(null);
      try {
        // Fetch from all 5 stores in parallel to get full coverage
        const results = await Promise.all(
          STORE_ORDER.map((store) =>
            api.getProducts({ category, store, limit: 200 })
          )
        );
        const merged = results.flatMap((r) => r.data);
        setAllProducts(merged);
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
    fetchProducts(selectedCategory);
  }, [selectedCategory, fetchProducts]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Client-side: filter store, exclude alcohol-free, bucket by size, sort, cap
  const filtered = allProducts
    .filter((p) => {
      if (selectedStore && p.store !== selectedStore) return false;
      if (p.alcoholFree) return false;
      if (getSizeBucket(p) !== selectedSize) return false;
      return true;
    })
    .sort((a, b) => getLowestPrice(a) - getLowestPrice(b))
    .slice(0, MAX_RESULTS);

  return (
    <>
      {error && (
        <ErrorBanner message={error} onDismiss={() => setError(null)} />
      )}

      <SearchBar value="" onChange={() => {}} onFocus={onSearchFocus} />

      <div className="mb-6">
        <h2 className="text-[22px] font-semibold tracking-tight text-on-surface">
          {t("bestPrices")}
        </h2>
        <p className="text-sm text-on-surface-variant">
          {t("productCount", { count: filtered.length })}
        </p>
      </div>

      <StoreChips selected={selectedStore} onSelect={setSelectedStore} />

      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategoryChange}
      />

      <SizeChips selected={selectedSize} onSelect={setSelectedSize} />

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
