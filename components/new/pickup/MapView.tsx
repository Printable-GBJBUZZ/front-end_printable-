"use client"

import { useState } from "react"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Merchant {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  phone: string
  openHours: string
  services: string[]
}

interface MapViewProps {
  label: string
  onMerchantSelect?: (merchant: Merchant) => void
}

const nearbyMerchants: Merchant[] = [
  {
    id: "1",
    name: "PrintHub Sitabuldi",
    address: "Shop 12, Sitabuldi Main Road, Nagpur",
    distance: "0.8 km",
    rating: 4.8,
    phone: "+91 9876543210",
    openHours: "9:00 AM - 9:00 PM",
    services: ["Pickup", "Printing", "Binding"],
  },
  {
    id: "2",
    name: "Quick Print Dharampeth",
    address: "Near Dharampeth Market, Nagpur",
    distance: "1.2 km",
    rating: 4.6,
    phone: "+91 9876543211",
    openHours: "8:00 AM - 8:00 PM",
    services: ["Pickup", "Printing", "Scanning"],
  },
  {
    id: "3",
    name: "Express Print Sadar",
    address: "Sadar Bazaar, Near GPO, Nagpur",
    distance: "2.1 km",
    rating: 4.5,
    phone: "+91 9876543212",
    openHours: "10:00 AM - 7:00 PM",
    services: ["Pickup", "Printing", "Design"],
  },
]

export default function MapView({ label, onMerchantSelect }: MapViewProps) {
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null)

  const handleMerchantSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant.id)
    onMerchantSelect?.(merchant)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        {label}
      </h3>

      {/* Map Placeholder */}
      <Card className="bg-gray-100">
        <CardContent className="p-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h4 className="font-medium text-gray-900 mb-2">Interactive Map</h4>
            <p className="text-sm text-gray-600">Map showing your location and nearby merchants</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                // In a real app, this would open the device's map app
                alert("Opening map with your location...")
              }}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Open in Maps
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Merchant List */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Nearby Merchants</h4>
        {nearbyMerchants.map((merchant) => (
          <Card
            key={merchant.id}
            className={`cursor-pointer transition-all ${
              selectedMerchant === merchant.id
                ? "ring-2 ring-blue-500 border-blue-500"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleMerchantSelect(merchant)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold text-gray-900">{merchant.name}</h5>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {merchant.address}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-blue-600">{merchant.distance}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-yellow-500">★</span>
                    <span className="text-xs text-gray-600">{merchant.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{merchant.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{merchant.openHours}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {merchant.services.map((service, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
