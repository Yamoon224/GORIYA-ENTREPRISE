"use client"

import { useEffect } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <SidebarProvider>
                <AuthGuard>{children}</AuthGuard>
            </SidebarProvider>
        </SessionProvider>
    )
}

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/signin")
        }
    }, [status, router])

    if (status === "loading" || status === "unauthenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
        )
    }

    return <ProtectedLayoutContent>{children}</ProtectedLayoutContent>
}

function ProtectedLayoutContent({ children }: { children: React.ReactNode }) {
    const { open, setOpen } = useSidebar()

    return (
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
    )
}