"use client";

import { FaChevronDown } from "react-icons/fa";
import React from "react";
import AddIcon from "@/icons/chat/AddIcon";

type LeftHeaderProps = {
  messageCount: number;
  onAddClick?: () => void;
};

export default function LeftHeader({
  messageCount,
  onAddClick,
}: LeftHeaderProps) {
  return (
    <div className="w-[349px] h-[88px] flex justify-between items-center px-6">
      {/* Title and message count */}
      <div className="flex items-center gap-2 font-[500] text-[20px] leading-[30px] font-satoshi">
        <p>Messages</p>
        <FaChevronDown className="text-gray-600 text-[18px] cursor-pointer" />
        <p className="bg-gray-200 text-black text-sm px-2 py-[2px] rounded-full">
          {messageCount}
        </p>
      </div>

      {/* Add new chat button */}
      <div onClick={onAddClick} className="cursor-pointer">
        <AddIcon />
      </div>
    </div>
  );
}
