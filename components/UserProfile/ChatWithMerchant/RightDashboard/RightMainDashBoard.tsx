"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import RightDashBoardHeader from "./RightDashBoardHeader";
import SendButton from "@/icons/chat/SendButton";
import AttachmentIcon from "@/icons/chat/AttachmentIcon";

export type MessageType = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
};

type ConversationType = {
  id: string;
  name: string;
  profileImage: string;
  lastMessage?: {
    text: string;
    time: string;
  };
};

type Props = {
  data: MessageType[];
  currentUserId: string | null;
  message: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  conversation: ConversationType | null;
};

export default function RightMainDashBoard({
  data,
  currentUserId,
  message,
  onChange,
  onSubmit,
  conversation,
}: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (!conversation) {
    return (
      <div className="w-[640px] h-[929px] flex items-center justify-center bg-white">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[640px] h-[929px] bg-white">
      {/* Header */}
      <div className="shrink-0 sticky top-0 z-10 bg-white">
        <RightDashBoardHeader conversation={conversation} />
        <div className="border-b border-gray-200" />
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 overflow-y-auto space-y-1">
        {data.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <ChatMessage
              key={msg.id}
              profileImage={
                isMe
                  ? "/images/user-placeholder.png"
                  : conversation.profileImage
              }
              sender={isMe ? "Me" : conversation.name}
              text={msg.message}
              align={isMe ? "right" : "left"}
              time={new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 sticky bottom-0 z-10 w-full bg-[#F5F5F5] px-4 py-3 flex items-center gap-2">
        {/* Attachment Icon triggers hidden file input */}
        <div className="p-2">
          <label htmlFor="file-upload" className="cursor-pointer">
            <AttachmentIcon />
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log("File selected:", file);
              }
            }}
          />
        </div>

        {/* Input Box */}
        <div className="flex flex-1 items-center bg-white rounded-[12px] border border-gray-300 px-4 py-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={onChange}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            className="flex-1 bg-transparent outline-none text-gray-700 px-2"
          />

          <button onClick={onSubmit}>
            <SendButton />
          </button>
        </div>
      </div>
    </div>
  );
}
