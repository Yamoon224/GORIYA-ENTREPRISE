// lib/proxy.ts
import axios, { AxiosRequestConfig } from 'axios';
import { RequestOptions } from '@/@types/interface';
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://goriya-backend-production.up.railway.app';

export async function apiRequest<T>({ endpoint, method = 'GET', data, token, params }: RequestOptions): Promise<T> {
    try {
        const config: AxiosRequestConfig = {
            url: `${API_BASE_URL}${endpoint}`,
            method,
            headers: {},
            data,
            params,
        };

        // Si token fourni, on ajoute l'Authorization header
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        const response = await axios(config);
        return response.data as T;
    } catch (error: any) {
        console.error(`[API ${method}] error on ${API_BASE_URL}${endpoint}:`, error.response?.data || error.message);
        throw error.response?.data || error;
    }
}