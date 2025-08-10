import { Button } from "@/components/ui/button";
import { calculateOrderTotals } from "@/app/print-and-deliver/print/pricing";
import { Order, useOrder } from "@/context/orderContext";

interface ShopData {
  name: string;
  description: string;
}

interface Merchant {
  merchantId: string;
  shopName: string;
  latitude: string | null;
  longitude: string | null;
  MerchantImages: any[];
  averageRating: string;
  ratingCount: number;
  googleDistance: string;
  duration: string;
  durationInTraffic: string;
  features: string[];
  address?: string;
  services?: string[];
}

interface ShopInfoProps {
  shopData: ShopData;
  selectedMerchant?: Merchant | null;
  grandTotal: number;
  onPay?: () => void;
}

export default function ShopInfo({
  shopData,
  selectedMerchant,
  grandTotal,
  onPay,
}: ShopInfoProps) {
  const { order } = useOrder();

  const { subtotal, deliveryCharges, tax, discount, total, categoryTotals } =
    calculateOrderTotals(order);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-3">
        <img
          src={
            selectedMerchant?.MerchantImages?.[0] ||
            "/placeholder.svg?height=40&width=40"
          }
          alt={shopData.name}
          className="w-10 h-10 rounded object-cover"
        />
        <div className="text-left">
          <p className="font-medium text-sm">{shopData.name}</p>
          <p className="text-xs text-gray-600">{shopData.description}</p>
          {selectedMerchant?.address && (
            <p className="text-xs text-gray-500 truncate max-w-xs">
              {selectedMerchant.address}
            </p>
          )}
        </div>
      </div>
      <div>
        <Button
          onClick={onPay}
          className="bg-[#06044B] text-white px-8 py-3 text-base font-medium relative overflow-hidden transition-all duration-500 ease-in-out hover:px-12 group"
        >
          <span className="flex items-center gap-0 group-hover:gap-3 transition-all duration-500">
            PAY ₹ {total.toFixed(2)}
            <span
              className="text-4xl opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 transform flex items-center justify-center h-6"
              style={{ lineHeight: "1", marginBottom: "10px" }}
            >
              →
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
}
