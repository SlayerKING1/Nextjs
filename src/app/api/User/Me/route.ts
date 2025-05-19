import {getUserData} from "@/Helpers/userData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/userModel";
import connectDB from "@/dbconfig/config";

connectDB();

export async function GET(req: NextRequest) {
   const userId = getUserData(req);
   if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
   
   try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
         return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user, { status: 200 });
   } catch (error) {
      console.error("Error fetching user data:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
   }
}