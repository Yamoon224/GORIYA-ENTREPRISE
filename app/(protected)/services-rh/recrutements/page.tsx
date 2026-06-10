"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MapPin } from "lucide-react"

const stats = [
    { value: 3, label: "Offres actives", color: "text-purple-600" },
    { value: 3, label: "Candidatures", color: "text-green-500" },
    { value: 2, label: "Entretiens prévus", color: "text-yellow-500" },
    { value: 8, label: "En processus", color: "text-blue-500" },
]

const tabs = ["Offres d'emploi", "Candidats", "Entretiens", "Pipeline"]

const offers = [
    {
        title: "Développeur Frontend React",
        status: "Actif",
        department: "Développement",
        location: "Paris",
        contract: "CDI",
        salary: "45-55k€",
        candidates: 12,
    },
    {
        title: "Designer UX/UI",
        status: "Actif",
        department: "Design",
        location: "Lyon",
        contract: "CDI",
        salary: "40-50k€",
        candidates: 8,
    },
    {
        title: "Chef de Projet Marketing",
        status: "En pause",
        department: "Marketing",
        location: "Remote",
        contract: "CDI",
        salary: "50-60k€",
        candidates: 15,
    },
]

function StatusBadge({ status }: { status: string }) {
    if (status === "Actif") {
        return (
            <Badge className="rounded-full bg-purple-600 px-3 text-xs font-normal text-white hover:bg-purple-600">
                Actif
            </Badge>
        )
    }
    return (
        <Badge className="rounded-full bg-gray-100 px-3 text-xs font-normal text-gray-500 hover:bg-gray-100">
            En pause
        </Badge>
    )
}

export default function RecrutementsPage() {
    const [activeTab, setActiveTab] = useState("Offres d'emploi")

    return (
        <div className="space-y-5">
            <h1 className="text-xl font-semibold text-foreground">Recrutements</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-xl border border-border bg-white lg:grid-cols-4">
                {stats.map((s, i) => (
                    <div
                        key={s.label}
                        className={`flex flex-col items-center justify-center py-6 ${i < stats.length - 1 ? "border-r border-border" : ""}`}
                    >
                        <span className={`text-3xl font-bold ${s.color}`}>{s.value}</span>
                        <span className="mt-1 text-sm text-muted-foreground">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-white lg:grid-cols-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-3 text-sm font-medium transition-colors ${
                            activeTab === tab
                                ? "bg-white text-foreground shadow-sm"
                                : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
                        } ${tab !== tabs[0] ? "border-l border-border" : ""}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === "Offres d'emploi" && (
                <div className="overflow-hidden rounded-xl border border-border bg-white">
                    <div className="px-6 py-5">
                        <h2 className="text-lg font-bold text-foreground">Offres d&apos;emploi actives</h2>
                        <p className="text-sm text-muted-foreground">Gérez vos offres d&apos;emploi et suivez les candidatures</p>
                    </div>
                    <div className="divide-y divide-border">
                        {offers.map((offer) => (
                            <div key={offer.title} className="flex flex-col gap-3 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                                {/* Left */}
                                <div className="space-y-1.5 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-base font-semibold text-foreground">{offer.title}</span>
                                        <StatusBadge status={offer.status} />
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span>{offer.department}</span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {offer.location}
                                        </span>
                                        <span>{offer.contract}</span>
                                        <span className="font-medium text-foreground">{offer.salary}</span>
                                    </div>
                                </div>
                                {/* Right */}
                                <div className="flex items-center justify-between gap-4 lg:justify-end">
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-foreground">{offer.candidates}</p>
                                        <p className="text-xs text-muted-foreground">Candidats</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                                        <Eye className="h-4 w-4" />
                                        Voir
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab !== "Offres d'emploi" && (
                <div className="flex items-center justify-center rounded-xl border border-border bg-white py-20 text-muted-foreground">
                    Contenu de l&apos;onglet «&nbsp;{activeTab}&nbsp;» à venir
                </div>
            )}
        </div>
    )
}
