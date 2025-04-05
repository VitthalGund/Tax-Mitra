"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface UserTypeSelectionProps {
  onSelect: (type: "individual" | "corporate") => void
}

export default function UserTypeSelection({ onSelect }: UserTypeSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
      <Card className="cursor-pointer hover:border-[#0f6e6e] transition-all" onClick={() => onSelect("individual")}>
        <CardHeader className="text-center">
          <div className="mx-auto p-3 rounded-full bg-[#e6f7f7] w-16 h-16 flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#0f6e6e]"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <CardTitle className="text-xl">Individual</CardTitle>
          <CardDescription>Personal tax filing for individuals</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-gray-600">
          <p>Choose this if you're filing taxes as an individual taxpayer</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#0f6e6e] hover:bg-[#0c5c5c]" onClick={() => onSelect("individual")}>
            Select Individual
          </Button>
        </CardFooter>
      </Card>

      <Card className="cursor-pointer hover:border-[#0f6e6e] transition-all" onClick={() => onSelect("corporate")}>
        <CardHeader className="text-center">
          <div className="mx-auto p-3 rounded-full bg-[#e6f7f7] w-16 h-16 flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#0f6e6e]"
            >
              <path d="M18 21V8a2 2 0 0 0-2-2h-2" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M10 21V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v13" />
              <path d="M18 21H2" />
            </svg>
          </div>
          <CardTitle className="text-xl">Corporate</CardTitle>
          <CardDescription>Business tax filing for companies</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-gray-600">
          <p>Choose this if you're filing taxes for a business entity</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#0f6e6e] hover:bg-[#0c5c5c]" onClick={() => onSelect("corporate")}>
            Select Corporate
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

