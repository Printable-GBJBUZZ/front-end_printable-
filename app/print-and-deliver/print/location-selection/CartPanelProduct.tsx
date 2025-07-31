import CartProductImage from "@/public/Print&Deliver/CartProductImage";

export default function CartPanelProduct({
  cartItems,
}: {
  cartItems: Array<{
    id: number;
    name: string;
    description: string;
    copies: number;
    price: number;
  }>;
}) {
  return (
    <div className="space-y-4 mt-[10px]">
      {/* Cart Items */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="w-[378px] h-[102px] rounded-lg p-[10px] border-[1px] border-[#C9C9C9]"
        >
          <div className="flex items-start justify-between mb-3">
            <CartProductImage />
            <div className="flex-1 ml-[15px]">
              <h3 className="text-[16px] font-medium text-[#000000] mb-[4px]">
                {item.name}
              </h3>
              <p className="text-[14px]  text-gray-600 mb-[4px]">
                {item.description}
              </p>
              <p className="text-[14px] text-gray-700">{item.copies} Copies</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-medium text-[#34C759]">
                ₹{item.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
