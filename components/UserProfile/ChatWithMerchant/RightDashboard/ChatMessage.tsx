import GreenDoubleTick from "@/icons/chat/GreenDoubleTick";
import {UserIcon} from "@heroicons/react/24/solid";

type ChatMessageProps = {
  profileImage: string;
  sender: string;
  time: string;
  text: string;
  align?: "left" | "right";
};

export default function ChatMessage({
  profileImage,
  sender,
  time,
  text,
  align = "left",
}: ChatMessageProps) {
  const isRight = align === "right";

  return (
    <div
      className={`flex w-full mb-3 ${
        isRight ? "justify-end" : "justify-start"
      }`}
    >
      {!isRight ? (
        // RECEIVER (left aligned)
        <div className="flex items-start gap-2">
          {/* Profile image aligned with top of message */}
          <img
            src={profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover bg-gray-200 mt-[2px]"
          />
          <div className="bg-[#F4F7FA] text-black px-4 py-2 rounded-[12px] rounded-bl-none max-w-[70%]">
            <p className="text-[15px]">{text}</p>
            <div className="flex justify-end items-center text-[12px] text-gray-500 mt-1">
              <span>{time}</span>
            </div>
          </div>
        </div>
      ) : (
        // SENDER (right aligned)
        <div className="flex items-start gap-2 flex-row-reverse">
          {/* Profile image aligned with top of message */}
          
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-gray-500" />
          </div>
          <div className="bg-[#06044B] text-white px-4 py-2 rounded-[12px] rounded-br-none max-w-[70%]">
            <p className="text-[15px]">{text}</p>
            <div className="flex justify-end items-center gap-1 text-[12px] text-gray-300 mt-1">
              <span>{time}</span>
              <GreenDoubleTick />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
