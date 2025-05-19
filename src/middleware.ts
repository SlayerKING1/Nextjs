import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname;
   const isPublicPath = path === '/Login' || path === '/Signup';
   const token = request.cookies.get('token')?.value || '';

   if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
   }
   if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/Login', request.nextUrl));
   }
}

//See "Matching Paths" section below for more details
export const config = {
  matcher: [
      '/',   
      '/login',
      '/Signup',
      '/Profile/:path*',
  ],
};