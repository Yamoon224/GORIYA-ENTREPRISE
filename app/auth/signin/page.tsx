// app/auth/signin/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { getSession, signIn, useSession } from "next-auth/react"
import { setCookie } from "cookies-next"

export default function Page() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // const { data: session } = useSession()

    // useEffect(() => {
    //     if (session?.user) {
    //         router.replace("/dashboard")
    //     }
    // }, [session, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            // 🔥 Récupérer la session
            const session = await getSession()

            if (session?.user) {
                const authData = {
                    token: session.user.access_token,
                    user: session.user,
                }

                // 🔹 Stocker dans localStorage (optionnel)
                localStorage.setItem("auth", JSON.stringify(authData))

                // 🔹 Stocker côté cookie pour server component
                setCookie("auth", JSON.stringify(authData), {
                    maxAge: 60 * 60, // 7 jours
                    path: "/", // accessible sur tout le site
                    sameSite: "lax",
                })
            }

            if (res?.error) {
                throw new Error("Email ou mot de passe incorrect")
            }

            toast.success("Connexion réussie")

            router.push("/dashboard")

        } catch (err: any) {
            toast.error(err.message)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border rounded-sm shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Se connecter</h2>
            {/* {error && <p className="text-center text-destructive text-sm">{error}</p>} */}

            <form onSubmit={handleSubmit} className="space-y-3">
                <FieldGroup>
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Votre Email"
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel>Mot de passe</FieldLabel>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Votre mot de passe"
                                required
                                className="pr-10"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                {showPassword ? (<EyeOff className="h-4 w-4" />) : (<Eye className="h-4 w-4" />)}
                            </button>
                        </div>
                    </Field>
                </FieldGroup>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                </Button>
            </form>
        </div>
    )
}