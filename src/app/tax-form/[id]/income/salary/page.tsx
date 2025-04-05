"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define validation schema
const salarySchema = z.object({
  basicSalary: z.string().refine((val) => !isNaN(Number(val)), "Must be a valid number"),
  allowances: z.object({
    hra: z.string().optional(),
    conveyance: z.string().optional(),
    specialAllowance: z.string().optional(),
    otherAllowances: z.string().optional(),
  }),
  bonus: z.string().optional(),
  deductions: z.object({
    standardDeduction: z.string().optional(),
    professionalTax: z.string().optional(),
    otherDeductions: z.string().optional(),
  }),
  tds: z.string().optional(),
})

type SalaryFormValues = z.infer<typeof salarySchema>

export default function SalaryIncomePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)

  // Initialize form with react-hook-form
  const form = useForm<SalaryFormValues>({
    resolver: zodResolver(salarySchema),
    defaultValues: {
      basicSalary: "",
      allowances: {
        hra: "",
        conveyance: "",
        specialAllowance: "",
        otherAllowances: "",
      },
      bonus: "",
      deductions: {
        standardDeduction: "",
        professionalTax: "",
        otherDeductions: "",
      },
      tds: "",
    },
  })

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem(`taxmitra-${params.id}`)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(parsedData)

      // If salary data exists, populate the form
      if (parsedData.incomeDetails?.salary && Object.keys(parsedData.incomeDetails.salary).length > 0) {
        const salaryData = parsedData.incomeDetails.salary

        // Set basic values
        if (salaryData.basicSalary) form.setValue("basicSalary", salaryData.basicSalary)
        if (salaryData.bonus) form.setValue("bonus", salaryData.bonus)
        if (salaryData.tds) form.setValue("tds", salaryData.tds)

        // Set nested values
        if (salaryData.allowances) {
          Object.entries(salaryData.allowances).forEach(([key, value]) => {
            form.setValue(`allowances.${key}` as any, value as string)
          })
        }

        if (salaryData.deductions) {
          Object.entries(salaryData.deductions).forEach(([key, value]) => {
            form.setValue(`deductions.${key}` as any, value as string)
          })
        }
      }
    } else {
      router.push(`/tax-form/${params.id}/user-type`)
    }
  }, [params.id, router, form])

  const onSubmit = (data: SalaryFormValues) => {
    if (formData) {
      const updatedData = {
        ...formData,
        incomeDetails: {
          ...formData.incomeDetails,
          salary: data,
        },
      }
      localStorage.setItem(`taxmitra-${params.id}`, JSON.stringify(updatedData))
      router.push(`/tax-form/${params.id}/income/services`)
    }
  }

  const handleCompleteAll = () => {
    const data = form.getValues()
    if (formData) {
      const updatedData = {
        ...formData,
        incomeDetails: {
          ...formData.incomeDetails,
          salary: data,
        },
      }
      localStorage.setItem(`taxmitra-${params.id}`, JSON.stringify(updatedData))
      router.push(`/tax-form/${params.id}/preview`)
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
                name="basicSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Basic Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="allowances">
                  <AccordionTrigger className="text-lg font-medium">Allowances</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <FormField
                        control={form.control}
                        name="allowances.hra"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>House Rent Allowance (HRA)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allowances.conveyance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Conveyance Allowance</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allowances.specialAllowance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Allowance</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allowances.otherAllowances"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other Allowances</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter amount" {...field} />
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
                name="bonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bonus/Commission/Incentives</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="deductions">
                  <AccordionTrigger className="text-lg font-medium">Deductions Related to Salary</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <FormField
                        control={form.control}
                        name="deductions.standardDeduction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Standard Deduction</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deductions.professionalTax"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Tax</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deductions.otherDeductions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other Deductions</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter amount" {...field} />
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
                name="tds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Deducted at Source (TDS)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter amount as per Form 16" {...field} />
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
                onClick={() => router.push(`/tax-form/${params.id}/personal-info`)}
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

