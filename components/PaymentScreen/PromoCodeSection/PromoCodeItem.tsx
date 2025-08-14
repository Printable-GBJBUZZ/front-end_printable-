interface PromoCode {
  code: string;
  desc: string;
  discount: string;
}

interface PromoCodeItemProps {
  promo: PromoCode;
}

export default function PromoCodeItem({ promo }: PromoCodeItemProps) {
  return (
    <div className="border focus:border-[#C9C9C9] rounded-lg p-4 text-sm flex justify-between items-center hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="flex-1">
        <p className="font-semibold text-black text-base">{promo.code}</p>
        <p className="text-gray-600 text-sm mt-1">{promo.desc}</p>
      </div>
      <span className="text-green-600 font-bold text-sm ml-4">
        {promo.discount}
      </span>
    </div>
  );
}
