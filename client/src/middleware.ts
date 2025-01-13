import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;
  const { userId } = await auth();

  const isProtectedRoute = createRouteMatcher(["/home"]);
  const unprotectedRoutes = ["/", "/about", "/services", "/contact"];

  if (userId && unprotectedRoutes.includes(pathname)) {
    const redirectUrl = new URL("/home", req.nextUrl.origin);
    return Response.redirect(redirectUrl, 302);
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
