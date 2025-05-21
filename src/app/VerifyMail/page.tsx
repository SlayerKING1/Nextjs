"use client";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyMail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const VerifyMail = async () => {
    try {
      await axios.post("/api/User/VerifyEmail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      console.log(error.response.data);
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken || "");
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      VerifyMail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black ">
        {token ? `` : "Np token"}
      </h2>

      {verified && (
        <div>
          <div className="p-2 bg-green-500 text-black ">
            Email Verified Successfully
          </div>
          <div className="p-2 bg-blue-500 text-black ">
            <Link href="/Login" className="text-white">
              Go to Login
            </Link>
          </div>
        </div>
      )}
      {error && (
        <div className="p-2 bg-red-500 text-black ">
          Invalid or expired token
        </div>
      )}
    </div>
  );
}
