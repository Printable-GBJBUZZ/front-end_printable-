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
                Recovery email sent!
              </h1>
              <p className="py-4 text-black font-semibold">
                if this email address belong to an account, you'll receive an
                email containing a link to reset your password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
