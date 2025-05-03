import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that require authentication
const protectedPaths = ['/pos', '/admin']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    const isProtectedPath = protectedPaths.some(path => 
        pathname.startsWith(path)
    )
    // Check if user is authenticated by looking for a token in cookies
    // You should adjust this according to how you store auth tokens in your app
    const authToken = request.cookies.get('user_session')?.value;
    
    // If the path is protected and user is not authenticated, redirect to login
    if (isProtectedPath && !authToken) {
        const loginUrl = new URL('/auth/login', request.url)
        
        loginUrl.searchParams.set('redirect', pathname)
        
        return NextResponse.redirect(loginUrl)
    }
    
    // If the path is protected and token exists but is invalid (missing required fields)
    if (isProtectedPath && authToken) {
        try {
            const userData = JSON.parse(authToken)
            
            if (!userData.id || !userData.username) {
                // Token is invalid, redirect to login
                const loginUrl = new URL('/login', request.url)
                loginUrl.searchParams.set('redirect', pathname)
                return NextResponse.redirect(loginUrl)
            }
        } catch {
            const loginUrl = new URL('/login', request.url)
                loginUrl.searchParams.set('redirect', pathname)
                return NextResponse.redirect(loginUrl)
        }
    }
    
    return NextResponse.next()
}

export const config = {
  matcher: ['/pos/:path*', '/admin/:path*'],
}