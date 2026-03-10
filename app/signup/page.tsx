"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignupStepper } from "@/components/signup-stepper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Upload, Plus, Check } from "lucide-react"

const steps = ["Entreprise", "Détails", "Contact"]

const sectors = [
  "Technologie",
  "Finance",
  "Santé",
  "Éducation",
  "Commerce",
  "Marketing",
  "Industrie",
  "Services",
]

const companySizes = [
  "1-10 employés",
  "11-50 employés",
  "51-200 employés",
  "201-500 employés",
  "500+ employés",
]

interface FormData {
  logo: string | null
  coverImage: string | null
  companyName: string
  about: string
  sector: string
  creationDate: string
  companySize: string
  website: string
  socialLinks: string[]
  country: string
  headquarters: string
  location: string
  phone: string
  email: string
  password: string
}

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    logo: null,
    coverImage: null,
    companyName: "",
    about: "",
    sector: "",
    creationDate: "",
    companySize: "",
    website: "",
    socialLinks: ["", "", "", ""],
    country: "",
    headquarters: "",
    location: "",
    phone: "",
    email: "",
    password: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/signup/success")
    }
  }

  const updateFormData = (field: keyof FormData, value: string | string[] | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateSocialLink = (index: number, value: string) => {
    const newLinks = [...formData.socialLinks]
    newLinks[index] = value
    updateFormData("socialLinks", newLinks)
  }

  const addSocialLink = () => {
    updateFormData("socialLinks", [...formData.socialLinks, ""])
  }

  return (
    <div>
      <SignupStepper currentStep={currentStep} steps={steps} />

      {/* Step 1: Entreprise */}
      {currentStep === 0 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">Logo et bannières</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Logo Upload */}
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-secondary/30 p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-primary/60 mb-2" />
                <p className="text-sm font-medium text-foreground">Importer votre logo ici</p>
                <p className="text-xs text-muted-foreground mt-1">Une photo de moins de 5 Mo</p>
              </div>

              {/* Cover Image Upload */}
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-secondary/30 p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-primary/60 mb-2" />
                <p className="text-sm font-medium text-foreground">Importer votre image de couverture ici</p>
                <p className="text-xs text-muted-foreground mt-1">Une photo de moins de 5 Mo</p>
              </div>
            </div>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel>
                Nom de l&apos;entreprise <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                value={formData.companyName}
                onChange={(e) => updateFormData("companyName", e.target.value)}
                placeholder="Entrez le nom de votre entreprise"
              />
            </Field>

            <Field>
              <FieldLabel>
                A propos <span className="text-destructive">*</span>
              </FieldLabel>
              <Textarea
                value={formData.about}
                onChange={(e) => updateFormData("about", e.target.value)}
                placeholder="Décrivez votre entreprise..."
                rows={4}
              />
            </Field>

            <Field>
              <FieldLabel>
                Secteur d&apos;activité <span className="text-destructive">*</span>
              </FieldLabel>
              <Select value={formData.sector} onValueChange={(value) => updateFormData("sector", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un secteur" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </div>
      )}

      {/* Step 2: Détails */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel>
                Date de création <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                type="date"
                value={formData.creationDate}
                onChange={(e) => updateFormData("creationDate", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel>
                Taille de l&apos;entreprise <span className="text-destructive">*</span>
              </FieldLabel>
              <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Website</FieldLabel>
              <Input
                type="url"
                value={formData.website}
                onChange={(e) => updateFormData("website", e.target.value)}
                placeholder="https://www.example.com"
              />
            </Field>

            {formData.socialLinks.map((link, index) => (
              <Field key={index}>
                <FieldLabel>Lien réseau social {index + 1}</FieldLabel>
                <Input
                  type="url"
                  value={link}
                  onChange={(e) => updateSocialLink(index, e.target.value)}
                  placeholder="https://..."
                />
              </Field>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addSocialLink}
              className="w-full border-dashed"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un autre lien
            </Button>
          </FieldGroup>
        </div>
      )}

      {/* Step 3: Contact */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel>
                Pays <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                value={formData.country}
                onChange={(e) => updateFormData("country", e.target.value)}
                placeholder="Entrez votre pays"
              />
            </Field>

            <Field>
              <FieldLabel>
                Siège <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                value={formData.headquarters}
                onChange={(e) => updateFormData("headquarters", e.target.value)}
                placeholder="Adresse du siège social"
              />
            </Field>

            <Field>
              <FieldLabel>
                Localisation <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="Ville, Région"
              />
            </Field>

            <Field>
              <FieldLabel>Téléphone</FieldLabel>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="+33 1 23 45 67 89"
              />
            </Field>

            <Field>
              <FieldLabel>
                Email professionnel <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="contact@entreprise.com"
              />
            </Field>

            <Field>
              <FieldLabel>Mot de passe</FieldLabel>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                placeholder="Créez un mot de passe sécurisé"
              />
            </Field>
          </FieldGroup>
        </div>
      )}

      {/* Navigation Button */}
      <div className="mt-8 flex justify-center">
        <Button onClick={handleNext} className="w-48" size="lg">
          {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
        </Button>
      </div>
    </div>
  )
}
