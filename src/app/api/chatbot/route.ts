import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Strong prompt template
const getTaxPrompt = (query: string) => `
You are an expert tax consultant specializing in Indian tax laws with over 20 years of experience. 
Your task is to provide accurate, concise, and practical answers related to Indian personal and corporate taxation.
The user is seeking tax-related information.

Guidelines:
- Focus exclusively on Indian tax laws (Income Tax Act, GST, Companies Act, etc.).
- Provide answers that are up-to-date as of ${
  month[new Date().getMonth()]
} ${new Date().getFullYear()}.
- Use simple language for individuals, technical terms for corporate users, and detailed explanations for tax professionals.
- If the query is vague, ask clarifying questions within the response.
- Include relevant section references from Indian tax laws where applicable.
- Avoid speculation; base answers on current tax regulations.

User Query: "${query}"
Answer the query with precision and clarity, tailored to the user's type.
`;

// API Handler
export async function POST(req: NextRequest) {
  try {
    const { query, userType } = await req.json();

    console.log(query);

    // Validate input
    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-thinking-exp-01-21",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    // Generate response
    const prompt = getTaxPrompt(query);
    const result = await model.generateContent(prompt);
    const response =  result.response;
    const answer = response.text();

    return NextResponse.json({
      success: true,
      answer,
      userType,
      query,
    });
  } catch (error) {
    console.error("Error in chatbot API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Please use POST method with query and userType",
    example: {
      query: "What are the tax slabs for FY 2024-25?",
      userType: "individual",
    },
  });
}
