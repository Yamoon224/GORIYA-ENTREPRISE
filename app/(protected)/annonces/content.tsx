"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { IOffer, IPaginatedResponse } from "@/@types/interface"
import { getJobOffers } from "@/actions/offers"
import { AnnonceContentProps } from "@/@types/props"
import { formatDate } from "@/lib/utils"

type JobStatus = "ACTIVE" | "DRAFT" | "CLOSED"

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
    ACTIVE: { label: "Active", className: "bg-green-100 text-green-700" },
    // paused: { label: "En pause", className: "bg-yellow-100 text-yellow-700" },
    DRAFT: { label: "Brouillon", className: "bg-gray-100 text-gray-700" },
    CLOSED: { label: "Fermée", className: "bg-red-100 text-red-700" },
}

export function Content({ init, token }: AnnonceContentProps) {
    const [jobListings, setJobListings] = useState<IPaginatedResponse<IOffer>>(init)
    const [page, setPage] = useState(init.meta.page)
    const [limit, setLimit] = useState(init.meta.limit)
    const [totalPages, setTotalPages] = useState(Math.ceil(init.meta.total / init.meta.limit))
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")

    const fetchJobs = async () => {
        try {
            const filters: any = { page, limit }
            if (searchQuery) filters.title = searchQuery
            if (statusFilter !== "all") filters.status = statusFilter

            const response = await getJobOffers(filters, token)
            setJobListings(response)
            setPage(response.meta.page)
            setLimit(response.meta.limit)
            setTotalPages(Math.ceil(response.meta.total / response.meta.limit))
        } catch (error) {
            console.error("Erreur fetch jobs:", error)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [page, limit, searchQuery, statusFilter])

    const totalItems = jobListings.meta.total

    const from = totalItems === 0 ? 0 : (page - 1) * limit + 1
    const to = Math.min(page * limit, totalItems)

    return (
        <div className="space-y-6"> {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Mes annonces</h1>
                    <p className="text-muted-foreground mt-1"> Gérez et analysez toutes les candidatures reçues </p>
                </div>
                <div className="flex items-center gap-4">
                    
                    {/* <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Rechercher..." className="w-64 pl-9" /> 
                    </div>
                    <Button variant="ghost" size="icon"> 
                        <RefreshCw className="h-5 w-5" /> 
                    </Button> */}
                    <Select value={statusFilter} onValueChange={setStatusFilter}> 
                        <SelectTrigger className="w-48"> 
                            <SelectValue placeholder="Tous les status" /> 
                        </SelectTrigger> 
                        <SelectContent> 
                            <SelectItem value="all">Tous les status</SelectItem> 
                            <SelectItem value="ACTIVE">Active</SelectItem> 
                            {/* <SelectItem value="paused">En pause</SelectItem>  */}
                            <SelectItem value="DRAFT">Brouillon</SelectItem> 
                            <SelectItem value="CLOSED">Fermée</SelectItem> 
                        </SelectContent> 
                    </Select> 

                    <Button asChild> 
                        <Link href="/poster-offre">Publier une annonce</Link> 
                    </Button>
                </div>
            </div>
            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md"> 
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> 
                    <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher une annonce..." className="pl-9" /> 
                </div> 
                
                {/* <Button variant="outline" size="icon"> 
                    <Filter className="h-4 w-4" /> 
                </Button>  */}
            </div> 
            {/* Job Listings */} 
            <div className="space-y-4"> 
                {
                    jobListings.data.map((job: IOffer) => (
                    <Card key={job.id} className="bg-card hover:shadow-md transition-shadow"> 
                        <CardContent className="p-6"> 
                            <div className="flex items-start justify-between"> 
                                <div className="flex-1"> 
                                    <div className="flex items-center gap-3 mb-2"> 
                                        <h3 className="text-lg font-semibold text-foreground">{job.title}</h3> 
                                        <Badge className={statusConfig[job.status].className}> {statusConfig[job.status].label} </Badge> 
                                    </div> 
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3"> 
                                        <span className="flex items-center gap-1"> <MapPin className="h-4 w-4" /> {job.location} </span> 
                                        <span>{job.experience}</span> 
                                        <span>{job.salary}</span> 
                                    </div> 
                                    <div className="flex items-center gap-6 text-sm"> 
                                        <span className="flex items-center gap-1 text-muted-foreground"> 
                                            <Users className="h-4 w-4" /> {job.applicants} candidatures 
                                        </span> 
                                        <span className="flex items-center gap-1 text-muted-foreground"> 
                                            <Eye className="h-4 w-4" /> {job.applicants} vues 
                                        </span> 
                                        {
                                            job.applicants > 0 && 
                                            (<span className="flex items-center gap-1 text-muted-foreground"> <TrendingUp className="h-4 w-4" /> 
                                            {job.applicants}% match moyen </span>)
                                        } 
                                        <span className="flex items-center gap-1 text-muted-foreground"> 
                                            <Calendar className="h-4 w-4" /> 
                                            {job.status === "DRAFT" ? "Brouillon" : `Publié le ${formatDate(job.publishDate)}`} 
                                        </span> 
                                    </div> 
                                </div> 
                                <div className="flex items-center gap-2"> 
                                    <Button variant="ghost" size="sm" className="gap-1"> <Eye className="h-4 w-4" /> Voir </Button> 
                                    <Button variant="ghost" size="sm" className="gap-1"> <Edit className="h-4 w-4" /> Modifier </Button> 
                                    <DropdownMenu> 
                                        <DropdownMenuTrigger asChild> 
                                            <Button variant="ghost" size="icon"> <MoreHorizontal className="h-4 w-4" /> </Button> 
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
                    </Card>))
                } 
            </div> 
            <div className="flex items-center justify-between mt-6">
                {/* Infos */}
                <div className="text-sm text-muted-foreground">
                    Affichage {from} - {to} sur {totalItems}
                </div>

                {/* Contrôles */}
                <div className="flex items-center gap-4">
                    {/* Select limit */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Afficher</span>
                        <Select
                            value={String(limit)}
                            onValueChange={(value) => {
                                setLimit(Number(value))
                                setPage(1) // reset page
                            }}
                        >
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 10, 20, 50, 100].map((v) => (
                                    <SelectItem key={v} value={String(v)}>
                                        {v}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Pagination buttons */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Précédent
                        </Button>

                        <div className="text-sm font-medium">
                            Page {page} / {totalPages}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Suivant
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
