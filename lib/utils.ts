import { clsx, type ClassValue } from 'clsx'
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
        '/assistance',
        '/tarification',
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

export function formatDate(
    value: string | Date,
    type: 'date' | 'datetime' | 'time' = 'date',
    locale: string = 'fr-FR'
): string {
    if (!value) return ''

    const date = new Date(value)

    if (isNaN(date.getTime())) {
        return ''
    }

    const optionsMap: Record<typeof type, Intl.DateTimeFormatOptions> = {
        date: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        },
        datetime: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
        },
    }

    return new Intl.DateTimeFormat(locale, optionsMap[type]).format(date)
}

export function formatAmount(
    value: number | string,
    currency: string = 'XOF',   // Devise par défaut
    locale: string = 'fr-FR',  // Localisation par défaut
    minimumFractionDigits: number = 0,
    maximumFractionDigits: number = 0
): string {
    if (value === null || value === undefined || value === '') return ''

    const amount = typeof value === 'string' ? parseFloat(value) : value

    if (isNaN(amount)) return ''

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits
    }).format(amount)
}