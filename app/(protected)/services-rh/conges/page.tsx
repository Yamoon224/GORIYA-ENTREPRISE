"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, Check, Calendar, AlertCircle, X, CheckCircle2 } from "lucide-react"

const stats = [
    { value: 5,   label: "En attente",    Icon: Clock,         color: "text-yellow-500" },
    { value: 12,  label: "Approuvées",    Icon: CheckCircle2,  color: "text-green-500"  },
    { value: 8,   label: "En cours",      Icon: Calendar,      color: "text-blue-500"   },
    { value: 247, label: "Total employés",Icon: AlertCircle,   color: "text-purple-500" },
]

const leaveRequests = [
    {
        id: 1,
        initials: "MD",
        name: "Marie Dubois",
        type: "Congés payés",
        startDate: "15/02/2024",
        endDate: "19/02/2024",
        days: "5 jours",
        reason: "Vacances d'hiver",
        status: "pending",
    },
    {
        id: 2,
        initials: "JM",
        name: "Jean Martin",
        type: "Congé maladie",
        startDate: "25/01/2024",
        endDate: "26/01/2024",
        days: "2 jours",
        reason: "Grippe",
        status: "approved",
    },
    {
        id: 3,
        initials: "SB",
        name: "Sophie Bernard",
        type: "RTT",
        startDate: "02/02/2024",
        endDate: "02/02/2024",
        days: "1 jour",
        reason: "Pont du weekend",
        status: "rejected",
    },
]

type Tab = "Demandes" | "Calendrier" | "Soldes"
const TABS: Tab[] = ["Demandes", "Calendrier", "Soldes"]

export default function CongesPage() {
    const [activeTab, setActiveTab] = useState<Tab>("Demandes")
    const [requests, setRequests] = useState(leaveRequests)

    const approveRequest = (id: number) =>
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)))

    const rejectRequest = (id: number) =>
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)))

    return (
        <div className="space-y-5">
            <h1 className="text-xl font-semibold text-foreground">Congés</h1>

            {/* Stats — panneau jointé */}
            <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-white sm:grid-cols-2 lg:grid-cols-4">
                {stats.map(({ value, label, Icon, color }, i) => (
                    <div
                        key={label}
                        className={`flex items-center justify-between px-6 py-6 ${i < stats.length - 1 ? "border-b border-border lg:border-b-0 lg:border-r" : ""}`}
                    >
                        <div>
                            <p className={`text-3xl font-bold ${color}`}>{value}</p>
                            <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
                        </div>
                        <Icon className={`h-8 w-8 ${color}`} strokeWidth={1.5} />
                    </div>
                ))}
            </div>

            {/* Onglets — panneau jointé */}
            <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-border bg-white sm:grid-cols-3">
                {TABS.map((tab, i) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                                className={`py-3 text-sm font-medium transition-colors
                            ${activeTab === tab ? "bg-white text-foreground shadow-sm" : "bg-muted/40 text-muted-foreground hover:bg-muted/60"}
                            ${i > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Contenu onglet Demandes */}
            {activeTab === "Demandes" && (
                <div className="overflow-hidden rounded-xl border border-border bg-white">
                    <div className="px-6 py-5">
                        <h2 className="text-lg font-bold text-foreground">Demandes de congés</h2>
                        <p className="text-sm text-muted-foreground">
                            Gérez les demandes en attente et consultez l&apos;historique
                        </p>
                    </div>

                    <div className="divide-y divide-border">
                        {requests.map((req) => (
                            <div key={req.id} className="flex flex-col gap-3 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                                {/* Avatar + infos */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">
                                        {req.initials}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-semibold text-foreground">{req.name}</p>
                                        <p className="text-sm text-muted-foreground">{req.type}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5 shrink-0" />
                                            <span>
                                                {req.startDate} - {req.endDate}
                                            </span>
                                            <span>{req.days}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{req.reason}</p>
                                    </div>
                                </div>

                                {/* Statut + actions */}
                                <div className="flex items-center gap-2 shrink-0 lg:self-auto">
                                    {req.status === "pending" && (
                                        <>
                                            <span className="flex items-center gap-1.5 text-xs font-medium text-orange-500 mr-2">
                                                <Clock className="h-3.5 w-3.5" />
                                                En attente
                                            </span>
                                            <button
                                                onClick={() => approveRequest(req.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded border border-border hover:border-green-300 hover:bg-green-50 transition-colors"
                                            >
                                                <Check className="h-4 w-4 text-green-600" />
                                            </button>
                                            <button
                                                onClick={() => rejectRequest(req.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded border border-border hover:border-red-300 hover:bg-red-50 transition-colors"
                                            >
                                                <X className="h-4 w-4 text-red-500" />
                                            </button>
                                        </>
                                    )}
                                    {req.status === "approved" && (
                                        <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                                            <Check className="h-4 w-4" />
                                            Approuvé
                                        </span>
                                    )}
                                    {req.status === "rejected" && (
                                        <Badge className="gap-1 rounded-full bg-red-500 px-3 text-white hover:bg-red-500">
                                            <X className="h-3 w-3" />
                                            Rejeté
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab !== "Demandes" && (
                <div className="flex items-center justify-center rounded-xl border border-border bg-white py-20 text-muted-foreground">
                    Contenu de l&apos;onglet «&nbsp;{activeTab}&nbsp;» à venir
                </div>
            )}
    </div>
  )
}
