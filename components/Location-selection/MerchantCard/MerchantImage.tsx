import Home from "@/public/Print&Deliver/Home";
import Printer from "@/public/Print&Deliver/Printer";
import { Order } from "@/context/orderContext";

interface MerchantImageProps {
  src: string;
  alt?: string;
  googleDistance?: string;
  duration?: string;
  order: Order
}

export default function MerchantImage({
  src,
  alt,
  googleDistance,
  duration,
  order,
}: MerchantImageProps) {
  return (
    <div
      className="w-full h-40 rounded-xl bg-center bg-cover bg-no-repeat relative"
      style={{
        backgroundImage: `url('${src}')`,
      }}
      aria-label={alt}
      role="img"
    >
      {/* Top left: delivery type (only for Home Delivery) */}
      {order.fulfillmentType === "Home Delivery" && (
        <div className="absolute top-2 left-42 bg-[#007AFF] bg-opacity-80 text-[12px] text-white font-semibold px-3 py-1 rounded-full shadow flex flex-row items-center">
          <Home />
          <div className="ml-[5px]">{order.fulfillmentType}</div>
        </div>
      )}

      {/* Bottom left: distance and time */}
      {(googleDistance || duration) && (
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 text-[12px] font-medium px-3 py-1 rounded-full shadow flex gap-2 items-center">
          <Printer />
          {googleDistance && <span>{googleDistance}</span>}
          {duration && <span>• {duration}</span>}
        </div>
      )}
    </div>
  );
}
