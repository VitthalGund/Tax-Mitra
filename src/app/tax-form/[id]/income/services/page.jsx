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

// Define validation schema
const serviceSchema = z.object({
  grossServiceIncome: z.string().optional(),
  allowableExpenses: z.object({
    officeRent: z.string().optional(),
    travelExpenses: z.string().optional(),
    professionalFees: z.string().optional(),
    otherExpenses: z.string().optional(),
  }),
  depreciation: z.string().optional(),
  tdsAdvanceTax: z.string().optional(),
});

export default function ServiceIncomePage({
  params,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const unwrappedParams = React.use(params)

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      grossServiceIncome: "",
      allowableExpenses: {
        officeRent: "",
        travelExpenses: "",
        professionalFees: "",
        otherExpenses: "",
      },
      depreciation: "",
      tdsAdvanceTax: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem(`taxmitra-${unwrappedParams.id}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);

      // If service data exists, populate the form
      if (
        parsedData.incomeDetails?.services &&
        Object.keys(parsedData.incomeDetails.services).length > 0
      ) {
        const serviceData = parsedData.incomeDetails.services;

        // Set basic values
        if (serviceData.grossServiceIncome)
          form.setValue("grossServiceIncome", serviceData.grossServiceIncome);
        if (serviceData.depreciation)
          form.setValue("depreciation", serviceData.depreciation);
        if (serviceData.tdsAdvanceTax)
          form.setValue("tdsAdvanceTax", serviceData.tdsAdvanceTax);

        // Set nested values
        if (serviceData.allowableExpenses) {
          Object.entries(serviceData.allowableExpenses).forEach(
            ([key, value]) => {
              form.setValue(`allowableExpenses.${key}`, value);
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
          services: data,
        },
      };
      localStorage.setItem(
        `taxmitra-${unwrappedParams.id}`,
        JSON.stringify(updatedData)
      );
      router.push(`/tax-form/${unwrappedParams.id}/income/business`);
    }
  };

  const handleCompleteAll = () => {
    const data = form.getValues();
    if (formData) {
      const updatedData = {
        ...formData,
        incomeDetails: {
          ...formData.incomeDetails,
          services: data,
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
              <FormField
                control={form.control}
                name="grossServiceIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Service Income / Fees Earned</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter total receipts from services"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="allowable-expenses">
                  <AccordionTrigger className="text-lg font-medium">
                    Allowable Expenses
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <FormField
                        control={form.control}
                        name="allowableExpenses.officeRent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Office Rent/Utilities</FormLabel>
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
                        name="allowableExpenses.travelExpenses"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Travel and Communication Expenses
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
                        name="allowableExpenses.professionalFees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Professional Fees (legal or accounting)
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
                        name="allowableExpenses.otherExpenses"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other Operational Expenses</FormLabel>
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
                name="depreciation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Depreciation (if applicable)</FormLabel>
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
                name="tdsAdvanceTax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TDS / Advance Tax Paid</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter amount already deducted or advanced"
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
                  router.push(`/tax-form/${unwrappedParams.id}/income/salary`)
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
