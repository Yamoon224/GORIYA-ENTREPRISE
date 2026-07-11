"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GoriyaLogo } from "@/components/goriya-logo"
import {
    ArrowRight,
    Users,
    Briefcase,
    Sparkles,
    CheckCircle2,
    ChevronRight,
} from "lucide-react"

const features = [
    {
        icon: Sparkles,
        title: "Optimisation IA",
        description: "Nos algorithmes IA analysent et optimisent vos offres d'emploi pour attirer les meilleurs talents.",
    },
    {
        icon: Users,
        title: "Gestion des candidatures",
        description: "Suivez et gérez toutes vos candidatures en un seul endroit avec des scores de compatibilité.",
    },
    {
        icon: Briefcase,
        title: "Publication facile",
        description: "Publiez vos offres en quelques clics avec notre interface intuitive et moderne.",
    },
]

const benefits = [
    "Analyses CV automatisées par IA",
    "Suggestions de candidats pertinents",
    "Tableau de bord analytique complet",
    "Support prioritaire 24/7",
    "Intégration avec vos outils RH",
    "Rapports détaillés en temps réel",
]

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <header className="border-b border-border bg-card">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <GoriyaLogo />
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Dashboard
                        </Link>
                        <Link href="/tarification" className="text-sm font-medium text-muted-foreground hover:text-foreground">
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
            <section className="relative overflow-hidden bg-[#1e7df2] text-white py-10 sm:py-14 md:py-16">
                {/* Background Decoration */}
                <div className="absolute -right-8 top-0 h-full w-[220px] sm:w-[320px] md:w-[380px] hidden md:block">
                    <div className="absolute top-8 right-16 w-36 h-36 border-[18px] border-[#7ab2ff] rounded-full opacity-60" />
                    <div className="absolute top-52 right-4 w-24 h-24 border-[14px] border-[#7ab2ff] rounded-full opacity-60" />
                    <div className="absolute top-40 right-40 w-12 h-12 bg-[#7ab2ff] rounded-full opacity-70" />
                    <div className="absolute top-20 right-28 w-14 h-14 border-[10px] border-[#7ab2ff] rounded-full opacity-40" />
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
                        Recrutez les meilleurs talents
                        <span className="block">avec l&apos;intelligence artificielle</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-[#b9d8ff] text-pretty">
                        Goriya révolutionne le recrutement en Afrique. Publiez vos offres,
                        analyse les candidatures et trouve les talents parfaits grâce à notre IA avancée.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="rounded-full bg-white text-[#20429b] hover:bg-[#f4f7ff] font-semibold" asChild>
                            <Link href="/auth/signup" className="gap-2">
                                Commencer gratuitement
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full border-white text-white bg-transparent hover:bg-white/10" asChild>
                            <Link href="/dashboard">Voir la démo</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-10 bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Une plateforme complète pour vos recrutements
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Découvrez comment Goriya peut transformer votre processus de recrutement
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-sm bg-card p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-6">
                                Pourquoi choisir Goriya ?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Notre plateforme combine technologie de pointe et expertise locale pour
                                vous offrir la meilleure expérience de recrutement en Afrique.
                            </p>
                            <ul className="space-y-4">
                                {benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                        <span className="text-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="mt-8" asChild>
                                <Link href="/auth/signup" className="gap-2">
                                    Rejoindre Goriya
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="rounded-sm bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-8 border border-primary/20">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 rounded-sm bg-card p-4 shadow-sm">
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">92% de match</p>
                                            <p className="text-sm text-muted-foreground">Candidat parfait trouvé</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 rounded-sm bg-card p-4 shadow-sm">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">125 candidatures</p>
                                            <p className="text-sm text-muted-foreground">Reçues ce mois</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 rounded-sm bg-card p-4 shadow-sm">
                                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                                            <Sparkles className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">IA optimisée</p>
                                            <p className="text-sm text-muted-foreground">Analyse automatique</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 bg-primary text-primary-foreground">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à transformer votre recrutement ?
                    </h2>
                    <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                        Rejoins des milliers d&apos;entreprises qui font confiance à Goriya
                        pour trouver les meilleurs talents.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="secondary" size="lg" asChild>
                            <Link href="/auth/signup">Commencer gratuitement</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground bg-primary hover:bg-primary-foreground hover:text-primary" asChild>
                            <Link href="/tarification">Voir les tarifs</Link>
                        </Button>
                    </div>
                </div>
            </section>

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
