"use client";
import React from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link"; // Importing Link component from Next.js

export default function Page() {
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
                Password Updated
              </h1>
              <p className="py-4 text-black font-semibold">
                You can now log into your Evernote account with the updated
                credentials.
              </p>
            </div>
          </div>
          {/* Back to Login Button with Link */}
          <div className="mt-6">
            <Link href="/login">
              <button className="bg-[#06044B] text-white w-full py-2 rounded-lg hover:bg-[#04033D] transition hover:cursor-pointer">
                Back to Log in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
