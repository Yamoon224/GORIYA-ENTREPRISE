"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";

interface UserMenuProps {
    triggerOnly?: boolean; // si true, n'affiche que le trigger, jamais le dropdown
}

export default function UserMenu({ triggerOnly = false }: UserMenuProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { data: session, status } = useSession();
    const user = session?.user;

    // Fermer le dropdown si clic en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            // 🧹 Nettoyage défensif d'éventuels résidus d'anciennes sessions
            // (localStorage/cookie "auth" non httpOnly utilisés par le passé).
            if (typeof window !== "undefined") {
                localStorage.removeItem("auth");
                localStorage.removeItem("user");
                document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }

            await signOut({ redirect: false });
            router.push("/auth/signin");
        } catch (err) {
            console.error(err);
        }
    };

    if (status === "loading" || !user) return null;

    return (
        <div ref={menuRef} className="relative border-t border-border p-4">
            {/* Trigger cliquable */}
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => !triggerOnly && setOpen(!open)}>
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.image || "/placeholder-user.jpg"} />
                    <AvatarFallback>{user.name?.slice(0, 2).toUpperCase() || "UN"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
            </div>

            {/* Dropdown, uniquement si triggerOnly === false */}
            {!triggerOnly && open && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-lg shadow-lg z-50">
                    <button
                        onClick={() => router.push("/profile")}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-muted">
                        <User className="h-4 w-4" /> Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-mute">
                        <LogOut className="h-4 w-4" /> Déconnexion
                    </button>
                </div>
            )}
        </div>
    );
}