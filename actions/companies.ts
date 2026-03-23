import { apiRequest } from "@/lib/api-client-http"

export const updateCompany = (id: string, formData: FormData, token: string) => {
    return apiRequest({
        endpoint: `/companies/${id}`,
        method: "PATCH",
        data: formData,
        token,
    })
}

export const createCompany = (formData: FormData) => {
    return apiRequest<{
        user: any
        accessToken: string
        company: any
    }>({
        endpoint: `/companies`,
        method: "POST",
        data: formData,
    })
}