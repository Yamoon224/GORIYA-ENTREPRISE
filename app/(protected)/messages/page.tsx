"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Paperclip, MoreVertical } from "lucide-react"

interface Message {
    id: number
    sender: string
    content: string
    time: string
    isMe: boolean
}

interface Conversation {
    id: number
    name: string
    avatar: string
    lastMessage: string
    time: string
    unread: number
    status: "online" | "offline"
}

const conversations: Conversation[] = [
    {
        id: 1,
        name: "Marie Dubois",
        avatar: "MD",
        lastMessage: "Merci pour le retour, je suis très intéressée...",
        time: "10:30",
        unread: 2,
        status: "online",
    },
    {
        id: 2,
        name: "Jean Martin",
        avatar: "JM",
        lastMessage: "Je peux vous envoyer mon portfolio?",
        time: "09:15",
        unread: 0,
        status: "offline",
    },
    {
        id: 3,
        name: "Sophie Laurent",
        avatar: "SL",
        lastMessage: "L'entretien est confirmé pour demain",
        time: "Hier",
        unread: 0,
        status: "online",
    },
    {
        id: 4,
        name: "Thomas Rousseau",
        avatar: "TR",
        lastMessage: "J'ai bien reçu votre proposition",
        time: "Hier",
        unread: 1,
        status: "offline",
    },
]

const messages: Message[] = [
    {
        id: 1,
        sender: "Marie Dubois",
        content: "Bonjour, j'ai bien reçu votre message concernant le poste de développeur Full Stack. Je suis très intéressée par cette opportunité.",
        time: "10:15",
        isMe: false,
    },
    {
        id: 2,
        sender: "Moi",
        content: "Bonjour Marie, merci pour votre retour rapide. Votre profil correspond vraiment bien à ce que nous recherchons. Seriez-vous disponible pour un entretien cette semaine?",
        time: "10:20",
        isMe: true,
    },
    {
        id: 3,
        sender: "Marie Dubois",
        content: "Oui, je suis disponible jeudi ou vendredi après-midi. Quelle heure vous conviendrait le mieux?",
        time: "10:25",
        isMe: false,
    },
    {
        id: 4,
        sender: "Marie Dubois",
        content: "Merci pour le retour, je suis très intéressée par le poste et j'ai hâte de discuter avec vous!",
        time: "10:30",
        isMe: false,
    },
]

export default function MessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState(conversations[0])
    const [newMessage, setNewMessage] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredConversations = conversations.filter((conv) =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-6">
            {/* Conversations List */}
            <div className="w-80 flex flex-col border rounded-lg bg-card">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher..."
                            className="pl-9"
                        />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-2">
                        {filteredConversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedConversation(conv)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${selectedConversation.id === conv.id
                                        ? "bg-primary/10"
                                        : "hover:bg-muted"
                                    }`}
                            >
                                <div className="relative">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={`/images/placeholder-${conv.id}.jpg`} />
                                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                                            {conv.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    {conv.status === "online" && (
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium text-foreground truncate">{conv.name}</p>
                                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                                </div>
                                {conv.unread > 0 && (
                                    <Badge className="bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center p-0 text-xs">
                                        {conv.unread}
                                    </Badge>
                                )}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col border rounded-lg bg-card">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-secondary text-secondary-foreground">
                                {selectedConversation.avatar}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-foreground">{selectedConversation.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {selectedConversation.status === "online" ? "En ligne" : "Hors ligne"}
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${message.isMe
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-foreground"
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                    <p
                                        className={`text-xs mt-1 ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                                            }`}
                                    >
                                        {message.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Écrivez un message..."
                            className="flex-1"
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && newMessage.trim()) {
                                    // Handle send message
                                    setNewMessage("")
                                }
                            }}
                        />
                        <Button size="icon">
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
