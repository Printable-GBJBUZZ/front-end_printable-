import React from "react";
import Location from "@/public/icons/Location";
interface AddressData {
  name: string;
  address: string;
}

interface DeliveryInfoProps {
  addressData: AddressData;
}

export default function DeliveryInfo({ addressData }: DeliveryInfoProps) {
  return (
    <div className=" h-[75px] flex items-start gap-3">
          <div className="flex-1">
              <div className="flex gap-3 mb-2">
                  <Location/>
                          <p className="font-medium text-green-800">Delivering to Home</p>
              </div>
        <p className="text-sm text-green-700">
          {addressData.name}, {addressData.address}
        </p>
      </div>
    </div>
  );
}
