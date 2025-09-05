"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Home, Printer, Package, Store, ShoppingBag, BarcodeIcon as Billboard, User, Plus, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  {
    icon: Plus,
    label: "Services",
    href: "/print",
    isSpecial: true,
    subItems: [
      { icon: Printer, label: "Print Now", href: "/print", color: "bg-[#61E987]" },
      { icon: Package, label: "Pickup", href: "/pickup", color: "bg-[#1F1D5D]" },
      { icon: Store, label: "Shop", href: "/shop", color: "bg-purple-500" },
    ],
  },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
  { icon: Billboard, label: "Billboard", href: "/billboard" },
  { icon: User, label: "Profile", href: "/profile" },
]

export default function AdvancedBottomNav() {
  const pathname = usePathname()
  const [showPopup, setShowPopup] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const clickTimer = useRef<NodeJS.Timeout | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault()

    setClickCount((prev) => prev + 1)

    if (clickTimer.current) {
      clearTimeout(clickTimer.current)
    }

    clickTimer.current = setTimeout(() => {
      if (clickCount === 0) {
        // Single click - show popup
        setShowPopup(true)
      } else if (clickCount === 1) {
        // Double click - redirect to print
        window.location.href = "/print"
      }
      setClickCount(0)
    }, 300)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false)
      }
    }

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showPopup])

  return (
    <>
      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40">
          <div
            ref={popupRef}
            className="absolute bottom-20 xs:bottom-24 sm:bottom-28 left-1/2 transform -translate-x-1/2 w-[85vw] xs:w-[80vw] sm:w-[70vw] md:w-96 max-w-md"
          >
            <Card className="shadow-2xl border-0 bg-white mx-2 xs:mx-4 sm:mx-0">
              <CardContent className="p-3 xs:p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-6">
                  <h3 className="font-bold text-base xs:text-lg sm:text-xl text-[#1F1D5D]">Quick Services</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPopup(false)}
                    className="h-7 w-7 xs:h-8 xs:w-8 p-0 hover:bg-gray-100"
                  >
                    <X className="w-3 h-3 xs:w-4 xs:h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-2 xs:gap-3 sm:gap-4">
                  {navItems
                    .find((item) => item.isSpecial)
                    ?.subItems?.map((subItem, index) => {
                      const Icon = subItem.icon
                      return (
                        <Link
                          key={index}
                          href={subItem.href}
                          onClick={() => setShowPopup(false)}
                          className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl hover:bg-[#ECEFF1] transition-all duration-200 group"
                        >
                          <div
                            className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 ${subItem.color} rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg flex-shrink-0`}
                          >
                            <Icon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs xs:text-sm sm:text-base text-[#1F1D5D] truncate">
                              {subItem.label}
                            </h4>
                            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 line-clamp-1 xs:line-clamp-2">
                              {subItem.label === "Print Now" && "Upload & print instantly"}
                              {subItem.label === "Pickup" && "100+ pages? We'll collect"}
                              {subItem.label === "Shop" && "Browse store services"}
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                </div>
                <div className="mt-3 xs:mt-4 sm:mt-6 pt-2 xs:pt-3 sm:pt-4 border-t border-gray-100">
                  <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500 text-center">
                    💡 Tip: Double-tap Services button to go directly to Print
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-2xl">
        {/* Safe area for devices with home indicators */}
        <div className="pb-safe">
          {/* Navigation container with proper centering */}
          <div className="w-full max-w-lg mx-auto px-2 xs:px-4 sm:px-6">
            <div className="grid grid-cols-5 gap-1 xs:gap-2 h-14 xs:h-16 sm:h-20 py-1 xs:py-2">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href || (item.isSpecial && ["/print", "/pickup", "/shop"].includes(pathname))

                if (item.isSpecial) {
                  return (
                    <button
                      key={item.href}
                      onClick={handleServicesClick}
                      className="flex flex-col items-center justify-center transition-all duration-200 relative group rounded-lg hover:bg-[#61E987]/5"
                    >
                      <div className={`relative ${isActive ? "transform scale-105" : ""}`}>
                        <div
                          className={`w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isActive ? "bg-[#61E987] shadow-lg" : "bg-[#ECEFF1] group-hover:bg-[#61E987]/20"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 ${
                              isActive ? "text-[#1F1D5D]" : "text-[#1F1D5D] group-hover:text-[#61E987]"
                            }`}
                          />
                        </div>
                        {showPopup && (
                          <div className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 bg-[#61E987] rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-[#1F1D5D] rounded-full animate-pulse" />
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-[9px] xs:text-[10px] sm:text-xs font-semibold mt-0.5 xs:mt-1 text-center leading-tight max-w-full truncate ${
                          isActive ? "text-[#61E987]" : "text-[#1F1D5D] group-hover:text-[#61E987]"
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 xs:w-6 sm:w-8 h-0.5 sm:h-1 bg-[#61E987] rounded-b-full" />
                      )}
                    </button>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center justify-center transition-all duration-200 relative group rounded-lg ${
                      isActive
                        ? "text-[#61E987] bg-[#61E987]/10 scale-105"
                        : "text-[#1F1D5D] hover:text-[#61E987] hover:bg-[#61E987]/5"
                    }`}
                  >
                    <div className="relative">
                      <Icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 mb-0.5 xs:mb-1" />
                      {item.label === "Profile" && (
                        <Badge className="absolute -top-1 -right-1 xs:-top-1.5 xs:-right-1.5 sm:-top-2 sm:-right-2 bg-[#61E987] text-[#1F1D5D] text-[7px] xs:text-[8px] sm:text-xs px-0.5 xs:px-1 py-0 h-2.5 xs:h-3 sm:h-4 min-w-[10px] xs:min-w-[12px] sm:min-w-[16px] font-bold flex items-center justify-center">
                          3
                        </Badge>
                      )}
                    </div>
                    <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-center leading-tight max-w-full truncate">
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 xs:w-6 sm:w-8 h-0.5 sm:h-1 bg-[#61E987] rounded-b-full" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
