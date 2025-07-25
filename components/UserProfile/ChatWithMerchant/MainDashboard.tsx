"use client";

import { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import LeftMainDashBoard from "./LeftDashboard/LeftMainDashBoard";
import RightMainDashBoard from "./RightDashboard/RightMainDashBoard";
import { useUser } from "@clerk/nextjs";

export type MessageType = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
  role: "user";
  timestamp: string;
};

type Conversation = {
  id: string;
  name: string;
  profileUrl: string;
  lastMessage: {
    text: string;
    time: string;
  };
  lastMessageTime: string; // Add this field for sorting
};

export default function MainDashBoard() {
  const { user } = useUser();
  const currentUserId = user?.id ?? null;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [selectedPartnerInfo, setSelectedPartnerInfo] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageInput, setMessageInput] = useState("");

  const selectedPartnerIdRef = useRef<string | null>(null);

  useEffect(() => {
    selectedPartnerIdRef.current = selectedPartnerId;
  }, [selectedPartnerId]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!currentUserId) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/chat/partners?userId=${currentUserId}`
        );
        const partners = await res.json();
        const enriched = await Promise.all(
          partners.map(async (partner: any) => {
            const infoRes = await fetch(
              `http://localhost:5000/api/chat/partner-info?userId=${currentUserId}&partnerId=${partner.partnerId}`
            );
            const info = await infoRes.json();
            return {
              id: partner.partnerId,
              name: info.data.name,
              profileUrl: info.data.image[0],
              lastMessage: {
                text: partner.lastMessage,
                time: new Date(partner.lastMessageTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
              lastMessageTime: partner.lastMessageTime, // Store the full timestamp for sorting
            };
          })
        );
        
        // Sort conversations by lastMessageTime (newest first)
        const sortedConversations = enriched.sort((a, b) => 
          new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
        );
        
        setConversations(sortedConversations);
      } catch (err) {
        console.error("❌ Failed to fetch user chat partners:", err);
      }
    };
    if (currentUserId) {
      fetchConversations();
    }
  }, [currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUserId || !selectedPartnerId) {
        setMessages([]);
        setSelectedPartnerInfo(null);
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:5000/api/chat/conversation?userA=${currentUserId}&userB=${selectedPartnerId}`
        );
        const data = await res.json();
        setMessages(data);

        const infoRes = await fetch(
          `http://localhost:5000/api/chat/partner-info?userId=${currentUserId}&partnerId=${selectedPartnerId}`
        );
        const info = await infoRes.json();
        setSelectedPartnerInfo({
          id: selectedPartnerId,
          name: info.data.name,
          profileUrl: info.data.image[0],
          lastMessage: { text: "", time: "" },
          lastMessageTime: new Date().toISOString(),
        });
      } catch (err) {
        console.error("❌ Failed to fetch messages:", err);
      }
    };
    fetchMessages();
  }, [currentUserId, selectedPartnerId]);

  useEffect(() => {
    if (!currentUserId) return;

    const pusher = new Pusher("7e1f499e8a4730060fd6", {
      cluster: "ap2",
      forceTLS: true,
    });

    const userChannel = pusher.subscribe(`chat-userid-${currentUserId}`);

    const handleNewMessage = (eventData: any) => {
      const newMessage: MessageType = eventData.data || eventData;

      console.group(`[PUSHER DEBUG] User (${currentUserId}) received a message:`);
      console.log("Current open chat partner (ref):", selectedPartnerIdRef.current);
      console.log("Incoming message:", newMessage);

      // Update conversations list and sort by latest message
      setConversations((prev) => {
        const partnerId = newMessage.senderId === currentUserId ? newMessage.receiverId : newMessage.senderId;
        
        const updatedConversations = prev.map((conv) => {
          if (conv.id === partnerId) {
            return {
              ...conv,
              lastMessage: {
                text: newMessage.message,
                time: new Date(newMessage.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
              lastMessageTime: newMessage.timestamp, // Update the timestamp for sorting
            };
          }
          return conv;
        });

        // Sort conversations by lastMessageTime (newest first)
        return updatedConversations.sort((a, b) => 
          new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
        );
      });

      const isMessageForCurrentChat =
        (newMessage.senderId === selectedPartnerIdRef.current &&
          newMessage.receiverId === currentUserId) ||
        (newMessage.senderId === currentUserId &&
          newMessage.receiverId === selectedPartnerIdRef.current);

      console.log("Is this message for the open chat?", isMessageForCurrentChat);
      console.groupEnd();

      if (isMessageForCurrentChat) {
        setMessages((prev) => {
          const exists = prev.some((msg) => msg.id === newMessage.id);
          if (exists) return prev;
          return [...prev, newMessage];
        });
      }
    };

    userChannel.bind("chat", handleNewMessage);

    return () => {
      pusher.unsubscribe(`chat-userid-${currentUserId}`);
      pusher.disconnect();
    };
  }, [currentUserId]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentUserId || !selectedPartnerId) return;

    const optimisticMessage: MessageType = {
      id: `tmp-${Date.now()}`,
      senderId: currentUserId,
      receiverId: selectedPartnerId,
      message: messageInput.trim(),
      isRead: false,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    const messageToSend = messageInput.trim();
    setMessageInput("");

    // Update conversations list optimistically when sending
    setConversations((prev) => {
      const updatedConversations = prev.map((conv) => {
        if (conv.id === selectedPartnerId) {
          return {
            ...conv,
            lastMessage: {
              text: messageToSend,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
            lastMessageTime: new Date().toISOString(),
          };
        }
        return conv;
      });

      // Sort conversations by lastMessageTime (newest first)
      return updatedConversations.sort((a, b) => 
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
      );
    });

    try {
      await fetch("http://localhost:5000/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: currentUserId,
          receiverId: selectedPartnerId,
          message: messageToSend,
        }),
      });
    } catch (err) {
      console.error("❌ Failed to send message:", err);
    }
  };

  // Helper function to find conversation index by partnerId
  const findConversationIndex = (partnerId: string) => {
    return conversations.findIndex(conv => conv.id === partnerId);
  };

  return (
    <div className="flex w-[989px] h-[929px] bg-white rounded-lg overflow-hidden shadow border border-gray-200">
      <div className="w-[349px] h-[929px] overflow-y-auto border-r border-gray-200">
        <LeftMainDashBoard
          conversations={conversations.map((c) => ({
            id: c.id,
            name: c.name,
            profileImage: c.profileUrl,
            lastMessage: c.lastMessage,
          }))}
          onSelect={(index) => setSelectedPartnerId(conversations[index].id)}
        />
      </div>

      <div className="w-[640px] h-[929px]">
        {selectedPartnerInfo ? (
          <RightMainDashBoard
            data={messages}
            currentUserId={currentUserId}
            message={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onSubmit={handleSendMessage}
            conversation={{
              id: selectedPartnerInfo.id,
              name: selectedPartnerInfo.name,
              profileImage: selectedPartnerInfo.profileUrl,
              lastMessage: selectedPartnerInfo.lastMessage,
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
