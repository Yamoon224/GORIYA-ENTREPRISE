import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();

    // Supprime les cookies NextAuth
    cookieStore.delete('next-auth.csrf-token');
    cookieStore.delete('next-auth.session-token');

    // Redirige vers la page de login
    const url = process.env.NEXTAUTH_URL || '/auth/signin';
    return NextResponse.redirect(url);
}