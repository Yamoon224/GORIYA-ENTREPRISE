import { apiRequest } from "@/lib/api-client-http"

export interface IApiClient {
    id: string
    name: string
    isSandbox: boolean
    isActive: boolean
    rateLimitPerMinute: number
    lastUsedAt: string | null
    createdAt: string
}

export interface IWebhook {
    id: string
    url: string
    events: string[]
    isActive: boolean
    secret?: string
    createdAt: string
}

export const WEBHOOK_EVENTS = ["candidature.status_updated", "candidate_assessment.completed"] as const

export const apiClientService = {
    list: async () => {
        return apiRequest<IApiClient[]>({ endpoint: "/api-clients", method: "GET" })
    },

    create: async (name: string, isSandbox = true) => {
        return apiRequest<{ client: IApiClient; token: string }>({
            endpoint: "/api-clients",
            method: "POST",
            data: { name, isSandbox },
        })
    },

    revoke: async (id: string) => {
        return apiRequest<{ message: string }>({ endpoint: `/api-clients/${id}`, method: "DELETE" })
    },

    listWebhooks: async (clientId: string) => {
        return apiRequest<IWebhook[]>({ endpoint: `/api-clients/${clientId}/webhooks`, method: "GET" })
    },

    createWebhook: async (clientId: string, url: string, events: string[]) => {
        return apiRequest<IWebhook>({
            endpoint: `/api-clients/${clientId}/webhooks`,
            method: "POST",
            data: { url, events },
        })
    },

    deleteWebhook: async (clientId: string, webhookId: string) => {
        return apiRequest<{ message: string }>({
            endpoint: `/api-clients/${clientId}/webhooks/${webhookId}`,
            method: "DELETE",
        })
    },
}
