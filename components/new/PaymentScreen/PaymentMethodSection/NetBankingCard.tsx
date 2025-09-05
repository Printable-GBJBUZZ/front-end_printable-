import { IoIosArrowDown } from "react-icons/io";
import { FaUniversity } from "react-icons/fa";

interface BankingFormData {
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  confirmAccountNumber: string;
  setConfirmAccountNumber: (value: string) => void;
  ifsc: string;
  setIfsc: (value: string) => void;
  accountHolder: string;
  setAccountHolder: (value: string) => void;
}

interface NetBankingCardProps {
  expanded: string | null;
  setExpanded: (section: string | null) => void;
  bankingFormData: BankingFormData;
}

export default function NetBankingCard({
  expanded,
  setExpanded,
  bankingFormData,
}: NetBankingCardProps) {
  const {
    accountNumber,
    setAccountNumber,
    confirmAccountNumber,
    setConfirmAccountNumber,
    ifsc,
    setIfsc,
    accountHolder,
    setAccountHolder,
  } = bankingFormData;

  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <div
        onClick={() => setExpanded(expanded === "bank" ? null : "bank")}
        className="flex items-center justify-between py-3 cursor-pointer"
      >
        <div className="flex items-center gap-3 text-gray-700 font-medium">
          <FaUniversity size={24} />
          NET BANKING
        </div>
        <IoIosArrowDown
          className={`transition-transform duration-300 text-gray-600 ${
            expanded === "bank" ? "rotate-180" : ""
          }`}
          size={20}
        />
      </div>

      {expanded === "bank" && (
        <>
          <hr className="my-4 border-gray-200" />
          <div className="space-y-4">
            <input
              type="text"
              placeholder="enter account number"
              className="w-full border rounded-md px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
              style={{ borderColor: "#C9C9C9" }}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="re – enter account number"
              className="w-full border rounded-md px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
              style={{ borderColor: "#C9C9C9" }}
              value={confirmAccountNumber}
              onChange={(e) => setConfirmAccountNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="enter IFSC code"
              className="w-full border rounded-md px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
              style={{ borderColor: "#C9C9C9" }}
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
            />
            <input
              type="text"
              placeholder="enter account holder name"
              className="w-full border rounded-md px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
              style={{ borderColor: "#C9C9C9" }}
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
}
