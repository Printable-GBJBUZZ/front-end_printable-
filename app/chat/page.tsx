// app/chat
"use client";

import Sidebar from "@/components/UserProfile/sidebar"; 
import MainDashBoard from "@/components/UserProfile/ChatWithMerchant/MainDashboard";


const mockUser = {
  name: "Jay Vasani",
  email: "jayuuxz48@gmail.com",
  imageUrl: "/UserAvtar.png",
  phone: "+91 9173664845",
};

export default function Page() {
  return (
    <div className="flex bg-[#f5f6fa] min-h-screen px-36 py-6 gap-6">
          <Sidebar user={mockUser} />
          {/* chat component  */}
          <div className="ml-8">
            <MainDashBoard />
          </div>
    
      
    </div>
  );
}
