"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="text-muted-foreground">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Try Again
      </button>
    </div>
  );
}