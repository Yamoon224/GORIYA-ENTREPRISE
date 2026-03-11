"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tarifs d'abonnement", href: "/dashboard/assistance" },
]

export function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-6">
      <nav className="flex items-center gap-6">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/dashboard/poster-offre">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs font-medium px-4"
          >
            Publier une annonce
          </Button>
        </Link>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="w-52 pl-9 h-8 text-sm rounded-full"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
