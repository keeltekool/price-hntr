import { useEffect } from "react";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      onClick={onDismiss}
      className="fixed top-16 left-4 right-4 z-[60] bg-error text-on-primary px-4 py-3 rounded-xl text-sm font-medium cursor-pointer shadow-lg max-w-md mx-auto animate-slide-down"
    >
      {message}
    </div>
  );
}
