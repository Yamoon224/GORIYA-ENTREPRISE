"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, MapPin, Globe, Building2, Users, Calendar, Edit, Save } from "lucide-react"
import { getAuth } from "@/lib/utils"
import { updateCompany } from "@/actions/companies"

export default function ProfilPage() {
    const [isEditing, setIsEditing] = useState(false)
    const [logo, setLogo] = useState<File | null>(null)
    const [coverImage, setCoverImage] = useState<File | null>(null)
    const [companyData, setCompanyData] = useState({
        name: "",
        about: "",
        sector: "",
        size: "",
        location: "",
        website: "",
        founded: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        const storedAuth = localStorage.getItem("auth")
    
        if (!storedAuth) return
    
        const auth = JSON.parse(storedAuth)
    
        const user = auth.user
        const company = user.company
    
        setCompanyData({
            name: company?.name || "",
            about: company?.about || "", // ⚠️ pas présent dans login
            sector: company?.sector || "",
            size: company?.companySize || "", // ⚠️ pas présent
            location: company?.location || "", // ⚠️ pas présent
            website: company?.website || "", // ⚠️ pas présent
            founded: company?.creationDate
                ? new Date(company.creationDate).getFullYear().toString()
                : "",
            email: company?.email || "",
            phone: company?.phone || "",
        })
    }, [])


    const stats = [
        { label: "Offres publiées", value: "15" },
        { label: "Candidatures reçues", value: "125" },
        { label: "Recrutements", value: "8" },
        { label: "Score entreprise", value: "4.8/5" },
    ]

    const handleSubmit = async () => {
        try {
            const auth = getAuth()
            if (!auth) throw new Error("Not authenticated")
    
            const { token, companyId } = auth
    
            const formData = new FormData()
    
            // Mapping frontend → backend
            formData.append("companyName", companyData.name)
            formData.append("about", companyData.about)
            formData.append("sector", companyData.sector)
            formData.append("companySize", companyData.size)
            formData.append("location", companyData.location)
            formData.append("website", companyData.website)
            formData.append("email", companyData.email)
            formData.append("phone", companyData.phone)
    
            if (companyData.founded) {
                formData.append("creationDate", new Date(companyData.founded).toISOString())
            }
    
            // fichiers
            if (logo) formData.append("logo", logo)
            if (coverImage) formData.append("coverImage", coverImage)
    
            // appel API via abstraction
            const data = await updateCompany(companyId, formData, token)
    
            console.log("UPDATED:", data)
    
            setIsEditing(false)
    
        } catch (error: any) {
            console.error("Update failed:", error)
    
            alert(error?.message || "Une erreur est survenue")
        }
    }

    return (
        <div className="space-y-3 w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Profil Entreprise</h1>
                <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
                    className="gap-2">
                    {
                        isEditing ? ( <><Save className="h-4 w-4" /> Enregistrer </> ) : ( <><Edit className="h-4 w-4" /> Modifier</> )
                    }
                </Button>
            </div>

            {/* Company Header */}
            <Card className="bg-card overflow-hidden">
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-r from-primary to-blue-600 relative">
                    {isEditing && (
                        <>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="absolute top-4 right-4 gap-2">
                                <Camera className="h-4 w-4" />
                                Modifier la bannière
                            </Button>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
                        </>
                    )}
                </div>

                <CardContent className="relative pt-0">
                    {/* Logo */}
                    <div className="absolute -top-12 left-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24 border-4 border-card">
                                <AvatarImage src="/images/placeholder-company.jpg" />
                                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                    G
                                </AvatarFallback>
                            </Avatar>
                            {isEditing && (
                                <>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => setLogo(e.target.files?.[0] || null)} />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="pt-14 pb-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">{companyData.name}</h2>
                                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {companyData.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Building2 className="h-4 w-4" />
                                        {companyData.sector}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {companyData.size}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Fondée en {companyData.founded}
                                    </span>
                                </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Profil vérifié</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="bg-card">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-primary">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Company Info */}
            <Card className="bg-card">
                <CardHeader>
                    <CardTitle>Informations de l&apos;entreprise</CardTitle>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>À propos</FieldLabel>
                            {isEditing ? (
                                <Textarea
                                    value={companyData.about}
                                    onChange={(e) => setCompanyData({ ...companyData, about: e.target.value })}
                                    rows={4}
                                />
                            ) : (
                                <p className="text-muted-foreground">{companyData.about}</p>
                            )}
                        </Field>

                        <div className="grid gap-4 md:grid-cols-2">
                            <Field>
                                <FieldLabel>Secteur d&apos;activité</FieldLabel>
                                {isEditing ? (
                                    <Select
                                        value={companyData.sector}
                                        onValueChange={(value) => setCompanyData({ ...companyData, sector: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Technologie">Technologie</SelectItem>
                                            <SelectItem value="Finance">Finance</SelectItem>
                                            <SelectItem value="Marketing">Marketing</SelectItem>
                                            <SelectItem value="Services">Services</SelectItem>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <p className="text-foreground">{companyData.sector}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel>Taille de l&apos;entreprise</FieldLabel>
                                {isEditing ? (
                                    <Select
                                        value={companyData.size}
                                        onValueChange={(value) => setCompanyData({ ...companyData, size: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-10 employés">1-10 employés</SelectItem>
                                            <SelectItem value="11-50 employés">11-50 employés</SelectItem>
                                            <SelectItem value="51-200 employés">51-200 employés</SelectItem>
                                            <SelectItem value="200+ employés">200+ employés</SelectItem>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <p className="text-foreground">{companyData.size}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                {isEditing ? (
                                    <Input
                                        type="email"
                                        value={companyData.email}
                                        onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-foreground">{companyData.email}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel>Téléphone</FieldLabel>
                                {isEditing ? (
                                    <Input
                                        type="tel"
                                        value={companyData.phone}
                                        onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-foreground">{companyData.phone}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel>Site web</FieldLabel>
                                {isEditing ? (
                                    <Input
                                        type="url"
                                        value={companyData.website}
                                        onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                                    />
                                ) : (
                                    <a
                                        href={companyData.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline flex items-center gap-1">
                                        <Globe className="h-4 w-4" />
                                        {companyData.website}
                                    </a>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel>Localisation</FieldLabel>
                                {isEditing ? (
                                    <Input
                                        value={companyData.location}
                                        onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-foreground">{companyData.location}</p>
                                )}
                            </Field>
                        </div>
                    </FieldGroup>
                </CardContent>
            </Card>
        </div>
    )
}
