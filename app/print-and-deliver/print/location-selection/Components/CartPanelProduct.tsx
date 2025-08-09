import CartProductImage from "@/public/Print&Deliver/CartProductImage";
import { Order } from "@/context/orderContext";
import { calculateOrderTotals } from "../../pricing";

export default function CartPanelProduct({ order }: { order: Order }) {
  return (
    <div className="space-y-4 mt-[10px]">
      {order.documents.map((doc) => {
      
        const singleDocOrder: Order = {
          ...order,
          documents: [doc],
          breakdown: [],
        };

        const { total } = calculateOrderTotals(singleDocOrder);

        return (
          <div
            key={doc.id}
            className="w-[378px] rounded-lg p-[10px] border border-[#C9C9C9] overflow-hidden"
          >
            <div className="flex items-start justify-between mb-3">
              <CartProductImage />

              <div className="flex-1 ml-[15px] overflow-hidden mr-[10px]">
                <h3
                  className="text-[16px] font-medium text-[#000000] mb-[4px] 
                             overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {doc.fileName}
                </h3>
                <p
                  className="text-[14px] text-gray-600 mb-[4px] 
                             overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {doc.pages} Pages, {doc.colorType}, {doc.pageDirection}
                </p>
                <p className="text-[14px] text-gray-700">{doc.copies} Copies</p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-[16px] font-medium text-[#34C759]">
                  ₹{total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
