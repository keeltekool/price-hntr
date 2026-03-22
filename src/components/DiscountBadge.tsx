interface DiscountBadgeProps {
  percent: number;
}

export function DiscountBadge({ percent }: DiscountBadgeProps) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary-container text-on-secondary-fixed text-[11px] font-bold">
      -{percent}%
    </span>
  );
}
