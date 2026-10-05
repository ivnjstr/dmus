import { NextResponse, type NextRequest } from "next/server";

// TEMPORARY maintenance mode. While MAINTENANCE_MODE is "true", every page request (deep links
// included) shows /maintenance instead. Next's own files, public/ assets and the contact form keep
// working. Delete this file and app/maintenance/ to remove it.
//
// Owner preview: open any URL with ?preview=<MAINTENANCE_BYPASS_SECRET> to get a cookie that shows
// the real site; ?preview=off clears it.

const BYPASS_COOKIE = "dmus_maintenance_preview";
const RETRY_AFTER_SECONDS = 3600;

// The cookie holds a hash of the secret, never the secret itself.
async function bypassToken(secret: string) {
  const bytes = new TextEncoder().encode(`dmus-maintenance-preview:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Off: the site as before, where /maintenance doesn't exist (a rewrite to an unknown path
  // renders the normal 404 page).
  if (process.env.MAINTENANCE_MODE !== "true") {
    return pathname === "/maintenance"
      ? NextResponse.rewrite(new URL("/__maintenance-off", request.url))
      : NextResponse.next();
  }

  const secret = process.env.MAINTENANCE_BYPASS_SECRET;
  if (secret) {
    const token = await bypassToken(secret);
    const preview = searchParams.get("preview");
    if (preview === "off" || (preview && (await bypassToken(preview)) === token)) {
      // Set or clear the preview cookie, then reload the same address without ?preview.
      const address = request.nextUrl.clone();
      address.searchParams.delete("preview");
      const response = NextResponse.redirect(address);
      if (preview === "off") response.cookies.delete(BYPASS_COOKIE);
      else {
        response.cookies.set(BYPASS_COOKIE, token, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
      }
      return response;
    }
    if (request.cookies.get(BYPASS_COOKIE)?.value === token) return NextResponse.next();
  }

  // Everything else gets the maintenance page, at whatever address was asked for.
  const maintenance = request.nextUrl.clone();
  maintenance.pathname = "/maintenance";

  // The contact form's Server Action is a POST to the current page address; rewritten here it runs
  // in /maintenance (which renders the form) and keeps its normal status so the form can read the
  // result. Everything else gets 503 + Retry-After. (Next hides router-fetch headers from the proxy,
  // so those get the 503 too; the maintenance page has no links, so it makes none.)
  const response = request.headers.has("next-action")
    ? NextResponse.rewrite(maintenance)
    : NextResponse.rewrite(maintenance, { status: 503, headers: { "Retry-After": String(RETRY_AFTER_SECONDS) } });
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  // Every page path. Skipped: Next's own files (/_next/…) and anything with a file extension, which
  // covers public/ (the logo and other assets), icon.png, favicon.ico and robots.txt.
  matcher: ["/((?!_next/|.*\\.[^/]+$).*)"],
};
