import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up"]);

export default clerkMiddleware(async (auth, req) => {
  // Allow all requests for API routes (bypassing the middleware logic)
  console.log(req.nextUrl.pathname.includes("/api"));
  if (req.nextUrl.pathname.includes("/api")) {
    return NextResponse.next();
  }

  const { userId } = await auth();
  console.log(userId, req.nextUrl.pathname);

  // If the user is authenticated and is on a public route, redirect to home
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is not authenticated and the route is not public, redirect to /sign-in
  if (!userId && !isPublicRoute(req) && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Allow the request to continue if none of the above conditions match
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)",
    "/(api|trpc)(.*)", // Ensure this handles your API routes
  ],
};
