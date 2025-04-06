"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { FormSteps } from "../../../../components/tax-form/form-steps"
import { Separator } from "../../../../components/ui/separator"
import { Edit, FileText, CheckCircle } from "lucide-react"

export default function PreviewPage({ params }) {
  const router = useRouter()
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

  if (!formData) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>
  }

  const handleEdit = (section) => {
    switch (section) {
      case "userType":
        router.push(`/tax-form/${unwrappedParams.id}/user-type`)
        break
      case "personalInfo":
        router.push(`/tax-form/${unwrappedParams.id}/personal-info`)
        break
      case "salary":
        router.push(`/tax-form/${unwrappedParams.id}/income/salary`)
        break
      case "services":
        router.push(`/tax-form/${unwrappedParams.id}/income/services`)
        break
      case "business":
        router.push(`/tax-form/${unwrappedParams.id}/income/business`)
        break
      case "investments":
        router.push(`/tax-form/${unwrappedParams.id}/income/investments`)
        break
      case "other":
        router.push(`/tax-form/${unwrappedParams.id}/income/other`)
        break
      default:
        break
    }
  }

  const handleContinue = async () => {
    console.log({ formData })
    await fetch(`/api/tax-records/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.personalInfo.email,
        financialYear: "2023-2024",
        salaryIncome: formData.incomeDetails.salary,
        serviceIncome: formData.incomeDetails.services,
        businessIncome: formData.incomeDetails.business,
        investmentIncome: formData.incomeDetails.investments,
        otherIncome: formData.incomeDetails.other,
      }),
    }).then((response) => response.json()).then((response) => {
      if (response.ok) {
        console.log({ response: response })
        console.log("Data sent successfully")
      } else {
        console.error("Error sending data")
      }
    });
    ;
    // router.push(`/tax-form/${unwrappedParams.id}/recommendations`)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0f3d4c] mb-2">Preview Your Information</h1>
      <p className="text-gray-600 mb-8">Review your information before proceeding to tax recommendations</p>

      <FormSteps
        currentStep={3}
        steps={["User Type", "Personal Information", "Income Details", "Tax Recommendations"]}
      />

      <div className="mt-8 space-y-6">
        {/* User Type */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl text-[#0f3d4c]">User Type</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => handleEdit("userType")}
            >
              <Edit size={16} />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium capitalize">{formData.userType}</p>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl text-[#0f3d4c]">Personal Information</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => handleEdit("personalInfo")}
            >
              <Edit size={16} />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{formData.personalInfo.name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">PAN</p>
                <p className="font-medium">{formData.personalInfo.pan || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Aadhaar</p>
                <p className="font-medium">{formData.personalInfo.aadhaar || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{formData.personalInfo.dob || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{formData.personalInfo.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium">{formData.personalInfo.mobile || "Not provided"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  {formData.personalInfo.address
                    ? `${formData.personalInfo.address}, ${formData.personalInfo.city}, ${formData.personalInfo.state} - ${formData.personalInfo.pincode}`
                    : "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Residential Status</p>
                <p className="font-medium capitalize">
                  {formData.personalInfo.residentialStatus
                    ? formData.personalInfo.residentialStatus.replace(/-/g, " ")
                    : "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Income Details */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-[#0f3d4c]">Income Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="salary" className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="salary">Salary</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>

              <TabsContent value="salary">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Salary Income</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleEdit("salary")}
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                </div>

                {formData.incomeDetails.salary && Object.keys(formData.incomeDetails.salary).length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Basic Salary</span>
                      <span className="font-semibold">₹{formData.incomeDetails.salary.basicSalary || "0"}</span>
                    </div>
                    <Separator />

                    {formData.incomeDetails.salary.allowances && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">HRA</span>
                          <span className="font-semibold">₹{formData.incomeDetails.salary.allowances.hra || "0"}</span>
                        </div>
                        <Separator />
                      </>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bonus/Commission</span>
                      <span className="font-semibold">₹{formData.incomeDetails.salary.bonus || "0"}</span>
                    </div>
                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">TDS</span>
                      <span className="font-semibold">₹{formData.incomeDetails.salary.tds || "0"}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No salary income details provided</p>
                )}
              </TabsContent>

              <TabsContent value="services">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Service Income</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleEdit("services")}
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                </div>

                {formData.incomeDetails.services && Object.keys(formData.incomeDetails.services).length > 0 ? (
                  <p>Service income details available</p>
                ) : (
                  <p className="text-gray-500 italic">No service income details provided</p>
                )}
              </TabsContent>

              <TabsContent value="business">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Business Income</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleEdit("business")}
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                </div>

                {formData.incomeDetails.business && Object.keys(formData.incomeDetails.business).length > 0 ? (
                  <p>Business income details available</p>
                ) : (
                  <p className="text-gray-500 italic">No business income details provided</p>
                )}
              </TabsContent>

              <TabsContent value="investments">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Investment Income</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleEdit("investments")}
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                </div>

                {formData.incomeDetails.investments && Object.keys(formData.incomeDetails.investments).length > 0 ? (
                  <p>Investment income details available</p>
                ) : (
                  <p className="text-gray-500 italic">No investment income details provided</p>
                )}
              </TabsContent>

              <TabsContent value="other">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Other Income</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleEdit("other")}
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                </div>

                {formData.incomeDetails.other && Object.keys(formData.incomeDetails.other).length > 0 ? (
                  <p>Other income details available</p>
                ) : (
                  <p className="text-gray-500 italic">No other income details provided</p>
                )}
              </TabsContent>
            </Tabs>
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
            Print Preview
          </Button>
          <Button className="bg-[#0f6e6e] hover:bg-[#0c5c5c] flex items-center gap-2" onClick={handleContinue}>
            Continue to Tax Recommendations
            <CheckCircle size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

