import { GoriyaLogo } from "@/components/goriya-logo"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed left-0 top-0 h-full w-32 pointer-events-none">
        <svg viewBox="0 0 100 400" className="h-full w-full opacity-20" fill="none">
          <circle cx="-30" cy="150" r="80" stroke="#1e3a8a" strokeWidth="20" fill="none" />
          <circle cx="20" cy="300" r="60" stroke="#1e3a8a" strokeWidth="15" fill="none" />
          <circle cx="10" cy="50" r="10" fill="#1e3a8a" opacity="0.5" />
          <circle cx="30" cy="80" r="5" fill="#1e3a8a" opacity="0.3" />
          <circle cx="50" cy="120" r="8" fill="#1e3a8a" opacity="0.4" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center gap-4 p-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            return
          </Link>
        </Button>
        <GoriyaLogo />
      </header>

      {/* Content */}
      <main className="relative z-10 mx-auto max-w-2xl px-6 pb-12">
        {children}
      </main>
    </div>
  )
}
