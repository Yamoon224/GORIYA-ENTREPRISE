"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Paperclip, Send, Star, Trash2, MoreHorizontal, User } from "lucide-react"

type Conversation = { id: number; name: string; role: string; time: string; unread: number; lastMessage: string }
type Message = { id: number; content: string; time: string; isMe: boolean }

const conversations: Conversation[] = [
  { id: 1, name: "Marie Dubois", role: "Developpeur Full-Stack Senior", time: "Il y a 5 min", unread: 2, lastMessage: "Merci pour votre retour, je suis tres interessee par cette opportunite." },
  { id: 2, name: "Jean Martin", role: "UX/UI Designer", time: "Il y a 2h", unread: 1, lastMessage: "Quand pourrions-nous programmer l'entretien ?" },
  { id: 3, name: "Sophie Laurent", role: "Chef de Projet Digital", time: "Hier", unread: 0, lastMessage: "Voici mon portfolio complet avec mes derniers projets." },
  { id: 4, name: "Thomas Rousseau", role: "Data Scientist", time: "Il y a 2 jours", unread: 0, lastMessage: "Je vous remercie pour cette opportunite." },
]

const initialMessages: Message[] = [
  { id: 1, content: "Bonjour, je suis tres interessee par le poste de Developpeur Full-Stack Senior. J'ai 5 ans d'experience en React et Node.js.", time: "10:30", isMe: false },
  { id: 2, content: "Bonjour Marie, merci pour votre candidature. Votre profil nous interesse beaucoup. Pouvez-vous me parler de votre experience avec PostgreSQL ?", time: "14:45", isMe: true },
  { id: 3, content: "Bien sur ! J'ai utilise PostgreSQL dans plusieurs projets, notamment pour une application e-commerce avec plus de 100 000 utilisateurs.", time: "15:20", isMe: false },
  { id: 4, content: "Parfait ! Nous aimerions vous rencontrer pour un entretien. Etes-vous disponible cette semaine ?", time: "18:10", isMe: true },
  { id: 5, content: "Je suis disponible mercredi apres-midi ou vendredi matin. Quel creneau vous conviendrait le mieux ?", time: "16:55", isMe: false },
]

function AvatarIcon({ small = false }: { small?: boolean }) {
  const dim = small ? "h-9 w-9" : "h-11 w-11"
  return <div className={`${dim} shrink-0 rounded-full bg-blue-500 flex items-center justify-center`}><User className="h-5 w-5 text-white" strokeWidth={1.8} /></div>
}

export default function MessagesPage() {
  const [selected, setSelected] = useState(conversations[0])
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [search, setSearch] = useState("")

  const filtered = conversations.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  const handleSend = () => {
    if (!newMessage.trim()) return
    setMessages((prev) => [...prev, { id: prev.length + 1, content: newMessage.trim(), time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }), isMe: true }])
    setNewMessage("")
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Communiquez directement avec vos candidats</p>

      <div className="flex flex-col lg:flex-row overflow-hidden rounded-xl border border-border bg-white" style={{ minHeight: "70vh" }}>
        <div className="flex w-full lg:w-[320px] shrink-0 flex-col border-b lg:border-b-0 lg:border-r border-border">
          <div className="px-3 py-3">
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une conversation..." className="pl-9 h-9 text-sm bg-gray-50 border-gray-200" /></div>
          </div>
          <ScrollArea className="h-64 lg:h-[58vh]">
            {filtered.map((conv) => (
              <button key={conv.id} onClick={() => setSelected(conv)} className={`w-full px-3 py-3 text-left transition-colors hover:bg-blue-50/60 ${selected.id === conv.id ? "bg-blue-50" : ""}`}>
                <div className="flex items-start gap-3"><AvatarIcon small /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-1"><span className="truncate text-[13px] font-semibold text-foreground">{conv.name}</span><div className="flex shrink-0 items-center gap-1.5">{conv.unread > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">{conv.unread}</span>}<span className="whitespace-nowrap text-[11px] text-muted-foreground">{conv.time}</span></div></div><p className="truncate text-[11px] text-muted-foreground">{conv.role}</p><p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">{conv.lastMessage}</p></div></div>
              </button>
            ))}
          </ScrollArea>
        </div>

        <div className="flex flex-1 flex-col min-h-[45vh]">
          <div className="flex items-center justify-between border-b border-border bg-blue-50/40 px-4 py-3">
            <div className="flex items-center gap-3"><AvatarIcon /><div><p className="text-sm font-semibold text-foreground">{selected.name}</p><p className="text-xs text-muted-foreground">{selected.role}</p></div></div>
            <div className="flex items-center gap-1 text-muted-foreground"><button className="rounded p-1.5 hover:bg-gray-100 transition-colors"><Star className="h-4 w-4" /></button><button className="rounded p-1.5 hover:bg-gray-100 transition-colors"><Trash2 className="h-4 w-4" /></button><button className="rounded p-1.5 hover:bg-gray-100 transition-colors"><MoreHorizontal className="h-4 w-4" /></button></div>
          </div>

          <ScrollArea className="flex-1 bg-gray-50/30 px-4 sm:px-6 py-4">
            <div className="space-y-4">{messages.map((msg) => <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}><div className={`max-w-[92%] sm:max-w-[75%] lg:max-w-[65%] rounded-2xl px-4 py-2.5 ${msg.isMe ? "bg-blue-500 text-white" : "bg-white shadow-sm border border-gray-100 text-foreground"}`}><p className="text-sm leading-relaxed">{msg.content}</p><p className={`mt-1 text-[11px] ${msg.isMe ? "text-blue-100" : "text-muted-foreground"}`}>{msg.time}</p></div></div>)}</div>
          </ScrollArea>

          <div className="flex items-center gap-2 border-t border-border bg-white px-3 sm:px-4 py-3"><button className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-gray-100 transition-colors"><Paperclip className="h-4 w-4" /></button><Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Tapez votre message..." className="flex-1 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0" onKeyDown={(e) => { if (e.key === "Enter") handleSend() }} /><button onClick={handleSend} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"><Send className="h-4 w-4" /></button></div>
        </div>
      </div>
    </div>
  )
}
