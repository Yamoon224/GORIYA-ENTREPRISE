"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, User, MapPin, Calendar, GraduationCap, CircleDollarSign, Clock3, Star, FileText, MessageSquare, Plus, Check, X } from "lucide-react"

type CandidateStatus = "pending" | "interview" | "analyzed" | "accepted" | "rejected"

type Candidate = { id: number; name: string; title: string; status: CandidateStatus; statusLabel: string; statusClass: string; location: string; years: number; date: string; skills: string[]; degree: string; salary: string; availability: string; score: number }

const CANDIDATES: Candidate[] = [
  { id: 1, name: "Marie Dubois", title: "Developpeuse Full-Stack Senior", status: "pending", statusLabel: "En attente", statusClass: "bg-orange-100 text-orange-500", location: "Paris, France", years: 5, date: "2024-01-15", skills: ["React", "Node.js", "Python", "PostgreSQL"], degree: "Master Informatique", salary: "550.000 F", availability: "Disponible immediatement", score: 92 },
  { id: 2, name: "Jean Martin", title: "UX/UI Designer", status: "interview", statusLabel: "Entretien programme", statusClass: "bg-blue-100 text-blue-600", location: "Lyon, France", years: 3, date: "2024-01-14", skills: ["Figma", "Adobe XD", "Prototyping", "User Research"], degree: "Master Design", salary: "45-50K", availability: "Preavis 1 mois", score: 88 },
  { id: 3, name: "Sophie Laurent", title: "Chef de Projet Digital", status: "analyzed", statusLabel: "CV analyse", statusClass: "bg-gray-100 text-gray-500", location: "Marseille, France", years: 7, date: "2024-01-13", skills: ["Agile", "Scrum", "Management", "Jira"], degree: "Ecole de Commerce", salary: "60-70K", availability: "Disponible immediatement", score: 85 },
  { id: 4, name: "Thomas Rousseau", title: "Data Scientist", status: "rejected", statusLabel: "Refuse", statusClass: "bg-red-500 text-white", location: "Toulouse, France", years: 2, date: "2024-01-12", skills: ["Python", "Machine Learning", "SQL", "Pandas"], degree: "Master Data Science", salary: "45-55K", availability: "Preavis 2 mois", score: 65 },
  { id: 5, name: "Emma Leroy", title: "Developpeuse Full-Stack Senior", status: "accepted", statusLabel: "Accepte", statusClass: "bg-green-500 text-white", location: "Paris, France", years: 6, date: "2024-01-11", skills: ["Vue.js", "Django", "AWS", "Docker"], degree: "Ecole d'Ingenieur", salary: "60-70K", availability: "Disponible immediatement", score: 94 },
]

const TAB_LABELS = [
  { key: "all", label: "Toutes" },
  { key: "pending", label: "En attente" },
  { key: "interview", label: "Entretiens" },
  { key: "analyzed", label: "Analysees" },
  { key: "accepted", label: "Acceptees" },
  { key: "rejected", label: "Refusees" },
] as const

export default function CandidaturesPage() {
  const [query, setQuery] = useState("")
  const [jobFilter, setJobFilter] = useState("all")
  const [tab, setTab] = useState<(typeof TAB_LABELS)[number]["key"]>("all")

  const counts = useMemo(() => ({
    all: CANDIDATES.length,
    pending: CANDIDATES.filter((c) => c.status === "pending").length,
    interview: CANDIDATES.filter((c) => c.status === "interview").length,
    analyzed: CANDIDATES.filter((c) => c.status === "analyzed").length,
    accepted: CANDIDATES.filter((c) => c.status === "accepted").length,
    rejected: CANDIDATES.filter((c) => c.status === "rejected").length,
  }), [])

  const filtered = useMemo(() => {
    return CANDIDATES.filter((candidate) => {
      const inTab = tab === "all" || candidate.status === tab
      const inJob = jobFilter === "all" || candidate.title.toLowerCase().includes(jobFilter.toLowerCase())
      const q = query.toLowerCase().trim()
      const inSearch = q.length === 0 || candidate.name.toLowerCase().includes(q) || candidate.title.toLowerCase().includes(q) || candidate.skills.some((s) => s.toLowerCase().includes(q))
      return inTab && inJob && inSearch
    })
  }, [jobFilter, query, tab])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Candidatures</h1>

      <div className="rounded-xl border border-border bg-white p-3 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un candidat ou un poste..." className="h-10 pl-9" />
          </div>
          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="h-10 w-full md:w-[220px]"><SelectValue placeholder="Tous les postes" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les postes</SelectItem>
              <SelectItem value="developpeuse full-stack senior">Developpeuse Full-Stack Senior</SelectItem>
              <SelectItem value="ux/ui designer">UX/UI Designer</SelectItem>
              <SelectItem value="chef de projet digital">Chef de Projet Digital</SelectItem>
              <SelectItem value="data scientist">Data Scientist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <div className="grid min-w-[720px] grid-cols-6 overflow-hidden rounded-lg border border-border bg-muted/35 text-xs">
            {TAB_LABELS.map((item, i) => (
              <button key={item.key} onClick={() => setTab(item.key)} className={`py-2.5 text-center transition-colors ${tab === item.key ? "bg-white text-foreground" : "text-muted-foreground hover:bg-muted/60"} ${i > 0 ? "border-l border-border" : ""}`}>{item.label} ({counts[item.key]})</button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((candidate) => (
          <div key={candidate.id} className="rounded-xl border border-border bg-white px-4 py-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500"><User className="h-4 w-4 text-white" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2 flex-wrap"><h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3><span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${candidate.statusClass}`}>{candidate.statusLabel}</span></div>
                    <p className="text-sm text-muted-foreground">{candidate.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{candidate.location}</span><span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{candidate.years} ans</span><span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{candidate.date}</span></div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">{candidate.skills.map((skill) => <span key={skill} className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[10px] text-foreground">{skill}</span>)}</div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-5 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{candidate.degree}</span><span className="inline-flex items-center gap-1"><CircleDollarSign className="h-3.5 w-3.5" />Salaire: {candidate.salary}</span><span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{candidate.availability}</span></div>
                  </div>
                </div>

                <div className="mt-2.5 text-xs text-blue-500">Compatibilite IA</div>
                <div className="mt-1 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-blue-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${candidate.score}%` }} /></div><span className={`w-8 text-right text-xs font-semibold ${candidate.score >= 90 ? "text-green-500" : candidate.score >= 80 ? "text-blue-500" : "text-muted-foreground"}`}>{candidate.score}%</span></div>
              </div>

              <div className="w-full lg:w-[165px] shrink-0">
                <div className="mb-2 flex items-center lg:justify-end gap-1 text-sm font-semibold text-foreground"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /><span>{candidate.score}</span><span className="text-muted-foreground">/100</span></div>
                <p className="-mt-1 mb-2 lg:text-right text-[10px] text-muted-foreground">Score IA</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                  <Button size="sm" className="h-8 w-full justify-center gap-1 rounded-md bg-blue-500 text-xs hover:bg-blue-600"><FileText className="h-3.5 w-3.5" />Voir CV</Button>
                  <Button variant="outline" size="sm" className="h-8 w-full justify-center gap-1 rounded-md text-xs"><MessageSquare className="h-3.5 w-3.5" />Message</Button>
                  <Button variant="outline" size="sm" className="h-8 w-full justify-center gap-1 rounded-md text-xs"><Plus className="h-3.5 w-3.5" />Voir plus</Button>
                </div>
                {candidate.id === 1 && <div className="mt-2 overflow-hidden rounded-md border border-border bg-white shadow-sm"><button className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-green-600 hover:bg-green-50"><Check className="h-3.5 w-3.5" /> Accepter</button><button className="flex w-full items-center gap-1.5 border-t border-border px-3 py-1.5 text-xs text-red-500 hover:bg-red-50"><X className="h-3.5 w-3.5" /> Refuser</button></div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
