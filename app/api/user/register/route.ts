import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import PhoneModel from "@/models/Phone";
import userSchema from "@/validator/RegisterValidator";
import methodNotAllowed from "@/helper/methodNotAllowed";
import { hashPassword } from "@/helper/passwordHelper"; 

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    if (body.phoneNumber) {
      body.phoneNumber.slNo = 1;
    }

    const { name, email, password, phoneNumber } = await userSchema.validateAsync(body);

    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    const newPhone = new PhoneModel({ user: newUser._id, phone: [phoneNumber] });
    await newPhone.save();

    await newPhone.populate("user", "-password");

    return NextResponse.json({ data: newPhone }, { status: 201 });
  } catch (error) {
    console.error("Error in user creation:", error);

    return NextResponse.json(
      { error:  "Failed to create user" },
      { status: 400 }
    );
  }
}
