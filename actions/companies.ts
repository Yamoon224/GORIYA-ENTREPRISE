import { ICompany } from "@/@types/interface"
import { apiRequest } from "@/lib/api-client-http"

// `token` n'est requis que pour les appels serveur explicites ; côté navigateur, l'appel
// est relayé via /api/proxy qui attache l'Authorization à partir de la session NextAuth.
export const updateCompany = (id: string, data: FormData, token?: string) => {
    return apiRequest({
        endpoint: `/companies/${id}`,
        method: "PATCH",
        data: data,
        token,
    })
}

export const findCompany = async (id: string, token: string): Promise<ICompany> => {
    try {
        const company = await apiRequest<ICompany>({
            endpoint: `/companies/${id}`,
            method: "GET",
            token: token,
        })

        if (!company) {
            throw new Error("Entreprise introuvable")
        }

        return company
    } catch (err) {
        console.error("Erreur fetch company:", err)
        throw err
    }
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