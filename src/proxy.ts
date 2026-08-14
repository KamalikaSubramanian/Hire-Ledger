import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|png|gif|svg|ico|ttf|woff2?|map)).*)",

    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// It simply tells Next.js:

// "Whenever someone visits these routes, run the middleware first."
// Later we'll add authentication checks there.

