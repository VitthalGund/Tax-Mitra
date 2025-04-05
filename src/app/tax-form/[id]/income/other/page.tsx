"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define validation schema
const otherIncomeSchema = z.object({
  otherInterest: z.string().optional(),
  dividendDistribution: z.string().optional(),
  lotteryGambling: z.string().optional(),
  otherIncomeDetails: z.string().optional(),
  tdsOtherSources: z.string().optional(),
})

type OtherIncomeFormValues = z.infer<typeof otherIncomeSchema>

export default function OtherIncomePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)

  // Initialize form with react-hook-form
  const form = useForm<OtherIncomeFormValues>({
    resolver: zodResolver(otherIncomeSchema),
    defaultValues: {
      otherInterest: "",
      dividendDistribution: "",
      lotteryGambling: "",
      otherIncomeDetails: "",
      tdsOtherSources: "",
    },
    mode: "onChange",
  })

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem(`taxmitra-${params.id}`)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(parsedData)

      // If other income data exists, populate the form
      if (parsedData.incomeDetails?.other && Object.keys(parsedData.incomeDetails.other).length > 0) {
        const otherData = parsedData.incomeDetails.other

        Object.entries(otherData).forEach(([key, value]) => {
          form.setValue(key as any, value as string)
        })
      }
    } else {
      router.push(`/tax-form/${params.id}/user-type`)
    }
  }, [params.id, router, form])

  const onSubmit = (data: OtherIncomeFormValues) => {
    if (formData) {
      const updatedData = {
        ...formData,
        incomeDetails: {
          ...formData.incomeDetails,
          other: data,
        },
      }
      localStorage.setItem(`taxmitra-${params.id}`, JSON.stringify(updatedData))
      router.push(`/tax-form/${params.id}/preview`)
    }
  }

  const handleCompleteAll = () => {
    const data = form.getValues()
    if (formData) {
      const updatedData = {
        ...formData,
        incomeDetails: {
          ...formData.incomeDetails,
          other: data,
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
                name="otherInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Interest Income</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter interest from sources not covered under standard savings"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dividendDistribution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dividend / Distribution Income</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter income from companies, mutual funds, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lotteryGambling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lottery/Gambling Winnings</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter amount (higher tax rates applicable)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherIncomeDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Income Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter details for incomes like royalties, gifts (if taxable), etc."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tdsOtherSources"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TDS on Other Sources</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter any TDS applicable on these incomes" {...field} />
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
                onClick={() => router.push(`/tax-form/${params.id}/income/investments`)}
              >
                Back
              </Button>
              <div className="space-x-4">
                <Button type="submit" variant="outline" className="border-[#0f6e6e] text-[#0f6e6e]">
                  Save and Continue
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

