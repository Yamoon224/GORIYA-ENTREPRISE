"use client"

import { cn } from "@/lib/utils"
import { SignupStepperProps } from "@/@types/props"

export function SignupStepper({ currentStep, steps }: SignupStepperProps) {
    return (
        <div className="w-full overflow-x-auto">
            <div className="flex items-center justify-start md:justify-center mb-8 min-w-max px-2">
                {steps.map((step, index) => (
                    <div key={step} className="flex items-center">
                        <div className="flex flex-col items-center shrink-0">
                            <div
                                className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                                    index <= currentStep
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                )}
                            >
                                {index + 1}
                            </div>

                            {/* Texte responsive */}
                            <span
                                className={cn(
                                    "mt-2 text-xs md:text-sm font-medium text-center whitespace-nowrap",
                                    index <= currentStep
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                {step}
                            </span>
                        </div>

                        {/* Ligne responsive */}
                        {index < steps.length - 1 && (
                            <div
                                className={cn(
                                    "mx-2 md:mx-4 h-0.5 w-12 md:w-24",
                                    index < currentStep ? "bg-primary" : "bg-muted"
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}