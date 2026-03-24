import { apiRequest } from "@/lib/api-client-http"
import { DashboardContentProps } from "@/@types/props"
import { DashboardStatsParams } from "@/@types/interface"

export const stats = async (token: string, params?: DashboardStatsParams) => {
    try {
        return await apiRequest<DashboardContentProps>({
            endpoint: `/dashboard/stats`,
            method: "GET",
            params, // start et end seront ajoutés à l'URL
            token,
        })
    } catch (err) {
        console.error("Erreur fetch stats:", err)
        throw err
    }
}