import BlueTick from "@/public/icons/BlueTick";
import Store from "@/public/icons/Store";
import Truck from "@/public/icons/Truck";

interface OrderConformationProps {
  paymentMethod: string;
  paymentStatus: string;
  Total: number;
  deliveryMode: string;
  onClose?: () => void;
}

const OrderConformation = ({
  paymentMethod,
  paymentStatus,
  Total,
  deliveryMode,
  onClose,
}: OrderConformationProps) => {
  return (
    <div className="w-[550px] mx-auto bg-white rounded-2xl shadow-2xl py-10 px-8 flex flex-col items-center relative">
      <BlueTick />
      <div className="mt-5">
        <h1 className="text-3xl font-semibold text-center mb-2">
          Order Confirmed!
        </h1>
      </div>
      <div className="mt-3">
        <p className="mt-1 mb-6 text-center text-gray-600 text-base">
          Thank you for your order. We&apos;re getting it ready for you.
        </p>
      </div>
      {/* Payment details */}
      <div className="mb-6 w-full bg-[#F4F7FA] rounded-lg py-4 px-6 flex flex-col space-y-1">
        <div className="flex items-center justify-between text-base text-gray-600">
          <span>Payment Method:</span>{" "}
          <span className="text-black">{paymentMethod}</span>
        </div>
        <div className="flex items-center justify-between text-base text-gray-600">
          <span>Status:</span>{" "}
          <span className="text-green-600 font-semibold">{paymentStatus}</span>
        </div>
        <div className="flex items-center justify-between text-base text-gray-600">
          <span>Total:</span>{" "}
          <span className="text-black font-semibold">₹{Total}</span>
        </div>
      </div>
      {/* Delivery method */}
      <div className="mb-8 w-full bg-[#E8E7FE] rounded-lg py-4 px-6 flex justify-between items-center">
        {deliveryMode === "home" ? (
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Truck />
              <span className="font-semibold text-sm text-black">
                Home delivery
              </span>
            </div>
            <p className="text-gray-700 text-sm ml-10">
              Delivered in approx. 10–15 minutes
            </p>
          </div>
        ) : deliveryMode === "pickup" ? (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold text-sm text-black">
                <Store /> Store Pickup
              </div>
              <p className="text-gray-700 text-sm ml-8 mt-1">
                Ready in approx. 10–15 minutes
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Your pickup OTP</p>
              <p className="text-lg font-bold tracking-widest">123456</p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Choose a delivery mode</p>
        )}
      </div>
      {/* Buttons */}
      <div className="flex justify-around items-center p-4 gap-4 text-xl w-full">
        <button className="w-[234px] h-[45px] border border-black rounded-md hover:bg-[#06044B]">
          <p className="text-black hover:text-[#61E987]">Track Order</p>
        </button>
        <button
          className="w-[234px] h-[45px] border border-black rounded-md hover:bg-[#06044B]"
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          <p className="text-black hover:text-[#61E987]">Go to Home</p>
        </button>
      </div>
    </div>
  );
};

export default OrderConformation;
