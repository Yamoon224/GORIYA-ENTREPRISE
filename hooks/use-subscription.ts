"use client"

import { useState, useEffect } from "react"
import { subscriptionService } from "@/lib/api/subscription.service"
import { getAuth } from "@/lib/utils"

interface SubscriptionInfo {
    hasSubscription: boolean
    planName: string | null
    status: string | null
}

export function useSubscription() {
    const [info, setInfo] = useState<SubscriptionInfo>({ hasSubscription: false, planName: null, status: null })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const auth = getAuth()
        const userId = auth?.user?.id ?? auth?.user?.sub
        if (!userId) {
            setLoading(false)
            return
        }
        subscriptionService
            .checkSubscription(userId)
            .then((res: any) => setInfo(res?.data ?? res))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return { ...info, loading }
}
