import Content from "./content"
import { stats } from "@/actions/dashboard"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function Page() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.access_token) {
        return <p>Tu dois être connecté</p>
    }

    let dashboardStats = null
    try {
        dashboardStats = await stats(session.user.access_token)
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