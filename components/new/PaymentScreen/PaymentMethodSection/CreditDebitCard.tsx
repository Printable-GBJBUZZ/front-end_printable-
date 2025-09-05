import { IoIosArrowDown, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";

interface CardFormData {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expiry: string;
  setExpiry: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  cardNick: string;
  setCardNick: (value: string) => void;
  showCVV: boolean;
  setShowCVV: (value: boolean | ((prev: boolean) => boolean)) => void;
}


interface CreditDebitCardProps {
  expanded: string | null;
  setExpanded: (section: string | null) => void;
  cardFormData: CardFormData;
}

export default function CreditDebitCard({
  expanded,
  setExpanded,
  cardFormData,
}: CreditDebitCardProps) {
  const {
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
  } = cardFormData;

  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <div
        onClick={() => setExpanded(expanded === "card" ? null : "card")}
        className="flex items-center justify-between py-3 cursor-pointer"
      >
        <div className="flex items-center gap-3 text-gray-700 font-medium">
          <FaCreditCard size={24} />
          CREDIT/DEBIT CARD
        </div>
        <IoIosArrowDown
          className={`transition-transform duration-300 text-gray-600 ${
            expanded === "card" ? "rotate-180" : ""
          }`}
          size={20}
        />
      </div>

      {expanded === "card" && (
        <>
          <hr className="my-4 border-gray-200" />
          <div className="space-y-4">
            <input
              type="text"
              placeholder="enter card number"
              className="w-full border px-3 py-2 text-sm text-black rounded-md focus:border-black focus:outline-none"
              style={{ borderColor: "#C9C9C9" }}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Expiry date (mm/yy)"
                className="w-full border px-3 py-2 text-sm text-black rounded-md focus:border-black focus:outline-none"
                style={{ borderColor: "#C9C9C9" }}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
              <div
                className="flex items-center border rounded-md px-3 py-2 w-full focus-within:border-black"
                style={{ borderColor: "#C9C9C9" }}
              >
                <input
                  type={showCVV ? "text" : "password"}
                  placeholder="CVV"
                  className="flex-1 outline-none text-sm text-black bg-transparent"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCVV((prev) => !prev)}
                  className="ml-2 text-gray-600 focus:outline-none"
                >
                  {showCVV ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
            </div>
            <input
              type="text"
              placeholder="Nick name for card (Optional)"
              className="w-full border px-3 py-2 text-sm text-black rounded-md focus:border-black focus:outline-none"
              style={{ borderColor: "#C9C9C9" }}
              value={cardNick}
              onChange={(e) => setCardNick(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
}
