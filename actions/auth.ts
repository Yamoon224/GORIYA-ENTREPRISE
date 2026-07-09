import { apiRequest } from "@/lib/api-client-http"

export const requestOtp = (email: string, purpose: string = "EMAIL_VERIFICATION") => {
    return apiRequest<{ message: string }>({
        endpoint: "/auth/otp/request",
        method: "POST",
        data: { email, purpose },
    })
}

export const verifyOtp = (email: string, code: string, purpose: string = "EMAIL_VERIFICATION") => {
    return apiRequest<{ access_token: string; user: any }>({
        endpoint: "/auth/otp/verify",
        method: "POST",
        data: { email, code, purpose },
    })
}
