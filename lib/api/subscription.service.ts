import { apiRequest } from "@/lib/api-client-http"

export const subscriptionService = {
    getPlans: (userType: "USER" | "ENTREPRISE" = "ENTREPRISE") =>
        apiRequest({ endpoint: `/subscriptions/plans?userType=${userType}`, method: "GET" }),

    subscribe: (data: { userId: string; planId: string }) =>
        apiRequest({ endpoint: "/subscriptions/subscribe", method: "POST", data }),

    createCheckout: (data: { userId: string; planId: string; successUrl: string; errorUrl: string }) =>
        apiRequest<{ waveUrl: string; sessionId: string; clientReference: string; expiresAt: string }>({
            endpoint: "/subscriptions/checkout",
            method: "POST",
            data,
        }),

    verifyCheckout: (sessionId: string, userId: string, planId: string) =>
        apiRequest<any>({
            endpoint: `/subscriptions/checkout/verify/${sessionId}?userId=${userId}&planId=${planId}`,
            method: "GET",
        }),

    getMySubscription: (userId: string) =>
        apiRequest({ endpoint: `/subscriptions/me/${userId}`, method: "GET" }),

    cancelSubscription: (userId: string) =>
        apiRequest({ endpoint: `/subscriptions/me/${userId}`, method: "DELETE" }),

    checkSubscription: (userId: string) =>
        apiRequest<{ hasSubscription: boolean; planName: string | null; status: string | null }>({
            endpoint: `/subscriptions/check/${userId}`,
            method: "GET",
        }),
}
