'use client';

import Image from 'next/image';
import { FaStar, FaEllipsisH, FaUniversity, FaCreditCard } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown, IoMdEye, IoMdEyeOff } from 'react-icons/io';

export default function AccountPage() {

    const [isEditing, setIsEditing] = useState(false);
const [name, setName] = useState("Jay Vasani");
const [dob, setDob] = useState("08/12/1999");
const [email, setEmail] = useState("jxkvasani2909@gmail.com");
const [mobile, setMobile] = useState("+91 9173664845");






  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen w-full bg-white px-6 py-8 md:px-12 md:py-12 text-[#000000]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">My Account</h1>
            <p className="text-sm text-gray-600">Manage your account settings and personal information.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="bg-[#F4F7FA] rounded-xl p-6 shadow-sm md:col-span-2">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Edit profile</h2>
    {isEditing ? (
      <div className="flex gap-2">
        <button
          onClick={() => {
            // Reset logic can go here if needed
            setIsEditing(false);
          }}
          className="px-4 py-1 border border-[#06044B] text-sm rounded-lg text-[#06044B] bg-white"
        >
          Reset
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-1 bg-[#06044B] text-white text-sm rounded-lg"
        >
          Save
        </button>
      </div>
    ) : (
      <button
        onClick={() => setIsEditing(true)}
        className="px-4 py-1 border border-gray-400 text-sm rounded-lg hover:bg-gray-100"
      >
        Edit Profile
      </button>
    )}
  </div>

  {isEditing ? (
    // === Edit Mode ===
    <div className="space-y-4">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/user-placeholder.jpg"
            alt="Profile"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <button className="bg-[#06044B] text-white px-4 py-1 rounded-md text-sm">Change</button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#FFFFFF] w-full rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">D.O.B</label>
        <input
          type="text"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="bg-[#FFFFFF] w-full rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#FFFFFF] w-full rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Mobile Number</label>
        <div className="flex gap-2">
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="bg-[#FFFFFF] flex-1 rounded-lg px-3 py-2 text-sm"
          />
          <button className="bg-[#06044B] text-white px-4 py-2 rounded-lg text-sm">Get OTP</button>
        </div>
      </div>
    </div>
  ) : (
    // === View Mode ===
    <div className="flex items-center gap-5">
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <Image
          src="/user-placeholder.jpg"
          alt="Profile"
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-gray-700">{email}</p>
        <p className="text-sm text-gray-700">{mobile}</p>
      </div>
    </div>
  )}
</div>

<div className="bg-[#F4F7FA] rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">PrintPay Balance</h2>
              <p className="text-3xl font-bold">₹0</p>
            </div>
          </div>

          {/* My Reviews */}
          <div className="bg-[#F4F7FA] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">My Reviews</h2>
              <button className="text-sm font-medium text-gray-500 hover:underline">View all</button>
            </div>

            {/* Review Item */}
            {[1, 2].map((_, idx) => (
              <div key={idx} className="flex gap-4 items-start mb-6">
                <Image
                  src="/print-shop.jpg"
                  alt="Shop"
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div className="flex-1 border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">
                        {idx === 0 ? 'Print Master Shop' : 'Design Studio'}
                      </h3>
                      <p className="text-sm text-gray-500">Wardha Locality</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1 font-semibold text-xs">
                        {idx === 0 ? '4.5' : '4.0'} <FaStar className="text-xs" />
                      </span>
                      <span className="text-xs text-gray-500">
                        {idx === 0 ? 'Jun 23, 2025' : 'One month ago'}
                      </span>
                      <FaEllipsisH className="text-gray-500 cursor-pointer" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    {idx === 0
                      ? 'Prints are accurate and deliver on time'
                      : 'The black color print is very light shade and little dots are everywhere'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
