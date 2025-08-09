interface OrderSummary {
  subtotal: number;
  deliveryCharges: number;
  taxRate: number;
  tax: number;
  grandTotal: number;
}

interface BillSummaryProps {
  orderSummary: OrderSummary;
  discount: number;
}

export default function BillSummary({
  orderSummary,
  discount,
}: BillSummaryProps) {
  return (
    <div className="space-y-3 bg-[#F4F7FA] p-2 rounded-xl">
      <h4 className="font-semibold text-base mb-4">Bill Summary</h4>
      {/* Subtotal */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-black font-medium">₹ {orderSummary.subtotal}</p>
      </div>

      {/* Delivery charges */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-700">Delivery charges</p>
        <p className="text-black font-medium">
          ₹ {orderSummary.deliveryCharges}
        </p>
      </div>

      {/* Tax */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-700">Tax ({orderSummary.taxRate}%)</p>
        <p className="text-black font-medium">
          ₹ {orderSummary.tax.toFixed(1)}
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
          ₹ {orderSummary.grandTotal.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
