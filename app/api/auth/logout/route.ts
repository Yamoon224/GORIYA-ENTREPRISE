import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();

    // Supprime les cookies NextAuth
    cookieStore.delete('next-auth.csrf-token');
    cookieStore.delete('next-auth.session-token');

    // Redirige vers la page de login
    const url = process.env.NEXT_PUBLIC_AUTH_URL + '/auth/signin' || 'http://localhost:3000/auth/signin';
    return NextResponse.redirect(url);
}