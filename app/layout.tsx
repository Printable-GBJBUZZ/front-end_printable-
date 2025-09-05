
"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Package, Wrench, ArrowRight, MapPin, Clock, Truck, Gift, Coins, FileText, Users, Zap, Mic, Award, CreditCard, Printer, ScanLine, Palette, Megaphone, Search, Camera, ShoppingBag, TrendingUp, Shield, Sparkles, Heart, Play, Upload, FolderLock, Store } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/Navigation"
import FloatingBottomNav from "@/components/navigation/FloatingBottomNav"
import "./globals.css";
// Import category components
import AllFeaturesSection from "@/components/home/AllFeaturesSection"
import PrintDeliverySection from "@/components/home/PrintDeliverySection"
import PostersFlyersSection from "@/components/home/PostersFlyersSection"
import BillboardsSection from "@/components/home/BillboardsSection"
import DesignersSection from "@/components/home/DesignersSection"
import ToolsSection from "@/components/home/ToolsSection"

const PrintIcon3D = () => (
  <div className="relative">
    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg transform rotate-3 absolute"></div>
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl flex items-center justify-center relative z-10">
      <Printer className="w-6 h-6 text-white" />
    </div>
  </div>
)

const ScanIcon3D = () => (
  <div className="relative">
    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg transform rotate-3 absolute"></div>
    <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-xl flex items-center justify-center relative z-10">
      <ScanLine className="w-6 h-6 text-white" />
    </div>
  </div>
)

const DesignIcon3D = () => (
  <div className="relative">
    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg transform rotate-3 absolute"></div>
    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-xl flex items-center justify-center relative z-10">
      <Palette className="w-6 h-6 text-white" />
    </div>
  </div>
)

const BillboardIcon3D = () => (
  <div className="relative">
    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg transform rotate-3 absolute"></div>
    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl shadow-xl flex items-center justify-center relative z-10">
      <Megaphone className="w-6 h-6 text-white" />
    </div>
  </div>
)

const ToolsIcon3D = () => (
  <div className="relative">
    <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 rounded-2xl shadow-lg transform rotate-3 absolute"></div>
    <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-xl flex items-center justify-center relative z-10">
      <Wrench className="w-6 h-6 text-white" />
    </div>
  </div>
)

const VaultIcon3D = () => (
  <div className="relative">
    <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl shadow-lg transform rotate-3 absolute"></div>
    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl shadow-xl flex items-center justify-center relative z-10">
      <Shield className="w-6 h-6 text-white" />
    </div>
  </div>
)


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [aiQuery, setAiQuery] = useState("")
  const [currentSuggestion, setCurrentSuggestion] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto-rotate AI suggestions
  const aiSuggestions = [
    "Design a business card for my startup",
    "Scan my handwritten notes to PDF",
    "Create a poster for college fest",
    "Book a billboard in Mumbai",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % aiSuggestions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Category tabs with 3D icons
  const categoryTabs = [
    { id: "all", label: "All Features", icon: <Star className="w-5 h-5" />, href: "/" },
    { id: "print-delivery", label: "Print & Delivery", icon: <PrintIcon3D />, href: "/print-delivery" },
    { id: "posters", label: "Posters/Flyers", icon: <FileText className="w-5 h-5" />, href: "/posters" },
    { id: "billboards", label: "Billboards", icon: <BillboardIcon3D />, href: "/billboard" },
    { id: "designers", label: "Hire Designers", icon: <DesignIcon3D />, href: "/designers" },
    { id: "tools", label: "PDF Tools", icon: <ToolsIcon3D />, href: "/tools" },
  ]

  // Quick Action Grid with 3D icons - Updated with new pages
  const quickActions = [
    {
      title: "Instant Print",
      icon: <PrintIcon3D />,
      href: "/print",
      color: "from-blue-500 to-cyan-500",
      description: "Upload & print instantly",
      price: "₹2/page",
      popular: true,
    },
    {
      title: "My Vault",
      icon: <VaultIcon3D />,
      href: "/my-vault",
      color: "from-purple-500 to-pink-500",
      description: "Secure document storage",
      price: "Free",
    },
    {
      title: "Marketplace",
      icon: (
        <div className="relative">
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg transform rotate-3 absolute"></div>
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl shadow-xl flex items-center justify-center relative z-10">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
        </div>
      ),
      href: "/marketplace",
      color: "from-orange-500 to-red-500",
      description: "Templates & designs",
      price: "From ₹49",
    },
    {
      title: "Shop",
      icon: (
        <div className="relative">
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg transform rotate-3 absolute"></div>
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-xl flex items-center justify-center relative z-10">
            <Store className="w-6 h-6 text-white" />
          </div>
        </div>
      ),
      href: "/shop",
      color: "from-green-500 to-emerald-500",
      description: "Office & student supplies",
      price: "Best Prices",
    },
    {
      title: "Book Billboard",
      icon: <BillboardIcon3D />,
      href: "/billboard",
      color: "from-pink-500 to-rose-500",
      description: "Outdoor advertising",
      price: "₹1499/mo",
    },
    {
      title: "Scan & Print",
      icon: <ScanIcon3D />,
      href: "/document-scan",
      color: "from-indigo-500 to-purple-500",
      description: "Camera to print",
      price: "₹2/page",
    },
  ]

  // Recent documents with better visuals
  const recentDocs = [
    {
      name: "Resume_Final.pdf",
      type: "PDF",
      size: "2.4 MB",
      lastPrinted: "2 days ago",
      icon: <FileText className="w-8 h-8 text-red-500" />,
      color: "bg-red-50",
    },
    {
      name: "Wedding_Invite.docx",
      type: "DOCX",
      size: "1.8 MB",
      lastPrinted: "1 week ago",
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      color: "bg-pink-50",
    },
    {
      name: "Poster_Design.png",
      type: "IMG",
      size: "5.2 MB",
      lastPrinted: "3 days ago",
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      color: "bg-purple-50",
    },
  ]

  // Popular print packs with better design - Updated with INR
  const printPacks = [
    {
      title: "Business Cards",
      price: "From ₹149",
      image: "💳",
      popular: true,
      href: "/marketplace?category=business-cards",
      gradient: "from-blue-500 to-blue-600",
      savings: "Save 30%",
    },
    {
      title: "Color Flyers",
      price: "From ₹299",
      image: "📄",
      popular: false,
      href: "/posters",
      gradient: "from-green-500 to-green-600",
      savings: "Best Quality",
    },
    {
      title: "Thesis Binding",
      price: "From ₹599",
      image: "📚",
      popular: false,
      href: "/print?service=binding",
      gradient: "from-purple-500 to-purple-600",
      savings: "Premium",
    },
    {
      title: "Wedding Cards",
      price: "From ₹199",
      image: "💌",
      popular: true,
      href: "/marketplace?category=wedding",
      gradient: "from-pink-500 to-pink-600",
      savings: "Trending",
    },
  ]

  // Nearby print shops with enhanced design
  const nearbyShops = [
    {
      id: 1,
      name: "Quick Print Hub",
      rating: 4.8,
      distance: "0.5 km",
      deliveryTime: "15 mins",
      logo: "🏪",
      fastestDelivery: true,
      href: "/shop/quick-print-hub",
      speciality: "Same Day Delivery",
      verified: true,
    },
    {
      id: 2,
      name: "Digital Print Zone",
      rating: 4.7,
      distance: "1.2 km",
      deliveryTime: "25 mins",
      logo: "🖨️",
      lowestPrice: true,
      href: "/shop/digital-print-zone",
      speciality: "Best Prices",
      verified: true,
    },
  ]

  // Enhanced offers - Updated with INR
  const offers = [
    {
      title: "10 Free Prints for New Users",
      badge: "🎉",
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      code: "WELCOME10",
    },
    {
      title: "Refer & Earn ₹25 each",
      badge: "💸",
      color: "bg-gradient-to-r from-blue-500 to-cyan-600",
      code: "REFER25",
    },
    {
      title: "Billboard at ₹1499/mo",
      badge: "🎯",
      color: "bg-gradient-to-r from-purple-500 to-pink-600",
      code: "BILLBOARD50",
    },
    {
      title: "100+ Pages = Free Pickup",
      badge: "🧾",
      color: "bg-gradient-to-r from-orange-500 to-red-600",
      code: "BULK100",
    },
  ]

  // Tools with better categorization
  const toolsCarousel = [
    {
      name: "Merge PDFs",
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      premium: false,
      href: "/tools/merge-pdf",
      users: "50K+",
    },
    {
      name: "Compress",
      icon: <Package className="w-8 h-8 text-green-500" />,
      premium: false,
      href: "/tools/compress",
      users: "30K+",
    },
    {
      name: "Digital Signature",
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      premium: true,
      href: "/tools/signature",
      users: "25K+",
    },
    {
      name: "Resume Builder",
      icon: <Users className="w-8 h-8 text-orange-500" />,
      premium: true,
      href: "/tools/resume-builder",
      users: "40K+",
    },
    {
      name: "AI PPT Generator",
      icon: <TrendingUp className="w-8 h-8 text-red-500" />,
      premium: true,
      href: "/tools/ppt-generator",
      users: "15K+",
    },
  ]

  // Top designers with enhanced profiles - Updated with INR
  const topDesigners = [
    {
      name: "Priya Sharma",
      rating: 4.9,
      tags: ["Flyer", "Resume"],
      avatar: "PS",
      price: "₹299",
      href: "/designers/priya-sharma",
      orders: "500+",
      responseTime: "2 hours",
    },
    {
      name: "Rahul Kumar",
      rating: 4.8,
      tags: ["Business Cards"],
      avatar: "RK",
      price: "₹199",
      href: "/designers/rahul-kumar",
      orders: "300+",
      responseTime: "1 hour",
    },
    {
      name: "Anita Singh",
      rating: 4.9,
      tags: ["Wedding Cards"],
      avatar: "AS",
      price: "₹399",
      href: "/designers/anita-singh",
      orders: "200+",
      responseTime: "4 hours",
    },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "all":
        return <AllFeaturesSection />
      case "print-delivery":
        return <PrintDeliverySection />
      case "posters":
        return <PostersFlyersSection />
      case "billboards":
        return <BillboardsSection />
      case "designers":
        return <DesignersSection />
      case "tools":
        return <ToolsSection />
      default:
        return <AllFeaturesSection />
    }
  }
  return (
    <html lang="en">
      <body>
     <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="pb-20 md:pb-24">
        <section className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#61E987] via-[#4ADE80] to-[#22C55E] shadow-2xl">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center min-h-[280px] p-6 lg:p-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-white/20 text-[#1F1D5D] border-0 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    📍 Mumbai • Available 24/7
                  </Badge>
                  <Badge className="bg-white/20 text-[#1F1D5D] border-0 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    ⚡ Same Day Delivery
                  </Badge>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-[#1F1D5D]">
                  Print. Anytime.
                  <br />
                  Anywhere. <span className="text-white">Delivered.</span>
                </h1>
                <p className="text-[#1F1D5D]/80 mb-6 text-lg max-w-md">
                  From documents and designs to billboards and business cards – all at your fingertips.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/print">
                    <Button
                      size="lg"
                      className="bg-[#1F1D5D] text-white hover:bg-[#1F1D5D]/90 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl text-base px-8 py-3"
                    >
                      <Printer className="w-5 h-5 mr-2" />
                      Print Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/document-scan">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white/30 text-[#1F1D5D] hover:bg-white/10 font-semibold rounded-2xl text-base px-8 py-3 backdrop-blur-sm bg-transparent"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Scan & Print
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl animate-bounce">🖨️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-3 sm:px-4 lg:px-6 mb-6">
          <div className="flex overflow-x-auto space-x-3 bg-white rounded-2xl p-3 shadow-sm scrollbar-hide">
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 min-w-[100px] ${
                    isActive
                      ? "bg-[#61E987] text-[#1F1D5D] shadow-lg scale-105 transform"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#1F1D5D]"
                  }`}
                >
                  <div className="w-8 h-8 flex items-center justify-center">{tab.icon}</div>
                  <span className="text-xs font-semibold text-center leading-tight">{tab.label}</span>
                  {isActive && <div className="w-6 h-1 bg-[#1F1D5D] rounded-full" />}
                </button>
              )
            })}
          </div>
        </section>

        {renderTabContent()}

        {activeTab === "all" && (
          <>
            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-[#61E987]" />
                  Quick Actions
                </h2>
                <Badge className="bg-[#61E987]/10 text-[#61E987] text-sm px-3 py-1">Popular</Badge>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl group hover:scale-105 hover:-translate-y-1 relative overflow-hidden">
                      {action.popular && (
                        <div className="absolute top-2 right-2 z-10">
                          <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Popular</Badge>
                        </div>
                      )}
                      <CardContent className="p-4 text-center">
                        <div className="w-16 h-16 mx-auto mb-3 relative">{action.icon}</div>
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{action.title}</h3>
                        <p className="text-xs text-gray-500 mb-2">{action.description}</p>
                        <div className="text-xs font-bold text-[#61E987] bg-[#61E987]/10 px-2 py-1 rounded-full">
                          {action.price}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">AI Assistant</h2>
                      <p className="text-sm text-gray-600">Powered by advanced AI</p>
                    </div>
                    <Badge className="ml-auto bg-purple-500 text-white text-xs px-2 py-1">BETA</Badge>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="What do you want to print today?"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      className="pl-12 pr-16 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#61E987] text-base bg-white shadow-sm"
                    />
                    <Button
                      size="sm"
                      className="absolute right-2 top-2 bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl px-4"
                    >
                      <Mic className="w-4 h-4 mr-1" />
                      Ask
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-600">
                    <Play className="w-4 h-4 mr-2 text-[#61E987]" />
                    Try:{" "}
                    <span className="text-[#61E987] font-medium ml-1 animate-pulse">
                      {aiSuggestions[currentSuggestion]}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-[#61E987]" />
                  Recent Documents
                </h2>
                <Link href="/my-vault">
                  <Button variant="ghost" className="text-[#61E987] hover:bg-[#61E987]/10 rounded-xl">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                {recentDocs.map((doc, index) => (
                  <Link key={index} href="/my-vault">
                    <Card className="border-0 shadow-lg bg-white rounded-2xl min-w-[200px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-5">
                        <div
                          className={`w-16 h-16 ${doc.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}
                        >
                          {doc.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mb-2 truncate">{doc.name}</h3>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span>{doc.type}</span>
                          <span>{doc.size}</span>
                        </div>
                        <p className="text-xs text-gray-400">Last printed: {doc.lastPrinted}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Package className="w-6 h-6 mr-3 text-[#61E987]" />
                  Popular Print Packs
                </h2>
                <Badge className="bg-orange-100 text-orange-600 text-sm px-3 py-1">Trending</Badge>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {printPacks.map((pack, index) => (
                  <Link key={index} href={pack.href}>
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl group hover:scale-105 overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${pack.gradient}`}></div>
                      <CardContent className="p-5 text-center">
                        <div className="text-4xl mb-3">{pack.image}</div>
                        <h3 className="font-bold text-gray-900 text-sm mb-2">{pack.title}</h3>
                        <p className="text-[#61E987] font-bold text-lg mb-2">{pack.price}</p>
                        <Badge
                          className={`text-xs mb-3 ${pack.popular ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
                        >
                          {pack.savings}
                        </Badge>
                        <Button
                          size="sm"
                          className="w-full bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold"
                        >
                          Order Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-[#61E987]" />
                  Nearby Print Shops
                </h2>
                <Button variant="ghost" className="text-[#61E987] hover:bg-[#61E987]/10 rounded-xl">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-4">
                {nearbyShops.map((shop) => (
                  <Link key={shop.id} href={shop.href}>
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl hover:-translate-y-1">
                      <CardContent className="p-5">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{shop.logo}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-bold text-gray-900 text-lg truncate">{shop.name}</h3>
                              {shop.verified && <Badge className="bg-green-100 text-green-600 text-xs">Verified</Badge>}
                              {shop.fastestDelivery && (
                                <Badge className="bg-blue-100 text-blue-600 text-xs">Fastest</Badge>
                              )}
                              {shop.lowestPrice && (
                                <Badge className="bg-orange-100 text-orange-600 text-xs">Best Price</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{shop.speciality}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-medium">{shop.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{shop.distance}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{shop.deliveryTime}</span>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold px-6">
                            Order
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Gift className="w-6 h-6 mr-3 text-[#61E987]" />
                  Offers & Coupons
                </h2>
                <Badge className="bg-red-100 text-red-600 text-sm px-3 py-1">Limited Time</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {offers.map((offer, index) => (
                  <Card
                    key={index}
                    className={`border-0 shadow-lg ${offer.color} text-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105`}
                  >
                    <CardContent className="p-5 text-center relative">
                      <div className="absolute top-2 right-2 text-2xl opacity-20">{offer.badge}</div>
                      <div className="text-3xl mb-3">{offer.badge}</div>
                      <h3 className="font-bold text-sm mb-3 leading-tight">{offer.title}</h3>
                      <div className="bg-white/20 rounded-lg p-2 mb-3">
                        <p className="text-xs font-mono">{offer.code}</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold w-full"
                      >
                        Claim Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Wrench className="w-6 h-6 mr-3 text-[#61E987]" />
                  Premium Tools
                </h2>
                <Link href="/tools">
                  <Button variant="ghost" className="text-[#61E987] hover:bg-[#61E987]/10 rounded-xl">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                {toolsCarousel.map((tool, index) => (
                  <Link key={index} href={tool.href}>
                    <Card className="border-0 shadow-lg bg-white rounded-2xl min-w-[160px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-5 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          {tool.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mb-2">{tool.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">{tool.users} users</p>
                        {tool.premium ? (
                          <Badge className="bg-yellow-500 text-white text-xs mb-3">Premium</Badge>
                        ) : (
                          <Badge className="bg-green-500 text-white text-xs mb-3">Free</Badge>
                        )}
                        <Button
                          size="sm"
                          className="w-full bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold"
                        >
                          Use Tool
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-[#61E987]" />
                  Top Designers
                </h2>
                <Link href="/designers">
                  <Button variant="ghost" className="text-[#61E987] hover:bg-[#61E987]/10 rounded-xl">
                    Explore All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topDesigners.map((designer, index) => (
                  <Link key={index} href={designer.href}>
                    <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-5 text-center">
                        <Avatar className="w-16 h-16 mx-auto mb-4 border-4 border-[#61E987] shadow-lg">
                          <AvatarFallback className="bg-gradient-to-br from-[#61E987] to-[#4ADE80] text-[#1F1D5D] font-bold text-lg">
                            {designer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{designer.name}</h3>
                        <div className="flex items-center justify-center space-x-1 mb-3">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-sm">{designer.rating}</span>
                          <span className="text-xs text-gray-500">({designer.orders} orders)</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                          {designer.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>Response: {designer.responseTime}</span>
                          <span className="font-bold text-[#61E987]">{designer.price}</span>
                        </div>
                        <Button className="w-full bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold">
                          Hire Designer
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <Link href="/orders">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <Truck className="w-6 h-6 mr-3 text-[#61E987]" />
                        Track My Order
                      </h2>
                      <Badge className="bg-green-500 text-white text-sm px-3 py-1 animate-pulse">Live</Badge>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Order #PR12345</span>
                        <span className="text-sm font-medium text-[#61E987] bg-[#61E987]/10 px-3 py-1 rounded-full">
                          Printing
                        </span>
                      </div>
                      <Progress value={60} className="h-3 bg-gray-200" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">ETA: 25 mins</span>
                        <Button variant="ghost" size="sm" className="text-[#61E987] p-0 h-auto font-semibold">
                          View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </section>

            <section className="px-3 sm:px-4 lg:px-6 mb-8">
              <Link href="/wallet">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <CreditCard className="w-6 h-6 mr-3 text-[#61E987]" />
                        Printable Wallet
                      </h2>
                      <div className="flex items-center space-x-2">
                        <Coins className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-bold text-gray-900">1,250 Coins</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 mb-1">₹485</p>
                        <p className="text-sm text-gray-600">Wallet Balance</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <Award className="w-5 h-5 text-yellow-500" />
                          <span className="text-sm font-bold text-gray-900">Silver</span>
                        </div>
                        <Progress value={65} className="h-2 mb-1" />
                        <p className="text-xs text-gray-600">35% to Gold</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold">
                        Add Money
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-[#61E987] text-[#61E987] hover:bg-[#61E987] hover:text-[#1F1D5D] rounded-xl font-semibold bg-transparent"
                      >
                        Invite Friends
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </section>
          </>
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <FloatingBottomNav />
    </div>
    </body></html>
  );
}

