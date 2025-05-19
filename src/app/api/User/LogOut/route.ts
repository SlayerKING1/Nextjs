import { NextResponse } from "next/server";


export async function GET(){
   try {
      const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
      response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
      return response;
   } catch (error) {
      console.error("Error logging out:", error);
      return NextResponse.json({ message: "Logout failed" }, { status: 500 });
   }
}