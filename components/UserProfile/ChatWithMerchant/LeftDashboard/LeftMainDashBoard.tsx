import { useState } from "react";
import Message from "./Message";
import Search from "./Search";
import LeftHeader from "./LeftHeader";

type ConversationPreview = {
  id: string;
  name: string;
  lastMessage?: {
    text: string;
    time: string;
  };
  profileImage: string;
};

type LeftMainDashBoardProps = {
  onSelect: (index: number) => void;
  conversations: ConversationPreview[];
};

function LeftMainDashBoard({
  onSelect,
  conversations,
}: LeftMainDashBoardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const conversationPreviews = conversations.map((convo, index) => ({
    id: convo.id,
    name: convo.name,
    time: convo.lastMessage?.time || "",
    text: convo.lastMessage?.text || "",
    originalIndex: index,
    profileImage: convo.profileImage,
  }));

  const filteredConversations = conversationPreviews.filter(
    (preview) =>
      preview.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preview.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[349px] h-[929px] bg-white flex flex-col">
      {/* Header + Search */}
      <div className="shrink-0">
        <LeftHeader messageCount={conversations.length} />
        <div className="border-b border-gray-200" />
        <div className="px-4 py-2">
          <Search onSearchChange={handleSearchChange} />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent scroll-smooth">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((preview) => (
            <Message
              profileImage={preview.profileImage}
              key={preview.id}
              sender={preview.name}
              time={preview.time}
              text={preview.text}
              onClick={() => onSelect(preview.originalIndex)}
            />
          ))
        ) : (
          <div className="text-center py-4 text-[#555555] text-sm">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftMainDashBoard;
