"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { subscriptionService } from "@/lib/api/subscription.service"

interface SubscriptionInfo {
    hasSubscription: boolean
    planName: string | null
    status: string | null
}

export function useSubscription() {
    const { data: session, status: sessionStatus } = useSession()
    const [info, setInfo] = useState<SubscriptionInfo>({ hasSubscription: false, planName: null, status: null })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (sessionStatus === "loading") return

        const userId = session?.user?.id
        if (!userId) {
            setLoading(false)
            return
        }
        subscriptionService
            .checkSubscription(userId)
            .then((res: any) => setInfo(res?.data ?? res))
            .catch((err) => {
                console.error("[use-subscription] checkSubscription error:", err)
                setError("Impossible de vérifier votre abonnement pour le moment.")
            })
            .finally(() => setLoading(false))
    }, [session, sessionStatus])

    return { ...info, loading, error }
}
