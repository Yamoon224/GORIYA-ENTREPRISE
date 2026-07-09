import { apiRequest } from "@/lib/api-client-http"

// Ces fonctions sont utilisées côté client (Client Components) : le Bearer token
// n'est plus lu manuellement, il est attaché par la route /api/proxy à partir de
// la session NextAuth (cookie httpOnly) côté serveur.
export const getConversations = () =>
    apiRequest<any>({ endpoint: "/messages/conversations", method: "GET" })

export const getMessages = (convId: string) =>
    apiRequest<any>({ endpoint: `/messages/conversations/${convId}/messages`, method: "GET" })

export const sendMessage = (convId: string, content: string) =>
    apiRequest<any>({ endpoint: `/messages/conversations/${convId}/messages`, method: "POST", data: { content } })

export const markRead = (convId: string) =>
    apiRequest<any>({ endpoint: `/messages/conversations/${convId}/read`, method: "PUT" })

export const createConversation = (candidatureId: string) =>
    apiRequest<any>({ endpoint: "/messages/conversations", method: "POST", data: { candidatureId } })
