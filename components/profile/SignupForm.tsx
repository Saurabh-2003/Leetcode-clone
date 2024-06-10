"use client";

import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = "/api/signup";

      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(
          `Failed to sign up: ${response.status} - ${response.statusText}`
        );
      }

      setName("");
      setEmail("");
      setPassword("");
      toast.success("Signup successful");

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <form
      onSubmit={handleSignup}
      className=" flex flex-col w-fit  rounded-xl "
    >
      <input
        disabled={isLoading}
        className="py-2 px-4 focus:ring-2 ring-amber-300  mb-4 outline-none border rounded-sm"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <input
        disabled={isLoading}
        className="py-2 px-4 focus:ring-2 ring-amber-300 mb-4 outline-none border rounded-sm"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        disabled={isLoading}
        className="py-2 px-4 mb-4 focus:ring-2 ring-amber-300  outline-none border rounded-sm"
        type="confirmPassword"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        disabled={isLoading}
        className="py-2 px-4 mb-4 focus:ring-2 ring-amber-300  outline-none border rounded-sm"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={`rounded-sm py-2 text-white bg-gradient-to-r from-gray-600 to-gray-500 hover:to-gray-400 ${
          (name && email && password) && "bg-slate-500"
        }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
