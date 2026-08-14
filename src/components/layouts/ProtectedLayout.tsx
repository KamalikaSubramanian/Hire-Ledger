import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { syncUser } from "@/actions/user.actions";

interface Props {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  if (user) {
    await syncUser()
  }

  return <>{children}</>;
}