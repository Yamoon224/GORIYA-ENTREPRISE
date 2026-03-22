"use client"

import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SessionProvider } from "next-auth/react"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <ProtectedLayoutContent>{children}</ProtectedLayoutContent>
        </SidebarProvider>
    )
}

// Composant séparé pour pouvoir utiliser useSidebar
function ProtectedLayoutContent({ children }: { children: React.ReactNode }) {
    const { open, setOpen } = useSidebar()

    return (
        <SessionProvider>
            <div className="min-h-screen flex bg-background overflow-x-hidden">
                <AppSidebar />

                {open && (
                    <div
                        className="fixed inset-0 z-30 bg-black/40 md:hidden"
                        onClick={() => setOpen(false)}
                    />
                )}

                <div className="flex-1 flex flex-col md:ml-64 h-screen">
                    <AppHeader />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SessionProvider>        
    )
}