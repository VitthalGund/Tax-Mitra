"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { FormSteps } from "../../../../components/tax-form/form-steps";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";

// Define validation schema
const personalInfoSchema = z.object({
  pan: z
    .string()
    .regex(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Invalid PAN format. Example: ABCDE1234F"
    ),
  aadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  dob: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    return (
      date < today &&
      date >
      new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
    );
  }, "Please enter a valid date of birth"),
  email: z.string().email("Invalid email address"),
  mobile: z
    .string()
    .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid mobile number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "Please select a state"),
  pincode: z.string().regex(/^\d{6}$/, "PIN code must be 6 digits"),
  residentialStatus: z.string().min(1, "Please select your residential status"),
});


export default function PersonalInfoPage({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const unwrappedParams = React.use(params);

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      pan: "",
      aadhaar: "",
      name: "",
      dob: "",
      email: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      residentialStatus: "",
    },
  });

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem(`taxmitra-${unwrappedParams.id}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);

      // If personal info exists, populate the form
      if (
        parsedData.personalInfo &&
        Object.keys(parsedData.personalInfo).length > 0
      ) {
        Object.entries(parsedData.personalInfo).forEach(([key, value]) => {
          form.setValue(key, value);
        });
      }
    } else {
      router.push(`/tax-form/${unwrappedParams.id}/user-type`);
    }
  }, [unwrappedParams.id, router, form]);

  const onSubmit = async (data) => {
    if (formData) {
      console.log(formData);
      const updatedData = { ...formData, personalInfo: data };
      localStorage.setItem(
        `taxmitra-${unwrappedParams.id}`,
        JSON.stringify(updatedData)
      );
      await fetch(
        `/api/users?email=${encodeURIComponent(formData.personalInfo.email)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.personalInfo.name,
            dob: formData.personalInfo.dob,
            pan: formData.personalInfo.pan,
            phone: formData.personalInfo.mobile,
            address: {
              street: formData.personalInfo.street,
              city: formData.personalInfo.city,
              state: formData.personalInfo.state,
              postalCode: formData.personalInfo.pincode,
              residentialStatus: formData.personalInfo.residentialStatus,
              country: "India", // Hardcoded is fine unless you want to make it dynamic
            },
          }),
        }
      ).then((res) => {
        if (res.status === 200) {
          console.log("User updated successfully");
        } else {
          console.error("Failed to update user data");
        }
      });

      // router.push(`/tax-form/${unwrappedParams.id}/income/salary`);
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
        Personal Information
      </h1>
      <p className="text-gray-600 mb-8">
        Please provide your personal information to continue
      </p>

      <FormSteps
        currentStep={1}
        steps={[
          "User Type",
          "Personal Information",
          "Income Details",
          "Tax Recommendations",
        ]}
      />

      <Card className="mt-8">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="pan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN (Permanent Account Number)*</FormLabel>
                      <FormControl>
                        <Input placeholder="ABCDE1234F" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aadhaar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="123456789012" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth*</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address*</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="andhra-pradesh">
                            Andhra Pradesh
                          </SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="maharashtra">
                            Maharashtra
                          </SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                          <SelectItem value="uttar-pradesh">
                            Uttar Pradesh
                          </SelectItem>
                          <SelectItem value="west-bengal">
                            West Bengal
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter PIN code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="residentialStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residential Status*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="resident">Resident</SelectItem>
                          <SelectItem value="non-resident">
                            Non-Resident
                          </SelectItem>
                          <SelectItem value="resident-not-ordinarily-resident">
                            Resident but Not Ordinarily Resident
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#0f6e6e] text-[#0f6e6e]"
                  onClick={() =>
                    router.push(`/tax-form/${unwrappedParams.id}/user-type`)
                  }
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-[#0f6e6e] hover:bg-[#0c5c5c]"
                >
                  Continue to Income Details
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
