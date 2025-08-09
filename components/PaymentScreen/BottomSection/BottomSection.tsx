import { Card, CardContent } from "@/components/ui/card";
import DeliveryInfo from "./DeliveryInfo";
import ShopInfo from "./ShopInfo";

interface AddressData {
  name: string;
  address: string;
}

interface ShopData {
  name: string;
  description: string;
}

interface BottomSectionProps {
  addressData: AddressData;
  shopData: ShopData;
  grandTotal: number;
  onPay?: () => void;
}

export default function BottomSection({
  addressData,
  shopData,
  grandTotal,
  onPay,
}: BottomSectionProps) {
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
              grandTotal={grandTotal}
              onPay={onPay}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
