import PaymentMethodCard from "./PaymentMethodCard";
import UPIPaymentCard from "./UPIPaymentCard";
import CreditDebitCard from "./CreditDebitCard";
import NetBankingCard from "./NetBankingCard";
import Secure from "@/public/icons/Secure";

interface CardFormData {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expiry: string;
  setExpiry: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  cardNick: string;
  setCardNick: (value: string) => void;
  showCVV: boolean;
  setShowCVV: (value: boolean) => void;
}

interface BankingFormData {
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  confirmAccountNumber: string;
  setConfirmAccountNumber: (value: string) => void;
  ifsc: string;
  setIfsc: (value: string) => void;
  accountHolder: string;
  setAccountHolder: (value: string) => void;
}

interface PaymentMethodSectionProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
  expanded: string | null;
  setExpanded: (section: string | null) => void;
  cardFormData: CardFormData;
  bankingFormData: BankingFormData;
}

export default function PaymentMethodSection({
  selectedMethod,
  setSelectedMethod,
  expanded,
  setExpanded,
  cardFormData,
  bankingFormData,
}: PaymentMethodSectionProps) {
  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm space-y-4"
      style={{
        width: "645px",
        minHeight: "478px", // Changed from fixed height to minHeight
        height: "auto", // Allow height to expand
      }}
    >
      <PaymentMethodCard
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />

      <UPIPaymentCard expanded={expanded} setExpanded={setExpanded} />

      <CreditDebitCard
        expanded={expanded}
        setExpanded={setExpanded}
        cardFormData={cardFormData}
      />

      <NetBankingCard
        expanded={expanded}
        setExpanded={setExpanded}
        bankingFormData={bankingFormData}
      />

          <p className=" flex text-center text-green-600 text-sm mt-10 justify-center gap-3">
              <Secure />
         Secure Payment
      </p>
    </div>
  );
}
