"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Building2,
  Settings,
  HelpCircle,
  Send,
  Briefcase,
  ChevronDown,
  ChevronRight,
  UserCheck,
  FileSignature,
  CalendarDays,
  DollarSign,
  FolderOpen,
  UserPlus,
} from "lucide-react"
import { GoriyaLogo } from "./goriya-logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useState } from "react"

const mainNavItems = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { label: "Poster une offre d'emploi", href: "/dashboard/poster-offre", icon: Send },
  { label: "Mes annonces", href: "/dashboard/annonces", icon: Briefcase },
  { label: "Candidatures", href: "/dashboard/candidatures", icon: Users },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
]

const serviceRhItems = [
  { label: "Employés", href: "/dashboard/services-rh/employes", icon: UserCheck },
  { label: "Recrutements", href: "/dashboard/services-rh/recrutements", icon: UserPlus },
  { label: "Contrats", href: "/dashboard/services-rh/contrats", icon: FileSignature },
  { label: "Congés", href: "/dashboard/services-rh/conges", icon: CalendarDays },
  { label: "Gestion de Paie", href: "/dashboard/services-rh/paie", icon: DollarSign },
  { label: "Documents RH", href: "/dashboard/services-rh/documents", icon: FolderOpen },
]

const settingsNavItems = [
  { label: "Paramètres", href: "/dashboard/parametres", icon: Settings },
  { label: "Centre d'assistance", href: "/dashboard/assistance", icon: HelpCircle },
]

export function AppSidebar() {
  const pathname = usePathname()
  const isRhActive = pathname.startsWith("/dashboard/services-rh")
  const [rhOpen, setRhOpen] = useState(isRhActive)

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-border bg-card overflow-y-auto">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center px-5">
        <GoriyaLogo />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 py-3">
        {mainNavItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "")} />
              {item.label}
            </Link>
          )
        })}

        {/* Services RH expandable */}
        <button
          onClick={() => setRhOpen(!rhOpen)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isRhActive
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <FileText className={cn("h-4 w-4 shrink-0", isRhActive ? "text-primary" : "")} />
          <span className="flex-1 text-left">Services RH</span>
          {rhOpen ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </button>

        {rhOpen && (
          <div className="ml-4 space-y-0.5 border-l border-border pl-3">
            {serviceRhItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}

        <Link
          href="/dashboard/profil"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/dashboard/profil"
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <Building2 className={cn("h-4 w-4 shrink-0", pathname === "/dashboard/profil" ? "text-primary" : "")} />
          Profil Entreprise
        </Link>
      </nav>

      {/* Settings Section */}
      <div className="shrink-0 border-t border-border px-3 py-3">
        <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Paramètres
        </p>
        {settingsNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "")} />
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* User Section */}
      <div className="shrink-0 border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">UN</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">User name</p>
            <p className="text-xs text-muted-foreground truncate">user@domaine.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
