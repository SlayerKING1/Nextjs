"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/User/LogOut");
      if (response.status === 200) {
        toast.success("Logout successful!");
        router.push("/Login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  // Fetch user details
  const userDetails = async () => {
    const res = await axios.get("/api/User/Me");
    if (res.status === 200) {
      setData(res.data._id);
    } else {
      toast.error("Failed to fetch user details");
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="mb-4">Welcome to your profile page!</p>
      <div className="bg-gray-500 p-6 rounded shadow-md w-96">
        <p className="mb-4">This is your profile information.</p>
        <p className="p-3 rounded bg-green-300 text-black font-bold">{data ===  "nothing" ? "nothing" : <Link href={`/Profile/${data}`}>{data}</Link>}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
          <button
            onClick={userDetails}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            User Details
          </button>
        </div>
      </div>
    </div>
  );
}
