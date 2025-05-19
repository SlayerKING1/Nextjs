import connectDB from "@/dbconfig/config";
import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database
connectDB();

// Define the POST request handler
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare the password
    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Token data
    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };

    // ✅ Generate JWT token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // ✅ Set token in cookies
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;

  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
