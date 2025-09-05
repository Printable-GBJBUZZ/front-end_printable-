interface PaymentMethodCardProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

export default function PaymentMethodCard({
  selectedMethod,
  setSelectedMethod,
}: PaymentMethodCardProps) {
  return (
    <label
      htmlFor="wallet"
      className={`border rounded-xl p-4 cursor-pointer flex items-center justify-between transition-colors duration-200 ${
        selectedMethod === "wallet"
          ? "border-green-500 bg-green-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div>
        <p className="font-medium">Use Printable Wallet</p>
        <p className="text-sm text-gray-600">Balance (₹1000.00)</p>
      </div>
      <input
        type="radio"
        id="wallet"
        name="paymentMethod"
        value="wallet"
        checked={selectedMethod === "wallet"}
        onChange={() => setSelectedMethod("wallet")}
        className="accent-green-600 w-4 h-4"
      />
    </label>
  );
}
