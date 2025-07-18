"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  // State to store email input
  const [email, setEmail] = useState("");

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

          <div className="flex justify-center items-center text-center pt-4">
            <div>
              <h1 className="text-[32px] text-black font-bold">
                Recover your password
              </h1>
              <p className="py-4 text-black font-semibold">
                to continue to your printable account
              </p>
            </div>
          </div>

          <div className="h-auto w-full">
            {/* Email Input */}
            <input
              type="email" // Added type for email validation
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[50px] w-full pl-4 rounded-[10px] border border-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:border-none"
              placeholder="Enter your Email"
            />
          </div>

          <div className="mt-6">
            {/* Button that is disabled until email is entered */}
            <button
              disabled={!email} // Disable button if email is empty
              className={`bg-[#06044B] text-white w-full py-2 rounded-lg hover:bg-[#04033D] transition ${
                !email ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              Send recovery email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
