"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InvestmentIncomeFormProps {
  onSave: (data: any) => void
  onComplete: (data: any) => void
}

export default function InvestmentIncomeForm({ onSave, onComplete }: InvestmentIncomeFormProps) {
  const [formData, setFormData] = useState({
    rentalIncome: {
      grossRental: "",
      municipalTaxes: "",
      standardDeductionRent: "",
    },
    capitalGains: {
      salePrice: "",
      costAcquisition: "",
      datePurchase: "",
      dateSale: "",
      indexationFactor: "",
      holdingPeriod: "",
    },
    interestIncome: {
      interestEarned: "",
      tdsInterest: "",
    },
    dividendIncome: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id.replace("-", "")]: value }))
  }

  const handleRentalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      rentalIncome: {
        ...prev.rentalIncome,
        [id]: value,
      },
    }))
  }

  const handleCapitalGainsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      capitalGains: {
        ...prev.capitalGains,
        [id]: value,
      },
    }))
  }

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      interestIncome: {
        ...prev.interestIncome,
        [id]: value,
      },
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      capitalGains: {
        ...prev.capitalGains,
        [field]: value,
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
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="rental-income">
                <AccordionTrigger className="text-lg font-medium">Rental Income Details</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="grossRental">Gross Rental Income</Label>
                      <Input
                        id="grossRental"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.rentalIncome.grossRental}
                        onChange={handleRentalChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="municipalTaxes">Municipal Taxes Paid</Label>
                      <Input
                        id="municipalTaxes"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.rentalIncome.municipalTaxes}
                        onChange={handleRentalChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="standardDeductionRent">Computed Standard Deduction (30% on net rent)</Label>
                      <Input
                        id="standardDeductionRent"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.rentalIncome.standardDeductionRent}
                        onChange={handleRentalChange}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="capital-gains">
                <AccordionTrigger className="text-lg font-medium">
                  Capital Gains (For Property/Investments)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="salePrice">Sale Price</Label>
                      <Input
                        id="salePrice"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.capitalGains.salePrice}
                        onChange={handleCapitalGainsChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="costAcquisition">Cost of Acquisition</Label>
                      <Input
                        id="costAcquisition"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.capitalGains.costAcquisition}
                        onChange={handleCapitalGainsChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="datePurchase">Date of Purchase</Label>
                      <Input
                        id="datePurchase"
                        type="date"
                        value={formData.capitalGains.datePurchase}
                        onChange={handleCapitalGainsChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateSale">Date of Sale</Label>
                      <Input
                        id="dateSale"
                        type="date"
                        value={formData.capitalGains.dateSale}
                        onChange={handleCapitalGainsChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="indexationFactor">Indexation Factor (if applicable)</Label>
                      <Input
                        id="indexationFactor"
                        type="number"
                        placeholder="Enter factor"
                        value={formData.capitalGains.indexationFactor}
                        onChange={handleCapitalGainsChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="holdingPeriod">Holding Period</Label>
                      <Select onValueChange={(value) => handleSelectChange("holdingPeriod", value)}>
                        <SelectTrigger id="holdingPeriod">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short-term">Short-term</SelectItem>
                          <SelectItem value="long-term">Long-term</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="interest-income">
                <AccordionTrigger className="text-lg font-medium">Interest Income from Investments</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="interestEarned">Interest Earned (from FDs, bonds, etc.)</Label>
                      <Input
                        id="interestEarned"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.interestIncome.interestEarned}
                        onChange={handleInterestChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tdsInterest">TDS on Interest Income</Label>
                      <Input
                        id="tdsInterest"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.interestIncome.tdsInterest}
                        onChange={handleInterestChange}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-2">
              <Label htmlFor="dividend-income">Dividend Income (if applicable)</Label>
              <Input
                id="dividend-income"
                type="number"
                placeholder="Enter amount received, along with any related tax credits"
                value={formData.dividendIncome}
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

