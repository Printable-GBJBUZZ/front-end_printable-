import CartProductImage from "@/public/Print&Deliver/CartProductImage";
import { Order } from "@/context/orderContext";

export default function CartPanelProduct({ order }: { order: Order }) {
  return (
    <div className="space-y-4 mt-[10px]">
      {order.documents.map((doc) => (
        <div
          key={doc.id}
          className="w-[378px] h-[102px] rounded-lg p-[10px] border border-[#C9C9C9]"
        >
          <div className="flex items-start justify-between mb-3">
            <CartProductImage />
            <div className="flex-1 ml-[15px]">
              <h3 className="text-[16px] font-medium text-[#000000] mb-[4px]">
                {doc.fileName}
              </h3>
              <p className="text-[14px] text-gray-600 mb-[4px]">
                {doc.paperSize} • {doc.paperType}
              </p>
              <p className="text-[14px] text-gray-700">{doc.copies} Copies</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-medium text-[#34C759]">
                ₹{order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
