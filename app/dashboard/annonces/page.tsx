"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  MapPin,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  Edit,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type JobStatus = "active" | "paused" | "draft" | "closed"

interface JobListing {
  id: number
  title: string
  location: string
  department: string
  salary: string
  applicants: number
  views: number
  matchScore: number
  publishedDate: string
  status: JobStatus
}

const jobListings: JobListing[] = [
  {
    id: 1,
    title: "Développeur Full-Stack Senior",
    location: "Marcory Zone 4",
    department: "Technologie",
    salary: "350.000 F",
    applicants: 45,
    views: 392,
    matchScore: 78,
    publishedDate: "15 Jan 2024",
    status: "active",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    location: "Marcory Zone 4",
    department: "Design",
    salary: "350.000 F",
    applicants: 32,
    views: 654,
    matchScore: 72,
    publishedDate: "10 Jan 2024",
    status: "active",
  },
  {
    id: 3,
    title: "Chef de Projet Digital",
    location: "Remote",
    department: "Management",
    salary: "950.000 F",
    applicants: 28,
    views: 543,
    matchScore: 68,
    publishedDate: "5 Jan 2024",
    status: "paused",
  },
  {
    id: 4,
    title: "Data Scientist",
    location: "Marcory Zone 4",
    department: "Technologie",
    salary: "650.000 F",
    applicants: 0,
    views: 0,
    matchScore: 0,
    publishedDate: "Draft",
    status: "draft",
  },
  {
    id: 5,
    title: "Responsable Marketing Digital",
    location: "Marcory Zone 4",
    department: "Marketing",
    salary: "850.000 F",
    applicants: 67,
    views: 1234,
    matchScore: 85,
    publishedDate: "20 Déc 2023",
    status: "closed",
  },
]

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-green-100 text-green-700" },
  paused: { label: "En pause", className: "bg-yellow-100 text-yellow-700" },
  draft: { label: "Brouillon", className: "bg-gray-100 text-gray-700" },
  closed: { label: "Fermée", className: "bg-red-100 text-red-700" },
}

export default function MesAnnoncesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mes annonces</h1>
          <p className="text-muted-foreground mt-1">
            Gérez et analysez toutes les candidatures reçues
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/dashboard/poster-offre">Publier une annonce</Link>
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="w-64 pl-9" />
          </div>
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une annonce..."
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tous les status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">En pause</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="closed">Fermée</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                    <Badge className={statusConfig[job.status].className}>
                      {statusConfig[job.status].label}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span>{job.department}</span>
                    <span>{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {job.applicants} candidatures
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {job.views} vues
                    </span>
                    {job.matchScore > 0 && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        {job.matchScore}% match moyen
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {job.status === "draft" ? "Brouillon" : `Publié le ${job.publishedDate}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Voir
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Edit className="h-4 w-4" />
                    Modifier
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                      <DropdownMenuItem>Archiver</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
