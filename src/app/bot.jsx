"use client";
import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  X,
  SendHorizontal,
  Banknote,
  PiggyBank,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Welcome to TaxMitra 💼. I can guide you through tax filing, deductions, and smart investments!",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() === "") return;
    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Thanks for your query! 📊 We'll help you with that shortly. Tip: Check if you're eligible for 80C deductions.",
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
            className="w-[350px] sm:w-[420px] h-[500px] bg-white rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <PiggyBank className="w-5 h-5" />
                </motion.div>
                <h4 className="text-base font-semibold">TaxMitra Advisor</h4>
              </div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="rounded-full p-1 hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <div className="p-4 text-sm space-y-4 overflow-y-auto flex-1 bg-gradient-to-b from-gray-50 to-white">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95,
                      x: msg.from === "user" ? 20 : -20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * (idx % 3),
                    }}
                    className={`flex gap-2 items-start ${
                      msg.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.from === "bot" && (
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center shadow-sm">
                        <Banknote className="w-4 h-4 text-teal-600" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl max-w-[75%] ${
                        msg.from === "bot"
                          ? "bg-white border border-gray-100 text-gray-800 shadow-sm"
                          : "bg-teal-500 text-white shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex gap-2 items-start"
                  >
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <Banknote className="w-4 h-4 text-teal-600" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-800 shadow-sm flex items-center space-x-1">
                      <div
                        className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 border-t bg-white flex gap-2 shadow-lg"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask your tax-related question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSend();
                }}
                disabled={message.trim() === ""}
                className={`rounded-full ${
                  message.trim() === ""
                    ? "bg-gray-200 text-gray-400"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                } px-4 transition-all duration-200`}
              >
                <SendHorizontal className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatType: "loop",
              }}
              className="absolute inset-0 rounded-full bg-teal-400"
            />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10"
            >
              <Button
                className="rounded-full shadow-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white h-14 w-14 flex items-center justify-center"
                onClick={handleButtonClick}
              >
                <MessageSquare className="w-6 h-6" />
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
