"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserTypeSelection from "./user-type-selection"
import PersonalInfoForm from "./personal-info-form"
import SalaryIncomeForm from "./salary-income-form"
import ServiceIncomeForm from "./service-income-form"
import BusinessIncomeForm from "./business-income-form"
import InvestmentIncomeForm from "./investment-income-form"
import OtherIncomeForm from "./other-income-form"
import TaxRecommendations from "./tax-recommendations"

export default function TaxForm() {
  const [open, setOpen] = useState(false)
  const [userType, setUserType] = useState < "individual" | "corporate" | null > (null)
  const [currentStep, setCurrentStep] = useState(0)
  const [activeIncomeTab, setActiveIncomeTab] = useState("salary")
  const [formData, setFormData] = useState({
    personalInfo: {},
    incomeDetails: {
      salary: {},
      services: {},
      business: {},
      investments: {},
      other: {},
    },
  })

  const steps = [
    {
      id: "user-type",
      title: "User Type",
      component: (
        <UserTypeSelection
          onSelect={(type) => {
            setUserType(type)
            setCurrentStep(1)
          }}
        />
      ),
    },
    {
      id: "personal-info",
      title: "Personal Information",
      component: (
        <PersonalInfoForm
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, personalInfo: data }))
            setCurrentStep(2)
          }}
        />
      ),
    },
    {
      id: "income-details",
      title: "Income Details",
      component: (
        <Tabs defaultValue="salary" value={activeIncomeTab} onValueChange={setActiveIncomeTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="salary">Salary</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="salary">
            <SalaryIncomeForm
              onSave={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, salary: data },
                }))
                setActiveIncomeTab("services")
              }}
              onComplete={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, salary: data },
                }))
                setCurrentStep(3)
              }}
            />
          </TabsContent>
          <TabsContent value="services">
            <ServiceIncomeForm
              onSave={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, services: data },
                }))
                setActiveIncomeTab("business")
              }}
              onComplete={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, services: data },
                }))
                setCurrentStep(3)
              }}
            />
          </TabsContent>
          <TabsContent value="business">
            <BusinessIncomeForm
              onSave={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, business: data },
                }))
                setActiveIncomeTab("investments")
              }}
              onComplete={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, business: data },
                }))
                setCurrentStep(3)
              }}
            />
          </TabsContent>
          <TabsContent value="investments">
            <InvestmentIncomeForm
              onSave={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, investments: data },
                }))
                setActiveIncomeTab("other")
              }}
              onComplete={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, investments: data },
                }))
                setCurrentStep(3)
              }}
            />
          </TabsContent>
          <TabsContent value="other">
            <OtherIncomeForm
              onSave={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, other: data },
                }))
              }}
              onComplete={(data) => {
                setFormData((prev) => ({
                  ...prev,
                  incomeDetails: { ...prev.incomeDetails, other: data },
                }))
                setCurrentStep(3)
              }}
            />
          </TabsContent>
        </Tabs>
      ),
    },
    {
      id: "tax-recommendations",
      title: "Tax Recommendations",
      component: <TaxRecommendations formData={formData} onClose={() => setOpen(false)} />,
    },
  ]

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#0f3d4c]">{steps[currentStep].title}</DialogTitle>
            <DialogDescription>
              {currentStep === 0 && "Please select your user type to continue"}
              {currentStep === 1 && "Please provide your personal information"}
              {currentStep === 2 && "Please provide your income details"}
              {currentStep === 3 && "Based on your information, here are your personalized tax recommendations"}
            </DialogDescription>
          </DialogHeader>

          {/* Step indicator */}
          {userType && (
            <div className="flex items-center mb-6">
              {steps.slice(1).map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep > index + 1
                      ? "bg-[#0f6e6e] text-white"
                      : currentStep === index + 1
                        ? "bg-[#0f6e6e] text-white"
                        : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 2 && (
                    <div className={`h-1 w-16 ${currentStep > index + 1 ? "bg-[#0f6e6e]" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {steps[currentStep].component}

          {/* Navigation buttons for going back */}
          {currentStep > 0 && currentStep < 3 && (
            <div className="flex justify-start mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="text-[#0f6e6e] border-[#0f6e6e]"
              >
                Back
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

