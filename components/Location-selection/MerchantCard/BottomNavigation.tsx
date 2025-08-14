import Share from "@/public/Print&Deliver/Share";
import BookMark from "@/public/Print&Deliver/BookMark";
import { cn } from "@/lib/utils";


interface BottomNavigationProps {
  merchant: {
    merchantId: string;
  };
  selectedMerchant: string | null;
  setSelectedMerchant: (id: string | null) => void;
  hoveredMerchant: string | null;
  setHoveredMerchant: (id: string | null) => void;
}

export default function BottomNavigation({
  merchant,
  selectedMerchant,
  setSelectedMerchant,
  hoveredMerchant,
  setHoveredMerchant,
}: BottomNavigationProps) {
  return (
    <div className="mt-auto w-full flex flex-row justify-between items-center pt-4">
      <div className="w-[40px] h-[40px] bg-[#EFFDF3] border-[1px] border-[#61E987] rounded-[8px] flex justify-center items-center hover:bg-[#e1f9e7] hover:shadow transition-all duration-300">
        <Share />
      </div>
      <div className="w-[40px] h-[40px] bg-[#EFFDF3] border-[1px] border-[#61E987] rounded-[8px] flex justify-center items-center hover:bg-[#e1f9e7] hover:shadow transition-all duration-300">
        <BookMark />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedMerchant(
            selectedMerchant === merchant.merchantId ? null : merchant.merchantId
          );
        }}
        onMouseEnter={() => setHoveredMerchant(merchant.merchantId)}
        onMouseLeave={() => setHoveredMerchant(null)}
        className={cn(
          "w-[170px] h-[40px] text-sm font-medium py-2 border rounded-lg",
          "transition-all duration-300 ease-in-out",
          "hover:shadow",
          selectedMerchant === merchant.merchantId
            ? "bg-[#61E987] border-[1px] border-[#61E987] text-white hover:bg-[#4ade80] hover:border-[#4ade80] shadow"
            : "bg-[#EFFDF3] border-[1px] border-[#61E987] text-[#06044b] hover:bg-[#61E987] hover:text-white"
        )}
      >
        {selectedMerchant === merchant.merchantId
          ? "Selected"
          : hoveredMerchant === merchant.merchantId
          ? "Selected"
          : "Select Shop"}
      </button>
    </div>
  );
}