"use client"

import Link from "next/link"
import { SignupStepper } from "@/components/signup-stepper"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

const steps = ["Entreprise", "Détails", "Contact"]

export default function SignupSuccessPage() {
    return (
        <div>
            <SignupStepper currentStep={3} steps={steps} />

            <div className="flex flex-col items-center justify-center py-16 text-center">
                {/* Success Icon */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>

                {/* Success Message */}
                <h2 className="text-xl font-semibold text-primary">
                    Félicitations, votre profil est 100% complet !
                </h2>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard">Tableau de bord</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/poster-offre">Poster une offre</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
