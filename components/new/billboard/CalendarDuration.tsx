"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CalendarDurationProps {
  label: string
  onDateSelect?: (startDate: Date, endDate: Date) => void
  onDurationSelect?: (duration: number) => void
}

const durationOptions = [
  { label: "1 Day", value: 1, price: 1499 },
  { label: "3 Days", value: 3, price: 4200, discount: "5% off" },
  { label: "1 Week", value: 7, price: 9500, discount: "10% off" },
  { label: "2 Weeks", value: 14, price: 18000, discount: "15% off" },
  { label: "1 Month", value: 30, price: 35000, discount: "20% off" },
]

export default function CalendarDuration({ label, onDateSelect, onDurationSelect }: CalendarDurationProps) {
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleDurationChange = (duration: (typeof durationOptions)[0]) => {
    setSelectedDuration(duration)
    onDurationSelect?.(duration.value)

    if (startDate) {
      const start = new Date(startDate)
      const end = new Date(start)
      end.setDate(start.getDate() + duration.value - 1)
      setEndDate(end.toISOString().split("T")[0])
      onDateSelect?.(start, end)
    }
  }

  const handleStartDateChange = (date: string) => {
    setStartDate(date)
    if (date) {
      const start = new Date(date)
      const end = new Date(start)
      end.setDate(start.getDate() + selectedDuration.value - 1)
      setEndDate(end.toISOString().split("T")[0])
      onDateSelect?.(start, end)
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {label}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {durationOptions.map((option) => (
            <Card
              key={option.value}
              className={`cursor-pointer transition-all ${
                selectedDuration.value === option.value
                  ? "ring-2 ring-blue-500 border-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleDurationChange(option)}
            >
              <CardContent className="p-4 text-center">
                <h4 className="font-medium text-gray-900">{option.label}</h4>
                <p className="text-2xl font-bold text-green-600 mt-1">₹{option.price.toLocaleString()}</p>
                {option.discount && (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mt-2">
                    {option.discount}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
          />
        </div>
      </div>

      {startDate && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Booking Summary</h4>
          <div className="text-sm text-blue-800">
            <p>Duration: {selectedDuration.label}</p>
            <p>Start: {new Date(startDate).toLocaleDateString()}</p>
            <p>End: {new Date(endDate).toLocaleDateString()}</p>
            <p className="font-semibold mt-2">Total: ₹{selectedDuration.price.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  )
}
