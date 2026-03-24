import { apiRequest } from "@/lib/api-client-http"
import { IOffer, IPaginatedResponse } from "@/@types/interface"


export const createJobOffer = (payload: any, token: string) => {
    return apiRequest<IOffer>({
        endpoint: `/job-offers`,
        method: "POST",
        data: payload,
        token: token
    })
}

export const getJobOffers = (filters: any = {}, token?: string) => { 
    return apiRequest<IPaginatedResponse<IOffer>>({
        endpoint: `/job-offers/paginate`,
        method: "GET",
        token: token,
        params: filters, // 🔹 passe les filtres en query params
    });
};