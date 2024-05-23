import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    // console.log("The Request is:",request);
    

    const isPublicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get('accessToken')?.value || ''
    // console.log("The token in middleware is op:",token);
    
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
     
    

    // Otherwise, allow the request to proceed
    return NextResponse.next()
    
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/products','/profile'],
}