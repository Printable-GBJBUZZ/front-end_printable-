import { Button } from "@/components/ui/button";

interface ShopData {
  name: string;
  description: string;
}

interface ShopInfoProps {
  shopData: ShopData;
  grandTotal: number;
  onPay?: () => void;
}

export default function ShopInfo({
  shopData,
  grandTotal,
  onPay,
}: ShopInfoProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-3">
        <img
          src="/placeholder.svg?height=40&width=40"
          alt={shopData.name}
          className="w-10 h-10"
        />
        <div className="text-left">
          <p className="font-medium text-sm">{shopData.name}</p>
          <p className="text-xs text-gray-600">{shopData.description}</p>
        </div>
      </div>
      <div>
        <Button
          onClick={onPay}
          className="bg-[#06044B] text-white px-8 py-3 text-base font-medium relative overflow-hidden transition-all duration-500 ease-in-out hover:px-12 group"
        >
          <span className="flex items-center gap-0 group-hover:gap-3 transition-all duration-500">
            PAY ₹ {grandTotal}
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
