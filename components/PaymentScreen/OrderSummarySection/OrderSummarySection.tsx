import OrderItems from "./OrderItems";
import { Order } from "@/context/orderContext";
import BillSummary from "./BillSummary";

interface OrderSummarySectionProps {
  order: Order;
}

export default function OrderSummarySection({
  order,
}: OrderSummarySectionProps) {
  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm"
      style={{ width: "455px", height: "732px" }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Order Summary</h3>
      </div>

      {/* Files Section with Label */}
      <div className="mb-6">
        <div className="flex justify-between">
          <p className="text-sm text-gray-600 mb-4">Files (3)</p>
          <div className="text-sm text-green-600 space-x-2">
            <button className="hover:underline">Edit</button>
            <span>•</span>
            <button className="hover:underline">Remove</button>
          </div>
        </div>

        <OrderItems />
      </div>

      {/* Bill Summary Section */}
      <div>
        <BillSummary order={order} />
      </div>
    </div>
  );
}
