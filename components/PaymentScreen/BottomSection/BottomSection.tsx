import { Card, CardContent } from "@/components/ui/card";
import DeliveryInfo from "./DeliveryInfo";
import ShopInfo from "./ShopInfo";
import { useOrder } from "@/context/orderContext";
import { calculateOrderTotals } from "@/app/print-and-deliver/print/pricing";

interface AddressData {
  name: string | null;
  address: string | null;
}

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

interface BottomSectionProps {
  selectedMerchant?: Merchant | null;
  userName?: string | null;
  onPay?: () => void;
}

export default function BottomSection({
  selectedMerchant,
  userName,
  onPay,
}: BottomSectionProps) {
  const { order } = useOrder();

  const { subtotal, deliveryCharges, tax, discount, total, categoryTotals } =
    calculateOrderTotals(order);

  // Create AddressData object from order data and user info
  const addressData: AddressData = {
    name: userName || "Customer", // Use actual user name
    address: order.address || "Address not provided",
  };

  // Create shop data from selected merchant
  const shopData: ShopData = {
    name: selectedMerchant?.shopName || "Print Shop", // Use selected merchant name
    description: `Total ${
      order.documents.length
    } Items (${order.documents.reduce(
      (sum, doc) => sum + (doc.pages || 1),
      0
    )} Pages)`, // More detailed description
  };

  return (
    <div className="px-6 mt-6">
      <Card
        className="bg-green-50 border-[#61E987]"
        style={{ width: "1124px", height: "176px" }}
      >
        <CardContent className="p-4">
          <div>
            <DeliveryInfo addressData={addressData} />
            <div className="w-full h-px bg-[#61E987] my-2"></div>
            <ShopInfo
              shopData={shopData}
              selectedMerchant={selectedMerchant}
              grandTotal={total}
              onPay={onPay}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
