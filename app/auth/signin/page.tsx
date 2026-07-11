// app/auth/signin/page.tsx
"use client"

import Link from "next/link"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { getSession, signIn, signOut } from "next-auth/react"

export default function Page() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // ✅ La session NextAuth (cookie httpOnly) est l'unique source de vérité.
    // Si une session valide existe déjà, on redirige directement vers le dashboard.
    useEffect(() => {
        getSession().then((session) => {
            if (session?.user) {
                router.replace("/dashboard")
            }
        })
    }, [router])

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

            if (res?.error) {
                throw new Error("Email ou mot de passe incorrect")
            }

            if (session?.user) {
                const role = (session.user as any).role
                if (role !== "ENTREPRISE") {
                    await signOut({ redirect: false })
                    toast.error("Votre compte n'est pas autorisé ici. Cette interface est réservée aux entreprises.")
                    return
                }
            }

            // ✅ signIn() a déjà posé le cookie de session NextAuth (httpOnly).
            // On ne duplique plus le token en localStorage/cookie non protégé.
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
                            placeholder="Votre email"
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

            <div className="mt-4 text-center text-sm text-muted-foreground">
                Vous n'avez pas de compte entreprise ?{" "}
                <Link
                    href="/auth/signup"
                    className="text-primary font-medium hover:underline">
                    S'inscrire
                </Link>
            </div>
        </div>
    )
}