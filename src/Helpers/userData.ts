import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getUserData = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded:any = jwt.verify(token, process.env.TOKEN_SECRET! as string);
    return decoded.id;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};