import { connectDB } from '../../../lib/db';
import { TaxRecord } from '../../../models/index';
import { User } from '../../../models/index';

export async function GET() {
    await connectDB();
    const records = await TaxRecord.find({});
    return Response.json(records);
}

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

    // 🔍 Check if user exists by email
    const user = await User.findOne({ email });

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

    return Response.json({ success: true, uui: taxRecord.uui, record: taxRecord });
}
