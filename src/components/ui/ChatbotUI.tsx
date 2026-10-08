"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatbotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to Green Hills Agriculture. I'm your virtual assistant.", sender: "bot" },
    { id: 2, text: "How can I help you with our Centella asiatica products today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now(), text: input, sender: "user" }]);
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const query = input.toLowerCase();
      let responseText = "Thank you for reaching out. I am the Green Hills AI Assistant. You can ask me about our products, SL-GAP certification, Keells partnership, exports, or contact details. Alternatively, please use the Contact page to submit a formal inquiry.";

      if (query.includes("hello") || query.includes("hi ") || query.includes("hi\n") || query.includes("hey") || query.includes("greetings")) {
        responseText = "Hello! Welcome to Green Hills Agriculture. How can I assist you today? I can answer questions about our certified Gotu Kola products, exports, retail partners, and farms.";
      } else if (query.includes("gap") || query.includes("certif") || query.includes("standards") || query.includes("sl-gap")) {
        responseText = "Green Hills Agriculture is officially SL-GAP (Sri Lanka Good Agricultural Practices) certified by the Department of Agriculture. This ensures that all our Gotu Kola is cultivated using sustainable, safe, and traceable farming methods with minimum chemical usage.";
      } else if (query.includes("keells") || query.includes("supermarket") || query.includes("partner")) {
        responseText = "We are proud to be a major supplier for Keells Supermarkets. Our premium fresh Gotu Kola is harvested daily at dawn and delivered straight to Keells branches across Sri Lanka within hours to guarantee retail freshness.";
      } else if (query.includes("product") || query.includes("tea") || query.includes("capsule") || query.includes("powder") || query.includes("extract") || query.includes("buy")) {
        responseText = "We supply 6 main Centella asiatica (Gotu Kola) products: Fresh Gotu Kola, Dehydrated Gotu Kola Leaves, Herbal Tea, Fine Leaf Powder, Liquid Extract, and Herbal Capsules. All products are processed in our GMP-compliant facility. You can view specifications on our /products page.";
      } else if (query.includes("export") || query.includes("ship") || query.includes("global") || query.includes("world")) {
        responseText = "We export premium Gotu Kola worldwide (primarily to Europe, UK, and East Asia) in compliance with international food safety standards. We offer vacuum-sealed bulk packaging, phytosanitary certs, and complete farm-to-shipment traceability. Please check our Services page for details.";
      } else if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("address") || query.includes("location") || query.includes("where") || query.includes("office") || query.includes("chilaw")) {
        responseText = "Our head office and primary farming fields are in Manuwangama/E, Chilaw, Sri Lanka. You can contact our team directly via phone at +94 77 465 2552, or email us at info@greenhillsagri.com. We also have a contact form on our /contact page.";
      }

      setMessages(prev => [...prev, {
        id: Date.now(),
        text: responseText,
        sender: "bot"
      }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 right-6 md:bottom-28 md:right-8 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group",
          isOpen && "hidden"
        )}
        aria-label="Open Chatbot"
      >
        <Bot className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-foreground text-sm font-medium py-2 px-3 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ask our AI Assistant
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-white"></span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-[90vw] max-w-[380px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-outfit font-semibold leading-tight">Green Hills AI</h3>
                  <p className="text-xs text-white/80">Online | Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fcf8]">
              {/* Centella decorative bg */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                <Leaf className="w-48 h-48" />
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "relative z-10 max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.sender === "user"
                      ? "bg-primary text-white ml-auto rounded-tr-sm"
                      : "bg-white border border-border text-foreground mr-auto rounded-tl-sm shadow-sm"
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-border">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-muted px-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-primary text-white p-2.5 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
