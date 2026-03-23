import { Method } from "axios";

export interface RequestOptions {
    endpoint: string;
    method?: Method; // GET, POST, PUT, PATCH, DELETE
    data?: any;      // body data pour POST/PUT/PATCH
    token?: string;  // JWT si route protégée
    params?: any;    // query params pour GET
}

export interface SessionUser {
    id: string;
    email: string;
    role: string;
    access_token: string;
}

export interface CompanyCreateDto {
    logo: File | null
    coverImage: File | null
    companyName: string
    about: string
    sector: string
    creationDate: string
    companySize: string
    website: string
    socialLinks: string[]
    country: string
    headquarters: string
    location: string
    phone: string
    email: string
    password: string
}