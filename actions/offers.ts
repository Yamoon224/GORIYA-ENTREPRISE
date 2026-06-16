import { apiRequest } from "@/lib/api-client-http"
import { IOffer, IPaginatedResponse } from "@/@types/interface"

export const createJobOffer = (payload: any, token: string) => {
    return apiRequest<IOffer>({
        endpoint: `/job-offers`,
        method: "POST",
        data: payload,
        token,
    })
}

export const getJobOffers = (filters: any = {}, token?: string) => {
    return apiRequest<IPaginatedResponse<IOffer>>({
        endpoint: `/job-offers/paginate`,
        method: "GET",
        token,
        params: filters,
    })
}

export const updateJobOffer = (id: string, payload: Partial<IOffer>, token: string) => {
    return apiRequest<IOffer>({
        endpoint: `/job-offers/${id}`,
        method: "PATCH",
        data: payload,
        token,
    })
}

export const updateJobStatus = (id: string, status: string, token: string) => {
    return apiRequest<IOffer>({
        endpoint: `/job-offers/${id}/status`,
        method: "PATCH",
        data: { status },
        token,
    })
}

export const deleteJobOffer = (id: string, token: string) => {
    return apiRequest<null>({
        endpoint: `/job-offers/${id}`,
        method: "DELETE",
        token,
    })
}