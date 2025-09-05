"use client"

import { useState } from "react"
import { MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LocationFilterProps {
  current: string
  onLocationChange?: (location: string) => void
}

const locations = ["Nagpur", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata"]

export default function LocationFilter({ current, onLocationChange }: LocationFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(current)

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
    onLocationChange?.(location)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between bg-white border-gray-200 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700">{selectedLocation}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => handleLocationSelect(location)}
                className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                  location === selectedLocation ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
