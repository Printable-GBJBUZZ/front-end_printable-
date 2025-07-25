import GreenDoubleTick from "@/icons/chat/GreenDoubleTick";

type MessageProps = {
  sender: string;
  time: string;
  text: string;
  profileImage: string;
  onClick?: () => void;
}

function Message({ sender, time, text, profileImage, onClick }: MessageProps) {
  return (
    <div
      className="flex flex-row items-center p-4 hover:bg-gray-50 cursor-pointer rounded-lg"
      onClick={onClick}
    >
      <div className="w-[45px] h-[45px] rounded-full">
        <img
          src={profileImage} // Replace with actual profile image path
          alt={sender}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col ml-4 flex-1">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[16px] text-black text-inter font-bold">
            {sender}
          </h1>
          <span className="text-[14px]">{time}</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-black truncate text-inter font-normal max-w-[290px]">
            {text}
          </p>
          <GreenDoubleTick />
        </div>
      </div>
    </div>
  );
}

export default Message;
