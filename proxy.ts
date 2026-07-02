import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';
import { isPublicRoute } from '@/lib/utils';

// Note : depuis Next.js 16, la convention "middleware.ts" est dépréciée au profit de
// "proxy.ts" (même mécanisme, nouveau nom) — ce fichier est donc bien exécuté par Next.js.
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ✅ routes publiques
    if (isPublicRoute(pathname)) {
        return NextResponse.next();
    }

    // ✅ récupérer le token JWT côté proxy (lit le cookie de session NextAuth httpOnly)
    const token = await getToken({
        req: request,
        secret: process.env.NEXT_AUTH_SECRET,
    });

    // ✅ si pas de token, redirige vers /auth/signin
    if (!token) {
        const signInUrl = new URL('/auth/signin', request.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

// ✅ Config matcher : exclut les fichiers statiques, TOUTES les routes /api/* (qui gèrent
// leur propre authentification via getServerSession/getToken) et les routes /auth/*.
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|manifest.json|service-worker.js|icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth|api).*)',
    ],
};
