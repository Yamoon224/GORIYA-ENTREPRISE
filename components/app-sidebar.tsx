"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Building2,
    Settings,
    HelpCircle,
    Send,
    Briefcase,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { GoriyaLogo } from "./goriya-logo"
import { useSidebar } from "./sidebar-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mainNavItems = [
    { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { label: "Poster une offre d'emploi", href: "/dashboard/poster-offre", icon: Send },
    { label: "Mes annonces", href: "/dashboard/annonces", icon: Briefcase },
    { label: "Candidatures", href: "/dashboard/candidatures", icon: Users },
    { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { label: "Service RH", href: "/dashboard/service-rh", icon: Building2 },
    { label: "Profil Entreprise", href: "/dashboard/profil", icon: Building2 },
]

const settingsNavItems = [
    { label: "Paramètres", href: "/dashboard/parametres", icon: Settings },
    { label: "Centre d'assistance", href: "/dashboard/assistance", icon: HelpCircle },
]

export function AppSidebar() {
    const pathname = usePathname()
    const { open, setOpen } = useSidebar()

    return (
        <>
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transition-transform duration-200",
                    open ? "translate-x-0" : "-translate-x-full",
                    "md:translate-x-0"
                )}>
                {/* Logo */}
                <div className="flex h-16 items-center px-6">
                    <GoriyaLogo />
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                <span className="truncate">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Settings */}
                <div className="border-t border-border px-3 py-4">
                    <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Paramètres
                    </p>

                    {settingsNavItems.map((item) => {
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                <span className="truncate">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* User */}
                <div className="border-t border-border p-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 truncate">
                            <p className="text-sm font-medium text-foreground">
                                User name
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                user@domaine.com
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
            
            {/* Overlay mobile */}
            {open && (
                <div
                className="fixed inset-0 z-30 bg-black/40 md:hidden"
                onClick={() => setOpen(false)}
                />
            )}
        </>
    )
}