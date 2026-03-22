"use client"

import Link from "next/link"
import Image from "next/image"

interface GoriyaLogoProps {
    className?: string
    showTagline?: boolean
    width?: number
    height?: number
}

export function GoriyaLogo({
    className = "",
    showTagline = true,
    width = 120,
    height = 40
}: GoriyaLogoProps) {
    return (
        <Link href="/" className={`flex items-center gap-2 ${className}`}>
            <Image
                src="/images/logo.png"
                alt="Goriya"
                width={width}
                height={height}
                className="h-10 w-auto"
                priority
            />
        </Link>
    )
}