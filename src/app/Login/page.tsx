"use client";
import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/User/Login", {
        email: username.email,
        password: username.password,
      });
      if (response.status === 200) {
        toast.success("Login successful!");
        router.push("/Profile");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username.email && username.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [username]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="mb-4">
        {Loading ? "loading..." : "Login Into Your Account"}
      </p>
      <div className="bg-gray-500 p-6 rounded shadow-md w-96">
        <form>
          <label className="block mb-4" htmlFor="email">
            Email:
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full bg-blue-400 hover:bg-white text-black"
              placeholder="email"
              id="email"
              type="email"
              name="email"
              value={username.email}
              onChange={(e) => {
                setUsername({
                  ...username,
                  email: e.target.value,
                });
              }}
            />
          </label>
          <br />
          <label className="block mb-4" htmlFor="password">
            Password:
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full bg-blue-400 hover:bg-white text-black"
              placeholder="password"
              id="password"
              type="password"
              name="password"
              value={username.password}
              onChange={(e) => {
                setUsername({
                  ...username,
                  password: e.target.value,
                });
              }}
            />
          </label>
          <p className="text-sm text-right mt-1 mb-4">
            <Link
              href="/ForgotPassword"
              className="text-yellow-400 hover:underline"
            >
              Forgot your password?
            </Link>
          </p>

          <br />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            {buttonDisabled ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <p className="mt-4">
        Dont have an account?{" "}
        <Link href="/SignUp" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
