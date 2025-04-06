"use client"

import React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { FormSteps } from "../../../../components/tax-form/form-steps"
import { Button } from "../../../../components/ui/button"
import { FileText } from "lucide-react"

export default function IncomeLayout({
  children,
  params,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [formData, setFormData] = useState(null)
  const unwrappedParams = React.use(params)
  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem(`taxmitra-${unwrappedParams.id}`)
    if (savedData) {
      setFormData(JSON.parse(savedData))
    } else {
      router.push(`/tax-form/${unwrappedParams.id}/user-type`)
    }
  }, [unwrappedParams.id, router])

  const handleTabChange = (value) => {
    router.push(`/tax-form/${unwrappedParams.id}/income/${value}`)
  }

  if (!formData) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>
  }

  // Determine active tab from pathname
  const getActiveTab = () => {
    const path = pathname.split("/").pop()
    return path || "salary"
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0f3d4c] mb-2">Income Details</h1>
      <p className="text-gray-600 mb-8">
        Please provide your income details from various sources
      </p>

      <FormSteps
        currentStep={2}
        steps={[
          "User Type",
          "Personal Information",
          "Income Details",
          "Tax Recommendations",
        ]}
      />

      <Tabs
        value={getActiveTab()}
        onValueChange={handleTabChange}
        className="w-full mt-8"
      >
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="">
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            className="border-[#0f6e6e] text-[#0f6e6e] flex items-center gap-2"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
          >
            <FileText size={16} />
            Print Report
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

