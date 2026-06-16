"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Search, UserPlus, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SubscriptionGate } from "@/components/subscription-gate"

const employees = [
  {
    id: 1,
    initials: "MD",
    name: "Marie Dubois",
    email: "marie.dubois@company.com",
    department: "Développement",
    position: "Développeuse Senior",
    phone: "+33 6 12 34 56 78",
    status: "Actif",
    hireDate: "15/03/2022",
  },
  {
    id: 2,
    initials: "JM",
    name: "Jean Martin",
    email: "jean.martin@company.com",
    department: "Marketing",
    position: "Chef de Projet",
    phone: "+33 6 23 45 67 89",
    status: "Actif",
    hireDate: "01/09/2021",
  },
  {
    id: 3,
    initials: "SB",
    name: "Sophie Bernard",
    email: "sophie.bernard@company.com",
    department: "RH",
    position: "Responsable RH",
    phone: "+33 6 34 56 78 90",
    status: "Actif",
    hireDate: "10/01/2020",
  },
  {
    id: 4,
    initials: "PL",
    name: "Pierre Leroy",
    email: "pierre.leroy@company.com",
    department: "Ventes",
    position: "Commercial Senior",
    phone: "+33 6 45 67 89 01",
    status: "En congé",
    hireDate: "20/06/2019",
  },
  {
    id: 5,
    initials: "AR",
    name: "Amélie Rousseau",
    email: "amelie.rousseau@company.com",
    department: "Finance",
    position: "Comptable",
    phone: "+33 6 56 78 90 12",
    status: "Actif",
    hireDate: "15/01/2023",
  },
]

const departments = ["Tous les départements", "Développement", "Marketing", "RH", "Ventes", "Finance"]

const initialsColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
]

function EmployesContent() {
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("Tous les départements")

  const filtered = employees.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
    const matchDept = department === "Tous les départements" || e.department === department
    return matchSearch && matchDept
  })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Employés</h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, email ou département..."
            className="pl-9 h-10"
          />
        </div>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="h-10 w-full lg:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="h-10 gap-2 rounded-lg bg-primary font-semibold lg:w-auto">
          <UserPlus className="h-4 w-4" />
          + Ajouter un employé
        </Button>
      </div>

      {/* Table */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-5 px-6">
          <div>
            <h2 className="text-base font-semibold text-foreground">Liste des Employés</h2>
            <p className="text-sm text-muted-foreground">{filtered.length} employé(s) affiché(s)</p>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead>
              <tr className="border-b border-border">
                {["Employé", "Département", "Poste", "Contact", "Statut", "Date d'entrée", ""].map((h) => (
                  <th
                    key={h}
                    className="pb-3 text-left text-xs font-medium text-muted-foreground tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((emp, i) => (
                <tr key={emp.id} className="group hover:bg-muted/30 transition-colors">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${initialsColors[i % initialsColors.length]}`}
                      >
                        {emp.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-sm text-foreground">{emp.department}</td>
                  <td className="py-4 pr-4 text-sm text-foreground">{emp.position}</td>
                  <td className="py-4 pr-4 text-sm text-foreground">{emp.phone}</td>
                  <td className="py-4 pr-4">
                    <Badge
                      className={
                        emp.status === "Actif"
                          ? "bg-purple-600 text-white hover:bg-purple-600 rounded-full px-3 font-normal"
                          : "bg-orange-100 text-orange-600 hover:bg-orange-100 rounded-full px-3 font-normal"
                      }
                    >
                      {emp.status}
                    </Badge>
                  </td>
                  <td className="py-4 pr-4 text-sm text-foreground">{emp.hireDate}</td>
                  <td className="py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Désactiver</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Page() {
  return (
    <SubscriptionGate featureLabel="la gestion des employés">
      <EmployesContent />
    </SubscriptionGate>
  )
}
