"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, MapPin, Globe, Save, X, Plus, Users, Briefcase, Star, UserCheck } from "lucide-react"

const benefitSuggestions = ["Télétravail flexible", "Mutuelle premium", "Tickets restaurant", "Formation continue", "Bonus annuel", "Congés supplémentaires"]

export default function ProfilPage() {
  const [benefits, setBenefits] = useState<string[]>(["Télétravail flexible", "Mutuelle premium", "Tickets restaurant"])
  const [newBenefit, setNewBenefit] = useState("")

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const removeBenefit = (b: string) => {
    setBenefits(benefits.filter((item) => item !== b))
  }

  const stats = [
    { value: "156", label: "Employés", color: "text-primary" },
    { value: "45", label: "Offres actives", color: "text-green-500" },
    { value: "4.8", label: "Note moyenne", color: "text-orange-500" },
    { value: "892", label: "Candidatures", color: "text-primary" },
  ]

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Profil Entreprise</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Gérez les informations publiques de votre entreprise</p>
      </div>

      {/* Company Identity */}
      <Card className="border border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center ring-4 ring-primary/20">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt="Company" />
                  <AvatarFallback className="bg-primary text-white text-2xl font-bold rounded-full">
                    TC
                  </AvatarFallback>
                </Avatar>
              </div>
              <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center shadow-sm border-2 border-white">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Fields */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Nom de l&apos;entreprise*
                </label>
                <Input defaultValue="TechCorp Solutions" className="h-9 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Secteur d&apos;activité*
                </label>
                <Input defaultValue="Technologies de l'information" className="h-9 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Adresse du siège
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="Paris, France" className="h-9 text-sm pl-8" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Site web
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="https://techcorp.com" className="h-9 text-sm pl-8" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations générales */}
      <Card className="border border-border">
        <CardHeader className="pb-3 pt-5 px-6">
          <CardTitle className="text-base font-semibold">Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">
                Taille de l&apos;entreprise
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input defaultValue="50-200 employés" className="h-9 text-sm pl-8" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">
                Année de création
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input defaultValue="2018" className="h-9 text-sm pl-8" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">
              Description de l&apos;entreprise
            </label>
            <Textarea
              defaultValue="TechCorp Solutions est une entreprise innovante spécialisée dans le développement de solutions technologiques pour les entreprises. Nous aidons nos clients à digitaliser leurs processus et à optimiser leur productivité grâce à des solutions sur mesure."
              rows={3}
              className="text-sm resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">
              Mission et valeurs
            </label>
            <Textarea
              defaultValue="Notre mission est de rendre la technologie accessible à tous, en développant des solutions intuitives et performantes. Nos valeurs : innovation, excellence, collaboration et respect de l'environnement."
              rows={3}
              className="text-sm resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Avantages et bénéfices */}
      <Card className="border border-border">
        <CardHeader className="pb-3 pt-5 px-6">
          <CardTitle className="text-base font-semibold">Avantages et bénéfices</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-3">
          <div className="flex gap-2">
            <Input
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addBenefit()}
              placeholder="Ajouter un avantage"
              className="h-9 text-sm flex-1"
            />
            <Button size="sm" variant="outline" className="h-9 w-9 p-0" onClick={addBenefit}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {benefits.map((b) => (
              <Badge
                key={b}
                variant="secondary"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-normal"
              >
                {b}
                <button onClick={() => removeBenefit(b)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <p className="text-xs text-primary">
            Ces avantages seront affichés sur vos offres d&apos;emploi pour attirer les meilleurs candidats.
          </p>
        </CardContent>
      </Card>

      {/* Informations de contact */}
      <Card className="border border-border">
        <CardHeader className="pb-3 pt-5 px-6">
          <CardTitle className="text-base font-semibold">Informations de contact</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Responsable RH</label>
              <Input defaultValue="Marie Dupont" className="h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Email de contact</label>
              <Input defaultValue="marie.dupont@techcorp.com" className="h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Téléphone</label>
              <Input defaultValue="+33 1 23 45 67 89" className="h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">LinkedIn entreprise</label>
              <Input defaultValue="https://linkedin.com/company/techcorp-solutions" className="h-9 text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <Card className="border border-border">
        <CardHeader className="pb-3 pt-5 px-6">
          <CardTitle className="text-base font-semibold">Statistiques de l&apos;entreprise</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-center pb-6">
        <Button className="gap-2 px-8">
          <Save className="h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  )
}
