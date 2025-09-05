import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, Clock, Star, Printer, Truck, MapPin } from "lucide-react"

export default function PrintDeliverySection() {
  const printServices = [
    {
      title: "Instant Print",
      description: "Upload and print in minutes",
      price: "₹2/page B&W • ₹8/page Color",
      icon: <Printer className="w-8 h-8 text-blue-500" />,
      href: "/print-delivery",
      popular: true,
      color: "bg-blue-50",
    },
    {
      title: "Document Scanner",
      description: "Scan documents like CamScanner",
      price: "Free",
      icon: <Camera className="w-8 h-8 text-green-500" />,
      href: "/scan-document",
      popular: false,
      color: "bg-green-50",
    },
    {
      title: "Pickup & Delivery",
      description: "We collect and deliver",
      price: "₹25 pickup fee",
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      href: "/pickup",
      popular: false,
      color: "bg-orange-50",
    },
  ]

  const nearbyShops = [
    {
      name: "Quick Print Hub",
      rating: 4.8,
      distance: "0.5 km",
      deliveryTime: "15 mins",
      bwPrice: "₹2",
      colorPrice: "₹8",
      href: "/shop/quick-print-hub",
      verified: true,
      speciality: "Same Day Delivery",
    },
    {
      name: "Digital Print Zone",
      rating: 4.7,
      distance: "1.2 km",
      deliveryTime: "25 mins",
      bwPrice: "₹1.5",
      colorPrice: "₹6",
      href: "/shop/digital-print-zone",
      verified: true,
      speciality: "Best Prices",
    },
  ]

  return (
    <div className="px-3 sm:px-4 lg:px-6 space-y-8">
      {/* Print Services */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Print Services</h3>
        <div className="space-y-4">
          {printServices.map((service, index) => (
            <Link key={index} href={service.href}>
              <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                    >
                      {service.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg truncate">{service.title}</h4>
                        {service.popular && <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 truncate">{service.description}</p>
                      <p className="text-[#61E987] font-bold text-lg">{service.price}</p>
                    </div>
                    <Button className="bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold px-6">
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Upload */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Upload</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/print-delivery?mode=upload">
            <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Upload Files</h4>
                <p className="text-sm text-gray-600">PDF, DOC, Images</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/scan-document">
            <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Use Camera</h4>
                <p className="text-sm text-gray-600">Scan documents</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Nearby Shops */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Nearby Print Shops</h3>
        <div className="space-y-4">
          {nearbyShops.map((shop, index) => (
            <Link key={index} href={shop.href}>
              <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-gray-900 text-lg">{shop.name}</h4>
                      {shop.verified && <Badge className="bg-green-100 text-green-600 text-xs">Verified</Badge>}
                    </div>
                    <Badge className="bg-green-500 text-white text-sm">Open</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{shop.speciality}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      B&W: {shop.bwPrice}/page • Color: {shop.colorPrice}/page
                    </div>
                    <Button className="bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold px-6">
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
