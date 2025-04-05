"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent } from "../../../../../components/ui/card"
import { Input } from "../../../../../components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../../components/ui/accordion"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../../components/ui/form"

// Define validation schema
const businessSchema = z.object({
  grossTurnover: z.string().optional(),
  cogs: z.string().optional(),
  operatingExpenses: z.object({
    rentSalaries: z.string().optional(),
    marketing: z.string().optional(),
    adminExpenses: z.string().optional(),
    otherBusinessExpenses: z.string().optional(),
  }),
  depreciationAmortization: z.string().optional(),
  otherAdjustments: z.string().optional(),
})


export default function BusinessIncomePage({ params }) {
  const router = useRouter()
  const [formData, setFormData] = useState(null)
  const unwrappedParams = React.use(params)

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      grossTurnover: "",
      cogs: "",
      operatingExpenses: {
        rentSalaries: "",
        marketing: "",
        adminExpenses: "",
        otherBusinessExpenses: "",
      },
      depreciationAmortization: "",
      otherAdjustments: "",
    },
    mode: "onChange",
  })

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem(`taxmitra-${unwrappedParams.id}`)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(parsedData)

      // If business data exists, populate the form
      if (parsedData.incomeDetails?.business && Object.keys(parsedData.incomeDetails.business).length > 0) {
        const businessData = parsedData.incomeDetails.business

        // Set basic values
        if (businessData.grossTurnover) form.setValue("grossTurnover", businessData.grossTurnover)
        if (businessData.cogs) form.setValue("cogs", businessData.cogs)
        if (businessData.depreciationAmortization)
          form.setValue("depreciationAmortization", businessData.depreciationAmortization)
        if (businessData.otherAdjustments) form.setValue("otherAdjustments", businessData.otherAdjustments)

        // Set nested values
        if (businessData.operatingExpenses) {
          Object.entries(businessData.operatingExpenses).forEach(([key, value]) => {
            form.setValue(`operatingExpenses.${key}`, value)
          })
        }
      }
    } else {
      router.push(`/tax-form/${unwrappedParams.id}/user-type`)
    }
  }, [unwrappedParams.id, router, form])

  const onSubmit = (data) => {
    if (formData) {
      const updatedData = {
        ...formData,
        incomeDetails: {
          ...formData.incomeDetails,
          business: data,
        },
      }
      localStorage.setItem(`taxmitra-${unwrappedParams.id}`, JSON.stringify(updatedData))
      router.push(`/tax-form/${unwrappedParams.id}/income/investments`)
    }
  }

  const handleCompleteAll = () => {
    const data = form.getValues()
    if (formData) {
      const updatedData = {
        ...formData,
        incomeDetails: {
          ...formData.incomeDetails,
          business: data,
        },
      }
      localStorage.setItem(`taxmitra-${unwrappedParams.id}`, JSON.stringify(updatedData))
      router.push(`/tax-form/${unwrappedParams.id}/preview`)
    }
  }

  if (!formData) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="grossTurnover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Turnover/Receipts</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter total business income before deductions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cogs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost of Goods Sold (COGS)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter direct costs related to production" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="operating-expenses">
                  <AccordionTrigger className="text-lg font-medium">Operating Expenses</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <FormField
                        control={form.control}
                        name="operatingExpenses.rentSalaries"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rent, Salaries, and Utilities</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="operatingExpenses.marketing"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marketing/Advertising</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="operatingExpenses.adminExpenses"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Administrative Expenses</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="operatingExpenses.otherBusinessExpenses"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other Business-related Expenses</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <FormField
                control={form.control}
                name="depreciationAmortization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Depreciation/Amortization</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter amount based on assets used in business" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherAdjustments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Adjustments/Allowances</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter incentives, subsidies, or specific tax adjustments"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="border-[#0f6e6e] text-[#0f6e6e]"
                onClick={() => router.push(`/tax-form/${unwrappedParams.id}/income/services`)}
              >
                Back
              </Button>
              <div className="space-x-4">
                <Button type="submit" variant="outline" className="border-[#0f6e6e] text-[#0f6e6e]">
                  Save and Continue to Next Section
                </Button>
                <Button type="button" className="bg-[#0f6e6e] hover:bg-[#0c5c5c]" onClick={handleCompleteAll}>
                  Submit All Income Details
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

