"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    FileText,
    Users,
    Eye,
    Clock,
    Sparkles,
    MapPin,
    Briefcase,
    DollarSign,
    ExternalLink,
    ChevronRight,
} from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts"

const statsData = [
    { label: "Offres publiées", value: "15", icon: FileText, color: "text-primary" },
    { label: "Candidatures reçues", value: "125", icon: Users, color: "text-primary" },
    { label: "Nlles candidatures", value: "18", icon: Clock, color: "text-primary" },
    { label: "Entretiens planifiés", value: "01", icon: Eye, color: "text-primary" },
]

const chartData = [
    { name: "Lu", value: 30 },
    { name: "Ma", value: 45 },
    { name: "Me", value: 60 },
    { name: "Je", value: 35 },
    { name: "Ve", value: 75 },
    { name: "Sa", value: 25 },
    { name: "Di", value: 40 },
]

const lineChartData = [
    { name: "Jan", value: 10 },
    { name: "Fév", value: 25 },
    { name: "Mar", value: 35 },
    { name: "Avr", value: 45 },
    { name: "Mai", value: 55 },
    { name: "Jun", value: 70 },
]

const recentCandidates = [
    { name: "Marie Dubois", score: 92, avatar: "MD" },
    { name: "Jean Martin", score: 88, avatar: "JM" },
    { name: "Sophie Laurent", score: 85, avatar: "SL" },
]

const topOffers = [
    { title: "Développeur React Senior", company: "Tech Corp" },
    { title: "UI/UX Designer", company: "Design Studio" },
    { title: "Chef de Projet Digital", company: "Agency Plus" },
]

const recentOffers = [
    {
        title: "Développeur Frontend React",
        type: "CDI",
        location: "Paris",
        salary: "45k-55k",
        status: "active",
        description: "Nous recherchons un développeur frontend passionné pour rejoindre notre équipe...",
    },
    {
        title: "UI/UX Designer Senior",
        type: "CDI",
        location: "Lyon",
        salary: "50k-60k",
        status: "active",
        description: "Rejoignez notre équipe design pour créer des expériences utilisateur exceptionnelles...",
    },
    {
        title: "Développeur Frontend React",
        type: "CDD",
        location: "Remote",
        salary: "40k-50k",
        status: "paused",
        description: "Mission de 6 mois pour le développement d'une application web moderne...",
    },
    {
        title: "Développeur Fullstack Node.js",
        type: "CDI",
        location: "Paris",
        salary: "55k-65k",
        status: "active",
        description: "Nous cherchons un développeur fullstack pour nos projets innovants...",
    },
]

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            {/* Page Title */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="rounded-sm">
                        Publier une annonce
                    </Button>
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Rechercher..."
                            className="h-9 w-full sm:w-64 rounded-sm border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat) => (
                    <Card key={stat.label} className="bg-card">
                        <CardContent className="px-3"> {/* ici py-2 réduit le padding vertical */}
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* User Info Card */}
            <Card className="bg-card">
                <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4 p-2">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-foreground">Goriya, CEO</p>
                        <p className="text-sm text-muted-foreground">Programme de recrutement: <span className="text-primary">10k</span></p>
                    </div>
                </CardContent>
            </Card>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Bar Chart */}
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Evolution des candidatures</CardTitle>
                        <p className="text-sm text-muted-foreground">Evolution des candidatures des derniers jours</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Bar dataKey="value" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Line Chart */}
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Vues des Offres</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineChartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Line type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={2} dot={{ fill: '#1e3a8a', strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* AI Recommendations */}
            <Card className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold">Recommandations IA du jour</h3>
                            <ul className="mt-2 space-y-1 text-sm text-primary-foreground/90">
                                <li>- Optimisez vos offres - Nous vous avons trouvé des ajouts qui peuvent améliorer vos offres et attirer plus de candidats.</li>
                                <li>- Entretiens - Vous avez 3 entretiens prévus pour cette semaine.</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Candidates & Top Offers */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Candidates */}
                <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold">Candidatures récentes (Top scores)</CardTitle>
                        <Button variant="link" className="text-primary">
                            Voir tout <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentCandidates.map((candidate) => (
                                <div key={candidate.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-secondary text-secondary-foreground">
                                                {candidate.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-foreground">{candidate.name}</p>
                                            <p className="text-sm text-muted-foreground">Développeur Full Stack</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700">
                                        {candidate.score}%
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Offers */}
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Offres les plus performantes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topOffers.map((offer, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">{offer.title}</p>
                                        <p className="text-sm text-muted-foreground">{offer.company}</p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Active Offers */}
            <div>
                <h2 className="mb-4 text-lg font-semibold text-foreground">Offres récentes</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {recentOffers.map((offer, index) => (
                        <Card key={index} className="bg-card">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-foreground">{offer.title}</h3>
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <Badge variant="secondary" className="gap-1">
                                                <Briefcase className="h-3 w-3" />
                                                {offer.type}
                                            </Badge>
                                            <Badge variant="secondary" className="gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {offer.location}
                                            </Badge>
                                            <Badge variant="secondary" className="gap-1">
                                                <DollarSign className="h-3 w-3" />
                                                {offer.salary}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Badge
                                        className={
                                            offer.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }>
                                        {offer.status === "active" ? "Active" : "En pause"}
                                    </Badge>
                                </div>
                                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                                    {offer.description}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Button variant="outline" size="sm">Voir plus</Button>
                                    <Button variant="outline" size="sm">Modifier</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
