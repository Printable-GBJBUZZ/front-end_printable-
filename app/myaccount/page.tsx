// app/account/page.tsx
"use client";

import Sidebar from "@/components/UserProfile/sidebar";
import MyAccountPage from "@/components/UserProfile/account"; // ✅ You already have this
import { motion } from "framer-motion";

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
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <MyAccountPage />
      </motion.div>
    </div>
  );
}
