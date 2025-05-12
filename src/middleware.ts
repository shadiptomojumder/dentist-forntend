import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string; 
  }

  const decodeToken = (token:string): DecodedToken | null => {
    try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
    } catch (error) {
    console.error('Invalid token:', error);
    return null;
    }
};

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const publicPaths = ['/login', '/signup']; // Array of public paths
    const isPublicPath = publicPaths.includes(pathname);

    const token = request.cookies.get('accessToken')?.value || ''
    const AccessToken = request.cookies.get('middlewareToken')?.value || ''
    console.log("The token in middleware line 34:",token);
    console.log("The AccessToken in middleware line 34:",AccessToken);

    const decoded = decodeToken(AccessToken);
    console.log("decodeToken",decoded);
    
    if(isPublicPath && AccessToken) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    
    if (!isPublicPath && !AccessToken) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if (pathname.startsWith('/user-dashboard') && (!decoded || !['user', 'admin', 'super-admin'].includes(decoded.role))) {
        console.log("User not authorized for /dashboard path");
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // if (pathname.startsWith('/dashboard') && (!decoded || (decoded.role !== 'admin' && decoded.role !== 'super-admin'))) {
    //     console.log("User not authorized for /dashboard path");
    //     return NextResponse.redirect(new URL('/login', request.nextUrl));
    // }

      // Role-based access control for protected routes
  const allowedRoles: { [key: string]: string[] } = {
    '/dashboard': ['admin','super-admin'],
    '/dashboard/dashboard-create-appointment': ['admin','super-admin'],
    '/dashboard/dashboard-users': ['super-admin'],
    // Add more protected routes and their allowed roles here
  };

  // Check if the user role matches the allowed roles for the requested path
  if (allowedRoles[pathname] && decoded && decoded.role && !allowedRoles[pathname].includes(decoded.role)) {
    console.log("Unauthorized access for role:", decoded?.role);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
    

    // Otherwise, allow the request to proceed
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login','/signup','/appointment','/dashboard/:path*','/user-dashboard/:path*'],
}

// matcher: ['/dashboard/:path*','/user-dashboard/:path*','/login','/signup','/appointment'],