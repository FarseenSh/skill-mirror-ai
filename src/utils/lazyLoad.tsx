
import { Suspense, lazy, ComponentType } from 'react';
import { Loader2 } from 'lucide-react';

// Loading component that displays while the real component is loading
export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-60">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

// Generic lazy loading wrapper
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  loadingFallback = <LoadingFallback />
) {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={loadingFallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default lazyLoad;
