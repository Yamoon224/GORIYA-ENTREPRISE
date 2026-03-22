"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Search,
    MapPin,
    Calendar,
    GraduationCap,
    Briefcase,
    ExternalLink,
    MessageSquare,
    MoreVertical,
    Check,
    X,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type CandidateStatus = "new" | "shortlisted" | "interview" | "accepted" | "rejected"

interface Candidate {
    id: number
    name: string
    title: string
    location: string
    age: number
    applicationDate: string
    skills: string[]
    education: string
    salary: string
    availability: string
    score: number
    matchScore: number
    status: CandidateStatus
    avatar: string
    cvLink: string
}

const candidates: Candidate[] = [
    {
        id: 1,
        name: "Marie Dubois",
        title: "Développeur Full Stack Senior",
        location: "Paris, France",
        age: 32,
        applicationDate: "2024-01-18",
        skills: ["React", "Node.js", "Python", "PostgreSQL"],
        education: "Master Informatique",
        salary: "55k/60k",
        availability: "Disponible immédiatement",
        score: 92,
        matchScore: 92,
        status: "new",
        avatar: "MD",
        cvLink: "#",
    },
    {
        id: 2,
        name: "Jean Martin",
        title: "Nouveau programmeur",
        location: "Lyon, France",
        age: 28,
        applicationDate: "2024-01-14",
        skills: ["Figma", "Prototyping", "User Research"],
        education: "Master Design",
        salary: "45-50k",
        availability: "Préavis 1 mois",
        score: 88,
        matchScore: 88,
        status: "shortlisted",
        avatar: "JM",
        cvLink: "#",
    },
    {
        id: 3,
        name: "Sophie Laurent",
        title: "CV manager",
        location: "Marseille, France",
        age: 35,
        applicationDate: "2024-01-12",
        skills: ["Agile", "Scrum", "Management", "Jira"],
        education: "École de Commerce",
        salary: "60-70k",
        availability: "Disponible immédiatement",
        score: 85,
        matchScore: 85,
        status: "interview",
        avatar: "SL",
        cvLink: "#",
    },
    {
        id: 4,
        name: "Thomas Rousseau",
        title: "Refusé",
        location: "Toulouse, France",
        age: 27,
        applicationDate: "2024-01-10",
        skills: ["Python", "Machine Learning", "SQL", "Pandas"],
        education: "Doctorat Data Science",
        salary: "55-65k",
        availability: "Préavis 2 mois",
        score: 89,
        matchScore: 89,
        status: "rejected",
        avatar: "TR",
        cvLink: "#",
    },
    {
        id: 5,
        name: "Emma Leroy",
        title: "Nouveau",
        location: "Bordeaux, France",
        age: 29,
        applicationDate: "2024-01-08",
        skills: ["Vue.js", "Django", "Docker"],
        education: "École d'Ingénieur",
        salary: "50-55k",
        availability: "Disponible immédiatement",
        score: 84,
        matchScore: 84,
        status: "new",
        avatar: "EL",
        cvLink: "#",
    },
]

const statusConfig: Record<CandidateStatus, { label: string; className: string }> = {
    new: { label: "Nouveau", className: "bg-blue-100 text-blue-700" },
    shortlisted: { label: "Présélection", className: "bg-orange-100 text-orange-700" },
    interview: { label: "Entretien", className: "bg-purple-100 text-purple-700" },
    accepted: { label: "Accepté", className: "bg-green-100 text-green-700" },
    rejected: { label: "Refusé", className: "bg-red-100 text-red-700" },
}

const tabCounts = {
    all: candidates.length,
    new: candidates.filter((c) => c.status === "new").length,
    shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
    interview: candidates.filter((c) => c.status === "interview").length,
    accepted: candidates.filter((c) => c.status === "accepted").length,
    rejected: candidates.filter((c) => c.status === "rejected").length,
}

export default function CandidaturesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTab, setSelectedTab] = useState("all")
    const [selectedJob, setSelectedJob] = useState("all")

    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch =
            candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesTab = selectedTab === "all" || candidate.status === selectedTab
        return matchesSearch && matchesTab
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Candidatures</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline">
                        Publier une annonce
                    </Button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Rechercher..." className="w-64 pl-9" />
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un candidat ou un poste..."
                        className="pl-9"
                    />
                </div>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Tous les postes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les postes</SelectItem>
                        <SelectItem value="dev">Développeur Full-Stack</SelectItem>
                        <SelectItem value="design">UX/UI Designer</SelectItem>
                        <SelectItem value="pm">Chef de Projet</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="bg-muted/50 p-1">
                    <TabsTrigger value="all" className="gap-2">
                        Tous ({tabCounts.all})
                    </TabsTrigger>
                    <TabsTrigger value="new" className="gap-2">
                        En attente ({tabCounts.new})
                    </TabsTrigger>
                    <TabsTrigger value="shortlisted" className="gap-2">
                        En étude ({tabCounts.shortlisted})
                    </TabsTrigger>
                    <TabsTrigger value="interview" className="gap-2">
                        Analyses ({tabCounts.interview})
                    </TabsTrigger>
                    <TabsTrigger value="accepted" className="gap-2">
                        Acceptées ({tabCounts.accepted})
                    </TabsTrigger>
                    <TabsTrigger value="rejected" className="gap-2">
                        Refusées ({tabCounts.rejected})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={selectedTab} className="mt-6">
                    <div className="space-y-4">
                        {filteredCandidates.map((candidate) => (
                            <Card key={candidate.id} className="bg-card hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-6">
                                        {/* Avatar */}
                                        <Avatar className="h-14 w-14 flex-shrink-0">
                                            <AvatarImage src={`/images/placeholder-${candidate.id}.jpg`} />
                                            <AvatarFallback className="bg-secondary text-secondary-foreground text-lg">
                                                {candidate.avatar}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* Main Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3>
                                                <Badge className={statusConfig[candidate.status].className}>
                                                    {statusConfig[candidate.status].label}
                                                </Badge>
                                            </div>

                                            <p className="text-sm text-muted-foreground mb-2">{candidate.title}</p>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {candidate.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {candidate.age} ans
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {candidate.applicationDate}
                                                </span>
                                            </div>

                                            {/* Skills */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {candidate.skills.map((skill) => (
                                                    <Badge key={skill} variant="secondary" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>

                                            {/* Education & Salary */}
                                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <GraduationCap className="h-4 w-4" />
                                                    {candidate.education}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="h-4 w-4" />
                                                    Salaire: {candidate.salary}
                                                </span>
                                                <span>{candidate.availability}</span>
                                            </div>

                                            <Button variant="link" className="h-auto p-0 mt-2 text-primary text-sm">
                                                Compatibilité IA
                                            </Button>
                                        </div>

                                        {/* Score & Actions */}
                                        <div className="flex flex-col items-end gap-4">
                                            {/* Score */}
                                            <div className="text-right">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-primary">{candidate.score}</span>
                                                    <span className="text-sm text-muted-foreground">/100</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">Score IA</p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" className="gap-1">
                                                    <ExternalLink className="h-4 w-4" />
                                                    Voir CV
                                                </Button>
                                                <Button variant="outline" size="sm" className="gap-1">
                                                    <MessageSquare className="h-4 w-4" />
                                                    Message
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className="text-green-600">
                                                            <Check className="h-4 w-4 mr-2" />
                                                            Accepter
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <X className="h-4 w-4 mr-2" />
                                                            Refuser
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>Voir profil</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="w-32">
                                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full"
                                                        style={{ width: `${candidate.matchScore}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground text-right mt-1">
                                                    {candidate.matchScore}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
