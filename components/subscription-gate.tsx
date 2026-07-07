"use client"

import React from "react"
import Link from "next/link"
import { Lock, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSubscription } from "@/hooks/use-subscription"

interface SubscriptionGateProps {
    children: React.ReactNode
    featureLabel?: string
}

export function SubscriptionGate({ children, featureLabel = "cette fonctionnalité" }: SubscriptionGateProps) {
    // ⚠️ Ce contrôle est purement côté client (UX) : il évite d'afficher une fonctionnalité
    // non accessible, mais ne remplace pas une vérification côté backend. Le vrai contrôle
    // d'accès à la ressource doit être appliqué par l'API appelée (retour 401/403 si
    // l'abonnement n'est pas actif) ; aucune nouvelle logique serveur n'a été ajoutée ici.
    const { hasSubscription, loading, error } = useSubscription()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-[#2f6de6]" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] px-4 text-center">
                <p className="text-sm text-destructive">{error}</p>
            </div>
        )
    }

    if (!hasSubscription) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] px-4 text-center">
                <div className="w-16 h-16 rounded-full bg-[#eef3ff] flex items-center justify-center mb-5">
                    <Lock className="h-7 w-7 text-[#2f6de6]" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                    Abonnement requis
                </h2>
                <p className="text-muted-foreground text-sm max-w-sm mb-6">
                    Un abonnement actif est nécessaire pour accéder à {featureLabel}.
                    Choisis un plan pour débloquer toutes les fonctionnalités.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/auth/signup/plan">
                        <Button className="rounded-full bg-[#2f6de6] hover:bg-[#2157d3] text-white px-6 gap-2">
                            <Sparkles className="h-4 w-4" />
                            Voir les plans
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="outline" className="rounded-full px-6">
                            Retour au tableau de bord
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
