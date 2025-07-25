"use client";

import React from "react";
import CallIcon from "@/icons/chat/CallIcon";

type ConversationHeaderProps = {
  conversation: {
    name: string;
    profileImage: string;
  };
};

export default function RightDashBoardHeader({
  conversation,
}: ConversationHeaderProps) {
  return (
    <div className="w-full h-[88px] flex items-center justify-between px-6">
      {/* Left: Profile Image and Name */}
      <div className="flex items-center gap-4">
        <img
          src={conversation.profileImage}
          alt={conversation.name}
          className="w-12 h-12 rounded-full bg-gray-200 object-cover"
        />
        <div>
          <div className="text-lg font-semibold text-black">
            {conversation.name}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* Right: Call Button */}
      <div className="flex items-center gap-2 bg-[#E6E6ED] rounded-[8px] px-4 py-2 cursor-pointer">
        <CallIcon />
        <p className="text-[16px] font-medium text-[#06044B]">Call</p>
      </div>
    </div>
  );
}
