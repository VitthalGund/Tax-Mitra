"use client"

import { createContext, useContext, useState } from "react"


const FormContext = createContext(undefined)

const defaultFormData = {
  // Personal Details
  fullName: "",
  email: "",
  mobileNumber: "",
  dateOfBirth: "",
  panNumber: "",

  // Employment & Financial Info
  employmentType: "",
  annualIncome: "",
  hasForeignIncome: false,
  isGstRegistered: false,

  // Deductions & Investments
  has80CInvestment: false,
  total80CInvestment: "",
  healthInsurancePremium: "",
  homeLoanInterest: "",
  educationLoanInterest: "",

  // Document Uploads
  form16File: null,
  panCardFile: null,
  additionalDocuments: null,
}

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(defaultFormData)

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return <FormContext.Provider value={{ formData, updateFormData }}>{children}</FormContext.Provider>
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}

