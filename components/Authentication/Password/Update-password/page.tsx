"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password strength logic
  const getPasswordScore = () => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const score = getPasswordScore();

  const getBarColor = (index: number) => {
    if (score === 0) return index === 0 ? "bg-red-500" : "bg-gray-200";
    if (score === 1) return index <= 0 ? "bg-red-500" : "bg-gray-200";
    if (score === 2) return index <= 1 ? "bg-orange-400" : "bg-gray-200";
    if (score === 3) return index <= 2 ? "bg-blue-400" : "bg-gray-200";
    if (score === 4) return "bg-green-500";
    return "bg-gray-200";
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background */}
      <Image src={"/BG.png"} alt="bg-image" fill className="object-cover" />

      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="w-[500px] bg-white shadow-2xl p-8 py-20 rounded-[10px]">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src={"/Print_Logo.png"}
              alt="Printable_logo"
              height={50}
              width={50}
              className="h-[50px] w-[50px]"
            />
          </div>

          {/* Heading */}
          <div className="text-center pt-4">
            <h1 className="text-black font-bold text-[32px] pb-1">
              Update your password
            </h1>
            <p className="text-black font-semibold">
              Choose your new password for{" "}
              <span className="font-bold">Demo@gmail.com</span>
            </p>
          </div>

          {/* Enter Password */}
          <div className="relative w-full mt-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="w-full h-[50px] border border-blue-600 pl-4 pr-12 rounded-[10px]
             focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:border-none"
            />

            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Strength Meter */}
          <div className="flex justify-between gap-2 mt-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${getBarColor(index)}`}
              ></div>
            ))}
          </div>

          <div className="h-auto w-full flex justify-start mt-2">
            <p className="text-black">
              Insert your new password. Reach a score of 3 to continue.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full mt-6">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password..."
              className={`w-full h-[50px] pl-4 pr-12 rounded-[10px] 
    border ${
      confirmPassword && password !== confirmPassword
        ? "border-red-500"
        : "border-blue-400"
    } 
    focus:outline-none 
    ${
      confirmPassword && password !== confirmPassword
        ? "focus:ring-2 focus:ring-red-500"
        : "focus:ring-2 focus:ring-blue-600"
    } 
    focus:ring-offset-1 focus:border-none`}
            />

            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Error Message */}
          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              Password and Confirm Password do not match.
            </p>
          )}

          {/* Update Button */}
          <div className="mt-6">
            <button
              disabled={score < 3 || password !== confirmPassword}
              className={`w-full h-[50px] rounded-[10px] text-white font-semibold transition ${
                score >= 3 && password === confirmPassword
                  ? "bg-[#06044B] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
