// lib/api-client-http.ts
import axios, { AxiosRequestConfig } from 'axios';
import { RequestOptions } from '@/@types/interface';
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://goriya-backend-production.up.railway.app';

// Côté navigateur, on ne peut plus lire le token (session NextAuth en cookie httpOnly).
// On relaie donc les appels via la route interne `/api/proxy/*`, qui lit la session
// côté serveur et attache le Bearer token avant de contacter le vrai backend.
// Côté serveur (Server Components / Server Actions), on continue d'appeler le backend
// directement avec le token explicitement fourni (récupéré via getServerSession).
const isBrowser = typeof window !== 'undefined';

export async function apiRequest<T>({ endpoint, method = 'GET', data, token, params }: RequestOptions): Promise<T> {
    const baseUrl = isBrowser ? '/api/proxy' : API_BASE_URL;
    const url = `${baseUrl}${endpoint}`;

    try {
        const config: AxiosRequestConfig = {
            url,
            method,
            headers: {},
            data,
            params,
        };

        // Le proxy interne attache lui-même l'Authorization à partir de la session serveur.
        // Côté serveur, on ajoute l'en-tête explicitement si un token a été fourni.
        if (token && !isBrowser) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        const response = await axios(config);
        return response.data as T;
    } catch (error: any) {
        console.error(`[API ${method}] error on ${url}:`, error.response?.data || error.message);
        throw error.response?.data || error;
    }
}