"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface OtherIncomeFormProps {
  onSave: (data: any) => void
  onComplete: (data: any) => void
}

export default function OtherIncomeForm({ onSave, onComplete }: OtherIncomeFormProps) {
  const [formData, setFormData] = useState({
    otherInterest: "",
    dividendDistribution: "",
    lotteryGambling: "",
    otherIncomeDetails: "",
    tdsOtherSources: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id.replace("-", "")]: value }))
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
              <Label htmlFor="other-interest">Other Interest Income</Label>
              <Input
                id="other-interest"
                type="number"
                placeholder="Enter interest from sources not covered under standard savings"
                value={formData.otherInterest}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dividend-distribution">Dividend / Distribution Income</Label>
              <Input
                id="dividend-distribution"
                type="number"
                placeholder="Enter income from companies, mutual funds, etc."
                value={formData.dividendDistribution}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lottery-gambling">Lottery/Gambling Winnings</Label>
              <Input
                id="lottery-gambling"
                type="number"
                placeholder="Enter amount (higher tax rates applicable)"
                value={formData.lotteryGambling}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="other-income-details">Other Income Details</Label>
              <Textarea
                id="other-income-details"
                placeholder="Enter details for incomes like royalties, gifts (if taxable), etc."
                className="min-h-[100px]"
                value={formData.otherIncomeDetails}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tds-other-sources">TDS on Other Sources</Label>
              <Input
                id="tds-other-sources"
                type="number"
                placeholder="Enter any TDS applicable on these incomes"
                value={formData.tdsOtherSources}
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

