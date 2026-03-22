import { Card, CardContent } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export default function RecrutementsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-foreground">Recrutements</h1>
      <Card className="border border-border">
        <CardContent className="p-12 text-center text-muted-foreground">
          <UserPlus className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>Gestion des recrutements en cours</p>
        </CardContent>
      </Card>
    </div>
  )
}
