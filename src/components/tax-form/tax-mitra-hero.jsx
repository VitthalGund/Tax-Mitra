"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid"

export function TaxMitraHero() {
  const router = useRouter()

  const handleGetStarted = () => {
    // Generate a unique ID for this tax filing session
    const sessionId = uuidv4()

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
      }),
    )

    // Navigate to the user type selection page with the session ID
    router.push(`/tax-form/${sessionId}/user-type`)
  }

  return (
    <section className="container mx-auto py-16 px-4 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-5xl font-bold text-[#0f3d4c] leading-tight">Simplify Your Taxes, Maximize Your Savings</h2>
        <p className="mt-6 text-gray-600 text-lg">
          TaxMitra is your AI-powered tax assistant that analyzes your financial records, suggests the best tax-saving
          schemes, and automates tax filing in compliance with local regulations.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            onClick={handleGetStarted}
            className="bg-[#0f6e6e] hover:bg-[#0c5c5c] text-white flex items-center gap-2"
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-gray-300">
            Chat with TaxMitra
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
            </svg>
          </Button>
        </div>
      </div>
      <div className="bg-[#f5fcfc] p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1 rounded-full bg-[#e6f7f7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#0f6e6e]"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
              <path d="M21 3v9h-9" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-[#0f6e6e]">TaxMitra AI</p>
            <p className="text-sm text-gray-500">Online now</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded-full bg-[#e6f7f7]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0f6e6e]"
              >
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
                <path d="M21 3v9h-9" />
              </svg>
            </div>
            <p className="text-gray-700">Hello! I'm TaxMitra, your AI tax assistant. How can I help you today?</p>
          </div>
        </div>
        <div className="bg-[#e6f7f7] p-4 rounded-lg mb-4 ml-auto max-w-[80%]">
          <p className="text-gray-700">I need help finding tax deductions for my small business.</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded-full bg-[#e6f7f7]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0f6e6e]"
              >
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
                <path d="M21 3v9h-9" />
              </svg>
            </div>
            <p className="text-gray-700">
              I can help with that! Based on your business type, here are 5 potential deductions you might qualify
              for...
            </p>
          </div>
        </div>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Ask about your taxes..."
            className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f6e6e] focus:border-transparent"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0f6e6e] text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 14-7-7 14v-7H5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

