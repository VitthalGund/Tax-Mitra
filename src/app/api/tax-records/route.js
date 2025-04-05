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
      You are a Chartered Accountant specializing in Indian tax laws (FY 2023-24). Analyze:
      - Name: ${user.name}
      - Age: ${age}
      - Gender: ${email}
      - Location: ${user.address.city}, ${user.address.state}, India
      - Income: ${JSON.stringify({
        salary: salaryIncome,
        business: businessIncome,
        investment: investmentIncome,
        service: serviceIncome,
        other: otherIncome
    })}

      Tax Rules:
      - Old Regime: 5% (₹2.5L-5L), 20% (₹5L-10L), 30% (>₹10L); Full deductions.
      - New Regime: 5% (₹3L-6L), 10% (₹6L-9L), 15% (₹9L-12L), 20% (₹12L-15L), 30% (>₹15L); Limited deductions.
      - Deductions: 80C (₹1.5L), 80D (₹25K/50K), 80CCD(1B) (₹50K), 80TTA (₹10K), 80TTB (₹50K for seniors).
      - Exemptions: HRA, standard deduction (₹50K).
      - Rebate: 87A (₹25K if income ≤ ₹7L in new regime).

      Provide in JSON:
      1. Tax calculations (old and new regimes).
      2. Deductions, exemptions, rebates, and investment options (e.g., PPF, NPS, Sukanya Samriddhi).
      3. Recommended regime, final tax liability, tax saved, and reasoning.
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
