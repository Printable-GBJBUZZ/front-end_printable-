// import { X } from "lucide-react";
// import Store from "@/public/Print&Deliver/Store";
// import CartPanelProduct from "./CartPanelProduct";
// import { getTotalDocument } from "../../../app/print-and-deliver/print/TotalDocument";
// import { Order } from "@/context/orderContext";
// import { calculateOrderTotals } from "../../../app/print-and-deliver/print/pricing";
// import MerchantImage from "../MerchantCard/MerchantImage";
// import Link from "next/link";


// interface CartPanelProps {
//   isOpen: boolean;
//   order: Order;
//   onClose: () => void;
//   onChangeStore?: () => void;
//   selectedMerchant?: string | null;
//   merchants?: Array<{
//     merchantId: string;
//     shopName: string;
//     address?: string;
//     MerchantImages?: any;
//   }>;
// }

// export default function CartPanel({
//   isOpen,
//   order,
//   onClose,
//   onChangeStore,
//   selectedMerchant,
//   merchants = [],
// }: CartPanelProps) {
//   if (!isOpen) return null;

//   const { subtotal, deliveryCharges, tax, discount, total, categoryTotals } =
//     calculateOrderTotals(order);

//   // ---- Selected Merchant ----
//   const selectedMerchantData = merchants.find(
//     (m) => m.merchantId === selectedMerchant
//   );

//   const pay = () =>{
//     console.log("Proceed to Pay clicked");
//     console.log("Order Details:", order);
//     console.log("Selected Merchant:", selectedMerchantData, subtotal, deliveryCharges, tax, discount, total, categoryTotals);
//     console
//   }
//   return (
//     <div className="fixed inset-0 z-50">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />

//       {/* Right Panel */}
//       <div className="absolute right-0 top-0 h-full w-[450px] bg-white shadow-2xl flex flex-col">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6">
//           <h2 className="text-[20px] font-semibold">My Cart</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         {/* Middle Content */}
//         <div className="flex-1 p-[20px] overflow-y-auto bg-[#F4F7FA]">
//           {/* Files Section */}
//           <div className="px-[16px] py-[20px] w-[410px] bg-white rounded-[12px]">
//             <div className="w-[378px] flex justify-between">
//               <div className="text-[14px] text-[#555]">
//                 Files ({getTotalDocument(order.documents)})
//               </div>
//               <div className="flex flex-row">
//                 <div className="text-[14px] text-[#34C759] cursor-pointer">
//                   Edit
//                 </div>
//                 <div className="mx-2 text-black">•</div>
//                 <div className="text-[14px] text-[#34C759] cursor-pointer">
//                   Remove
//                 </div>
//               </div>
//             </div>
//             <CartPanelProduct order={order} />
//           </div>

//           {/* Shop Card */}
//           <div className="w-[410px] bg-white mt-[24px] rounded-[12px] p-[16px]">
//             <div className="flex justify-between">
//               <div className="text-[20px] font-medium">Print Shop</div>
//               <div
//                 className="text-[14px] text-[#34C759] font-medium cursor-pointer"
//                 onClick={onChangeStore}
//               >
//                 Change
//               </div>
//             </div>
//             <div className="mt-[14px] flex flex-row">
//               <div
//                 className="w-[47px] h-[47px] bg-center bg-cover bg-no-repeat rounded-[6px]"
//                 style={{
//                   backgroundImage: `url('${
//                     selectedMerchantData?.MerchantImages?.[0] || ""
//                   }')`,
//                 }}
//               ></div>

//               <div className="ml-[12px]">
//                 <div className="font-bold">
//                   {selectedMerchantData?.shopName || "Select a shop"}
//                 </div>
//                 <div className="text-[#555] text-[14px]">
//                   {selectedMerchantData?.address
//                     ? selectedMerchantData.address.length > 30
//                       ? `${selectedMerchantData.address.substring(0, 28)}...`
//                       : selectedMerchantData.address
//                     : "No address selected"}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bill Summary Inline */}
//           <div className="w-[410px] bg-white mt-[24px] rounded-[12px] p-[16px]">
//             <h3 className="text-lg font-semibold mb-4">Bill Summary</h3>

//             {/* Category totals */}
//             {[
//               "Paper",
//               "Color",
//               "Binding",
//               "Lamination",
//               "Cover",
//               "Confidential Print",
//               "Rush Order",
//             ]
//               .filter((key) => (categoryTotals[key] ?? 0) > 0)
//               .map((key) => (
//                 <div key={key} className="flex justify-between text-sm mb-2">
//                   <span>{key}</span>
//                   <span>₹{(categoryTotals[key] ?? 0).toFixed(2)}</span>
//                 </div>
//               ))}

//             {/* Subtotal */}
//             <div className="flex justify-between text-sm mb-2">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>

//             {/* Delivery Charges */}
//             <div className="flex justify-between text-sm mb-2">
//               <span>Delivery Charges</span>
//               <span>₹{deliveryCharges.toFixed(2)}</span>
//             </div>

//             {/* Tax */}
//             <div className="flex justify-between text-sm mb-2">
//               <span>Tax (8%)</span>
//               <span>₹{tax.toFixed(2)}</span>
//             </div>

//             {/* Discount */}
//             {discount > 0 && (
//               <div className="flex justify-between text-sm mb-2 text-green-600">
//                 <span>Discount</span>
//                 <span>-₹{discount.toFixed(2)}</span>
//               </div>
//             )}

//             {/* Final Total */}
//             <div className="flex justify-between text-base font-bold border-t pt-2">
//               <span>Total</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Checkout */}
//         <div className="h-[158px] border-t bg-[#DFFBE7] rounded-tl-[12px] rounded-tr-[12px]">
//           <div className="flex justify-between items-center p-[20px] border-b border-[#61E987]">
//             <div className="flex items-center">
//               <Store />
//               <p className="text-[16px] font-bold ml-[12px]">Store Pick-up</p>
//             </div>
//             <div
//               className="text-[14px] text-[#34C759] cursor-pointer"
//               onClick={onChangeStore}
//             >
//               Change
//             </div>
//           </div>

//           <div className="flex justify-between items-center px-[20px]">
//             <div className="w-[410px] h-[65px] bg-[#06044B] rounded-[10px] flex justify-between items-center px-[16px]">
//               <div>
//                 <div className="text-[#C9C9C9] text-[14px]">Total</div>
//                 <div className="text-[#FFF] text-[20px] font-bold">
//                   ₹{total.toFixed(2)}
//                 </div>
//               </div>
//               {/* <Link
//                 href="/print-and-deliver/print/review-and-pay"
//                 className="text-[20px] text-white cursor-pointer"
//               >
//                 Proceed to Pay
//               </Link> */}
//               <button onClick={pay}>Proceed to Pay</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { X } from "lucide-react";
import Store from "@/public/Print&Deliver/Store";
import CartPanelProduct from "./CartPanelProduct";
import { getTotalDocument } from "../../../app/print-and-deliver/print/TotalDocument";
import { Order } from "@/context/orderContext";
import { calculateOrderTotals } from "../../../app/print-and-deliver/print/pricing";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
interface CartPanelProps {
  isOpen: boolean;
  order: Order;
  onClose: () => void;
  onChangeStore?: () => void;
  selectedMerchant?: string | null;
  merchants?: Array<{
    merchantId: string;
    shopName: string;
    address?: string;
    MerchantImages?: any;
  }>;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CartPanel({
  isOpen,
  order,
  onClose,
  onChangeStore,
  selectedMerchant,
  merchants = [],
}: CartPanelProps) {
  if (!isOpen) return null;

  const { subtotal, deliveryCharges, tax, discount, total, categoryTotals } =
    calculateOrderTotals(order);
const router = useRouter();
  const selectedMerchantData = merchants.find(
    (m) => m.merchantId === selectedMerchant
  );

  // Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
const { user } = useUser();
  const pay = async () => {
    try {
      // Replace with your logged-in user's ID
      
      const userId = "user_2zcomJlgpLYtrIuryOaKDJTn355"; 
      // const userId = user?.id  // Fallback if user is not available
console.log(order)
console.log(userId)
      // Create order from backend
      const res = await fetch("http://localhost:5000/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount: Math.round(total)}),
      });

      const data = await res.json();
      if (!data.id) throw new Error("Order creation failed");
      console.log(data.id)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public Razorpay key
        amount: Math.round(data.amount),
        currency: data.currency,
        name: "Print & Deliver",
        description: "Document printing order",
        order_id: data.id,
        handler: async function (response: any) {
          console.log("Razorpay handler response:", response);
          // Verify payment on backend
          const verifyRes = await fetch("http://localhost:5000/api/payments/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
console.log(verifyRes)
const verifyData = await verifyRes.json();
console.log(verifyData)
          if (verifyData.success) {
            alert("Payment successful!");
            router.push("/orders"); 
            // window.location.href = "/order"; 
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: "#06044B" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[450px] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <h2 className="text-[20px] font-semibold">My Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Middle Content */}
        <div className="flex-1 p-[20px] overflow-y-auto bg-[#F4F7FA]">
          {/* Files Section */}
          <div className="px-[16px] py-[20px] w-[410px] bg-white rounded-[12px]">
            <div className="w-[378px] flex justify-between">
              <div className="text-[14px] text-[#555]">
                Files ({getTotalDocument(order.documents)})
              </div>
              <div className="flex flex-row">
                <div className="text-[14px] text-[#34C759] cursor-pointer">
                  Edit
                </div>
                <div className="mx-2 text-black">•</div>
                <div className="text-[14px] text-[#34C759] cursor-pointer">
                  Remove
                </div>
              </div>
            </div>
            <CartPanelProduct order={order} />
          </div>

          {/* Shop Card */}
          <div className="w-[410px] bg-white mt-[24px] rounded-[12px] p-[16px]">
            <div className="flex justify-between">
              <div className="text-[20px] font-medium">Print Shop</div>
              <div
                className="text-[14px] text-[#34C759] font-medium cursor-pointer"
                onClick={onChangeStore}
              >
                Change
              </div>
            </div>
            <div className="mt-[14px] flex flex-row">
              <div
                className="w-[47px] h-[47px] bg-center bg-cover bg-no-repeat rounded-[6px]"
                style={{
                  backgroundImage: `url('${
                    selectedMerchantData?.MerchantImages?.[0] || ""
                  }')`,
                }}
              ></div>
              <div className="ml-[12px]">
                <div className="font-bold">
                  {selectedMerchantData?.shopName || "Select a shop"}
                </div>
                <div className="text-[#555] text-[14px]">
                  {selectedMerchantData?.address
                    ? selectedMerchantData.address.length > 30
                      ? `${selectedMerchantData.address.substring(0, 28)}...`
                      : selectedMerchantData.address
                    : "No address selected"}
                </div>
              </div>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="w-[410px] bg-white mt-[24px] rounded-[12px] p-[16px]">
            <h3 className="text-lg font-semibold mb-4">Bill Summary</h3>
            {Object.entries(categoryTotals)
              .filter(([_, value]) => (value ?? 0) > 0)
              .map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm mb-2">
                  <span>{key}</span>
                  <span>₹{value.toFixed(2)}</span>
                </div>
              ))}
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery Charges</span>
              <span>₹{deliveryCharges.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Tax (8%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm mb-2 text-green-600">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold border-t pt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Checkout */}
        <div className="h-[158px] border-t bg-[#DFFBE7] rounded-tl-[12px] rounded-tr-[12px]">
          <div className="flex justify-between items-center p-[20px] border-b border-[#61E987]">
            <div className="flex items-center">
              <Store />
              <p className="text-[16px] font-bold ml-[12px]">Store Pick-up</p>
            </div>
            <div
              className="text-[14px] text-[#34C759] cursor-pointer"
              onClick={onChangeStore}
            >
              Change
            </div>
          </div>
          <div className="flex justify-between items-center px-[20px]">
            <div className="w-[410px] h-[65px] bg-[#06044B] rounded-[10px] flex justify-between items-center px-[16px]">
              <div>
                <div className="text-[#C9C9C9] text-[14px]">Total</div>
                <div className="text-[#FFF] text-[20px] font-bold">
                  ₹{total.toFixed(2)}
                </div>
              </div>
              <button
                onClick={pay}
                className="bg-[#34C759] px-4 py-2 rounded text-white"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
