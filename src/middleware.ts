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
                return NextResponse.redirect(new URL('/admin', request.url))
            }
           
            if (userData.group === "worker" && pathname.startsWith('/admin')) {
                // Redirect workers from admin to POS
                return NextResponse.redirect(new URL('/pos', request.url))
            }

            // Branch-based routing for POS sections
            const userBranch = userData.branch?.toLowerCase() || ''
            
            // Determine correct section based on branch
            let correctSection = ''
            if (userBranch.includes('spa')) {
                correctSection = 'spa-section'
            } else if (userBranch.includes('luxury')) {
                correctSection = 'luxury'
            }

            // Handle /pos root redirect
            if (pathname === '/pos') {
                if (correctSection === 'spa-section') {
                    return NextResponse.redirect(new URL('/pos/spa-section/services', request.url))
                } else if (correctSection === 'luxury') {
                    return NextResponse.redirect(new URL('/pos/luxury', request.url))
                }
                // If no matching branch, could redirect to error page
                return NextResponse.redirect(new URL('/auth/login', request.url))
            }

            // Handle /pos/spa-section redirect to /pos/spa-section/services
            if (pathname === '/pos/spa-section') {
                return NextResponse.redirect(new URL('/pos/spa-section/services', request.url))
            }

            // Handle /pos/transaction-history redirect based on branch
            if (pathname === '/pos/transaction-history') {
                if (userBranch.includes('spa')) {
                    return NextResponse.redirect(new URL(`/pos/transaction-history/spa/${userData.id}`, request.url))
                } else if (userBranch.includes('luxury')) {
                    return NextResponse.redirect(new URL(`/pos/transaction-history/luxury/${userData.id}`, request.url))
                }
                // If no matching branch, could redirect to error page
                return NextResponse.redirect(new URL('/auth/login', request.url))
            }

            // Branch-based access control for specific sections
            const posMatch = pathname.match(/^\/pos\/(.+)$/)
            if (posMatch) {
                const section = posMatch[1]
                
                // Check if accessing spa-section or luxury paths
                if (section.startsWith('spa-section') || section.startsWith('luxury')) {
                    // If user is accessing wrong section, redirect to correct one
                    if (correctSection === 'spa-section' && !section.startsWith('spa-section')) {
                        return NextResponse.redirect(new URL('/pos/spa-section/services', request.url))
                    }
                    if (correctSection === 'luxury' && section.startsWith('spa-section')) {
                        return NextResponse.redirect(new URL('/pos/luxury', request.url))
                    }
                }

                if (section.startsWith('transaction-history')) {
                    const transactionBranch = section.split('/')[1] // spa or luxury
                    if (userBranch.includes('spa') && transactionBranch !== 'spa') {
                        return NextResponse.redirect(new URL(`/pos/transaction-history/spa/${userData.id}`, request.url))
                    }
                    if (userBranch.includes('luxury') && transactionBranch !== 'luxury') {
                        return NextResponse.redirect(new URL(`/pos/transaction-history/luxury/${userData.id}`, request.url))
                    }
                }
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