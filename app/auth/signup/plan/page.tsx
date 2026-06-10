"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const features = [
    "20 analyses CV par mois",
    "Suggestions avancées IA",
    "Multi-formats export",
    "Personnalisation sectorielle",
    "Support prioritaire",
]

export default function ChoosePlanPage() {
    const router = useRouter()

    const handleSelectPlan = () => {
        router.push("/auth/signup/success")
    }

    return (
        <div className="py-4 sm:py-6">
            <h1 className="mb-2 text-center text-2xl font-black text-foreground sm:text-4xl">
                Choisissez votre forfait
            </h1>

            <p className="mb-8 text-center text-base tracking-[0.4em] text-muted-foreground sm:mb-10">
                + + +
            </p>

            <div className="flex flex-col items-stretch justify-center gap-4 lg:flex-row lg:items-start">
                {/* ─── Business (populaire) ─── */}
                <div className="relative w-full max-w-[360px] self-center lg:w-[280px] lg:max-w-none">
                    {/* Badge flottant */}
                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                        <span className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-1 text-xs text-gray-500 shadow-sm">
                            Plan populaire
                        </span>
                    </div>

                    {/* Gradient border wrapper */}
                    <div className="rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-400 to-blue-600 p-[3px] shadow-xl">
                        <div className="overflow-hidden rounded-2xl bg-white">
                            {/* Header */}
                            <div className="p-5">
                                <div className="mb-2 text-3xl">🔥</div>
                                <h3 className="text-[22px] font-bold text-foreground">Business</h3>
                                <p className="mb-4 text-[11px] text-muted-foreground">
                                    Pour les chercheurs d&apos;emploi actifs
                                </p>
                                <div className="flex items-center gap-3">
                                    <Button
                                        onClick={handleSelectPlan}
                                        className="rounded-full bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
                                    >
                                        Opter pour ça
                                    </Button>
                                    <div className="leading-tight">
                                        <div className="flex items-baseline gap-0.5">
                                            <span className="text-lg font-bold text-foreground">35 500</span>
                                            <span className="ml-0.5 text-[10px] font-semibold text-muted-foreground">FCFA</span>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground">Mensuel</p>
                                    </div>
                                </div>
                            </div>
                            {/* Features */}
                            <div className="bg-gray-50 px-5 py-4">
                                <ul className="space-y-2">
                                    {features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                                            <Check className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Business + ─── */}
                <div className="w-full max-w-[360px] self-center lg:mt-7 lg:w-[260px] lg:max-w-none">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        {/* Header */}
                        <div className="p-5">
                            <div className="mb-2 text-3xl grayscale">💎</div>
                            <h3 className="text-[22px] font-bold text-blue-600">Business +</h3>
                            <p className="mb-4 text-[11px] text-muted-foreground">
                                Pour les chercheurs d&apos;emploi actifs
                            </p>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={handleSelectPlan}
                                    className="rounded-full bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Opter pour ça
                                </Button>
                                <div className="leading-tight">
                                    <div className="flex items-baseline gap-0.5">
                                        <span className="text-lg font-bold text-foreground">351 900</span>
                                        <span className="ml-0.5 text-[10px] font-semibold text-muted-foreground">FCFA</span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">Annuel</p>
                                </div>
                            </div>
                        </div>
                        {/* Features */}
                        <div className="bg-gray-50 px-5 py-4">
                            <ul className="space-y-2">
                                {features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                                        <Check className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
