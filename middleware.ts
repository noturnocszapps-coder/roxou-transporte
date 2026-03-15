import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './src/lib/supabase-middleware';
import { ROUTES, ROLES, DRIVER_STATUS } from './src/constants';

/**
 * ROXOU TRANSPORTE - AUTH MIDDLEWARE
 * Handles:
 * 1. Session Refresh
 * 2. Unauthenticated Redirects
 * 3. Legal Guard (Terms Acceptance)
 * 4. RBAC (Passenger vs Driver vs Admin)
 * 5. Driver Verification Guard
 */

export async function middleware(request: NextRequest) {
  const { supabase, user, response } = await updateSession(request);
  
  if (!supabase) {
    // If Supabase is not configured, allow public access to home/login but warn
    const url = request.nextUrl.clone();
    const path = url.pathname;
    const isPublicRoute = path === ROUTES.HOME || path === ROUTES.LOGIN || path.startsWith('/api/public');
    if (!isPublicRoute) {
      url.pathname = ROUTES.LOGIN;
      return NextResponse.redirect(url);
    }
    return response;
  }

  const url = request.nextUrl.clone();
  const path = url.pathname;

  // 1. PUBLIC ROUTES CHECK
  const isPublicRoute = path === ROUTES.HOME || path === ROUTES.LOGIN || path.startsWith('/api/public');
  
  if (!user && !isPublicRoute) {
    url.pathname = ROUTES.LOGIN;
    url.searchParams.set('next', path);
    return NextResponse.redirect(url);
  }

  if (user) {
    // Fetch profile for role and legal guard
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, accepted_terms_at, is_blocked')
      .eq('id', user.id)
      .single();

    if (!profile) return response;

    // 1.5 BLOCKED USER GUARD
    if (profile.is_blocked && path !== '/blocked') {
      url.pathname = '/blocked';
      return NextResponse.redirect(url);
    }

    // 2. LEGAL GUARD
    // If user hasn't accepted terms and is trying to access protected operational areas
    const isOperationalArea = path.startsWith('/dashboard') || path.startsWith('/driver') || path.startsWith('/chat');
    if (!profile.accepted_terms_at && isOperationalArea && path !== '/terms-acceptance') {
      url.pathname = '/terms-acceptance';
      return NextResponse.redirect(url);
    }

    // 3. RBAC & REDIRECTS
    
    // Admin Isolation
    if (path.startsWith('/admin') && profile.role !== ROLES.ADMIN) {
      url.pathname = ROUTES.HOME;
      return NextResponse.redirect(url);
    }

    // Driver Area Protection
    if (path.startsWith('/driver')) {
      if (profile.role !== ROLES.DRIVER) {
        url.pathname = ROUTES.PASSENGER_DASHBOARD;
        return NextResponse.redirect(url);
      }

      // 4. DRIVER VERIFICATION GUARD
      // We already have the profile from the previous query
      const { data: driverProfile } = await supabase
        .from('profiles')
        .select('driver_status')
        .eq('id', user.id)
        .single();

      // Block operational areas if not approved
      const isDriverOperational = path.startsWith('/driver/availability') || path.startsWith('/driver/leads');
      if (isDriverOperational && driverProfile?.driver_status !== DRIVER_STATUS.APPROVED) {
        url.pathname = '/driver/onboarding'; // Redirect to onboarding/status page
        return NextResponse.redirect(url);
      }
    }

    // Passenger Area Protection
    if (path.startsWith('/dashboard') && profile.role !== ROLES.PASSENGER) {
      if (profile.role === ROLES.DRIVER) {
        url.pathname = ROUTES.DRIVER_DASHBOARD;
        return NextResponse.redirect(url);
      }
      if (profile.role === ROLES.ADMIN) {
        url.pathname = ROUTES.ADMIN_DASHBOARD;
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
