"use client"

import { useState } from "react"
import { Home, Printer, LayoutGrid, Megaphone, PlusCircle, Upload, Truck, Store, X, Scan } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Printer, label: "Print & Delivery", href: "/print-delivery" },
  { icon: LayoutGrid, label: "Marketplace", href: "/marketplace" },
  { icon: Megaphone, label: "Billboard Ads", href: "/billboard" },
]

const quickActions = [
  {
    icon: Scan,
    label: "Doc Scanner",
    href: "/scan-document",
    color: "bg-green-500",
    description: "Scan documents like CamScanner and save to wallet",
  },
  {
    icon: Upload,
    label: "Print Now",
    href: "/print",
    color: "bg-blue-500",
    description: "Upload and print documents instantly",
  },
  {
    icon: Truck,
    label: "Pickup Request",
    href: "/pickup",
    color: "bg-orange-500",
    description: "Schedule a pickup for your print jobs",
  },
  {
    icon: Store,
    label: "Shop",
    href: "/shop",
    color: "bg-purple-500",
    description: "Browse local print shops",
  },
]

export default function FloatingBottomNav() {
  const [showQuickActions, setShowQuickActions] = useState(false)
  const pathname = usePathname()

  const handleQuickActionClick = (href: string) => {
    setShowQuickActions(false)
    window.location.href = href
  }

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#ECEFF1] px-2 sm:px-4 py-2 safe-area-pb">
        <div className="flex items-center justify-between max-w-md mx-auto relative">
          {/* Navigation Items */}
          <div className="flex items-center justify-around flex-1">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex flex-col items-center space-y-1 py-2 px-1 sm:px-3 rounded-lg transition-all duration-200 min-w-[50px] sm:min-w-[60px] ${
                    isActive ? "text-[#61E987]" : "text-gray-600 hover:text-[#61E987] hover:bg-gray-50"
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    {isActive && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-1 bg-[#61E987] rounded-full" />
                    )}
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-center leading-tight max-w-[50px] sm:max-w-none truncate">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Center FAB */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-6">
            <button
              onClick={() => setShowQuickActions(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#61E987] hover:bg-[#4fd670] text-[#1F1D5D] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-4 border-white flex items-center justify-center group"
              aria-label="Quick Actions"
            >
              <PlusCircle className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </nav>

      {/* Quick Actions Modal */}
      {showQuickActions && (
        <div className="fixed inset-0 z-50 flex items-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuickActions(false)} />

          {/* Modal Content */}
          <div className="relative w-full bg-white rounded-t-3xl p-4 sm:p-6 pb-6 sm:pb-8 animate-slide-up">
            {/* Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1F1D5D]">Quick Actions</h2>
                <p className="text-xs sm:text-sm text-gray-600">Choose what you'd like to do</p>
              </div>
              <button
                onClick={() => setShowQuickActions(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickActionClick(action.href)}
                    className="w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] text-left"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${action.color} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-[#1F1D5D] truncate">{action.label}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{action.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Bottom spacing for safe area */}
            <div className="h-4 sm:h-6" />
          </div>
        </div>
      )}
    </>
  )
}
