import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p className="text-muted-foreground">
        Page not found.
      </p>

      <Link
        href="/dashboard"
        className="rounded-md bg-primary px-5 py-2 text-primary-foreground"
      >
        Go Dashboard
      </Link>
    </div>
  );
}