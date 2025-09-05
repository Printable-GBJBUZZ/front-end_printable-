"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Gift, Zap, Clock, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const promos = [
  {
    id: 1,
    title: "First Order FREE",
    subtitle: "Get your first print job absolutely free",
    description: "Upload any document and get it printed for free. Valid for new users only.",
    discount: "100% OFF",
    code: "FIRST100",
    bgColor: "bg-gradient-to-r from-printable-navy to-blue-600",
    textColor: "text-white",
    accentColor: "text-printable-green",
    icon: Gift,
    href: "/print",
    validUntil: "Limited Time",
  },
  {
    id: 2,
    title: "Bulk Print Discount",
    subtitle: "Save big on large orders",
    description: "Print 100+ pages and save up to 40%. Perfect for offices and students.",
    discount: "40% OFF",
    code: "BULK40",
    bgColor: "bg-gradient-to-r from-printable-green to-green-500",
    textColor: "text-printable-navy",
    accentColor: "text-white",
    icon: Zap,
    href: "/print?bulk=true",
    validUntil: "This Week",
  },
  {
    id: 3,
    title: "Express Delivery",
    subtitle: "Lightning fast printing",
    description: "Get your prints delivered in just 10 minutes with our express service.",
    discount: "FREE",
    code: "EXPRESS",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
    textColor: "text-white",
    accentColor: "text-orange-100",
    icon: Clock,
    href: "/print?express=true",
    validUntil: "Today Only",
  },
  {
    id: 4,
    title: "Premium Quality",
    subtitle: "Upgrade to premium paper",
    description: "Get premium quality prints with enhanced paper and vibrant colors.",
    discount: "25% OFF",
    code: "PREMIUM25",
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    textColor: "text-white",
    accentColor: "text-purple-100",
    icon: Star,
    href: "/print?quality=premium",
    validUntil: "This Month",
  },
]

export default function PromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length)
  }

  return (
    <section className="py-16 md:py-20 bg-printable-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-printable-navy mb-4">Special Offers</h2>
          <p className="text-lg text-gray-600">Limited time deals you don't want to miss</p>
        </div>

        <div className="relative">
          {/* Main Slider */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {promos.map((promo) => {
                const Icon = promo.icon
                return (
                  <div key={promo.id} className="w-full flex-shrink-0">
                    <Card className={`${promo.bgColor} ${promo.textColor} border-0 shadow-2xl`}>
                      <CardContent className="p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Icon className="w-6 h-6" />
                              </div>
                              <Badge className={`${promo.accentColor} bg-white/20 font-bold px-3 py-1`}>
                                {promo.validUntil}
                              </Badge>
                            </div>

                            <div>
                              <h3 className="text-3xl md:text-4xl font-bold font-display mb-2">{promo.title}</h3>
                              <p className={`text-xl ${promo.accentColor} font-semibold mb-4`}>{promo.subtitle}</p>
                              <p className="text-lg opacity-90 leading-relaxed">{promo.description}</p>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="bg-white/20 px-4 py-2 rounded-xl">
                                <span className="text-sm font-semibold">Code: {promo.code}</span>
                              </div>
                              <div className="text-2xl font-bold">{promo.discount}</div>
                            </div>

                            <Link href={promo.href}>
                              <Button
                                size="lg"
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 font-bold px-8 py-3 rounded-xl"
                              >
                                Claim Offer
                                <ChevronRight className="w-5 h-5 ml-2" />
                              </Button>
                            </Link>
                          </div>

                          <div className="hidden md:flex items-center justify-center">
                            <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Icon className="w-32 h-32 opacity-50" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-0 shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-0 shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {promos.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-printable-navy scale-125" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
