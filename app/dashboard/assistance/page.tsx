"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Target, Crown } from "lucide-react"

const plans = [
  {
    name: "Grouilleur",
    description: "Pour les chercheurs d'emploi actifs",
    price: "0",
    currency: "FCFA",
    period: "/ mois - Gratuit",
    popular: false,
    icon: Zap,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
    buttonVariant: "outline" as const,
    buttonText: "Commencer l'essai gratuit",
    features: [
      "20 analyses CV par mois",
      "Suggestions avancées IA",
      "Multi-formats export",
      "Personnalisation sectorielle",
      "Support prioritaire",
    ],
  },
  {
    name: "Standard",
    description: "La solution complète",
    price: "1 999",
    currency: "FCFA",
    period: "/ mois",
    popular: true,
    icon: Target,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100",
    buttonVariant: "default" as const,
    buttonText: "Opter pour ça",
    features: [
      "30 analyses CV par mois",
      "Suggestions avancées IA",
      "Multi-formats export",
      "Personnalisation sectorielle",
      "Support prioritaire",
    ],
  },
  {
    name: "Premium",
    description: "Pour les professionnels exigeants",
    price: "4 999",
    currency: "FCFA",
    period: "/ mois",
    popular: false,
    icon: Crown,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    buttonVariant: "outline" as const,
    buttonText: "Opter pour ça",
    features: [
      "20 analyses CV par mois",
      "Suggestions avancées IA",
      "Multi-formats export",
      "Personnalisation sectorielle",
      "Support prioritaire",
    ],
  },
]

export default function AssistancePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-lg font-medium text-foreground mb-8">Centre d&apos;assistance</h1>
      </div>

      {/* Pricing Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Choisissez votre forfait
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Choisissez le plan qui correspond à vos ambitions professionnelles.
          <br />
          Commencez gratuitement et évoluez selon vos besoins.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative bg-card ${
              plan.popular ? "ring-2 ring-primary shadow-xl scale-105 z-10" : ""
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-muted text-muted-foreground">
                Plan populaire
              </Badge>
            )}

            <CardHeader className="pb-4 pt-6">
              <div
                className={`h-12 w-12 rounded-lg ${plan.iconBg} flex items-center justify-center mb-4`}
              >
                <plan.icon className={`h-6 w-6 ${plan.iconColor}`} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Button
                  variant={plan.buttonVariant}
                  className={`flex-1 ${
                    plan.buttonVariant === "outline"
                      ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      : ""
                  }`}
                >
                  {plan.buttonText}
                </Button>
                <div className="text-right">
                  <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">{plan.currency}</span>
                  <p className="text-xs text-muted-foreground">{plan.period}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Section */}
      <div className="text-center py-12 border-t border-border">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Une question ? Besoin d&apos;aide ?
        </h3>
        <p className="text-muted-foreground mb-6">
          Notre équipe est là pour vous accompagner dans votre choix et répondre à toutes vos questions.
        </p>
        <Button variant="outline" size="lg">
          Contacter le support
        </Button>
      </div>
    </div>
  )
}
