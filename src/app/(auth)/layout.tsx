import PublicLayout from "@/components/layouts/PublicLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicLayout>
      <main className="bg-muted/40 flex min-h-screen items-center justify-center">
        {children}
      </main>
    </PublicLayout>
  );
}

// Root Layout
// ↓
// Public Layout
// ↓
// Auth Layout
// ↓
// Login Page
