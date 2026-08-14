interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({
  children,
}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-8">
      {children}
    </main>
  );
}