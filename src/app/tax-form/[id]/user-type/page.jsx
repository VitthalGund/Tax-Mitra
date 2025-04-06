"use client";

import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { FormSteps } from "../../../../components/tax-form/form-steps";

export default function UserTypePage({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const unwrappedParams = React.use(params);

  useEffect(() => {
    const savedData = localStorage.getItem(`taxmitra-${unwrappedParams.id}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      const initialData = {
        userType: null,
        personalInfo: {},
        incomeDetails: {
          salary: {},
          services: {},
          business: {},
          investments: {},
          other: {},
        },
      };
      localStorage.setItem(
        `taxmitra-${unwrappedParams.id}`,
        JSON.stringify(initialData)
      );
      setFormData(initialData);
    }
  }, [unwrappedParams.id]);

  const handleSelect = (type) => {
    if (formData) {
      const updatedData = { ...formData, userType: type };
      localStorage.setItem(
        `taxmitra-${unwrappedParams.id}`,
        JSON.stringify(updatedData)
      );
      router.push(`/tax-form/${unwrappedParams.id}/personal-info`);
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
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0f3d4c] mb-2">
        Select User Type
      </h1>
      <p className="text-gray-600 mb-8">
        Please select your user type to continue with your tax filing
      </p>

      <FormSteps
        currentStep={0}
        steps={[
          "User Type",
          "Personal Information",
          "Income Details",
          "Tax Recommendations",
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
        {/* Individual Card */}
        <Card
          className="cursor-pointer hover:border-[#0f6e6e] transition-all"
          onClick={() => handleSelect("individual")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto p-3 rounded-full bg-[#e6f7f7] w-16 h-16 flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0f6e6e]"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <CardTitle className="text-xl">Individual</CardTitle>
            <CardDescription>
              Personal tax filing for individuals
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            <p>Choose this if you're filing taxes as an individual taxpayer</p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#0f6e6e] hover:bg-[#0c5c5c]"
              onClick={() => handleSelect("individual")}
            >
              Select Individual
            </Button>
          </CardFooter>
        </Card>

        {/* Corporate Card - Disabled with Tooltip */}
        <div className="relative group">
          <Card className="cursor-not-allowed opacity-70">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 rounded-full bg-[#e6f7f7] w-16 h-16 flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#0f6e6e]"
                >
                  <path d="M18 21V8a2 2 0 0 0-2-2h-2" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M10 21V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v13" />
                  <path d="M18 21H2" />
                </svg>
              </div>
              <CardTitle className="text-xl">Corporate</CardTitle>
              <CardDescription>
                Business tax filing for companies
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              <p>Choose this if you're filing taxes for a business entity</p>
            </CardContent>
            <CardFooter>
              <button
                className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed relative"
                disabled
              >
                Select Corporate
              </button>
            </CardFooter>
          </Card>

          {/* Tooltip */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            This feature is yet to be implemented
          </div>
        </div>
      </div>
    </div>
  );
}
