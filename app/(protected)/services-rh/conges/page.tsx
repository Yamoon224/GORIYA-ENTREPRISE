"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Check, Calendar, AlertCircle, X, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { value: 5, label: "En attente", icon: Clock, color: "text-orange-500", borderColor: "border-orange-200" },
  { value: 12, label: "Approuvées", icon: CheckCircle2, color: "text-green-500", borderColor: "border-green-200" },
  { value: 8, label: "En cours", icon: Calendar, color: "text-blue-500", borderColor: "border-blue-200" },
  { value: 247, label: "Total employés", icon: AlertCircle, color: "text-purple-500", borderColor: "border-purple-200" },
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
    color: "bg-blue-100 text-blue-700",
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
    color: "bg-purple-100 text-purple-700",
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
    color: "bg-green-100 text-green-700",
  },
]

type Tab = "Demandes" | "Calendrier" | "Soldes"

export default function CongesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Demandes")
  const [requests, setRequests] = useState(leaveRequests)

  const approveRequest = (id: number) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)))
  }

  const rejectRequest = (id: number) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)))
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Congés</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={`border ${stat.borderColor}`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color} opacity-70`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["Demandes", "Calendrier", "Soldes"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "Demandes" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">Demandes de congés</h2>
            <p className="text-sm text-muted-foreground">Gérez les demandes en attente et consultez l&apos;historique</p>
          </div>

          <div className="space-y-3">
            {requests.map((req) => (
              <Card key={req.id} className="border border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${req.color}`}
                      >
                        {req.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{req.name}</p>
                        <p className="text-sm text-muted-foreground">{req.type}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {req.startDate} – {req.endDate}
                          </span>
                          <span>{req.days}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{req.reason}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {req.status === "pending" && (
                        <>
                          <span className="flex items-center gap-1.5 text-xs text-orange-600 font-medium">
                            <Clock className="h-3.5 w-3.5" />
                            En attente
                          </span>
                          <button
                            onClick={() => approveRequest(req.id)}
                            className="h-8 w-8 rounded border border-border flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-colors"
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => rejectRequest(req.id)}
                            className="h-8 w-8 rounded border border-border flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </button>
                        </>
                      )}
                      {req.status === "approved" && (
                        <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                          <Check className="h-4 w-4" />
                          Approuvé
                        </span>
                      )}
                      {req.status === "rejected" && (
                        <Badge className="bg-red-500 text-white hover:bg-red-600 gap-1">
                          <X className="h-3 w-3" />
                          Rejeté
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Calendrier" && (
        <Card className="border border-border">
          <CardContent className="p-12 text-center text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Vue calendrier des congés</p>
          </CardContent>
        </Card>
      )}

      {activeTab === "Soldes" && (
        <Card className="border border-border">
          <CardContent className="p-12 text-center text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Soldes de congés par employé</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
