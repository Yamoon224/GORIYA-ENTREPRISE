"use client"

import Content from "./content"
import { SubscriptionGate } from "@/components/subscription-gate"

export default function Page() {
    return (
        <SubscriptionGate featureLabel="la publication d'offres d'emploi">
            <Content />
        </SubscriptionGate>
    )
}