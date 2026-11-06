interface TrackingSkeletonProps {
  label: string;
}

/** Placeholder with the same shape as the live layout, so nothing jumps when data arrives. */
export function TrackingSkeleton({ label }: TrackingSkeletonProps): React.JSX.Element {
  return (
    <div className="flex min-h-0 flex-1 flex-col" aria-busy="true">
      <p role="status" className="sr-only">
        {label}
      </p>
      <div className="min-h-0 flex-1 animate-pulse bg-track-line/60" aria-hidden="true" />
      <div
        className="shrink-0 space-y-3 rounded-t-2xl bg-track-surface px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]"
        aria-hidden="true"
      >
        <div className="h-5 w-3/4 animate-pulse rounded bg-track-line" />
        <div className="flex gap-2">
          <div className="h-8 w-28 animate-pulse rounded-full bg-track-line" />
          <div className="h-8 w-20 animate-pulse rounded-full bg-track-line" />
        </div>
        <div className="h-3 w-full animate-pulse rounded bg-track-line" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-track-line" />
      </div>
    </div>
  );
}
