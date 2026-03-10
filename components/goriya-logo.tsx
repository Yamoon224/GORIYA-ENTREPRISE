"use client"

import Link from "next/link"

interface GoriyaLogoProps {
  className?: string
  showTagline?: boolean
}

export function GoriyaLogo({ className = "", showTagline = true }: GoriyaLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-1 ${className}`}>
      <svg viewBox="0 0 120 40" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="30" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700" fill="#1e3a8a">
          g
        </text>
        <text x="18" y="30" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700" fill="#1e3a8a">
          o
        </text>
        <text x="38" y="30" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700" fill="#1e3a8a">
          r
        </text>
        <text x="52" y="30" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700" fill="#f97316">
          i
        </text>
        <text x="60" y="30" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700" fill="#1e3a8a">
          ya
        </text>
        {showTagline && (
          <text x="0" y="38" fontFamily="Inter, sans-serif" fontSize="6" fill="#6b7280">
            boost ta carrière
          </text>
        )}
      </svg>
    </Link>
  )
}
