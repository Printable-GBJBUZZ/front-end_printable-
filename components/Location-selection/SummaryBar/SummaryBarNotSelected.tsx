import TotalFilesIcon from "@/public/Print&Deliver/TotalFilesIcon";
import { Button } from "@/components/ui/button";
import { getTotalDocument } from "../../../app/print-and-deliver/print/TotalDocument";
import { Order } from "@/context/orderContext";
import getTotalPages from "../../../app/print-and-deliver/print/TotalPages";

interface SummaryBarNotSelectedProps {
  order: Order;
  isLoadingMerchants: boolean;
  handleViewCart: () => void;
}

export default function SummaryBarNotSelected({
  order,
  isLoadingMerchants,
  handleViewCart,
}: SummaryBarNotSelectedProps) {
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3">
      <div className="w-[1120px] h-[100px] flex flex-row items-center justify-between border-[1px] border-[#61E987] px-[20px] py-[17.5px] rounded-lg bg-[#EFFDF3] mt-8 mx-auto">
        <div className="flex items-center space-x-[20px]">
          <TotalFilesIcon />
          <span className="text-[14px] font-medium text-[#555555]">
            Total {getTotalDocument(order.documents)} Items ({getTotalPages(order)} Pages)
          </span>
        </div>
        <Button
          className="bg-[#06044b] hover:bg-[#3822b8] text-white px-6 py-2 rounded-lg"
          disabled={isLoadingMerchants}
          onClick={handleViewCart}
        >
          View Cart
        </Button>
      </div>
    </div>
  );
}
