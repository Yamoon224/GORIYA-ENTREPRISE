import { Content } from "./content"
import { cookies } from "next/headers"
import { getJobOffers } from "@/actions/offers"
import { IPaginatedResponse, IOffer } from "@/@types/interface"
import { SubscriptionGate } from "@/components/subscription-gate"


export default async function Page() {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("auth")?.value

    if (!authCookie) return <p>Vous devez être connecté</p>

    const auth = JSON.parse(authCookie)
    const filters = { page: 1, limit: 10 }

    const init: IPaginatedResponse<IOffer> = await getJobOffers(filters, auth.token)

    return (
        <SubscriptionGate featureLabel="la gestion des annonces">
            <Content init={init} token={auth.token} />
        </SubscriptionGate>
    )
}