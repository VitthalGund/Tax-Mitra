"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, Download, FileText, TrendingUp, Home } from "lucide-react"
import { FormSteps } from "@/components/form-steps"

export default function RecommendationsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem(`taxmitra-${params.id}`)
    if (savedData) {
      setFormData(JSON.parse(savedData))
    } else {
      router.push(`/tax-form/${params.id}/user-type`)
    }
  }, [params.id, router])

  // Calculate some example recommendations based on the form data
  const calculateRecommendations = () => {
    // This would be more sophisticated in a real implementation
    const recommendations = [
      {
        id: 1,
        title: "Maximize Section 80C Deductions",
        description:
          "Invest in tax-saving instruments like PPF, ELSS, or NPS to claim deductions up to ₹1,50,000 under Section 80C.",
        savingPotential: "₹46,800",
        priority: "high",
      },
      {
        id: 2,
        title: "Health Insurance Premium Deduction",
        description:
          "Purchase health insurance for yourself and family to claim deduction under Section 80D up to ₹25,000 (₹50,000 for senior citizens).",
        savingPotential: "₹7,800",
        priority: "medium",
      },
      {
        id: 3,
        title: "Home Loan Interest Deduction",
        description:
          "Claim deduction for interest paid on home loan under Section 24 up to ₹2,00,000 for self-occupied property.",
        savingPotential: "₹62,400",
        priority: "high",
      },
      {
        id: 4,
        title: "Additional NPS Contribution",
        description:
          "Contribute to National Pension Scheme to claim additional deduction of up to ₹50,000 under Section 80CCD(1B).",
        savingPotential: "₹15,600",
        priority: "medium",
      },
      {
        id: 5,
        title: "Electric Vehicle Loan Interest",
        description:
          "If you have taken a loan for an electric vehicle, claim deduction for interest under Section 80EEB up to ₹1,50,000.",
        savingPotential: "₹46,800",
        priority: "low",
      },
    ]

    return recommendations
  }

  // Calculate estimated tax liability
  const calculateTaxLiability = () => {
    // This would be more sophisticated in a real implementation
    return {
      grossIncome: "₹12,50,000",
      totalDeductions: "₹2,50,000",
      taxableIncome: "₹10,00,000",
      taxLiability: "₹1,12,500",
      afterRecommendations: "₹78,000",
      potentialSavings: "₹34,500",
    }
  }

  if (!formData) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>
  }

  const recommendations = calculateRecommendations()
  const taxLiability = calculateTaxLiability()

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0f3d4c] mb-2">Tax Recommendations</h1>
      <p className="text-gray-600 mb-8">Based on your information, here are your personalized tax recommendations</p>

      <FormSteps
        currentStep={3}
        steps={["User Type", "Personal Information", "Income Details", "Tax Recommendations"]}
      />

      <div className="space-y-6 mt-8">
        {/* Summary Card */}
        <Card className="bg-[#f5fcfc] border-[#0f6e6e]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-[#0f3d4c]">Tax Summary</CardTitle>
            <CardDescription>Based on the information you've provided</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Gross Income</p>
                <p className="text-2xl font-bold text-[#0f3d4c]">{taxLiability.grossIncome}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Current Tax Liability</p>
                <p className="text-2xl font-bold text-[#0f3d4c]">{taxLiability.taxLiability}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Potential Tax Savings</p>
                <p className="text-2xl font-bold text-green-600">{taxLiability.potentialSavings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl text-[#0f3d4c]">Personalized Tax Recommendations</CardTitle>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Download Report
              </Button>
            </div>
            <CardDescription>Optimize your tax savings with these personalized recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-[#0f6e6e]" size={20} />
                      <h3 className="font-semibold text-[#0f3d4c]">{rec.title}</h3>
                    </div>
                    <Badge
                      className={`
                      ${
                        rec.priority === "high"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : rec.priority === "medium"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    `}
                    >
                      {rec.priority === "high"
                        ? "High Priority"
                        : rec.priority === "medium"
                          ? "Medium Priority"
                          : "Low Priority"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-600" />
                      <span className="text-sm text-gray-600">
                        Potential Savings: <span className="font-semibold text-green-600">{rec.savingPotential}</span>
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="text-[#0f6e6e] border-[#0f6e6e]">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tax Calculation Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-[#0f3d4c]">Tax Calculation Breakdown</CardTitle>
            <CardDescription>Detailed breakdown of your tax calculation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gross Income</span>
                <span className="font-semibold">{taxLiability.grossIncome}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Deductions</span>
                <span className="font-semibold">{taxLiability.totalDeductions}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxable Income</span>
                <span className="font-semibold">{taxLiability.taxableIncome}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Tax Liability</span>
                <span className="font-semibold">{taxLiability.taxLiability}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax After Recommendations</span>
                <span className="font-semibold text-green-600">{taxLiability.afterRecommendations}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Potential Tax Savings</span>
                <span className="font-bold text-green-600">{taxLiability.potentialSavings}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="border-[#0f6e6e] text-[#0f6e6e] flex items-center gap-2"
            onClick={() => window.print()}
          >
            <FileText size={16} />
            Print Tax Report
          </Button>
          <div className="space-x-4">
            <Button
              variant="outline"
              className="border-[#0f6e6e] text-[#0f6e6e] flex items-center gap-2"
              onClick={() => router.push(`/tax-form/${params.id}/preview`)}
            >
              Back to Preview
            </Button>
            <Button
              className="bg-[#0f6e6e] hover:bg-[#0c5c5c] flex items-center gap-2"
              onClick={() => router.push("/")}
            >
              <Home size={16} />
              Complete Tax Filing
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle size={20} className="text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-800">
            This tax recommendation is based on the information you've provided and is for informational purposes only.
            Please consult with a tax professional before making financial decisions.
          </p>
        </div>
      </div>
    </div>
  )
}

