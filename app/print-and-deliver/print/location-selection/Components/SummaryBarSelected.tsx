import { cn } from "@/lib/utils";
import TotalFilesIcon from "@/public/Print&Deliver/TotalFilesIcon";
import { getTotalDocument } from "../../TotalDocument";
import { Button } from "@/components/ui/button";
import { Order } from "@/context/orderContext";
import getTotalPages from "../../TotalPages";

interface SummaryBarSelectedProps {
  idx: number;
  order: Order;
  selectedMerchant: string | null;
  isLoadingMerchants: boolean;
  handleViewCart: () => void;
}

export default function SummaryBarSelected({
  idx,
  order,
  selectedMerchant,
  isLoadingMerchants,
  handleViewCart,
}: SummaryBarSelectedProps) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full mt-4",
        "w-[1120px] h-[100px] flex flex-row items-center justify-between border-[1px] border-[#61E987] px-[20px] py-[17.5px] rounded-lg bg-[#EFFDF3]",
        "z-10"
      )}
      style={{
        gridColumn: `span 3 / span 3`,
        marginLeft: `-${(idx % 3) * 320}px`, // 300px card + 20px gap
      }}
    >
      <div className="flex items-center space-x-[20px]">
        <TotalFilesIcon />
        <span className="text-[14px] font-medium text-[#555555]">
          Total {getTotalDocument(order.documents)} Items ({getTotalPages(order)} Pages)
        </span>
      </div>
      <Button
        className="bg-[#06044b] hover:bg-[#3822b8] text-white px-6 py-2 rounded-lg"
        disabled={!selectedMerchant || isLoadingMerchants}
        onClick={handleViewCart}
      >
        View Cart
      </Button>
    </div>
  );
}
