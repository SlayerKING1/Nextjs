import connectDB from "@/dbconfig/config";
import User from "@/Models/userModel";
import { sendEmail } from "@/Helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await sendEmail(user.email, "RESET", user._id);

    return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
  } catch (error) {
    console.error("Error in forgot password route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
