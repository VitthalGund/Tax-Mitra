import * as z from "zod"

export const formSchema = z.object({
    // Step 1: Personal Details
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    panNumber: z.string().min(10, "PAN number must be at least 10 characters"),

    // Step 2: Employment & Financial Info
    employmentType: z.string().min(1, "Employment type is required"),
    annualIncome: z.number().optional(),
    hasForeignIncome: z.boolean().optional(),
    isGstRegistered: z.boolean().optional(),

    // Step 3: Deductions & Investments
    has80CInvestments: z.boolean().optional(),
    investment80CAmount: z.number().optional(),
    healthInsurancePremium: z.number().optional(),
    homeLoanInterest: z.number().optional(),
    educationLoanInterest: z.number().optional(),

    // Step 4: Document Uploads
    form16File: z.any().optional(),
    panCardFile: z.any().optional(),
    additionalDocuments: z.any().optional(),
})