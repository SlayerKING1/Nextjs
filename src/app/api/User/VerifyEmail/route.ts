import connectDB from "@/dbconfig/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/userModel";
import { use } from "react";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }
   user.isVarified = true;
   user.verifyToken = undefined;
   user.verifyTokenExpiry = undefined;
   await user.save();
    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );



  } catch (error: any) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
