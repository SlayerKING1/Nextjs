import connectDB from "@/dbconfig/config";
import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {toast} from "react-hot-toast";

// Connect to the database
connectDB();

// Define the POST request handler
export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash the password
      if (!password) {
         return NextResponse.json({ message: "Password is required" }, { status: 400 });
      }
     
    const salt = await bcryptjs.genSalt(10);  
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}