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
    const authToken = request.cookies.get('user_session')?.value;
    
    // If the path is protected and user is not authenticated, redirect to login
    if (isProtectedPath && !authToken) {
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }
    
    // If the path is protected and token exists, check role-based access
    if (isProtectedPath && authToken) {
        try {
            const userData = JSON.parse(authToken)
            
            // Check if token has required fields
            if (!userData.id || !userData.username || !userData.group) {
                const loginUrl = new URL('/auth/login', request.url)
                loginUrl.searchParams.set('redirect', pathname)
                return NextResponse.redirect(loginUrl)
            }
            
            // Role-based redirects
            if (userData.group === "administrator" && pathname.startsWith('/pos')) {
                // Redirect administrators from POS to admin
                return NextResponse.redirect(new URL('/admin', request.url))
            }
            
            if (userData.group === "worker" && pathname.startsWith('/admin')) {
                // Redirect workers from admin to POS
                return NextResponse.redirect(new URL('/pos', request.url))
            }
            
        } catch {
            const loginUrl = new URL('/auth/login', request.url)
            loginUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(loginUrl)
        }
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: ['/pos/:path*', '/admin/:path*'],
}
