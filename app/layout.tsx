import './globals.css'
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter'
});

export const metadata: Metadata = {
    title: 'Goriya - Plateforme de Recrutement',
    description: 'Goriya - Plateforme moderne de recrutement et gestion des candidatures',
    // generator: 'v0.app',
    icons: {
        icon: [
            {
                url: '/images/favicon.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/images/favicon.png',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/images/favicon.png',
                type: 'image/png',
            },
        ],
        apple: '/apple-icon.png',
    },
}

export const viewport: Viewport = {
    themeColor: '#1e3a8a',
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr">
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
                
                <Analytics />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        className: "text-sm",
                    }}
                    richColors
                />
            </body>
        </html>
    )
}
