"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, FileText, Clock, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PickupFormProps {
  onSubmit?: (formData: any) => void
}

export default function PickupForm({ onSubmit }: PickupFormProps) {
  const [formData, setFormData] = useState({
    address: "",
    contactNumber: "",
    pageCount: "",
    pickupTime: "",
    file: null as File | null,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File | null) => {
    setFormData((prev) => ({ ...prev, file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const isFormValid = formData.address && formData.contactNumber && formData.pageCount && formData.pickupTime

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pickup Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-2" />
              Pickup Address *
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter your complete pickup address with landmarks"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={3}
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 inline mr-2" />
              Contact Number *
            </label>
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange("contactNumber", e.target.value)}
              placeholder="+91 9876543210"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Page Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 inline mr-2" />
              Approximate Page Count *
            </label>
            <input
              type="number"
              value={formData.pageCount}
              onChange={(e) => handleInputChange("pageCount", e.target.value)}
              placeholder="e.g., 150"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">This helps us estimate pickup time and pricing</p>
          </div>

          {/* Pickup Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4 inline mr-2" />
              Preferred Pickup Time *
            </label>
            <input
              type="datetime-local"
              value={formData.pickupTime}
              onChange={(e) => handleInputChange("pickupTime", e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Optional File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="h-4 w-4 inline mr-2" />
              Optional File Upload
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload reference file (optional)</p>
                <p className="text-xs text-gray-500">PDF, DOC, or image files up to 10MB</p>
              </label>
              {formData.file && <div className="mt-2 text-sm text-green-600">✓ {formData.file.name}</div>}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            Request Pickup
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
