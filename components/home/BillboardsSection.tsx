import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, FileText, Bus, Train, Camera, TrendingUp, Clock, MapPin } from "lucide-react"

export default function BillboardsSection() {
  const billboardTypes = [
    {
      title: "Digital Billboards",
      description: "LED screens, prime locations",
      price: "From ₹1,999/month",
      icon: <Monitor className="w-8 h-8 text-blue-500" />,
      href: "/billboard?type=digital",
      popular: true,
      color: "bg-blue-50",
    },
    {
      title: "Traditional Hoardings",
      description: "Large format outdoor advertising",
      price: "From ₹999/month",
      icon: <FileText className="w-8 h-8 text-green-500" />,
      href: "/billboard?type=traditional",
      popular: false,
      color: "bg-green-50",
    },
    {
      title: "Bus Stop Ads",
      description: "High visibility transit advertising",
      price: "From ₹599/month",
      icon: <Bus className="w-8 h-8 text-orange-500" />,
      href: "/billboard?type=bus-stop",
      popular: true,
      color: "bg-orange-50",
    },
    {
      title: "Metro Station Ads",
      description: "Underground and platform advertising",
      price: "From ₹1,299/month",
      icon: <Train className="w-8 h-8 text-purple-500" />,
      href: "/billboard?type=metro",
      popular: false,
      color: "bg-purple-50",
    },
  ]

  const topCities = [
    {
      name: "Mumbai",
      slots: "250+ available",
      price: "₹1,999",
      href: "/billboard?city=mumbai",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Delhi",
      slots: "180+ available",
      price: "₹1,799",
      href: "/billboard?city=delhi",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Bangalore",
      slots: "120+ available",
      price: "₹1,599",
      href: "/billboard?city=bangalore",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      name: "Chennai",
      slots: "95+ available",
      price: "₹1,399",
      href: "/billboard?city=chennai",
      gradient: "from-orange-500 to-orange-600",
    },
  ]

  const features = [
    {
      title: "Live Proof in 24hrs",
      icon: <Camera className="w-8 h-8 text-blue-500" />,
      description: "See your ad live",
      color: "bg-blue-50",
    },
    {
      title: "Real-time Analytics",
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      description: "Track impressions",
      color: "bg-green-50",
    },
    {
      title: "Flexible Duration",
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      description: "1 week to 12 months",
      color: "bg-purple-50",
    },
    {
      title: "Premium Locations",
      icon: <MapPin className="w-8 h-8 text-orange-500" />,
      description: "High traffic areas",
      color: "bg-orange-50",
    },
  ]

  return (
    <div className="px-3 sm:px-4 lg:px-6 space-y-8">
      {/* Billboard Types */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Billboard Types</h3>
        <div className="grid grid-cols-1 gap-4">
          {billboardTypes.map((type, index) => (
            <Link key={index} href={type.href}>
              <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                    >
                      {type.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg truncate">{type.title}</h4>
                        {type.popular && <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 truncate">{type.description}</p>
                      <p className="text-[#61E987] font-bold text-lg">{type.price}</p>
                    </div>
                    <Button className="bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold px-6">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Cities */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Cities</h3>
        <div className="grid grid-cols-2 gap-4">
          {topCities.map((city, index) => (
            <Link key={index} href={city.href}>
              <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${city.gradient}`}></div>
                <CardContent className="p-5 text-center">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{city.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{city.slots}</p>
                  <p className="text-[#61E987] font-bold text-lg">Starting {city.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-5 text-center">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6 text-center relative">
            <div className="absolute top-4 right-4 text-4xl opacity-20">🚀</div>
            <h3 className="text-xl font-bold mb-3">Launch Your Campaign Today</h3>
            <p className="text-white/90 text-sm mb-6">Reach millions across India with premium billboard advertising</p>
            <Link href="/billboard/book">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold px-8 py-3">
                Start Campaign
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
