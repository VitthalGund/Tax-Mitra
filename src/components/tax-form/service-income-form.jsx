"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ServiceIncomeFormProps {
  onSave: (data: any) => void
  onComplete: (data: any) => void
}

export default function ServiceIncomeForm({ onSave, onComplete }: ServiceIncomeFormProps) {
  const [formData, setFormData] = useState({
    grossServiceIncome: "",
    allowableExpenses: {
      officeRent: "",
      travelExpenses: "",
      professionalFees: "",
      otherExpenses: "",
    },
    depreciation: "",
    tdsAdvanceTax: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id.replace("-", "")]: value }))
  }

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      allowableExpenses: {
        ...prev.allowableExpenses,
        [id]: value,
      },
    }))
  }

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSaveAndContinue}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="gross-service-income">Gross Service Income / Fees Earned</Label>
              <Input
                id="gross-service-income"
                type="number"
                placeholder="Enter total receipts from services"
                value={formData.grossServiceIncome}
                onChange={handleChange}
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="allowable-expenses">
                <AccordionTrigger className="text-lg font-medium">Allowable Expenses</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="officeRent">Office Rent/Utilities</Label>
                      <Input
                        id="officeRent"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.allowableExpenses.officeRent}
                        onChange={handleExpenseChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="travelExpenses">Travel and Communication Expenses</Label>
                      <Input
                        id="travelExpenses"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.allowableExpenses.travelExpenses}
                        onChange={handleExpenseChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="professionalFees">Professional Fees (legal or accounting)</Label>
                      <Input
                        id="professionalFees"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.allowableExpenses.professionalFees}
                        onChange={handleExpenseChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otherExpenses">Other Operational Expenses</Label>
                      <Input
                        id="otherExpenses"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.allowableExpenses.otherExpenses}
                        onChange={handleExpenseChange}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-2">
              <Label htmlFor="depreciation">Depreciation (if applicable)</Label>
              <Input
                id="depreciation"
                type="number"
                placeholder="Enter amount"
                value={formData.depreciation}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tds-advance-tax">TDS / Advance Tax Paid</Label>
              <Input
                id="tds-advance-tax"
                type="number"
                placeholder="Enter amount already deducted or advanced"
                value={formData.tdsAdvanceTax}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button type="button" variant="outline" className="border-[#0f6e6e] text-[#0f6e6e]">
              Save as Draft
            </Button>
            <div className="space-x-4">
              <Button type="submit" variant="outline" className="border-[#0f6e6e] text-[#0f6e6e]">
                Save and Continue to Next Section
              </Button>
              <Button type="button" className="bg-[#0f6e6e] hover:bg-[#0c5c5c]" onClick={(e) => handleComplete(e)}>
                Submit All Income Details
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

