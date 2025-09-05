import { calculateOrderTotals } from "@/app/print-and-deliver/print/pricing";
import { Order } from "@/context/orderContext";

interface BillSummaryProps {
  order: Order,
}

export default function BillSummary({
  order
}: BillSummaryProps) {

  const { subtotal, deliveryCharges, tax, discount, total, categoryTotals } =
      calculateOrderTotals(order);

  return (
    <div className="space-y-3 bg-[#F4F7FA] p-2 rounded-xl">
      <h4 className="font-semibold text-base mb-4">Bill Summary</h4>
      {[
        "Paper",
        "Color",
        "Binding",
        "Lamination",
        "Cover",
        "Confidential Print",
        "Rush Order",
      ]
        .filter((key) => (categoryTotals[key] ?? 0) > 0)
        .map((key) => (
          <div key={key} className="flex justify-between text-sm mb-2">
            <span>{key}</span>
            <span>₹{(categoryTotals[key] ?? 0).toFixed(2)}</span>
          </div>
        ))}

      {/* Subtotal */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-black font-medium">₹ {subtotal}</p>
      </div>

      {/* Delivery charges */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-700">Delivery charges</p>
        <p className="text-black font-medium">
          ₹ {deliveryCharges}
        </p>
      </div>

      {/* Tax */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-700">Tax ({tax}%)</p>
        <p className="text-black font-medium">
          ₹ {tax.toFixed(1)}
        </p>
      </div>

      {/* Discount */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-green-600">Discount Applied</p>
        <p className="text-green-600 font-medium">-₹{discount.toFixed(2)}</p>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-400 border-dashed my-4" />

      {/* Grand total */}
      <div className="flex justify-between items-center">
        <p className="text-black font-semibold text-base">Grand total</p>
        <p className="text-black font-semibold text-base">
          ₹ {total.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
