import Content from "./content"
import { findCompany } from "@/actions/companies"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function Page() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.access_token) return <p>Vous devez être connecté</p>

    if (!session.user.companyId) {
        return <p>Impossible de récupérer l'entreprise : companyId manquant</p>
    }

    try {
        const company = await findCompany(session.user.companyId, session.user.access_token)
        return <Content company={company} />
    } catch (err) {
        console.error("Erreur fetch company:", err)
        return <p>Impossible de récupérer les informations de l'entreprise pour le moment.</p>
    }
}