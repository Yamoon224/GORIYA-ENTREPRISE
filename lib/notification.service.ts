import { apiRequest } from "@/lib/api-client-http"

export interface INotification {
    id: string
    title: string
    body?: string | null
    isRead: boolean
    createdAt: string
}

export const notificationService = {
    getNotifications: async () => {
        return apiRequest<INotification[]>({
            endpoint: "/notifications",
            method: "GET",
        })
    },

    markAsRead: async (notificationId: string) => {
        return apiRequest<{ id: string; isRead: boolean }>({
            endpoint: `/notifications/${notificationId}/read`,
            method: "PUT",
        })
    },

    markAllAsRead: async () => {
        return apiRequest<{ message: string }>({
            endpoint: "/notifications/read-all",
            method: "PUT",
        })
    },

    deleteNotification: async (notificationId: string) => {
        return apiRequest<{ message: string }>({
            endpoint: `/notifications/${notificationId}`,
            method: "DELETE",
        })
    },
}
