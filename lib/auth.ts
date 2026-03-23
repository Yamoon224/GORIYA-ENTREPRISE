/* /pages/api/auth/[...nextauth].ts */
import NextAuth, { DefaultUser, DefaultSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiRequest } from "./api-client-http";

// 🔹 Étendre les types NextAuth
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            access_token: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
        role: string;
        token: string;
    }
}

// 🔹 NextAuth options (tu peux aussi les mettre dans un fichier séparé `auth.ts`)
export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const data = await apiRequest<{ access_token: string; user: any }>({
                    endpoint: "/auth/login",
                    method: "POST",
                    data: {
                        email: credentials.email,
                        password: credentials.password,
                    },
                });

                if (!data?.access_token || !data?.user) return null;

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        token: data.access_token,
                        user: data.user,
                        companyId: data.user.company?.id,
                    })
                )

                return {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                    token: data.access_token,
                };
            },
        }),
    ],
    session: { strategy: "jwt" as const },
    secret: process.env.NEXT_AUTH_SECRET,
};