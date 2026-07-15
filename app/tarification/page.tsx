"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { GoriyaLogo } from "@/components/goriya-logo"
import { Check } from "lucide-react"
import { subscriptionService } from "@/lib/api/subscription.service"

interface Plan {
    id: string
    name: string
    price: number
    billingPeriod: string
    features: string[]
}

const faqs = [
    {
        question: "Puis-je changer de forfait à tout moment ?",
        answer: "Oui, vous pouvez upgrader ou downgrader votre forfait à tout moment depuis vos paramètres. Les changements prennent effet immédiatement.",
    },
    {
        question: "Comment fonctionne la facturation ?",
        answer: "La facturation est automatique selon la périodicité choisie (mensuelle ou annuelle). Vous recevrez une facture par email à chaque échéance.",
    },
    {
        question: "Puis-je annuler mon abonnement ?",
        answer: "Vous pouvez annuler votre abonnement à tout moment depuis vos paramètres. L'accès reste actif jusqu'à la fin de la période payée.",
    },
    {
        question: "Le paiement est-il sécurisé ?",
        answer: "Oui, tous les paiements sont traités via Kkiapay, notre partenaire de paiement sécurisé.",
    },
]

export default function TarificationPage() {
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        subscriptionService.getPlans("ENTREPRISE")
            .then((res) => {
                const data = (res as any)?.data ?? res ?? []
                setPlans(Array.isArray(data) ? data : [])
            })
            .catch(() => setPlans([]))
            .finally(() => setLoading(false))
    }, [])

    const business = plans.find((p) => p.billingPeriod === "MONTHLY")
    const businessPlus = plans.find((p) => p.billingPeriod === "ANNUAL")

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <header className="sticky top-0 z-50 border-b border-border bg-card">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <GoriyaLogo />
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Accueil
                        </Link>
                        <Link href="/tarification" className="text-sm font-medium text-primary">
                            Tarifs
                        </Link>
                        <Button variant="outline" asChild>
                            <Link href="/auth/signin">Se connecter</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/auth/signup">Commencer</Link>
                        </Button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                        La tarification pour les entreprises
                    </h1>
                    <p className="text-lg sm:text-xl max-w-2xl mx-auto text-pretty">
                        Trouvez le forfait qui accompagne votre recrutement, du premier poste publié à la croissance de votre équipe
                    </p>
                </div>
            </section>

            {/* Plans */}
            <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    </div>
                ) : (
                    <div className="flex flex-col items-stretch justify-center gap-6 lg:flex-row lg:items-start mb-12 sm:mb-16">
                        {business && (
                            <div className="relative w-full max-w-[400px] self-center lg:w-[320px] lg:max-w-none">
                                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                                    <span className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-1 text-xs text-gray-500 shadow-sm">
                                        Forfait populaire
                                    </span>
                                </div>
                                <div className="rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-400 to-blue-600 p-[3px] shadow-xl">
                                    <div className="overflow-hidden rounded-2xl bg-white">
                                        <div className="p-6">
                                            <h3 className="text-2xl font-bold text-foreground">{business.name}</h3>
                                            <p className="mb-4 text-sm text-muted-foreground">Pour les entreprises en croissance</p>
                                            <div className="mb-4">
                                                <span className="text-3xl font-bold text-foreground">
                                                    {Number(business.price).toLocaleString("fr-FR")}
                                                </span>
                                                <span className="ml-1 text-sm font-semibold text-muted-foreground">FCFA / mois</span>
                                            </div>
                                            <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                                                <Link href="/auth/signup">Commencer</Link>
                                            </Button>
                                        </div>
                                        <div className="bg-gray-50 px-6 py-5">
                                            <ul className="space-y-2">
                                                {business.features.map((f, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Check className="h-4 w-4 shrink-0 text-blue-500" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {businessPlus && (
                            <div className="w-full max-w-[400px] self-center lg:mt-7 lg:w-[300px] lg:max-w-none">
                                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-blue-600">{businessPlus.name}</h3>
                                        <p className="mb-4 text-sm text-muted-foreground">Pour les grandes entreprises</p>
                                        <div className="mb-4">
                                            <span className="text-3xl font-bold text-foreground">
                                                {Number(businessPlus.price).toLocaleString("fr-FR")}
                                            </span>
                                            <span className="ml-1 text-sm font-semibold text-muted-foreground">FCFA / an</span>
                                        </div>
                                        <Button asChild variant="outline" className="w-full rounded-full">
                                            <Link href="/auth/signup">Commencer</Link>
                                        </Button>
                                    </div>
                                    <div className="bg-gray-50 px-6 py-5">
                                        <ul className="space-y-2">
                                            {businessPlus.features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Check className="h-4 w-4 shrink-0 text-gray-400" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!business && !businessPlus && (
                            <p className="text-center text-sm text-muted-foreground">
                                Les forfaits ne sont pas disponibles pour le moment. Réessayez plus tard.
                            </p>
                        )}
                    </div>
                )}

                {/* FAQ Section */}
                <section className="mt-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="rounded-xl border border-border bg-card p-6">
                                <h3 className="font-semibold mb-2">{faq.question}</h3>
                                <p className="text-muted-foreground">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center mt-16 sm:mt-20 py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-2xl border border-border">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Prêt à recruter avec Goriya ?</h2>
                    <p className="text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                        Rejoins des milliers d&apos;entreprises qui font confiance à Goriya pour trouver les meilleurs talents
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href="/auth/signup">Commencer gratuitement</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/assistance">Nous contacter</Link>
                        </Button>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="border-t border-border py-3 bg-card">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        <GoriyaLogo showTagline={false} />
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Goriya. Tous droits réservés. Boost votre carrière.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
