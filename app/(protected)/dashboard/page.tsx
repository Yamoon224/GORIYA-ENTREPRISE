import Content from "./content"
import { stats } from "@/actions/dashboard"
import { cookies } from "next/headers"

export default async function Page() {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("auth")?.value

    if (!authCookie) {
        return <p>Vous devez être connecté</p>
    }

    const auth = JSON.parse(authCookie) // { token, user, companyId }

    let dashboardStats = null
    try {
        dashboardStats = await stats(auth.token)
    } catch (err) {
        console.error("Erreur fetch dashboard stats:", err)
    }

    return (
        <Content 
            statsData={dashboardStats?.statsData || []}
            chartData={dashboardStats?.chartData || []}
            lineChartData={dashboardStats?.lineChartData || []}
            recentCandidates={dashboardStats?.recentCandidates || []}
            topOffers={dashboardStats?.topOffers || []}
            recentOffers={dashboardStats?.recentOffers || []}
        />
    )
}