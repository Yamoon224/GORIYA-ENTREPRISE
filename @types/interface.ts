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