"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Circle } from "lucide-react"

const plans = [
  {
    name: "Business",
    description: "Pour les chercheurs d'emploi actifs",
    price: "35 500",
    currency: "FCFA",
    period: "/ mois",
    popular: true,
    icon: "orange",
    features: [
      "25 analyses CV par mois",
      "Suggestions avancées IA",
      "Multi-formats export",
      "Personnalisation sectorielle",
      "Support prioritaire",
    ],
  },
  {
    name: "Business +",
    description: "Pour les chercheurs d'emplois actifs",
    price: "351 900",
    currency: "FCFA",
    period: "/ mois",
    popular: false,
    icon: "gray",
    features: [
      "25 analyses CV par mois",
      "Suggestions avancées IA",
      "Multi-formats export",
      "Personnalisation sectorielle",
      "Support prioritaire",
    ],
  },
]

export default function ChoosePlanPage() {
  const router = useRouter()

  const handleSelectPlan = () => {
    router.push("/signup/success")
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center text-foreground mb-2">
        Choisissez votre forfait
      </h1>
      
      <div className="flex justify-center gap-1 mb-8">
        <Circle className="h-2 w-2 fill-primary text-primary" />
        <Circle className="h-2 w-2 fill-primary text-primary" />
        <Circle className="h-2 w-2 fill-primary text-primary" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative bg-card ${
              plan.popular ? "ring-2 ring-primary shadow-lg" : ""
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-muted text-muted-foreground">
                Plan populaire
              </Badge>
            )}
            
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`h-8 w-8 rounded-full ${
                    plan.icon === "orange" ? "bg-orange-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-3 mb-6">
                <Button onClick={handleSelectPlan} className="flex-1">
                  Opter pour ça
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
    </div>
  )
}
