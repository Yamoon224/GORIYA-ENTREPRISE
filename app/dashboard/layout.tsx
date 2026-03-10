"use client"

import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </SidebarProvider>
    )
}

// Composant séparé pour pouvoir utiliser useSidebar
function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
    const { open, setOpen } = useSidebar()

    return (
        <div className="min-h-screen flex bg-background overflow-x-hidden">
            {/* Sidebar */}
            <AppSidebar />

            {/* Overlay mobile */}
            {open && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col md:ml-64">
                <AppHeader />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}