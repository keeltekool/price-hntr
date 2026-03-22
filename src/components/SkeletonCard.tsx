export function SkeletonCard() {
  return (
    <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20 flex gap-4 items-center animate-pulse">
      <div className="w-16 h-16 rounded-lg bg-surface-container-high flex-shrink-0" />
      <div className="flex-grow space-y-2">
        <div className="h-4 bg-surface-container-high rounded w-3/4" />
        <div className="h-3 bg-surface-container-high rounded w-1/2" />
        <div className="h-4 bg-surface-container-high rounded w-1/3" />
      </div>
    </div>
  );
}
