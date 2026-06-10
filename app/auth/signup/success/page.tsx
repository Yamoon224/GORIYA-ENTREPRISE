"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const steps = ["Entreprise", "Détails", "Contact"]

export default function SignupSuccessPage() {
    return (
        <div className="mx-auto w-full max-w-[760px] px-2 sm:px-0">
            <div className="mb-12 w-full rounded-md border border-[#DEE2EE] bg-white sm:mb-20">
                <div className="grid grid-cols-3 text-center text-sm leading-none text-[#7C7C7C] sm:text-[22px]">
                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className={index < steps.length - 1 ? "border-r border-[#DEE2EE] py-2.5 sm:py-3" : "py-2.5 sm:py-3"}
                        >
                            {step}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center pb-10 pt-8 text-center sm:pb-16 sm:pt-12">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#A8BFEF] bg-[#E8EEFB] sm:mb-8 sm:h-24 sm:w-24">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-[5px] border-[#3B6FD2] bg-[#DDE7FA] sm:h-14 sm:w-14">
                        <Check className="h-7 w-7 stroke-[3] text-[#3B6FD2] sm:h-8 sm:w-8" />
                    </div>
                </div>

                <h2 className="text-xl font-semibold leading-tight text-primary sm:text-3xl">
                    Félicitations, votre profil est 100% complet !
                </h2>

                <div className="mt-8 flex w-full max-w-[580px] flex-col items-stretch justify-center gap-3 sm:mt-16 sm:flex-row sm:items-center sm:gap-4">
                    <Button
                        variant="secondary"
                        asChild
                        className="h-12 w-full rounded-full text-base font-semibold text-[#3B6FD2] hover:bg-[#D8DEF0] sm:h-16 sm:w-[280px] sm:text-2xl"
                    >
                        <Link href="/dashboard">Tableau de bord</Link>
                    </Button>
                    <Button
                        asChild
                        className="h-12 w-full rounded-full bg-primary text-base font-semibold text-white hover:bg-primary/95 sm:h-16 sm:w-[280px] sm:text-2xl"
                    >
                        <Link href="/poster-offre">Poster une offre</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
