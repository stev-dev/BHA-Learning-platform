"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Bot, X, Send } from "lucide-react";
import "./Chatbot.css";

// Définition des types pour les messages
interface Message {
  role: "user" | "model";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = sessionStorage.getItem("bhaChatMessages");
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bhaChatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: newMessages.slice(0, -1).map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
          })),
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from the bot.");
      }

      const data = await response.json();
      const botMessage: Message = { role: "model", text: data.text };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: "model",
        text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={toggleChat} className="chat-toggle-button">
        <Image src="/images/chatboot.png" alt="Ouvrir le chatbot" width={60} height={60} />
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-info">
              <Bot className="header-icon" />
              <div>
                <strong>BHA Assistant</strong>
                <div className="online-status">Online</div>
              </div>
            </div>
            <button onClick={toggleChat} className="close-button">
              <X size={20} />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="message model loading">...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-footer">
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading} aria-label="Envoyer">
                <Send size={20} />
              </button>
            </form>
            <div className="footer-text">Powered by BHA</div>
          </div>
        </div>
      )}
    </div>
  );
} 