export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/annonces/:path*',
        '/candidatures/:path*',
        '/messages/:path*',
        '/parametres/:path*',
        '/profil/:path*',
        '/poster-offre/:path*',
        '/services-rh/:path*',
    ],
}
