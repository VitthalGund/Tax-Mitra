"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface SalaryIncomeFormProps {
  onSave: (data: any) => void
  onComplete: (data: any) => void
}

export default function SalaryIncomeForm({ onSave, onComplete }: SalaryIncomeFormProps) {
  const [formData, setFormData] = useState({
    basicSalary: "",
    allowances: {
      hra: "",
      conveyance: "",
      specialAllowance: "",
      otherAllowances: "",
    },
    perquisites: [],
    bonus: "",
    deductions: {
      standardDeduction: "",
      professionalTax: "",
      otherDeductions: "",
    },
    tds: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id.replace("-", "")]: value }))
  }

  const handleAllowanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      allowances: {
        ...prev.allowances,
        [id]: value,
      },
    }))
  }

  const handleDeductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      deductions: {
        ...prev.deductions,
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
              <Label htmlFor="basic-salary">Basic Salary</Label>
              <Input
                id="basic-salary"
                type="number"
                placeholder="Enter amount"
                value={formData.basicSalary}
                onChange={handleChange}
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="allowances">
                <AccordionTrigger className="text-lg font-medium">Allowances</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="hra">House Rent Allowance (HRA)</Label>
                      <Input
                        id="hra"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.allowances.hra}
                        onChange={handleAllowanceChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="conveyance">Conveyance Allowance</Label>
                      <Input
                        id="conveyance"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.allowances.conveyance}
                        onChange={handleAllowanceChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialAllowance">Special Allowance</Label>
                      <Input
                        id="specialAllowance"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.allowances.specialAllowance}
                        onChange={handleAllowanceChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otherAllowances">Other Allowances</Label>
                      <Input
                        id="otherAllowances"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.allowances.otherAllowances}
                        onChange={handleAllowanceChange}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="perquisites">
                <AccordionTrigger className="text-lg font-medium">Perquisites</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="perquisite-1">Rent-free accommodation</Label>
                      <Input id="perquisite-1" type="number" placeholder="Enter amount" className="w-1/2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="perquisite-2">Company car benefits</Label>
                      <Input id="perquisite-2" type="number" placeholder="Enter amount" className="w-1/2" />
                    </div>

                    <Button type="button" variant="outline" className="mt-2">
                      + Add More Perquisites
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-2">
              <Label htmlFor="bonus">Bonus/Commission/Incentives</Label>
              <Input
                id="bonus"
                type="number"
                placeholder="Enter amount"
                value={formData.bonus}
                onChange={handleChange}
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="deductions">
                <AccordionTrigger className="text-lg font-medium">Deductions Related to Salary</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="standardDeduction">Standard Deduction</Label>
                      <Input
                        id="standardDeduction"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.deductions.standardDeduction}
                        onChange={handleDeductionChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="professionalTax">Professional Tax</Label>
                      <Input
                        id="professionalTax"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.deductions.professionalTax}
                        onChange={handleDeductionChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otherDeductions">Other Deductions</Label>
                      <Input
                        id="otherDeductions"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.deductions.otherDeductions}
                        onChange={handleDeductionChange}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-2">
              <Label htmlFor="tds">Tax Deducted at Source (TDS)</Label>
              <Input
                id="tds"
                type="number"
                placeholder="Enter amount as per Form 16"
                value={formData.tds}
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

