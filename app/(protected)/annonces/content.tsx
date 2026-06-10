"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Users, Eye, TrendingUp, Calendar, Edit, MoreHorizontal } from "lucide-react"
import { AnnonceContentProps } from "@/@types/props"

type JobStatus = "ACTIVE" | "PAUSED" | "DRAFT" | "CLOSED"
type Job = { id: number; title: string; location: string; category: string; salary: string; applicants: number; views: number; match: number; published: string; status: JobStatus }

const jobsSeed: Job[] = [
  { id: 1, title: "Developpeur Full-Stack Senior", location: "Marcory Zone 4", category: "Technologie", salary: "350.000 F", applicants: 45, views: 892, match: 78, published: "Publie le 15 Jan 2024", status: "ACTIVE" },
  { id: 2, title: "UX/UI Designer", location: "Marcory Zone 4", category: "Design", salary: "350.000 F", applicants: 32, views: 654, match: 72, published: "Publie le 10 Jan 2024", status: "ACTIVE" },
  { id: 3, title: "Chef de Projet Digital", location: "Remote", category: "Management", salary: "950.000 F", applicants: 28, views: 543, match: 69, published: "Publie le 5 Jan 2024", status: "PAUSED" },
  { id: 4, title: "Data Scientist", location: "Marcory Zone 4", category: "Technologie", salary: "650.000 F", applicants: 0, views: 0, match: 0, published: "Publie le Draft", status: "DRAFT" },
  { id: 5, title: "Responsable Marketing Digital", location: "Marcory Zone 4", category: "Marketing", salary: "850.000 F", applicants: 67, views: 1234, match: 85, published: "Publie le 20 Dec 2023", status: "CLOSED" },
]

const statusMap: Record<JobStatus, { label: string; className: string }> = {
  ACTIVE: { label: "Active", className: "bg-green-500 text-white" },
  PAUSED: { label: "En pause", className: "bg-gray-200 text-gray-700" },
  DRAFT: { label: "Brouillon", className: "bg-gray-200 text-gray-700" },
  CLOSED: { label: "Fermee", className: "bg-red-500 text-white" },
}

export function Content({ init }: AnnonceContentProps) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<string>("all")

  const jobs = useMemo(() => {
    void init
    return jobsSeed.filter((j) => {
      const q = query.toLowerCase().trim()
      const inQ = q.length === 0 || j.title.toLowerCase().includes(q) || j.category.toLowerCase().includes(q) || j.location.toLowerCase().includes(q)
      const inS = status === "all" || j.status === status
      return inQ && inS
    })
  }, [init, query, status])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Mes annonces</h1>
        <p className="mt-2 text-sm sm:text-base font-medium text-foreground">Gerez et analysez toutes les candidatures recues</p>
      </div>

      <div className="rounded-xl border border-border bg-white p-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une annonce..." className="h-10 pl-9" />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-10 w-full md:w-[170px]"><SelectValue placeholder="Tous les status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les status</SelectItem><SelectItem value="ACTIVE">Active</SelectItem><SelectItem value="PAUSED">En pause</SelectItem><SelectItem value="DRAFT">Brouillon</SelectItem><SelectItem value="CLOSED">Fermee</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-10 w-10 self-end md:self-auto"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-xl border border-border bg-white px-4 py-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">{job.title}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"><span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span><span>{job.category}</span><span>{job.salary}</span></div>
                <div className="mt-3 flex flex-wrap items-center gap-5 text-sm"><span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-blue-500" />{job.applicants} candidatures</span><span className="inline-flex items-center gap-1.5"><Eye className="h-4 w-4 text-green-500" />{job.views} vues</span><span className="inline-flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-orange-500" />{job.match}% match moyen</span><span className="inline-flex items-center gap-1.5 text-muted-foreground"><Calendar className="h-4 w-4" />{job.published}</span></div>
              </div>

              <div className="flex flex-row lg:flex-col lg:items-end items-center justify-between gap-3 lg:gap-5">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusMap[job.status].className}`}>{statusMap[job.status].label}</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-md text-sm"><Eye className="h-4 w-4" />Voir</Button>
                  <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-md text-sm"><Edit className="h-4 w-4" />Modifier</Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9"><MoreHorizontal className="h-5 w-5" /></Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden"><Link href="/poster-offre">Publier une annonce</Link></div>
    </div>
  )
}
