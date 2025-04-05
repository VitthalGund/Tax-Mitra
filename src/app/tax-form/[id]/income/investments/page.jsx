"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

// Define validation schema
const investmentSchema = z.object({
  rentalIncome: z.object({
    grossRental: z.string().optional(),
    municipalTaxes: z.string().optional(),
    standardDeductionRent: z.string().optional(),
  }),
  capitalGains: z.object({
    salePrice: z.string().optional(),
    costAcquisition: z.string().optional(),
    datePurchase: z.string().optional(),
    dateSale: z.string().optional(),
    indexationFactor: z.string().optional(),
    holdingPeriod: z.string().optional(),
  }),
  interestIncome: z.object({
    interestEarned: z.string().optional(),
    tdsInterest: z.string().optional(),
  }),
  dividendIncome: z.string().optional(),
});


export default function InvestmentIncomePage({
  params,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const unwrappedParams = React.use(params)

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
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
    },
    mode: "onChange",
  });

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem(`taxmitra-${unwrappedParams.id}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);

      // If investment data exists, populate the form
      if (
        parsedData.incomeDetails?.investments &&
        Object.keys(parsedData.incomeDetails.investments).length > 0
      ) {
        const investmentData = parsedData.incomeDetails.investments;

        // Set basic values
        if (investmentData.dividendIncome)
          form.setValue("dividendIncome", investmentData.dividendIncome);

        // Set nested values
        if (investmentData.rentalIncome) {
          Object.entries(investmentData.rentalIncome).forEach(
            ([key, value]) => {
              form.setValue(`rentalIncome.${key}`, value);
            }
          );
        }

        if (investmentData.capitalGains) {
          Object.entries(investmentData.capitalGains).forEach(
            ([key, value]) => {
              form.setValue(`capitalGains.${key}`, value);
            }
          );
        }

        if (investmentData.interestIncome) {
          Object.entries(investmentData.interestIncome).forEach(
            ([key, value]) => {
              form.setValue(`interestIncome.${key}`, value);
            }
          );
        }
      }
    } else {
      router.push(`/tax-form/${unwrappedParams.id}/user-type`);
    }
  }, [unwrappedParams.id, router, form]);

  const onSubmit = (data) => {
    if (formData) {
      const updatedData = {
        ...formData,
        incomeDetails: {
          ...formData.incomeDetails,
          investments: data,
        },
      };
      localStorage.setItem(
        `taxmitra-${unwrappedParams.id}`,
        JSON.stringify(updatedData)
      );
      router.push(`/tax-form/${unwrappedParams.id}/income/other`);
    }
  };

  const handleCompleteAll = () => {
    const data = form.getValues();
    if (formData) {
      const updatedData = {
        ...formData,
        incomeDetails: {
          ...formData.incomeDetails,
          investments: data,
        },
      };
      localStorage.setItem(
        `taxmitra-${unwrappedParams.id}`,
        JSON.stringify(updatedData)
      );
      router.push(`/tax-form/${unwrappedParams.id}/preview`);
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading...
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="rental-income">
                  <AccordionTrigger className="text-lg font-medium">
                    Rental Income Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <FormField
                        control={form.control}
                        name="rentalIncome.grossRental"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gross Rental Income</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter amount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rentalIncome.municipalTaxes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Municipal Taxes Paid</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter amount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rentalIncome.standardDeductionRent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Computed Standard Deduction (30% on net rent)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter amount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="capital-gains">
                  <AccordionTrigger className="text-lg font-medium">
                    Capital Gains (For Property/Investments)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <FormField
                        control={form.control}
                        name="capitalGains.salePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sale Price</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter amount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="capitalGains.costAcquisition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cost of Acquisition</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter amount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="capitalGains.datePurchase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Purchase</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="capitalGains.dateSale"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Sale</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="capitalGains.indexationFactor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Indexation Factor (if applicable)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter factor"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="capitalGains.holdingPeriod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Holding Period</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select period" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="short-term">
                                  Short-term
                                </SelectItem>
                                <SelectItem value="long-term">
                                  Long-term
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="interest-income">
                  <AccordionTrigger className="text-lg font-medium">
                    Interest Income from Investments
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <FormField
                        control={form.control}
                        name="interestIncome.interestEarned"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Interest Earned (from FDs, bonds, etc.)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter amount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="interestIncome.tdsInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TDS on Interest Income</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter amount"
                                {...field}
                              />
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
                name="dividendIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dividend Income (if applicable)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter amount received, along with any related tax credits"
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
                onClick={() =>
                  router.push(`/tax-form/${unwrappedParams.id}/income/business`)
                }
              >
                Back
              </Button>
              <div className="space-x-4">
                <Button
                  type="submit"
                  variant="outline"
                  className="border-[#0f6e6e] text-[#0f6e6e]"
                >
                  Save and Continue to Next Section
                </Button>
                <Button
                  type="button"
                  className="bg-[#0f6e6e] hover:bg-[#0c5c5c]"
                  onClick={handleCompleteAll}
                >
                  Submit All Income Details
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
