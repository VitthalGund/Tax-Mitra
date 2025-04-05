import { connectDB } from "../../lib/db";
import { User } from "../../models/index";
import { NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  email: z.string().email(),
  gender: z.string(),
});

const putSchema = z.object({
  name: z.string().optional(),
  pan: z.string().optional(),
  dob: z.coerce.date().optional(),
  phone: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
});

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const parsed = postSchema.parse(body);

    const user = await User.create([parsed]);
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();

    const parsed = putSchema.parse(body);
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email query param required to update user" },
        { status: 400 }
      );
    }

    const updated = await User.findOneAndUpdate({ email }, parsed, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
