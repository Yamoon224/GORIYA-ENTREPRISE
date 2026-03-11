"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  MessageSquare,
  Mail,
  Phone,
  Search,
  ChevronDown,
  ChevronRight,
  Zap,
  FileText,
  Users,
  CreditCard,
  BookOpen,
  Video,
  FileCode,
  Star,
  ExternalLink,
} from "lucide-react"

const categories = [
  { label: "IA", count: 8, icon: Zap, color: "bg-blue-500", textColor: "text-blue-500" },
  { label: "Offres", count: 12, icon: FileText, color: "bg-green-500", textColor: "text-green-500" },
  { label: "Candidatures", count: 6, icon: Users, color: "bg-orange-500", textColor: "text-orange-500" },
  { label: "Facturation", count: 4, icon: CreditCard, color: "bg-red-500", textColor: "text-red-500" },
]

const faqs = [
  {
    question: "Comment optimiser mes offres d'emploi avec l'IA ?",
    tag: "IA",
    tagColor: "bg-blue-100 text-blue-600",
    answer:
      "L'IA de Goriya analyse automatiquement vos offres et suggère des améliorations pour attirer les meilleurs candidats. Activez l'option 'Optimisation IA' lors de la création d'une offre.",
  },
  {
    question: "Comment interpréter le score IA des candidats ?",
    tag: "IA",
    tagColor: "bg-blue-100 text-blue-600",
    answer:
      "Le score IA (sur 100) représente la compatibilité entre le profil du candidat et votre offre. Un score supérieur à 80 indique un excellent match. Il prend en compte les compétences, l'expérience et les préférences salariales.",
  },
  {
    question: "Puis-je modifier une offre après publication ?",
    tag: "Offres",
    tagColor: "bg-green-100 text-green-600",
    answer:
      "Oui, vous pouvez modifier vos offres publiées depuis la page Mes annonces. Cliquez sur le bouton Modifier de l'offre concernée.",
  },
  {
    question: "Comment contacter un candidat ?",
    tag: "Candidatures",
    tagColor: "bg-orange-100 text-orange-600",
    answer:
      "Depuis la page Candidatures, cliquez sur le bouton Message à côté du profil du candidat pour ouvrir une conversation directe.",
  },
  {
    question: "Combien coûte l'abonnement Premium ?",
    tag: "Facturation",
    tagColor: "bg-red-100 text-red-600",
    answer:
      "L'abonnement Premium est à 4 999 FCFA par mois. Il inclut un nombre illimité d'analyses CV, des suggestions IA avancées et un support prioritaire.",
  },
]

const resources = [
  {
    icon: BookOpen,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Guide de démarrage rapide",
    description: "Apprenez les bases de Goriya en 5 minutes",
    tag: "guide",
    duration: "5 min",
  },
  {
    icon: Video,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Maximiser l'efficacité de l'IA",
    description: "Tutoriel vidéo sur l'optimisation IA",
    tag: "vidéo",
    duration: "12 min",
  },
  {
    icon: BookOpen,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Meilleures pratiques de recrutement",
    description: "Guide complet pour recruter efficacement",
    tag: "guide",
    duration: "20 min",
  },
  {
    icon: FileCode,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "API et intégrations",
    description: "Documentation technique pour les développeurs",
    tag: "docs",
    duration: "Variable",
  },
]

export default function AssistancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="space-y-0">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-foreground">Centre d&apos;assistance</h1>
        <p className="text-sm text-muted-foreground mt-1">Trouvez rapidement les réponses à vos questions</p>
      </div>

      {/* Hero Banner */}
      <div className="rounded-xl bg-primary px-8 py-10 text-center text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">Comment pouvons-nous vous aider ?</h2>
        <p className="text-blue-100 text-sm mb-6">
          Trouvez rapidement les réponses à vos questions ou contactez notre équipe support
        </p>
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-10 bg-white text-foreground rounded-lg w-full"
          />
        </div>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border border-border">
          <CardContent className="p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">Chat en direct</h3>
            <p className="text-xs text-muted-foreground mb-4">Discutez avec notre équipe support</p>
            <Button size="sm" className="w-full text-xs rounded-lg">
              Démarrer une conversation
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">Email support</h3>
            <p className="text-xs text-muted-foreground mb-4">Contactez-nous par email</p>
            <p className="text-sm font-medium text-foreground">support@goriya.com</p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Phone className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">Téléphone</h3>
            <p className="text-xs text-muted-foreground mb-4">Appelez notre support</p>
            <p className="text-sm font-medium text-foreground">+33 1 23 45 67 89</p>
          </CardContent>
        </Card>
      </div>

      {/* Browse by category */}
      <Card className="border border-border mb-6">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4">Parcourir par catégorie</h3>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 text-sm font-medium hover:bg-muted transition-colors text-left"
              >
                <div className={`h-8 w-8 rounded-lg ${cat.color} flex items-center justify-center shrink-0`}>
                  <cat.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} articles</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="border border-border mb-6">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4">Questions fréquentes</h3>
          <div className="space-y-0 divide-y divide-border">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-sm text-foreground">{faq.question}</span>
                    <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${faq.tagColor}`}>
                      {faq.tag}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Useful Resources */}
      <Card className="border border-border mb-6">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4">Ressources utiles</h3>
          <div className="space-y-0 divide-y divide-border">
            {resources.map((res, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 cursor-pointer hover:bg-muted/30 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-lg ${res.iconBg} flex items-center justify-center shrink-0`}>
                    <res.icon className={`h-5 w-5 ${res.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{res.title}</p>
                    <p className="text-xs text-muted-foreground">{res.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{res.tag}</span>
                      <span className="text-xs text-muted-foreground">{res.duration}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Help */}
      <Card className="border border-border">
        <CardContent className="p-8 text-center">
          <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" fill="currentColor" />
          <h3 className="font-semibold text-foreground mb-2">Besoin d&apos;aide personnalisée ?</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Notre équipe d&apos;experts est là pour vous accompagner dans l&apos;utilisation de Goriya
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Contacter le support
            </Button>
            <Button size="sm" variant="ghost" className="gap-2 text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              Documentation complète
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
