"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, Phone, Search, ChevronDown, ChevronRight, Star, ExternalLink, Zap, FileText, Users, CreditCard, BookOpen, Video, FileCode } from "lucide-react"

const categories = [
    { label: "IA", count: 8, Icon: Zap, bg: "bg-blue-500" },
    { label: "Offres", count: 12, Icon: FileText, bg: "bg-green-500" },
    { label: "Candidatures", count: 6, Icon: Users, bg: "bg-orange-400" },
    { label: "Facturation", count: 4, Icon: CreditCard, bg: "bg-red-500" },
]

const faqs = [
    { question: "Comment optimiser mes offres d'emploi avec l'IA ?", tag: "IA", tagColor: "bg-blue-100 text-blue-600", answer: "L'IA de Goriya analyse automatiquement vos offres et suggere des ameliorations pour attirer les meilleurs candidats." },
    { question: "Comment interpreter le score IA des candidats ?", tag: "IA", tagColor: "bg-blue-100 text-blue-600", answer: "Le score IA represente la compatibilite entre le profil du candidat et votre offre. Au-dessus de 80, le match est excellent." },
    { question: "Puis-je modifier une offre apres publication ?", tag: "Offres", tagColor: "bg-green-100 text-green-600", answer: "Oui. Depuis Mes annonces, ouvrez l'offre et cliquez sur Modifier." },
    { question: "Comment contacter un candidat ?", tag: "Candidatures", tagColor: "bg-orange-100 text-orange-600", answer: "Depuis Candidatures, cliquez sur Message dans la fiche du candidat." },
    { question: "Combien coute l'abonnement Premium ?", tag: "Facturation", tagColor: "bg-red-100 text-red-600", answer: "Le plan Premium est a 4 999 FCFA/mois avec IA avancee et support prioritaire." },
]

const resources = [
    { Icon: BookOpen, title: "Guide de demarrage rapide", description: "Apprenez les bases de Goriya en 5 minutes", tag: "guide", duration: "5 min" },
    { Icon: Video, title: "Maximiser l'efficacite de l'IA", description: "Tutoriel video sur l'optimisation IA", tag: "video", duration: "12 min" },
    { Icon: BookOpen, title: "Meilleures pratiques de recrutement", description: "Guide complet pour recruter efficacement", tag: "guide", duration: "20 min" },
    { Icon: FileCode, title: "API et integrations", description: "Documentation technique pour les developpeurs", tag: "docs", duration: "Variable" },
]

export default function AssistancePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div className="space-y-5 pb-10">
            <div>
                <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Centre d'assistance</h1>
                <p className="text-sm text-muted-foreground">Trouvez rapidement les reponses a vos questions</p>
            </div>

            <div className="overflow-hidden rounded-xl bg-blue-600 px-4 py-8 text-center text-white sm:px-8 sm:py-10">
                <h2 className="mb-1.5 text-xl font-bold">Comment pouvons-nous vous aider ?</h2>
                <p className="mb-5 text-sm text-blue-200">Trouvez une reponse rapidement ou contactez notre equipe support</p>
                <div className="relative mx-auto max-w-md"><Input placeholder="Rechercher..." className="h-9 bg-white pl-4 pr-10 text-sm text-foreground" /><Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /></div>
            </div>

            <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-white sm:grid-cols-2 lg:grid-cols-3">
                <Channel icon={<MessageSquare className="h-5 w-5 text-blue-500" />} title="Chat en direct" subtitle="Discutez avec notre equipe support"><Button size="sm" className="rounded-full text-xs">Demarrer une conversation</Button></Channel>
                <Channel icon={<Mail className="h-5 w-5 text-green-500" />} title="Email support" subtitle="Contactez-nous par email">support@goriya.com</Channel>
                <Channel icon={<Phone className="h-5 w-5 text-orange-400" />} title="Telephone" subtitle="Appelez notre support">+33 1 23 45 67 89</Channel>
            </div>

            <div className="rounded-xl border border-border bg-white p-4 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Parcourir par categorie</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {categories.map(({ label, count, Icon, bg }) => (
                        <button key={label} className="flex items-center gap-3 rounded-lg bg-muted/40 px-4 py-3 text-left hover:bg-muted/70 transition-colors">
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}><Icon className="h-4 w-4 text-white" /></div>
                            <div><p className="text-sm font-medium text-foreground">{label}</p><p className="text-xs text-muted-foreground">{count} articles</p></div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-4 sm:p-5">
                <h3 className="mb-2 text-sm font-semibold text-foreground">Questions frequentes</h3>
                <div className="divide-y divide-border">
                    {faqs.map((faq, i) => (
                        <div key={faq.question}>
                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between py-3.5 text-left">
                                <div className="flex items-center gap-3 pr-4 flex-wrap"><span className="text-sm text-foreground">{faq.question}</span><span className={`rounded px-2 py-0.5 text-[11px] font-medium ${faq.tagColor}`}>{faq.tag}</span></div>
                                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                            </button>
                            {openFaq === i && <p className="pb-3.5 text-sm text-muted-foreground">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-4 sm:p-5">
                <h3 className="mb-2 text-sm font-semibold text-foreground">Ressources utiles</h3>
                <div className="divide-y divide-border">
                    {resources.map(({ Icon, title, description, tag, duration }) => (
                        <div key={title} className="flex items-center justify-between py-4 hover:bg-muted/20 transition-colors">
                            <div className="flex items-center gap-3 sm:gap-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50"><Icon className="h-4 w-4 text-blue-500" /></div><div><p className="text-sm font-medium text-foreground">{title}</p><p className="text-xs text-muted-foreground">{description}</p><div className="mt-1 flex items-center gap-2"><span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{tag}</span><span className="text-[10px] text-muted-foreground">{duration}</span></div></div></div>
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-border bg-white py-8 text-center">
                <Star className="mx-auto mb-3 h-7 w-7 text-yellow-400" fill="currentColor" />
                <p className="mb-1 text-sm font-semibold text-foreground">Besoin d'aide personnalisee ?</p>
                <p className="mb-5 text-xs text-muted-foreground">Notre equipe est la pour vous accompagner dans l'utilisation de Goriya</p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button size="sm" className="gap-1.5 rounded-full text-xs"><MessageSquare className="h-3.5 w-3.5" />Contacter le support</Button>
                    <Button size="sm" variant="ghost" className="gap-1.5 rounded-full text-xs text-muted-foreground"><ExternalLink className="h-3.5 w-3.5" />Documentation complete</Button>
                </div>
            </div>
        </div>
    )
}

function Channel({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center px-6 py-6 text-center border-b border-border sm:[&:nth-child(2)]:border-l sm:[&:nth-child(2)]:border-r lg:border-b-0 lg:[&:nth-child(2)]:border-l lg:[&:nth-child(2)]:border-r">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">{icon}</div>
            <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
            <p className="mb-4 text-xs text-muted-foreground">{subtitle}</p>
            <div className="text-sm text-muted-foreground">{children}</div>
        </div>
    )
}
