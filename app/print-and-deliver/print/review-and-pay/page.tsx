"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp, CreditCard, Smartphone, Building2, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Demo data - will come from backend
const fileData = [
  {
    id: 1,
    name: "File 1 - Jay Vasani UX InJa Pro",
    pages: "1 page, Black & White, Portrait",
    copies: "15 Copies",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "File 1 - Jay Vasani UX InJa Pro",
    pages: "1 page, Black & White, Portrait",
    copies: "15 Copies",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "File 1 - Jay Vasani UX InJa Pro",
    pages: "1 page, Black & White, Portrait",
    copies: "15 Copies",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
]

const addressData = {
  name: "Jay",
  address: "184 Surthana Jakat Naka, Nana Varachha Surat, Gujarat, India",
}

const orderSummary = {
  subtotal: 750,
  deliveryCharges: 20,
  taxRate: 8,
  tax: 18.0,
  grandTotal: 768.0,
}

const shopData = {
  name: "Print Master Shop",
  description: "Total 3 Items (25 Pages)",
}

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState("")
  const [expandedSection, setExpandedSection] = useState("")
  const [selectedUpiOption, setSelectedUpiOption] = useState("")
  const [selectedBank, setSelectedBank] = useState("")

  const handleBack = () => {
    // Navigate to previous route
    window.history.back()
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section)
    setSelectedPayment(section)
  }

  const upiOptions = [
    { id: "gpay", name: "Google Pay", icon: "/placeholder.svg?height=24&width=24" },
    { id: "paytm", name: "Paytm", icon: "/placeholder.svg?height=24&width=24" },
    { id: "phonepe", name: "PhonePe", icon: "/placeholder.svg?height=24&width=24" },
    { id: "upi-id", name: "UPI ID", icon: "/placeholder.svg?height=24&width=24" },
  ]


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-900 hover:text-lime-500 transition-colors group mb-4 cursor-pointer w-fit"
          >
            <ArrowLeft className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200" />
            <h1 className="text-2xl font-bold group-hover:translate-x-1 transition-transform duration-200">
              Select Payment Method
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            {/* UPI */}
            <Card className="overflow-hidden">
              <div
                className={`p-4 cursor-pointer transition-colors hover:bg-lime-50 ${
                  selectedPayment === "upi" ? "bg-lime-50 border-lime-500" : ""
                }`}
                onClick={() => toggleSection("upi")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">UPI</span>
                  </div>
                  {expandedSection === "upi" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {expandedSection === "upi" && (
                <CardContent className="pt-0 pb-4">
                  <RadioGroup value={selectedUpiOption} onValueChange={setSelectedUpiOption}>
                    {upiOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <img src={option.icon || "/placeholder.svg"} alt={option.name} className="w-6 h-6" />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          {option.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {selectedUpiOption === "upi-id" && (
                    <div className="mt-4">
                      <Label htmlFor="upi-id-input">Enter UPI ID</Label>
                      <Input id="upi-id-input" placeholder="example@upi" className="mt-2" />
                    </div>
                  )}
                </CardContent>
              )}
            </Card>

            {/* Credit/Debit Card */}
            <Card className="overflow-hidden">
              <div
                className={`p-4 cursor-pointer transition-colors hover:bg-lime-50 ${
                  selectedPayment === "card" ? "bg-lime-50 border-lime-500" : ""
                }`}
                onClick={() => toggleSection("card")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">CREDIT/DEBIT CARD</span>
                  </div>
                  {expandedSection === "card" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {expandedSection === "card" && (
                <CardContent className="pt-0 pb-4 space-y-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input id="card-name" placeholder="John Doe" className="mt-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Net Banking */}
            <Card className="overflow-hidden">
              <div
                className={`p-4 cursor-pointer transition-colors hover:bg-lime-50 ${
                  selectedPayment === "netbanking" ? "bg-lime-50 border-lime-500" : ""
                }`}
                onClick={() => toggleSection("netbanking")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium">NET BANKING</span>
                  </div>
                  {expandedSection === "netbanking" ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {expandedSection === "netbanking" && (
                <CardContent className="pt-0 pb-4 space-y-4">
                  <div>
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input id="account-number" placeholder="Enter your account number" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="re-account-number">Re-enter Account Number</Label>
                    <Input id="re-account-number" placeholder="Re-enter your account number" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="ifsc-code">IFSC Code</Label>
                    <Input id="ifsc-code" placeholder="Enter IFSC code" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="account-holder">Account Holder Name</Label>
                    <Input id="account-holder" placeholder="Enter account holder name" className="mt-2" />
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Cash on Delivery */}
            <Card className="overflow-hidden">
              <div
                className={`p-4 cursor-pointer transition-colors hover:bg-lime-50 ${
                  selectedPayment === "cod" ? "bg-lime-50 border-lime-500" : ""
                }`}
                onClick={() => setSelectedPayment("cod")}
              >
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Cash on Delivery</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Files and Order Summary */}
          <div className="space-y-6">
            {/* Files Section */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Files</h3>
                <div className="space-y-3">
                  {fileData.map((file) => (
                    <div key={file.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={file.thumbnail || "/placeholder.svg"}
                        alt="File thumbnail"
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{file.name}</p>
                        <p className="text-xs text-gray-600">{file.pages}</p>
                        <p className="text-xs text-gray-600">{file.copies}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ {orderSummary.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery charges</span>
                    <span>₹ {orderSummary.deliveryCharges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({orderSummary.taxRate}%)</span>
                    <span>₹ {orderSummary.tax}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Grand total</span>
                    <span>₹ {orderSummary.grandTotal}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-green-800">Delivering to Home</p>
                  <p className="text-sm text-green-700">
                    {addressData.name}, {addressData.address}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Print Master Shop"
                      className="w-10 h-10 mx-auto mb-1"
                    />
                    <p className="font-medium text-sm">{shopData.name}</p>
                    <p className="text-xs text-gray-600">{shopData.description}</p>
                  </div>
                  <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8" disabled={!selectedPayment}>
                    Pay ₹ {orderSummary.grandTotal}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Message */}
        <div className="text-center mt-8 py-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your money is always safe</h3>
          <p className="text-gray-600">100% secure payments</p>
        </div>
      </div>
    </div>
  )
}
