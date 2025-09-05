"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Upload,
  FileText,
  BarcodeIcon as Billboard,
  ShoppingBag,
  Package,
  Store,
  Camera,
  QrCode,
  ArrowRight,
  MousePointer2,
  Zap,
  Star,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const mainTabs = [
  {
    id: "upload",
    title: "Upload & Print",
    subtitle: "Documents, Photos",
    icon: Upload,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-white",
    href: "/print",
    description: "Quick Upload",
    detail: "Drag files here or choose from device",
    animation: "hover:rotate-12 hover:scale-110",
    popular: true,
  },
  {
    id: "flyers",
    title: "Flyers/Posters",
    subtitle: "Marketing Materials",
    icon: FileText,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-white",
    href: "/shop?category=flyers",
    description: "Design & Print",
    detail: "Professional marketing materials",
    animation: "hover:rotate-6 hover:scale-110",
    trending: true,
  },
]

const bottomTabs = [
  {
    id: "billboard",
    title: "Billboard",
    subtitle: "Outdoor Advertising",
    icon: Billboard,
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    textColor: "text-white",
    href: "/billboard",
    description: "Premium Advertising",
    detail: "Book billboard spaces across India",
    animation: "hover:scale-105 hover:rotate-1",
    featured: true,
  },
  {
    id: "pickup",
    title: "Pickup",
    subtitle: "Bulk Orders",
    icon: Package,
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    textColor: "text-white",
    href: "/pickup",
    description: "Bulk Service",
    detail: "100+ pages? We'll collect & deliver",
    animation: "hover:scale-110 hover:-translate-y-1",
    free: true,
  },
  {
    id: "shop",
    title: "Shop",
    subtitle: "Local Stores",
    icon: Store,
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    textColor: "text-white",
    href: "/shop",
    description: "Browse Stores",
    detail: "Find nearby print shops & services",
    animation: "hover:scale-110 hover:rotate-3",
    verified: true,
  },
]

const quickActions = [
  {
    id: "business",
    title: "Business Cards/Other",
    subtitle: "Templates & Products",
    icon: ShoppingBag,
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    textColor: "text-white",
    href: "/marketplace",
    animation: "hover:scale-105 hover:-rotate-2",
    new: true,
  },
]

export default function Hero() {
  const [dragActive, setDragActive] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [animate3D, setAnimate3D] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate3D(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  return (
    <section className="bg-white px-4 pt-6 pb-8 md:px-8 lg:px-12 xl:px-16">
      {/* Mobile Layout (unchanged) */}
      <div className="max-w-md mx-auto md:hidden">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-printable-navy text-printable-green px-4 py-2 text-sm font-semibold mb-4 shadow-lg">
            India's #1 Print Platform
          </Badge>

          <h1 className="text-3xl font-bold text-printable-navy mb-2 leading-tight">
            <span className="bg-gradient-to-r from-printable-navy to-blue-600 bg-clip-text text-transparent">
              All Types of Printing • Anywhere • Anytime
            </span>
          </h1>

          <p className="text-gray-600 text-base mb-4">From documents to billboards - we print everything you need</p>
        </div>

        {/* Main Service Tabs - 2 on top */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {mainTabs.map((tab) => {
            const Icon = tab.icon
            const isHovered = hoveredTab === tab.id
            return (
              <Link key={tab.id} href={tab.href}>
                <Card
                  className="group hover:scale-[1.02] transition-all duration-300 border-0 shadow-lg hover:shadow-xl overflow-hidden"
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  <CardContent className="p-0 relative">
                    <div className={`${tab.bgColor} p-4 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div
                        className={`w-14 h-14 ${tab.color} rounded-2xl flex items-center justify-center mb-3 relative z-10 transition-all duration-300 ${tab.animation} shadow-lg`}
                      >
                        <Icon className={`w-7 h-7 ${tab.textColor} transition-all duration-300`} />
                      </div>

                      <h3 className="font-bold text-printable-navy text-sm mb-1 relative z-10">{tab.title}</h3>
                      <p className="text-xs text-gray-600 mb-2 relative z-10">{tab.subtitle}</p>

                      <div
                        className={`transition-all duration-300 relative z-10 ${isHovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"}`}
                      >
                        <p className="text-xs font-semibold text-printable-navy">{tab.description}</p>
                        <p className="text-xs text-gray-500">{tab.detail}</p>
                      </div>

                      <div
                        className={`absolute bottom-2 right-2 transition-all duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                      >
                        <MousePointer2 className="w-4 h-4 text-printable-navy/40" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Enhanced Quick Upload Section */}
        <Card
          className={`mb-4 border-2 border-dashed transition-all duration-300 ${
            dragActive
              ? "border-printable-green bg-gradient-to-br from-printable-green/10 to-blue-50 scale-[1.01] shadow-xl"
              : "border-printable-green/30 hover:border-printable-green/60 bg-gradient-to-br from-blue-50/50 to-green-50/30"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-printable-green/5 to-blue-500/5 opacity-50" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-printable-green to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 shadow-lg">
                <Upload className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                  <Zap className="w-2 h-2 text-white" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-printable-green/10 to-blue-500/10 rounded-xl p-3 mb-4 border border-printable-green/20">
                <h3 className="text-lg font-bold bg-gradient-to-r from-printable-navy to-blue-600 bg-clip-text text-transparent mb-1">
                  Quick Upload
                </h3>
                <p className="text-printable-navy font-semibold text-sm">Drag files here or choose from device</p>
              </div>

              <div className="space-y-3">
                <Link href="/print">
                  <Button className="w-full bg-gradient-to-r from-printable-green to-blue-500 hover:from-printable-green/90 hover:to-blue-500/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-printable-green/40 text-printable-navy hover:bg-printable-green/10 bg-white/80 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Camera
                  </Button>
                  <Link href="/scan-qr">
                    <Button
                      variant="outline"
                      className="w-full border-blue-400 text-printable-navy hover:bg-blue-50 bg-white/80 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Scan QR
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-600">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                  PDF, DOC, JPG
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-1" />
                  Max 100MB
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-1" />
                  Instant Print
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Tabs - Billboard + Pickup & Shop */}
        <div className="space-y-3 mb-4">
          {bottomTabs.slice(0, 1).map((tab) => {
            const Icon = tab.icon
            const isHovered = hoveredTab === tab.id
            return (
              <Link key={tab.id} href={tab.href}>
                <Card
                  className="group hover:scale-[1.01] transition-all duration-300 border-0 shadow-lg hover:shadow-xl overflow-hidden"
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  <CardContent className="p-0 relative">
                    <div className={`${tab.bgColor} p-4 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-14 h-14 ${tab.color} rounded-2xl flex items-center justify-center transition-all duration-300 ${tab.animation} shadow-lg`}
                        >
                          <Icon className={`w-7 h-7 ${tab.textColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-printable-navy text-sm mb-1">{tab.title}</h3>
                          <p className="text-xs text-gray-600 mb-1">{tab.subtitle}</p>
                          <div
                            className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-70 translate-x-1"}`}
                          >
                            <p className="text-xs font-semibold text-printable-navy">{tab.description}</p>
                            <p className="text-xs text-gray-500">{tab.detail}</p>
                          </div>
                        </div>
                        <ArrowRight
                          className={`w-5 h-5 text-printable-navy/40 transition-all duration-300 ${isHovered ? "translate-x-1 opacity-100" : "opacity-60"}`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}

          <div className="grid grid-cols-2 gap-3">
            {bottomTabs.slice(1).map((tab) => {
              const Icon = tab.icon
              const isHovered = hoveredTab === tab.id
              return (
                <Link key={tab.id} href={tab.href}>
                  <Card
                    className="group hover:scale-[1.02] transition-all duration-300 border-0 shadow-lg hover:shadow-xl overflow-hidden"
                    onMouseEnter={() => setHoveredTab(tab.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                  >
                    <CardContent className="p-0 relative">
                      <div className={`${tab.bgColor} p-4 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div
                          className={`w-12 h-12 ${tab.color} rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${tab.animation} shadow-lg`}
                        >
                          <Icon className={`w-6 h-6 ${tab.textColor}`} />
                        </div>

                        <h3 className="font-bold text-printable-navy text-xs mb-1">{tab.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">{tab.subtitle}</p>

                        <div
                          className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"}`}
                        >
                          <p className="text-xs font-semibold text-printable-navy">{tab.description}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">{tab.detail}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {quickActions.map((action) => {
          const Icon = action.icon
          const isHovered = hoveredTab === action.id
          return (
            <Link key={action.id} href={action.href}>
              <Card
                className="group hover:scale-[1.01] transition-all duration-300 border-0 shadow-lg hover:shadow-xl overflow-hidden"
                onMouseEnter={() => setHoveredTab(action.id)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <CardContent className="p-0 relative">
                  <div className="bg-indigo-50 p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center transition-all duration-300 ${action.animation} shadow-lg`}
                      >
                        <Icon className={`w-7 h-7 ${action.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-printable-navy text-sm mb-1">{action.title}</h3>
                        <p className="text-xs text-gray-600">{action.subtitle}</p>
                        <div
                          className={`transition-all duration-300 mt-1 ${isHovered ? "opacity-100 translate-x-0" : "opacity-70 translate-x-1"}`}
                        >
                          <p className="text-xs font-semibold text-printable-navy">Browse Marketplace</p>
                          <p className="text-xs text-gray-500">Templates, products & more</p>
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-5 h-5 text-printable-navy/40 transition-all duration-300 ${isHovered ? "translate-x-1 opacity-100" : "opacity-60"}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Desktop & Tablet Layout - Apple/Zomato Style */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center min-h-[80vh]">
          {/* Left Side - Hero Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Badge */}
            <div className="flex items-center space-x-3">
              <Badge className="bg-black text-white px-4 py-2 text-sm font-medium rounded-full">
                <Star className="w-4 h-4 mr-2" />
                India's #1 Print Platform
              </Badge>
              <Badge className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium rounded-full">50K+ Users</Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                All Types of Printing
                <br />
                <span className="text-printable-green">Anywhere</span> • <span className="text-blue-600">Anytime</span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                From documents to billboards - we print everything you need with{" "}
                <span className="font-semibold text-printable-green">lightning speed</span> and{" "}
                <span className="font-semibold text-gray-900">premium quality</span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 py-6">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-printable-green mb-1">15min</div>
                <div className="text-sm text-gray-600 font-medium">Delivery Time</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Partner Stores</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-orange-500 mb-1">4.9★</div>
                <div className="text-sm text-gray-600 font-medium">User Rating</div>
              </div>
            </div>

            {/* 3D Animation Section */}
            <div className="relative">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 relative overflow-hidden">
                {/* 3D Animated Elements */}
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-printable-green rounded-2xl flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">See How It Works</h3>
                      <p className="text-sm text-gray-600">Upload, Print, Deliver in 15 minutes</p>
                    </div>
                  </div>

                  {/* 3D Floating Elements */}
                  <div className="relative h-32">
                    <div
                      className={`absolute top-0 left-4 w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-1000 ${
                        animate3D ? "transform rotate-12 translate-y-2" : ""
                      }`}
                      style={{
                        transform: animate3D ? "perspective(1000px) rotateX(15deg) rotateY(25deg)" : "none",
                      }}
                    >
                      <Upload className="w-8 h-8 text-white" />
                    </div>

                    <div
                      className={`absolute top-4 left-24 w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg transition-all duration-1000 delay-300 ${
                        animate3D ? "transform -rotate-6 -translate-y-1" : ""
                      }`}
                      style={{
                        transform: animate3D ? "perspective(1000px) rotateX(-10deg) rotateY(-15deg)" : "none",
                      }}
                    >
                      <FileText className="w-6 h-6 text-white" />
                    </div>

                    <div
                      className={`absolute top-8 left-40 w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-1000 delay-500 ${
                        animate3D ? "transform rotate-6 translate-y-1" : ""
                      }`}
                      style={{
                        transform: animate3D ? "perspective(1000px) rotateX(20deg) rotateY(10deg)" : "none",
                      }}
                    >
                      <Package className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                {/* Background 3D Effect */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-20 h-20 bg-printable-green rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500 rounded-full blur-xl animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Service Tabs */}
          <div className="space-y-6">
            {/* Quick Upload */}
            <Card
              className={`border-2 border-dashed transition-all duration-300 ${
                dragActive
                  ? "border-printable-green bg-printable-green/5 scale-[1.02]"
                  : "border-gray-200 hover:border-printable-green/60 bg-gray-50/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-printable-green rounded-2xl flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Upload</h3>
                    <p className="text-sm text-gray-600">Drag files here or choose from device</p>
                  </div>

                  <div className="space-y-3">
                    <Link href="/print">
                      <Button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-all duration-300">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium bg-transparent"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Camera
                      </Button>
                      <Link href="/scan-qr">
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium bg-transparent"
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          Scan QR
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Main Tabs */}
              {mainTabs.map((tab) => {
                const Icon = tab.icon
                const isHovered = hoveredTab === tab.id
                return (
                  <Link key={tab.id} href={tab.href}>
                    <Card
                      className="group hover:scale-[1.02] transition-all duration-300 border-0 bg-white shadow-sm hover:shadow-md"
                      onMouseEnter={() => setHoveredTab(tab.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Badge */}
                          {tab.popular && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1">
                              Popular
                            </Badge>
                          )}
                          {tab.trending && (
                            <Badge className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1">
                              Trending
                            </Badge>
                          )}

                          <div
                            className={`w-12 h-12 ${tab.color} rounded-xl flex items-center justify-center transition-all duration-300 ${tab.animation}`}
                          >
                            <Icon className={`w-6 h-6 ${tab.textColor}`} />
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">{tab.title}</h3>
                            <p className="text-xs text-gray-600 mb-2">{tab.subtitle}</p>
                            <p className="text-xs text-gray-500">{tab.detail}</p>
                          </div>

                          <div
                            className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-x-1" : "opacity-0"}`}
                          >
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}

              {/* Bottom Tabs */}
              {bottomTabs.map((tab) => {
                const Icon = tab.icon
                const isHovered = hoveredTab === tab.id
                return (
                  <Link key={tab.id} href={tab.href}>
                    <Card
                      className="group hover:scale-[1.02] transition-all duration-300 border-0 bg-white shadow-sm hover:shadow-md"
                      onMouseEnter={() => setHoveredTab(tab.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Badges */}
                          {tab.featured && (
                            <Badge className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1">
                              Featured
                            </Badge>
                          )}
                          {tab.free && (
                            <Badge className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1">FREE</Badge>
                          )}
                          {tab.verified && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1">Verified</Badge>
                          )}

                          <div
                            className={`w-12 h-12 ${tab.color} rounded-xl flex items-center justify-center transition-all duration-300 ${tab.animation}`}
                          >
                            <Icon className={`w-6 h-6 ${tab.textColor}`} />
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">{tab.title}</h3>
                            <p className="text-xs text-gray-600 mb-2">{tab.subtitle}</p>
                            <p className="text-xs text-gray-500">{tab.detail}</p>
                          </div>

                          <div
                            className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-x-1" : "opacity-0"}`}
                          >
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}

              {/* Quick Actions */}
              {quickActions.map((action) => {
                const Icon = action.icon
                const isHovered = hoveredTab === action.id
                return (
                  <Link key={action.id} href={action.href} className="col-span-2">
                    <Card
                      className="group hover:scale-[1.01] transition-all duration-300 border-0 bg-white shadow-sm hover:shadow-md"
                      onMouseEnter={() => setHoveredTab(action.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          {action.new && (
                            <Badge className="bg-pink-100 text-pink-700 text-xs font-medium px-2 py-1 absolute top-3 right-3">
                              NEW
                            </Badge>
                          )}

                          <div
                            className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center transition-all duration-300 ${action.animation}`}
                          >
                            <Icon className={`w-6 h-6 ${action.textColor}`} />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">{action.title}</h3>
                            <p className="text-xs text-gray-600 mb-1">{action.subtitle}</p>
                            <p className="text-xs text-gray-500">Templates, products & more</p>
                          </div>

                          <div
                            className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-x-1" : "opacity-0"}`}
                          >
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
