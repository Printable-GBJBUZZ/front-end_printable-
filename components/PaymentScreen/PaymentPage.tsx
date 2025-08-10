"use client";

import { useState } from "react";
import PaymentMethodSection from "./PaymentMethodSection/PaymentMethodSection";
import PromoCodeSection from "./PromoCodeSection/PromoCodeSection";
import OrderSummarySection from "./OrderSummarySection/OrderSummarySection";
import BottomSection from "./BottomSection/BottomSection";
import OrderConformation from "./BottomSection/OrderConformation";
import { useOrder } from "@/context/orderContext";

interface OrderSummary {
  subtotal: number;
  deliveryCharges: number;
  taxRate: number;
  tax: number;
  grandTotal: number;
}

interface AddressData {
  name: string;
  address: string;
}

interface ShopData {
  name: string;
  description: string;
}

export default function PaymentPage() {

  const {order} = useOrder();

  const [selectedMethod, setSelectedMethod] = useState("wallet");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(15.5);

  const [expanded, setExpanded] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardNick, setCardNick] = useState("");
  const [showCVV, setShowCVV] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  // Modal state
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handlePromoApply = () => {
    // Your promo code logic (if any)
  };

  const addressData: AddressData = {
    name: "Jay",
    address: "184 Surthana Jakat Naka, Nana Varachha Surat, Gujarat, India",
  };

  const orderSummary: OrderSummary = {
    subtotal: 750,
    deliveryCharges: 20,
    taxRate: 8,
    tax: 18.0,
    grandTotal: 768.0,
  };

  const shopData: ShopData = {
    name: "Print Master Shop",
    description: "Total 3 Items (25 Pages)",
  };

  const cardFormData = {
    cardNumber,
    setCardNumber,
    expiry,
    setExpiry,
    cvv,
    setCvv,
    cardNick,
    setCardNick,
    showCVV,
    setShowCVV,
  };

  const bankingFormData = {
    accountNumber,
    setAccountNumber,
    confirmAccountNumber,
    setConfirmAccountNumber,
    ifsc,
    setIfsc,
    accountHolder,
    setAccountHolder,
  };

  // Map technical selectedMethod => user-friendly labels
  const paymentMethodLabels: Record<string, string> = {
    wallet: "Wallet",
    upi: "UPI",
    card: "Card",
    netbanking: "Net Banking",
  };

  // Show modal when Pay is clicked
  const handlePay = () => {
    setShowOrderModal(true);
  };

  // Close modal (Go to Home)
  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
  };

  return (
    <>
      <div
        className={`w-full bg-[#F4F7FA] min-h-screen transition-filter duration-300 ${
          showOrderModal ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <div className="flex justify-center py-8">
          <div className="w-full max-w-[1180px]">
            <div className="px-6 pt-6 mb-10">
              <div
                className="group inline-flex items-center cursor-pointer transition-all duration-300 ease-in-out relative"
                onClick={() => {
                  window.history.back();
                }}
              >
                <div className="flex items-center mr-0 group-hover:mr-2 transition-all duration-300 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                  <img
                    src="/ArrowLeft.svg"
                    alt="Back Arrow"
                    className="w-10 h-10"
                    style={{ display: "block" }}
                  />
                </div>
                <h2 className="text-3xl font-semibold transition-all duration-300 group-hover:pl-2">
                  Select Payment Method
                </h2>
              </div>
            </div>

            <div className="px-6 flex gap-6 items-start relative">
              <div className="flex-1" style={{ width: "645px" }}>
                <div className="space-y-6">
                  <PaymentMethodSection
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    cardFormData={cardFormData}
                    bankingFormData={bankingFormData}
                  />
                  <PromoCodeSection
                    promoCode={promoCode}
                    setPromoCode={setPromoCode}
                    handlePromoApply={handlePromoApply}
                  />
                </div>
              </div>
              <div style={{ width: "455px" }}>
                <div
                  className="sticky"
                  style={{ top: "2rem", position: "sticky" }}
                >
                  <OrderSummarySection
                  order={order}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="px-6 mt-10">
                <BottomSection
                  addressData={addressData}
                  shopData={shopData}
                  grandTotal={orderSummary.grandTotal}
                  onPay={handlePay}
                />
              </div>
              <div className="text-center py-32 md:py-40">
                <h3 className="text-3xl font-semibold text-gray-900">
                  Your money is always safe
                </h3>
                <p className="text-gray-600 text-xl mt-3">
                  100% secure payments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="relative">
            <OrderConformation
              paymentMethod={
                paymentMethodLabels[selectedMethod] || selectedMethod
              }
              paymentStatus="Confirmed"
              Total={orderSummary.grandTotal}
              deliveryMode=""
              onClose={handleCloseOrderModal}
            />
          </div>
        </div>
      )}
    </>
  );
}
