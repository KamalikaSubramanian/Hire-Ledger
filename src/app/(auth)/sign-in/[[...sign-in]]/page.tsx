import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      forceRedirectUrl="/dashboard"
      appearance={{
        elements: {
          card: "shadow-xl",
        },
      }}
    />
  );
}

// ❓ Why [[...sign-in]]?

// This is a Next.js Optional Catch-all Route.

// You learned about dynamic routes in Module 1.

// Normal route:

// sign-in/page.tsx

// Only matches:

// /sign-in

// Catch-all route:

// [...sign-in]

// Matches:

// /sign-in

// /sign-in/sso-callback

// /sign-in/reset-password

// /sign-in/anything

// Optional Catch-all:

// [[...sign-in]]

// Matches:

// /sign-in

// /sign-in/*

// Clerk internally uses additional routes like:

// /sign-in/factor-one

// /sign-in/verify-email

// /sign-in/sso-callback

// That's why Clerk recommends using [[...sign-in]].
