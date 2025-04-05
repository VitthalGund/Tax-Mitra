import { connectDB } from '../../../../lib/db';
import { TaxRecord } from '../../../../models/index';

export async function GET(_, { params }) {
    await connectDB();
    const { uui } = params;

    const record = await TaxRecord.findOne({ uui });

    if (!record) {
        return new Response(JSON.stringify({ error: 'Record not found' }), { status: 404 });
    }

    return Response.json(record);
}
