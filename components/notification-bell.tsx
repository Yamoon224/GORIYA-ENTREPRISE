"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { notificationService, type INotification } from "@/lib/notification.service"

export function NotificationBell() {
    const [notifications, setNotifications] = useState<INotification[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        notificationService.getNotifications()
            .then((data) => setNotifications(Array.isArray(data) ? data : []))
            .catch(() => {})
            .finally(() => setLoaded(true))
    }, [])

    const unreadCount = notifications.filter((n) => !n.isRead).length

    const handleMarkAsRead = (id: string) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
        notificationService.markAsRead(id).catch(() => {})
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {loaded && unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                    <p className="px-2 py-4 text-center text-sm text-muted-foreground">Aucune notification pour l'instant.</p>
                ) : (
                    notifications.slice(0, 5).map((n) => (
                        <DropdownMenuItem
                            key={n.id}
                            className="flex flex-col items-start gap-0.5 whitespace-normal py-2"
                            onClick={() => !n.isRead && handleMarkAsRead(n.id)}
                        >
                            <span className={`text-sm ${n.isRead ? "text-muted-foreground" : "font-medium"}`}>{n.title}</span>
                            {n.body && <span className="text-xs text-muted-foreground line-clamp-2">{n.body}</span>}
                        </DropdownMenuItem>
                    ))
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/parametres" className="justify-center text-sm font-medium text-primary">
                        Gérer les notifications
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
