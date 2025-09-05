"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  MapPin,
  Wallet,
  Bell,
  User,
  Globe,
  ChevronDown,
  X,
  Mic,
  FileText,
  Scissors,
  RotateCcw,
  Merge,
  ScanLine,
  Download,
  ImageIcon,
  Lock,
  Unlock,
  Settings,
  LogOut,
  MapIcon,
  Heart,
  HelpCircle,
  Zap,
  Loader2,
  Home,
  Briefcase,
  FileSignature,
  Presentation,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface NavigationProps {
  showSearch?: boolean
  showLocation?: boolean
  currentSection?: string
  className?: string
}

export default function Navigation({
  showSearch = true,
  showLocation = true,
  currentSection,
  className = "",
}: NavigationProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("Mumbai, 400050")
  const [isLocationLoading, setIsLocationLoading] = useState(false)
  const [language, setLanguage] = useState("EN")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [walletBalance, setWalletBalance] = useState(1250)
  const [coins, setCoins] = useState(260)
  const [notifications, setNotifications] = useState(3)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Load persisted data
  useEffect(() => {
    const savedLocation = localStorage.getItem("printable_location")
    const savedLanguage = localStorage.getItem("printable_language")
    if (savedLocation) setLocation(savedLocation)
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

  // Handle click outside for suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "HI", name: "हिंदी", flag: "🇮🇳" },
    { code: "MR", name: "मराठी", flag: "🇮🇳" },
    { code: "TA", name: "தமிழ்", flag: "🇮🇳" },
  ]

  const searchSuggestions = [
    { category: "Popular", items: ["Business Cards", "Resume Printing", "Wedding Invitations", "Posters"] },
    { category: "Services", items: ["Print & Delivery", "Pickup Service", "Billboard Ads", "Designer Hub"] },
    {
      category: "Tools",
      items: [
        "AI Presentation Maker",
        "e-Sign Document",
        "PDF Merge",
        "OCR Scanner",
        "Image Converter",
        "Document Compress",
      ],
    },
  ]

  const tools = [
    { name: "AI Presentation Maker", icon: Presentation, href: "/tools/ai-presentation-maker" },
    { name: "e-Sign Document", icon: FileSignature, href: "/tools/e-sign" },
    { name: "PDF to Word", icon: FileText, href: "/tools/pdf-to-word" },
    { name: "Merge PDFs", icon: Merge, href: "/tools/merge-pdf" },
    { name: "Compress PDF", icon: Download, href: "/tools/compress-pdf" },
    { name: "Split PDF", icon: Scissors, href: "/tools/split-pdf" },
    { name: "Rotate PDF", icon: RotateCcw, href: "/tools/rotate-pdf" },
    { name: "OCR Scanner", icon: ScanLine, href: "/tools/ocr" },
    { name: "PDF to Images", icon: ImageIcon, href: "/tools/pdf-to-images" },
    { name: "Protect PDF", icon: Lock, href: "/tools/protect-pdf" },
    { name: "Unlock PDF", icon: Unlock, href: "/tools/unlock-pdf" },
  ]

  const handleLocationDetect = async () => {
    setIsLocationLoading(true)
    try {
      // Simulate GPS detection
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const newLocation = "Detected Location, 400001"
      setLocation(newLocation)
      localStorage.setItem("printable_location", newLocation)
    } catch (error) {
      console.error("Location detection failed:", error)
    } finally {
      setIsLocationLoading(false)
    }
  }

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    localStorage.setItem("printable_language", langCode)
  }

  const handleSearchFocus = () => {
    setShowSuggestions(true)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setShowSuggestions(value.length > 0)
  }

  if (isMobile) {
    return (
      <>
        {/* Mobile Top Bar */}
        <header className={`sticky top-0 z-40 bg-white shadow-sm ${className}`}>
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/images/logo-green.png" alt="Printable Logo" className="w-9 h-9 rounded-xl" />
              </Link>
              {showLocation && (
                <div className="text-left">
                  <div className="flex items-center font-bold text-sm text-[#1F1D5D]">
                    {location.split(",")[0]} <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                  <p className="text-xs text-gray-500 -mt-1">{location.split(",")[1]}</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
                    <Globe className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} onSelect={() => handleLanguageChange(lang.code)}>
                      <span className="mr-2">{lang.flag}</span> {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="relative w-9 h-9 rounded-full">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                    {notifications}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-xs bg-gray-200">JD</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
          {showSearch && (
            <div className="px-4 pb-3">
              <Button
                variant="outline"
                className="w-full justify-start text-gray-500 rounded-xl bg-transparent"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4 mr-2" />
                Search for services...
              </Button>
            </div>
          )}
        </header>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
          <div className="grid grid-cols-5 h-16">
            <Link
              href="/"
              className={`flex flex-col items-center justify-center text-xs gap-1 ${
                pathname === "/" ? "text-[#61E987]" : "text-gray-600"
              }`}
            >
              <Home className="w-6 h-6" />
              <span>Home</span>
            </Link>
            <Link
              href="/orders"
              className={`flex flex-col items-center justify-center text-xs gap-1 ${
                pathname === "/orders" ? "text-[#61E987]" : "text-gray-600"
              }`}
            >
              <FileText className="w-6 h-6" />
              <span>Orders</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex flex-col items-center justify-center text-xs gap-1 text-gray-600">
                  <Briefcase className="w-6 h-6" />
                  <span>Tools</span>
                </div>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl h-[80vh]">
                <SheetHeader>
                  <SheetTitle>All Tools</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-3 gap-4 py-6">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="flex flex-col items-center justify-center text-center gap-2"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <tool.icon className="w-8 h-8 text-[#61E987]" />
                      </div>
                      <span className="text-xs font-medium">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <Link
              href="/wallet"
              className={`flex flex-col items-center justify-center text-xs gap-1 ${
                pathname === "/wallet" ? "text-[#61E987]" : "text-gray-600"
              }`}
            >
              <Wallet className="w-6 h-6" />
              <span>Wallet</span>
            </Link>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <div className="flex flex-col items-center justify-center text-xs gap-1 text-gray-600">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-gray-200">JD</AvatarFallback>
                  </Avatar>
                  <span>Profile</span>
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">My Account</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#61E987]/10 to-[#4ADE80]/10 rounded-2xl">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-[#61E987] to-[#4ADE80] text-[#1F1D5D] font-bold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#1F1D5D]">John Doe</p>
                      <p className="text-sm text-gray-600">john.doe@email.com</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: User, label: "My Profile", href: "/profile" },
                      { icon: Heart, label: "Favorites", href: "/favorites" },
                      { icon: MapIcon, label: "Addresses", href: "/addresses" },
                      { icon: Settings, label: "Settings", href: "/settings" },
                      { icon: HelpCircle, label: "Help & Support", href: "/support" },
                    ].map((item) => (
                      <Link key={item.label} href={item.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left hover:bg-[#61E987]/10"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 mr-3 text-gray-600" />
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                  </div>

                  <Button variant="ghost" className="w-full justify-start text-left text-red-600 hover:bg-red-50">
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search posters, services, designers..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-12 pr-12 py-3 text-lg rounded-2xl border-2 border-gray-200 focus:border-[#61E987]"
                  autoFocus
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-2 bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] p-2 rounded-xl"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="ghost" onClick={() => setIsSearchOpen(false)} className="ml-2">
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-4 space-y-6">
              {searchSuggestions.map((category) => (
                <div key={category.category}>
                  <h3 className="font-semibold text-[#1F1D5D] mb-3">{category.category}</h3>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className="w-full justify-start text-left hover:bg-[#61E987]/10"
                        onClick={() => {
                          setSearchQuery(item)
                          setIsSearchOpen(false)
                        }}
                      >
                        <Search className="w-4 h-4 mr-3 text-gray-400" />
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    )
  }

  // Desktop Navigation
  return (
    <nav className={`sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200 group ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <img
                src="/images/logo-green.png"
                alt="Printable Logo"
                className="w-12 h-12 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
              />
              <span className="font-bold text-[#1F1D5D] text-2xl group-hover:text-[#61E987] transition-colors">
                Printable
              </span>
            </Link>

            {showLocation && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-4 py-2 rounded-2xl hover:bg-[#61E987]/10 transition-all duration-300"
                  >
                    {isLocationLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-[#61E987]" />
                    ) : (
                      <MapPin className="w-5 h-5 text-[#61E987]" />
                    )}
                    <div className="text-left">
                      <p className="text-sm font-medium text-[#1F1D5D]">{location.split(",")[0]}</p>
                      <p className="text-xs text-gray-500">{location.split(",")[1]}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleLocationDetect}>
                    <Zap className="w-4 h-4 mr-2" /> Detect Location
                  </DropdownMenuItem>
                  {/* Add more locations here */}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="flex-1 max-w-lg mx-8">
            {showSearch && (
              <div ref={searchRef} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search posters, services, designers..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={handleSearchFocus}
                  className="pl-12 pr-4 py-3 text-base rounded-full border-2 border-gray-200 focus:border-[#61E987] bg-gray-50 focus:bg-white transition-all duration-300"
                />
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 space-y-4">
                      {searchSuggestions.map((category) => (
                        <div key={category.category}>
                          <h3 className="font-semibold text-[#1F1D5D] mb-2 text-sm uppercase tracking-wide">
                            {category.category}
                          </h3>
                          <div className="space-y-1">
                            {category.items.map((item) => (
                              <Button
                                key={item}
                                variant="ghost"
                                className="w-full justify-start text-left hover:bg-[#61E987]/10 rounded-xl"
                                onClick={() => {
                                  setSearchQuery(item)
                                  setShowSuggestions(false)
                                }}
                              >
                                <Search className="w-4 h-4 mr-3 text-gray-400" />
                                {item}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
                >
                  <Briefcase className="w-5 h-5 text-gray-700 group-hover:text-[#61E987]" />
                  <span className="font-medium text-gray-800">Tools</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-screen max-w-xs p-4" align="end">
                <div className="grid grid-cols-2 gap-4">
                  {tools.slice(0, 4).map((tool) => (
                    <Link key={tool.name} href={tool.href}>
                      <DropdownMenuItem className="flex flex-col items-center justify-center p-4 rounded-xl gap-2">
                        <tool.icon className="w-8 h-8 text-[#61E987]" />
                        <span className="text-xs text-center">{tool.name}</span>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <Link href="/tools">
                  <DropdownMenuItem>View All Tools</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="relative p-3 rounded-full hover:bg-gray-100">
              <Bell className="w-6 h-6 text-gray-700" />
              {notifications > 0 && (
                <Badge className="absolute top-1 right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                  {notifications}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-3 px-3 py-2 rounded-full hover:bg-gray-100"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-200">JD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-600">john.doe@email.com</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-3" /> My Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/orders">
                  <DropdownMenuItem>
                    <FileText className="w-4 h-4 mr-3" /> My Orders
                  </DropdownMenuItem>
                </Link>
                <Link href="/favorites">
                  <DropdownMenuItem>
                    <Heart className="w-4 h-4 mr-3" /> Favorites
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <HelpCircle className="w-4 h-4 mr-3" /> Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-3" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
