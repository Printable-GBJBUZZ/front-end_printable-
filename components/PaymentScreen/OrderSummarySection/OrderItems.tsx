import Image from "next/image";
import { useOrder } from "@/context/orderContext";
import { calculatePriceBreakdown } from "@/app/print-and-deliver/print/pricing";

export default function OrderItems() {
  const { order } = useOrder();

  const priceBreakdown = calculatePriceBreakdown(order.documents);

  if (order.documents.length === 0) {
    return <p className="text-gray-500">No order items available.</p>;
  }

  return (
    <div className="space-y-4">
      {order.documents.map((doc, i) => (
        <div
          key={i}
          className="flex gap-4 items-start bg-[#F4F7FA] p-2 rounded-xl"
        >
          {/* File Preview Image */}
          <div className="w-16 h-20 bg-gray-100 font-medium rounded border flex-shrink-0">
            <Image
              src={"/"}
              alt={""}
              width={64}
              height={80}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* File Details */}
          <div className="flex-1 min-w-0">
            <h5
              className="font-medium text-sm text-black mb-1 truncate max-w-xs"
              title={doc.fileName}
            >
              File {doc.fileName} - Jay Vasani UX nhj& Pro
            </h5>

            <p className="text-xs text-gray-600 leading-relaxed">
              {doc.pages ?? 1} page{doc.pages && doc.pages > 1 ? "s" : ""},{" "}
              {doc.colorType}, {doc.pageDirection}
              <br />
              {doc.copies} Copies
            </p>
          </div>

          {/* Price */}
          <div className="text-right flex-shrink-0">
            <p className="text-green-600 font-semibold text-sm">
              ₹
              {priceBreakdown
                .filter((item) => item.docId === doc.id)
                .reduce((sum, item) => sum + (item.total || 0), 0) || 0}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
