import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";

interface UPIPaymentCardProps {
  expanded: string | null;
  setExpanded: (section: string | null) => void;
}

export default function UPIPaymentCard({
  expanded,
  setExpanded,
}: UPIPaymentCardProps) {
  const upiOptions = [
    { label: "Google Pay", icon: "/Google Pay.png" },
    { label: "Phone Pay", icon: "/phonepe.png" },
    { label: "Pay via UPI", icon: "/upi.png" },
  ];

  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <div
        onClick={() => setExpanded(expanded === "upi" ? null : "upi")}
        className="flex items-center justify-between py-3 cursor-pointer"
      >
        <div className="flex items-center gap-3 text-gray-700 font-medium">
          <Image src="/upi.png" alt="UPI" width={24} height={24} />
          UPI
        </div>
        <IoIosArrowDown
          className={`transition-transform duration-300 text-gray-600 ${
            expanded === "upi" ? "rotate-180" : ""
          }`}
          size={20}
        />
      </div>

      {expanded === "upi" && (
        <>
          <hr className="my-4 border-gray-200" />
          <div className="space-y-4">
            {upiOptions.map((option, i) => (
              <div key={i}>
                <label className="flex items-center gap-4 cursor-pointer py-2">
                  <input
                    type="radio"
                    name="upi"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Image
                    src={option.icon}
                    alt={option.label}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                  <span className="text-black font-medium">{option.label}</span>
                </label>
                {i < upiOptions.length - 1 && (
                  <hr className="border-gray-100" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
