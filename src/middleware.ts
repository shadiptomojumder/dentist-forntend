import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    _id: string;
    fullname: string;
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
    console.log("The token in middleware line 34:",token);

    // const decoded = decodeToken(token);
    // console.log("decodeToken",decoded);
    
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // Otherwise, allow the request to proceed
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login','/signup'],
}

// matcher: ['/dashboard/:path*','/user-dashboard/:path*','/login','/signup','/appointment'],