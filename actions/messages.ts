import { apiRequest } from "@/lib/api-client-http"

export const getConversations = (token: string) =>
    apiRequest<any>({ endpoint: "/messages/conversations", method: "GET", token })

export const getMessages = (convId: string, token: string) =>
    apiRequest<any>({ endpoint: `/messages/conversations/${convId}/messages`, method: "GET", token })

export const sendMessage = (convId: string, content: string, token: string) =>
    apiRequest<any>({ endpoint: `/messages/conversations/${convId}/messages`, method: "POST", data: { content }, token })

export const markRead = (convId: string, token: string) =>
    apiRequest<any>({ endpoint: `/messages/conversations/${convId}/read`, method: "PUT", token })
