import Content from "./content"
import { cookies } from "next/headers"
import { findCompany } from "@/actions/companies"

export default async function Page() {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("auth")?.value

    if (!authCookie) return <p>Vous devez être connecté</p>

    const auth = JSON.parse(authCookie)

    if (!auth.user.companyId) {
        return <p>Impossible de récupérer l'entreprise : companyId manquant</p>
    }

    // Ici on est sûr que company est ICompany
    const company = await findCompany(auth.user.companyId, auth.token)

    return <Content company={company} />
}