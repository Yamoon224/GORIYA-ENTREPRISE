import { clsx, type ClassValue } from 'clsx'
import { NextRequest, NextResponse } from 'next/server';
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Détermine si une route est publique (accessible sans authentification)
 */
export function isPublicRoute(pathname: string) {
    const exactPublicRoutes = [
        '/',
        '/manifest.json',
        '/service-worker.js',
        '/favicon.ico',
    ];

    const publicPrefixes = [
        '/auth',
        '/images',
        '/icon',
    ];

    if (
        pathname.startsWith('/_next/static') ||
        pathname.startsWith('/_next/image')
    ) {
        return true;
    }

    if (exactPublicRoutes.includes(pathname)) {
        return true;
    }

    return publicPrefixes.some(prefix =>
        pathname.startsWith(prefix + '/')
    );
}

export function redirectToLogin(request: NextRequest) {
    const response = NextResponse.redirect(new URL('/auth/signin', request.url))

    // ❌ Supprime le cookie invalide
    response.cookies.delete('access_token')

    return response
}

export const getAuth = () => {
    const stored = localStorage.getItem("auth")
    if (!stored) return null
    return JSON.parse(stored)
}
