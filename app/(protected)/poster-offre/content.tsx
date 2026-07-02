"use client"

import Image from "next/image"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createJobOffer } from "@/actions/offers"
import { IOffer } from "@/@types/interface"
import { Calendar, Heart, MapPin, Plus, Sparkles } from "lucide-react"

const departments = ["Technologie", "Design", "Data", "Marketing", "Management"]
const contractTypes = ["CDI", "CDD", "STAGE", "ALTERNANCE", "FREELANCE", "TEMPS_PARTIEL"]
const experienceOptions = ["0-2 ans d'exp.", "3-5 ans d'exp.", "5+ ans d'exp."]

export default function Content() {
    const router = useRouter()
    const { data: session } = useSession()

    const [aiOptimization, setAiOptimization] = useState(true)
    const [showCover, setShowCover] = useState(true)
    const [newSkill, setNewSkill] = useState("")
    const [skills, setSkills] = useState<string[]>([])
    const [formData, setFormData] = useState({
        title: "",
        department: "",
        location: "",
        type: "",
        salaryMin: "",
        salaryMax: "",
        experience: "",
        description: "",
        requirements: "",
        benefits: "",
        publishDate: "",
        endDate: "",
        visibility: "PUBLIC",
    })

    const addSkill = () => {
        const value = newSkill.trim()
        if (value.length > 0 && !skills.includes(value)) {
            setSkills((prev) => [...prev, value])
            setNewSkill("")
        }
    }

    const handlePublish = async () => {
        try {
            const companyId = session?.user?.companyId
            if (!companyId) throw new Error("Not authenticated")

            const payload = {
                title: formData.title,
                location: formData.location,
                type: formData.type,
                salary: formData.salaryMin,
                experience: formData.experience,
                description: formData.description,
                benefits: formData.benefits,
                publishDate: formData.publishDate,
                endDate: formData.endDate,
                companyId,
                requirements: skills,
            }

            // ✅ Appel relayé via /api/proxy : le Bearer token est attaché côté serveur
            // à partir de la session NextAuth, sans jamais transiter par le client.
            await createJobOffer(payload)
            router.push("/annonces")
        } catch (error) {
            console.error("Erreur lors de la creation de l'offre:", error)
        }
    }

    return (
        <div className="space-y-4 pb-8">
            <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Publier une offre d'emploi</h1>
            <p className="text-sm font-medium text-muted-foreground">
                Creez une offre optimisee par Goriya pour attirer les meilleurs talents
            </p>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="space-y-4 xl:col-span-2">
                    <section className="rounded-xl border border-border bg-white p-4">
                        <h2 className="mb-3 text-sm font-semibold text-foreground">Informations de base</h2>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <Field label="Titre du poste*">
                                <Input
                                    placeholder="ex: Developpeur Full-Stack Senior"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </Field>
                            <Field label="Departement">
                                <Select
                                    value={formData.department}
                                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selectionner un departement" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field label="Localisation*">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Paris, France"
                                        className="pl-9"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </Field>
                            <Field label="Type de contrat*">
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type de contrat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {contractTypes.map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field label="Salaire min (EUR)*">
                                <Input
                                    type="number"
                                    placeholder="$ 45000"
                                    value={formData.salaryMin}
                                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                                />
                            </Field>
                            <Field label="Salaire max (EUR)*">
                                <Input
                                    type="number"
                                    placeholder="$ 65000"
                                    value={formData.salaryMax}
                                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                                />
                            </Field>
                            <Field label="Experience requise" className="md:col-span-2">
                                <Select
                                    value={formData.experience}
                                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Annees d'exp." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {experienceOptions.map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                    </section>

                    <section className="rounded-xl border border-border bg-white p-4">
                        <h2 className="mb-3 text-sm font-semibold text-foreground">Description du poste</h2>

                        <Field label="Description complete">
                            <Textarea
                                rows={3}
                                placeholder="Decrivez le poste, les responsabilites, et l'environnement de travail..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Field>

                        <Field label="Exigences et qualifications" className="mt-3">
                            <Textarea
                                rows={3}
                                placeholder="Listez les competences, formations et experiences requises..."
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            />
                        </Field>

                        <Field label="Avantages offerts" className="mt-3">
                            <Textarea
                                rows={2}
                                placeholder="Teletravail, mutuelle, tickets restaurant, formations..."
                                value={formData.benefits}
                                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                            />
                        </Field>
                    </section>

                    <section className="rounded-xl border border-border bg-white p-4">
                        <h2 className="mb-3 text-sm font-semibold text-foreground">Competences recherchees</h2>

                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Ajouter une competence"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addSkill()
                                    }
                                }}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={addSkill}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        {skills.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border border-border bg-muted px-2 py-1 text-xs text-foreground"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="rounded-xl border border-blue-500 bg-blue-50/40 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-foreground">Optimisation Goriya</h2>
                            <Switch checked={aiOptimization} onCheckedChange={setAiOptimization} />
                        </div>

                        <div className="rounded-lg border border-blue-200 bg-white p-3">
                            <p className="mb-1 text-xs font-semibold text-foreground">Activer l'optimisation Goriya</p>
                            <p className="text-xs text-muted-foreground">
                                L'IA analysera et optimisera votre post pour ameliorer sa visibilite et son attractivite
                            </p>
                        </div>

                        <div className="mt-3 rounded-lg border border-border bg-white p-3">
                            <p className="mb-2 text-xs font-semibold text-foreground">Suggestions automatiques :</p>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                <li>• Analyse SEO du titre et des mots-cles</li>
                                <li>• Optimisation de la description pour le matching</li>
                                <li>• Suggestion de competences complementaires</li>
                                <li>• Analyse comparative avec le marche</li>
                            </ul>
                        </div>
                    </section>

                    <section className="rounded-xl border border-border bg-white p-4">
                        <h2 className="mb-3 text-sm font-semibold text-foreground">Options de publication</h2>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <Field label="Date de publication">
                                <div className="relative">
                                    <Input
                                        type="date"
                                        value={formData.publishDate}
                                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                                    />
                                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                </div>
                            </Field>
                            <Field label="Date limite de candidature">
                                <div className="relative">
                                    <Input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                </div>
                            </Field>
                        </div>

                        <div className="mt-4 space-y-1">
                            <p className="text-xs font-semibold text-foreground">Visibilite</p>
                            <label className="flex items-center gap-2 text-xs text-muted-foreground">
                                <input
                                    type="radio"
                                    name="visibility"
                                    checked={formData.visibility === "PUBLIC"}
                                    onChange={() => setFormData({ ...formData, visibility: "PUBLIC" })}
                                />
                                Public - Visible par tous les candidats
                            </label>
                            <label className="flex items-center gap-2 text-xs text-muted-foreground">
                                <input
                                    type="radio"
                                    name="visibility"
                                    checked={formData.visibility === "PREMIUM"}
                                    onChange={() => setFormData({ ...formData, visibility: "PREMIUM" })}
                                />
                                Premium - Mise en avant dans les resultats de recherche
                            </label>
                        </div>
                    </section>

                    <div className="flex flex-col items-stretch justify-end gap-3 pt-2 sm:flex-row sm:items-center">
                        <Button variant="outline" className="rounded-full px-6">
                            Enregistrer comme brouillon
                        </Button>
                        <Button onClick={handlePublish} className="rounded-full px-6">
                            Publier l'offre
                        </Button>
                    </div>
                </div>

                <aside className="space-y-3 xl:sticky xl:top-4 xl:self-start">
                    <p className="text-xs font-semibold text-foreground">Apercu</p>
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-foreground">Afficher la photo de couverture</p>
                        <Switch checked={showCover} onCheckedChange={setShowCover} />
                    </div>

                    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                        <div className="p-3">
                            <p className="text-sm font-semibold text-foreground">Data base engineer SQL et PLSQL (H/F)</p>
                            <p className="mt-1 text-[11px] text-muted-foreground">CDI • Ingenierie Flux RSS</p>
                        </div>

                        {showCover && (
                            <div className="relative h-24 w-full border-t border-border">
                                <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/poste%20une%20offre-hd6PLuEJ53F7UhjExb3UXD0QsTBQID.png"
                                    alt="Apercu couverture"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-3 p-3 text-muted-foreground">
                            <span className="h-6 w-6 rounded-full bg-gray-400" />
                            <Heart className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-white p-3">
                        <p className="text-xs text-muted-foreground">
                            Le panneau d'apercu reprend la presentation visuelle de la capture.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    )
}

type FieldProps = {
    label: string
    children: React.ReactNode
    className?: string
}

function Field({ label, children, className = "" }: FieldProps) {
    return (
        <div className={className}>
            <p className="mb-1.5 text-xs font-medium text-foreground">{label}</p>
            {children}
        </div>
    )
}
