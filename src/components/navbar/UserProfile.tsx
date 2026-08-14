"use client";

import { useUser } from "@clerk/nextjs";

export default function UserProfile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (!user) return null;

  return (
    <div className="hidden md:flex flex-col text-right">
      <p className="font-medium">
        {user.fullName}
      </p>

      <p className="text-sm text-muted-foreground">
        {user.primaryEmailAddress?.emailAddress}
      </p>
    </div>
  );
}

// What is currentUser()?
// auth() only gives you:
// {
//   userId: "user_123"
// }

// But currentUser() returns the complete Clerk user object.

// Example:
// {
//   id: "user_123",
//   fullName: "Kamalika Subramanian",
//   firstName: "Kamalika",
//   lastName: "Subramanian",
//   imageUrl: "...",
//   primaryEmailAddress: {
//     emailAddress: "kamal@example.com"
//   }
// }