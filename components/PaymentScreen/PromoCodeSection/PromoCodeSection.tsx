import PromoCodeItem from "./PromoCodeItem";

interface PromoCodeSectionProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  handlePromoApply: () => void;
}

interface PromoCode {
  code: string;
  desc: string;
  discount: string;
}

export default function PromoCodeSection({
  promoCode,
  setPromoCode,
  handlePromoApply,
}: PromoCodeSectionProps) {
  const promoCodes: PromoCode[] = [
    {
      code: "FIRST10",
      desc: "10% off on first order",
      discount: "10% OFF",
    },
    {
      code: "SAVE5",
      desc: "₹5 off on orders above ₹25",
      discount: "₹5 OFF",
    },
    {
      code: "STUDENT20",
      desc: "20% off for students",
      discount: "20% OFF",
    },
  ];

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm space-y-4"
      style={{ width: "645px", height: "455px" }}
    >
      <h3 className="font-semibold text-lg">Promo Code</h3>
      <div className="flex gap-3">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="ENTER PROMO CODE"
          className="flex-1 px-4 py-3 border rounded-lg text-sm focus:border-[#C9C9C9] focus:outline-none placeholder-[#555555]"
          style={{ borderColor: "#C9C9C9" , backgroundColor: "#F9F9F9"}}
        />
        <button
          onClick={handlePromoApply}
          className="px-8 py-3 border  text-black hover:text-white rounded-lg text-sm font-medium hover:bg-[#06044B] transition-colors duration-200"
        >
          Apply
        </button>
      </div>

      <div className="space-y-3">
        {promoCodes.map((promo, i) => (
          <PromoCodeItem key={i} promo={promo} />
        ))}
      </div>
    </div>
  );
}
