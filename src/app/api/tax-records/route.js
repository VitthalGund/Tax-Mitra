import { connectDB } from '../../../lib/db';
import { TaxRecord, User } from '../../../models/index';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
    await connectDB();
    const records = await TaxRecord.find({});
    return Response.json(records);
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21",
    generationConfig: {
        temperature: 0.7
    },
});

export async function POST(req) {
    await connectDB();
    const body = await req.json();

    const {
        email,
        financialYear,
        salaryIncome,
        serviceIncome,
        businessIncome,
        investmentIncome,
        otherIncome,
    } = body;
    console.log({ email })
    // 🔍 Check if user exists by email
    const user = await User.findOne({ email: email });

    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found with provided email.' }), {
            status: 404,
        });
    }

    const taxRecord = await TaxRecord.create({
        user: user._id,
        financialYear,
        salaryIncome,
        serviceIncome,
        businessIncome,
        investmentIncome,
        otherIncome,
        deductions: {},
        taxPaid: 0,
        recommendations: {},
    });

    const age = Math.floor((new Date() - user.dob) / (1000 * 60 * 60 * 24 * 365));

    // Detailed prompt
    const prompt = `
You are a Chartered Accountant specializing in Indian tax laws (FY 2023-24). Analyze the following user data and produce a personalized tax-saving plan. Follow these steps carefully:

1. **Tax Calculations:**
   - Calculate the user's gross total income from all sources.
   - Compute the taxable income under both the Old and New Regimes.
     - **Old Regime:** Include full deductions (e.g., standard deduction, 80C, 80D, 80CCD(1B), 80TTA, etc.) and exemptions (e.g., HRA).
     - **New Regime:** Apply limited deductions and any applicable rebate (e.g., under section 87A).
   - Compute tax liability (including cess) for both regimes.

2. **Recommendations:**
   - Compare both regimes and recommend the one with the lower tax liability.
   - Provide a breakdown of recommended deductions, exemptions, and rebates.
   - For **investment options**, list specific options (e.g., PPF, NPS, Sukanya Samriddhi) and for each, calculate and include:
     - The **recommended investment amount** based on the user's income and tax liability.
     - The expected tax benefit.
   - Provide clear reasoning for your recommendations.

3. **Output Format:**
   - Return your response strictly in JSON format as specified below.
   - Do not include any extra commentary or text outside the JSON.

**JSON Structure:**

{
  "taxCalculations": {
    "oldRegime": {
      "grossTotalIncome": number,
      "deductions": {
        "standardDeduction": number,
        "professionalTax": number,
        "otherSalaryDeductions": number,
        "80C": number,
        "80D": number,
        "80CCD(1B)": number,
        "80TTA": number
      },
      "exemptions": {
        "HRA": number
      },
      "taxableIncome": number,
      "taxBeforeCess": number,
      "cess": number,
      "totalTax": number
    },
    "newRegime": {
      "grossTotalIncome": number,
      "deductions": {
        "professionalTax": number,
        "otherSalaryDeductions": number
      },
      "taxableIncome": number,
      "taxBeforeCess": number,
      "rebate87A": number,
      "cess": number,
      "totalTax": number
    }
  },
  "recommendations": {
    "deductions": {
      "80C": number,
      "80D": number,
      "80CCD(1B)": number,
      "80TTA": number
    },
    "exemptions": {
      "HRA": number,
      "standard": number
    },
    "rebates": {
      "87A": number
    },
    "investmentOptions": [
      {
        "name": string,
        "recommendedInvestmentAmount": number,
        "taxBenefit": number,
        "section": string
      }
    ],
    "recommendedRegime": "old" or "new",
    "finalTaxLiability": number,
    "taxSaved": number,
    "reasoning": string
  },
  "computedOn": string // ISO date string
}

User Data:
- Name: ${user.name}
- Age: ${age}
- Gender: ${user.gender}
- Location: ${user.address.city}, ${user.address.state}, India
- Financial Year: ${financialYear}
- Income: ${JSON.stringify({
        salary: salaryIncome,
        business: businessIncome,
        investment: investmentIncome,
        service: serviceIncome,
        other: otherIncome
    })}


Provide your output strictly in the JSON format described above.
`;


    const result = await model.generateContent(prompt);
    const cleanJsonResponse = (response) => {
        // Remove code fences or any extra text around JSON
        return response.replace(/```json|```|``/g, '').trim();
    };
    console.log(result.response.text())
    const aiResponse = JSON.parse(cleanJsonResponse(result.response.text()));

    // Store and return
    taxRecord.recommendations = aiResponse;
    await taxRecord.save();
    return Response.json({
        success: true,
        record: taxRecord,
        financialYear,
        ...aiResponse
    });
}
