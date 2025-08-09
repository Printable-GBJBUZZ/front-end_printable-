import { X } from "lucide-react";
import Store from "@/public/Print&Deliver/Store";
import CartPanelProduct from "./CartPanelProduct";
import { useOrder } from "@/context/orderContext";
import { useState } from "react";
import { getTotalDocument } from "../../TotalDocument";
import { Order } from "@/context/orderContext";


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
  }>;
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

  // Find the selected merchant details
  const selectedMerchantData = merchants.find(
    (m) => m.merchantId === selectedMerchant
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Right Panel */}
      <div className="absolute right-0 top-0 h-full w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-6  flex-shrink-0">
          <h2 className="text-[20px] font-semibold text-[#000000]">My Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Middle Content */}
        <div className="flex-1 p-[20px] overflow-y-auto bg-[#F4F7FA]">
          <div className="px-[16px] py-[20px] w-[410px] bg-white rounded-[12px]">
            {/* top nav bar */}
            <div className="w-[378px] h-[19px] flex flex-row justify-between">
              <div className="text-[14px] text-[#555555]">
                Files ({getTotalDocument(order.documents)})
              </div>
              <div className="flex flex-row">
                <div className="text-[14px] text-[#34C759] hover:cursor-pointer">
                  Edit
                </div>
                <div className="text-[14px] text-black ml-[6px]">•</div>
                <div className="text-[14px] text-[#34C759] ml-[6px] hover:cursor-pointer">
                  Remove
                </div>
              </div>
            </div>
            <CartPanelProduct cartItems={cartItems} />
          </div>
          {/* shop card */}
          <div className="w-[410px] h-[122px] bg-white mt-[24px] rounded-[12px] p-[16px]">
            {/* header */}
            <div className="flex flex-row justify-between">
              <div className="text-[20px] font-medium">Print Shop</div>
              <div
                className="text-[14px] text-[#34C759] font-medium hover:cursor-pointer"
                onClick={onChangeStore} // <-- Make this work
                role="button"
                tabIndex={0}
              >
                Change
              </div>
            </div>
            <div className="mt-[14px]">
              <div>
                {/* image  */}

                {/* content */}
                <div className="flex flex-col">
                  <div className="font-bold">
                    {selectedMerchantData?.shopName || "Select a shop"}
                  </div>
                  <div className="text-[#555555] text-[14px]">
                    {selectedMerchantData?.address
                      ? selectedMerchantData.address.length > 30
                        ? `${selectedMerchantData.address.substring(0, 28)}...`
                        : selectedMerchantData.address
                      : "No address selected"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[410px] h-[260px] bg-white mt-[24px] rounded-[12px] p-[16px]">
            {/* Header */}
            <h3 className="text-[20px] font-medium text-[#000000] mb-[14px]">
              Bill Summary
            </h3>

            {/* Bill Details */}
            <div className="space-y-[10px]">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-[16px] text-[#6B7280]">Subtotal</span>
                <span className="text-[16px] text-[#000000]">₹ 750</span>
              </div>

              {/* Delivery Charges */}
              <div className="flex justify-between items-center">
                <span className="text-[16px] text-[#6B7280]">
                  Delivery charges
                </span>
                <span className="text-[16px] text-[#000000]">₹ 20</span>
              </div>

              {/* Tax */}
              <div className="flex justify-between items-center">
                <span className="text-[16px] text-[#6B7280]">Tax (8%)</span>
                <span className="text-[16px] text-[#000000]">₹ 18.0</span>
              </div>

              {/* Discount Applied */}
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#34C759]">
                  Discount Applied
                </span>
                <span className="text-[14px] text-[#34C759]">-₹15.50</span>
              </div>

              {/* Divider Line */}
              <div className="border-t border-gray-200 my-[16px]"></div>

              {/* Grand Total */}
              <div className="flex justify-between items-center">
                <span className="text-[20px] font-semibold text-[#000000]">
                  Grand Total
                </span>
                <span className="text-[16px] font-bold text-[#000000]">
                  ₹ 772.50
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Section */}
        <div className="h-[158px] border-t border-gray-200 bg-[#DFFBE7] flex-shrink-0 rounded-tl-[12px] rounded-tr-[12px]">
          {/* Cart summary and checkout button */}
          <div className="space-y-4">
            {/* Total */}
            <div className="flex flex-row justify-between items-center p-[20px] border-b-[1px] border-[#61E987]">
              <div className="flex flex-row items-center">
                <Store />
                <p className="text-[16px] font-bold ml-[12px]">Store Pick-up</p>
              </div>
              <div
                className="text-[14px] text-[#34C759] hover:cursor-pointer"
                onClick={onChangeStore} // <-- Add this
                role="button"
                tabIndex={0}
              >
                Change
              </div>
            </div>

            <div className="flex justify-between items-center px-[20px]">
              <div className="w-[410px] h-[65px] bg-[#06044B] rounded-[10px] flex flex-row justify-between items-center px-[16px] py-[7.5px]">
                <div className="">
                  <div className="text-[#C9C9C9] text-[14px]"> Total </div>
                  <div className="text-[#FFFFFF] text-[20px] font-bold">
                    {" "}
                    768{" "}
                  </div>
                </div>
                <div className="text-[20px] text-white"> Proceed to Pay </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
