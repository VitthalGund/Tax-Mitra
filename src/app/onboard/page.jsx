"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formSchema } from "@/lib/form-schema";

import StepIndicator from "./step-indicator";
import PersonalDetails from "./steps/personal-details";
import EmploymentInfo from "./steps/employment-info";
import DeductionsInvestments from "./steps/deductions-investments";
import DocumentUploads from "./steps/document-uploads";
import ReviewSubmit from "./steps/review-submit";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      dateOfBirth: "",
      panNumber: "",
      employmentType: "",
      annualIncome: undefined,
      hasForeignIncome: undefined,
      isGstRegistered: undefined,
      has80CInvestments: undefined,
      investment80CAmount: undefined,
      healthInsurancePremium: undefined,
      homeLoanInterest: undefined,
      educationLoanInterest: undefined,
      form16File: undefined,
      panCardFile: undefined,
      additionalDocuments: undefined,
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(currentStep);
    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const getFieldsToValidate = (step) => {
    switch (step) {
      case 1:
        return [
          "fullName",
          "email",
          "mobileNumber",
          "dateOfBirth",
          "panNumber",
        ];
      case 2:
        return [
          "employmentType",
          "annualIncome",
          "hasForeignIncome",
          "isGstRegistered",
        ];
      case 3:
        return ["has80CInvestments"];
      case 4:
        return ["form16File", "panCardFile"];
      default:
        return [];
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetails />;
      case 2:
        return <EmploymentInfo />;
      case 3:
        return <DeductionsInvestments />;
      case 4:
        return <DocumentUploads />;
      case 5:
        return (
          <ReviewSubmit onSubmit={() => methods.handleSubmit(onSubmit)()} />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-3xl shadow-lg">
        <CardContent className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-center mb-2">
              Tax Advisory Service Onboarding
            </h1>
            <p className="text-muted-foreground text-center">
              Please complete all steps to get started
            </p>
          </div>

          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button type="button" className="ml-auto" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button
                type="button"
                className="ml-auto"
                onClick={methods.handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
