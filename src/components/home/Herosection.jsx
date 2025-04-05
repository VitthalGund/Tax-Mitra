"use client";

import { Sparkles, ArrowRight, MessageSquare } from "lucide-react";

import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"

export default function Herosection() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Generate a unique ID for this tax filing session
    const sessionId = uuidv4();

    // Initialize empty form data in localStorage
    localStorage.setItem(
      `taxmitra-${sessionId}`,
      JSON.stringify({
        userType: null,
        personalInfo: {},
        incomeDetails: {
          salary: {},
          services: {},
          business: {},
          investments: {},
          other: {},
        },
      })
    );

    // Navigate to the user type selection page with the session ID
    router.push(`/tax-form/${sessionId}/ user-type`);
  };
  return (
    <section className="relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          {/* LEFT SECTION */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Simplify Your Taxes, Maximize Your Savings
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 md:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              TaxMitra is your AI-powered tax assistant that analyzes your
              financial records, suggests the best tax-saving schemes, and
              automates tax filing in compliance with local regulations.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-taxmitra-blue to-taxmitra-teal hover:from-taxmitra-teal hover:to-taxmitra-blue transition-all ease-in-out duration-700"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button size="lg" variant="outline">
                Chat with TaxMitra <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            className="p-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-taxmitra-teal/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-taxmitra-blue/20 rounded-full blur-xl"></div>

              <motion.div
                className="relative bg-white rounded-xl cursor-pointer shadow-lg p-6 border hover:scale-110 border-gray-100"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Header */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-taxmitra-blue to-taxmitra-teal flex items-center justify-center mr-3">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    TaxMitra Assistant
                  </h3>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 py-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-teal-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        Hello! I'm TaxMitra, your AI tax assistant. How can I
                        help you today?
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-teal-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        I need help finding tax deductions for my small
                        business.
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                      <span className="text-sm font-medium">You</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-teal-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        I can help with that! Based on your business type, here
                        are 5 potential deductions you might qualify for...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Input (Disabled Preview) */}
                <div className="border-t pt-4">
                  <div className="relative">
                    <input
                      disabled
                      type="text"
                      placeholder="Ask about your taxes..."
                      className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <Button
                      size="sm"
                      className="absolute right-2 top-[6.2px] h-7 w-7 rounded-full p-0 bg-teal-600"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}