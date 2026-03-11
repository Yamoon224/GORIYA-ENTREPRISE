"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Lock, Globe, Palette, CreditCard, Shield, Trash2 } from "lucide-react"

export default function ParametresPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        newCandidature: true,
        messages: true,
        newsletter: false,
    })

    return (
        <div className="w-full space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="w-full">
                    <TabsTrigger value="general" className="flex-1 gap-2">
                        <Globe className="h-4 w-4" />
                        Général
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex-1 gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex-1 gap-2">
                        <Lock className="h-4 w-4" />
                        Sécurité
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="flex-1 gap-2">
                        <CreditCard className="h-4 w-4" />
                        Facturation
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paramètres généraux</CardTitle>
                            <CardDescription>
                                Gérez les paramètres généraux de votre compte
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Langue</FieldLabel>
                                    <Select defaultValue="fr">
                                        <SelectTrigger className="w-64">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fr">Français</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field>
                                    <FieldLabel>Fuseau horaire</FieldLabel>
                                    <Select defaultValue="africa-abidjan">
                                        <SelectTrigger className="w-64">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="africa-abidjan">Africa/Abidjan (GMT+0)</SelectItem>
                                            <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                                            <SelectItem value="america-ny">America/New_York (GMT-5)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field>
                                    <FieldLabel>Format de date</FieldLabel>
                                    <Select defaultValue="dd-mm-yyyy">
                                        <SelectTrigger className="w-64">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                                            <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldGroup>

                            <div className="flex justify-end">
                                <Button>Enregistrer les modifications</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Préférences de notification</CardTitle>
                            <CardDescription>
                                Choisissez comment vous souhaitez être notifié
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Notifications par email</p>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez des notifications par email
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.email}
                                        onCheckedChange={(checked) =>
                                            setNotifications({ ...notifications, email: checked })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Notifications push</p>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez des notifications push dans votre navigateur
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.push}
                                        onCheckedChange={(checked) =>
                                            setNotifications({ ...notifications, push: checked })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Nouvelles candidatures</p>
                                        <p className="text-sm text-muted-foreground">
                                            Être notifié lors d&apos;une nouvelle candidature
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.newCandidature}
                                        onCheckedChange={(checked) =>
                                            setNotifications({ ...notifications, newCandidature: checked })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Messages</p>
                                        <p className="text-sm text-muted-foreground">
                                            Être notifié lors d&apos;un nouveau message
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.messages}
                                        onCheckedChange={(checked) =>
                                            setNotifications({ ...notifications, messages: checked })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Newsletter</p>
                                        <p className="text-sm text-muted-foreground">
                                            Recevoir notre newsletter mensuelle
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.newsletter}
                                        onCheckedChange={(checked) =>
                                            setNotifications({ ...notifications, newsletter: checked })
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Changer le mot de passe</CardTitle>
                                <CardDescription>
                                    Mettez à jour votre mot de passe pour sécuriser votre compte
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel>Mot de passe actuel</FieldLabel>
                                        <Input type="password" className="max-w-md" />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Nouveau mot de passe</FieldLabel>
                                        <Input type="password" className="max-w-md" />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Confirmer le nouveau mot de passe</FieldLabel>
                                        <Input type="password" className="max-w-md" />
                                    </Field>
                                </FieldGroup>
                                <Button>Mettre à jour le mot de passe</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center flex-1 gap-2">
                                    <Shield className="h-5 w-5" />
                                    Authentification à deux facteurs
                                </CardTitle>
                                <CardDescription>
                                    Ajoutez une couche de sécurité supplémentaire à votre compte
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline">Activer 2FA</Button>
                            </CardContent>
                        </Card>

                        <Card className="border-destructive">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-destructive">
                                    <Trash2 className="h-5 w-5" />
                                    Zone dangereuse
                                </CardTitle>
                                <CardDescription>
                                    Actions irréversibles pour votre compte
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="destructive">Supprimer mon compte</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Billing Settings */}
                <TabsContent value="billing">
                    <Card>
                        <CardHeader>
                            <CardTitle>Abonnement actuel</CardTitle>
                            <CardDescription>
                                Gérez votre abonnement et vos informations de paiement
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-foreground">Plan Standard</p>
                                        <p className="text-sm text-muted-foreground">1 999 FCFA / mois</p>
                                    </div>
                                    <Button variant="outline">Changer de plan</Button>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-foreground mb-3">Historique des paiements</h4>
                                <div className="space-y-2">
                                    {[
                                        { date: "15 Jan 2024", amount: "1 999 FCFA", status: "Payé" },
                                        { date: "15 Déc 2023", amount: "1 999 FCFA", status: "Payé" },
                                        { date: "15 Nov 2023", amount: "1 999 FCFA", status: "Payé" },
                                    ].map((payment, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg border p-3"
                                        >
                                            <span className="text-sm text-foreground">{payment.date}</span>
                                            <span className="text-sm text-foreground">{payment.amount}</span>
                                            <span className="text-sm text-green-600">{payment.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
