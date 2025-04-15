import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Menu } from "lucide-react"
import { SideMenu } from "./SideMenu"

type Message = {
  sender: "user" | "bot"
  content: string
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

        const newMessages: Message[] = [
      { sender: "user", content: trimmed },
      { sender: "bot", content: `${trimmed} ですね！` },
        ];

    setMessages((prev) => [...prev, ...newMessages])
    setInput("")
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4">
      {/* SP向けハンバーガーボタン */}
      <button
        data-testid="menu-toggle-button"
        className="absolute top-4 left-4 z-50 md:hidden bg-white/20 text-gray border border-white rounded-md p-2 backdrop-blur shadow"
        onClick={() => setMenuOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* サイドメニュー */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <Card className="w-full h-full max-w-2xl flex flex-col bg-white/80 backdrop-blur shadow-xl rounded-2xl p-4">

        <CardContent className="flex flex-col flex-1 overflow-y-auto space-y-2 pb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              data-testid={msg.sender === "user" ? "user-message" : "bot-message"}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </CardContent>

        <div className="mt-2 flex gap-2">
          <Input
            className="bg-white border border-gray-300 rounded-md"
            placeholder="メッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>送信</Button>
        </div>
      </Card>
    </div>
  )
}
