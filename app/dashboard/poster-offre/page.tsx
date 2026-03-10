"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Sparkles, X, Calendar } from "lucide-react"
import Image from "next/image"

const departments = [
    "Technologie", "Marketing", "Finance", "Ressources Humaines", "Design", "Ventes", "Opérations",
]

const contractTypes = ["CDI", "CDD", "Stage", "Alternance", "Freelance", "Temps partiel"]
const experienceLevels = ["Junior (0-2 ans)", "Intermédiaire (3-5 ans)", "Senior (5-10 ans)", "Expert (10+ ans)"]
const suggestedSkills = [
    "Améliorer CV et les mettre en avant",
    "Amélioration description poste matching",
    "Suggestion de compétences complémentaires",
    "Ajouter compétences dans les autres",
]

export default function PosterOffrePage() {
    const router = useRouter()
    const [aiOptimization, setAiOptimization] = useState(true)
    const [showCoverPhoto, setShowCoverPhoto] = useState(true)
    const [skills, setSkills] = useState<string[]>([])
    const [newSkill, setNewSkill] = useState("")
    const [visibility, setVisibility] = useState("public")

    const [formData, setFormData] = useState({
        title: "", department: "", location: "", contractType: "", salary: "", salaryMax: "",
        experience: "", studyLevel: "", description: "", requirements: "", benefits: "",
        publishDate: "", endDate: "",
    })

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()])
            setNewSkill("")
        }
    }
    const handleRemoveSkill = (skill: string) => setSkills(skills.filter(s => s !== skill))
    const handlePublish = () => router.push("/dashboard/annonces")
    const handleSaveDraft = () => router.push("/dashboard/annonces")

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Publier une offre d'emploi</h1>
            <p className="text-muted-foreground mb-8">
                Créez une offre optimisée par Goriya pour attirer les meilleurs talents
            </p>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-8 w-full">
                    {/* Basic Information */}
                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-4">Informations de base</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field className="w-full">
                                <FieldLabel>Titre du poste <span className="text-destructive">*</span></FieldLabel>
                                <Input className="w-full" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="ex: Développeur Full Stack Senior" />
                            </Field>
                            <Field className="w-full">
                                <FieldLabel>Département <span className="text-destructive">*</span></FieldLabel>
                                <Select value={formData.department} onValueChange={v => setFormData({ ...formData, department: v })}>
                                    <SelectTrigger className="w-full"><SelectValue placeholder="Sélectionner un département" /></SelectTrigger>
                                    <SelectContent>
                                        {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field className="w-full">
                                <FieldLabel>Localisation</FieldLabel>
                                <Input className="w-full" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Paris, France" />
                            </Field>
                            <Field className="w-full">
                                <FieldLabel>Type de contrat</FieldLabel>
                                <Select value={formData.contractType} onValueChange={v => setFormData({ ...formData, contractType: v })}>
                                    <SelectTrigger className="w-full"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                                    <SelectContent>{contractTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                </Select>
                            </Field>
                            <Field className="w-full">
                                <FieldLabel>Salaire min XOF</FieldLabel>
                                <Input className="w-full" type="number" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} placeholder="0000" />
                            </Field>
                            <Field className="w-full">
                                <FieldLabel>Salaire max XOF</FieldLabel>
                                <Input className="w-full" type="number" value={formData.salaryMax} onChange={e => setFormData({ ...formData, salaryMax: e.target.value })} placeholder="0000" />
                            </Field>
                            <Field className="w-full">
                                <FieldLabel>Expérience requise</FieldLabel>
                                <Select value={formData.experience} onValueChange={v => setFormData({ ...formData, experience: v })}>
                                    <SelectTrigger className="w-full"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                                    <SelectContent>{experienceLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                                </Select>
                            </Field>
                            <Field className="w-full">
                                <FieldLabel>Années d'étude</FieldLabel>
                                <Input className="w-full" value={formData.studyLevel} onChange={e => setFormData({ ...formData, studyLevel: e.target.value })} placeholder="Bac+5" />
                            </Field>
                        </div>
                    </section>

                    {/* Textareas */}
                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-2">Description du poste</h2>
                        <FieldGroup><Textarea className="w-full" rows={5} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Décrivez le poste..." /></FieldGroup>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-2">Exigences et qualifications</h2>
                        <FieldGroup><Textarea className="w-full" rows={4} value={formData.requirements} onChange={e => setFormData({ ...formData, requirements: e.target.value })} placeholder="Liste compétences, formations..." /></FieldGroup>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-2">Avantages offerts</h2>
                        <FieldGroup><Textarea className="w-full" rows={3} value={formData.benefits} onChange={e => setFormData({ ...formData, benefits: e.target.value })} placeholder="Télétravail, mutuelle..." /></FieldGroup>
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-2">Compétences recherchées</h2>
                        <div className="flex flex-col sm:flex-row gap-2 mb-2">
                            <Input className="flex-1 w-full" value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Ajouter une compétence" onKeyPress={e => e.key === "Enter" && handleAddSkill()} />
                            <Button className="w-full sm:w-auto" onClick={handleAddSkill} variant="secondary">Ajouter</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">{skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                                {skill}
                                <button onClick={() => handleRemoveSkill(skill)} className="ml-1 rounded-full p-0.5 hover:bg-muted"><X className="h-3 w-3" /></button>
                            </Badge>
                        ))}</div>
                    </section>

                    {/* AI Optimization */}
                    <Card className="border-primary/20 bg-secondary w-full">
                        <CardHeader className="pb-2 flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                <Sparkles className="h-5 w-5 text-primary" />Optimisation IA Goriya
                            </CardTitle>
                            <Switch checked={aiOptimization} onCheckedChange={setAiOptimization} />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Activer l'optimisation Goriya</p>
                            <p className="text-xs text-muted-foreground mb-2">Les modifications et suggestions IA sont modifiables et validables par vous-mêmes.</p>
                            <p className="text-sm font-medium text-foreground mb-2">Suggestions automatiques:</p>
                            <ul className="space-y-1 text-sm text-muted-foreground">{suggestedSkills.map((s, i) => <li key={i} className="flex items-center gap-2"><span className="text-primary">•</span>{s}</li>)}</ul>
                        </CardContent>
                    </Card>

                    {/* Publication Options */}
                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-4">Options de publication</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field className="w-full"><FieldLabel>Date de publication</FieldLabel><Input className="w-full" type="date" value={formData.publishDate} onChange={e => setFormData({ ...formData, publishDate: e.target.value })} /></Field>
                            <Field className="w-full"><FieldLabel>Date limite de candidature</FieldLabel><Input className="w-full" type="date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} /></Field>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm font-medium text-foreground mb-3">Visibilité</p>
                            <RadioGroup value={visibility} onValueChange={setVisibility} className="flex flex-col gap-2">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="public" id="public" /><Label htmlFor="public">Public - Visible par tous</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="private" id="private" /><Label htmlFor="private">Privée - Visible uniquement</Label></div>
                            </RadioGroup>
                        </div>
                    </section>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button className="w-full sm:w-auto" variant="outline" onClick={handleSaveDraft}>Enregistrer comme brouillon</Button>
                        <Button className="w-full sm:w-auto" onClick={handlePublish}>Publier l'offre</Button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6 w-full">
                    <Card className="w-full">
                        <CardContent className="p-4 flex items-center justify-between"><span className="text-sm font-medium text-foreground">Affichez la photo de couverture</span><Switch checked={showCoverPhoto} onCheckedChange={setShowCoverPhoto} /></CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardContent className="p-4">
                            <div className="mb-4">
                                <p className="text-xs text-muted-foreground mb-1">Data Science engineer YGG et FHYZG (H/F)</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />Septembre/Oct/Nov</p>
                                <p className="text-xs text-muted-foreground">1 j ou 2 jours</p>
                            </div>
                            <div className="relative h-32 w-full rounded-sm overflow-hidden bg-muted mb-4">
                                <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/poste%20une%20offre-hd6PLuEJ53F7UhjExb3UXD0QsTBQID.png" alt="Job preview" fill className="object-cover" />
                            </div>
                            <div className="flex gap-2">
                                <div className="h-3 w-3 rounded-full bg-primary" /><div className="h-3 w-3 rounded-full bg-muted" /><div className="h-3 w-3 rounded-full bg-muted" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}