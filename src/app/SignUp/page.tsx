"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function signUp() {
  const router = useRouter();
  const [username, setUsername] = React.useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [Loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const signUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/User/signUp", {
        username: username.username,
        email: username.email,
        password: username.password,
        role: username.role,
      });

      if (response.status === 201) {
        toast.success("User created successfully");
        router.push("/Login");
      } else {
        toast.error("Error creating user");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username.email && username.password && username.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [username]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      <p className="mb-4 ">{Loading ? "Loading..." : "Create Your Account"}</p>

      <div className="bg-gray-500 p-6 rounded shadow-md w-96">
        <form>
          <label className="block mb-4" htmlFor="username">
            Username:
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full bg-blue-400 hover:bg-white transition duration-300 ease-in-out text-black"
              placeholder="username"
              id="username"
              type="text"
              name="username"
              value={username.username}
              onChange={(e) => {
                setUsername({
                  ...username,
                  username: e.target.value,
                });
              }}
            />
          </label>
          <br />
          <label className="block mb-4" htmlFor="email">
            Email:
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full bg-blue-400 hover:bg-white transition duration-300 ease-in-out text-black"
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
              className="border border-gray-300 rounded px-2 py-1 w-full bg-blue-400 hover:bg-white transition duration-300 ease-in-out text-black "
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
          <br />
          <label className="block mb-4" htmlFor="role">
            Role:
            <select
              id="role"
              name="role"
              className="border border-gray-300 rounded px-2 py-1 w-full bg-blue-400 hover:bg-white transition duration-300 ease-in-out text-black"
              value={username.role}
              onChange={(e) =>
                setUsername({
                  ...username,
                  role: e.target.value,
                })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            {buttonDisabled ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/Login" className="text-blue-500">
          Sign In
        </Link>
      </p>
    </div>
  );
}
