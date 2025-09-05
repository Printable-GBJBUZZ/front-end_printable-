import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Award, Clock, CreditCard, Heart, Palette, FileText } from "lucide-react"

export default function DesignersSection() {
  const designCategories = [
    {
      title: "Business Cards",
      description: "Professional business card designs",
      price: "From ₹199",
      icon: <CreditCard className="w-8 h-8 text-blue-500" />,
      href: "/designers?category=business-cards",
      popular: true,
      color: "bg-blue-50",
    },
    {
      title: "Wedding Cards",
      description: "Beautiful wedding invitations",
      price: "From ₹399",
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      href: "/designers?category=wedding",
      popular: true,
      color: "bg-pink-50",
    },
    {
      title: "Logos & Branding",
      description: "Complete brand identity",
      price: "From ₹999",
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      href: "/designers?category=branding",
      popular: false,
      color: "bg-purple-50",
    },
    {
      title: "Flyers & Posters",
      description: "Eye-catching promotional materials",
      price: "From ₹299",
      icon: <FileText className="w-8 h-8 text-green-500" />,
      href: "/designers?category=flyers",
      popular: false,
      color: "bg-green-50",
    },
  ]

  const topDesigners = [
    {
      name: "Priya Sharma",
      rating: 4.9,
      reviews: 234,
      specialties: ["Wedding Cards", "Invitations"],
      avatar: "PS",
      price: "₹299",
      deliveryTime: "24 hours",
      href: "/designers/priya-sharma",
      verified: true,
      orders: "500+",
    },
    {
      name: "Rahul Kumar",
      rating: 4.8,
      reviews: 189,
      specialties: ["Business Cards", "Logos"],
      avatar: "RK",
      price: "₹199",
      deliveryTime: "12 hours",
      href: "/designers/rahul-kumar",
      verified: true,
      orders: "300+",
    },
    {
      name: "Anita Singh",
      rating: 4.9,
      reviews: 156,
      specialties: ["Flyers", "Posters"],
      avatar: "AS",
      price: "₹399",
      deliveryTime: "48 hours",
      href: "/designers/anita-singh",
      verified: false,
      orders: "200+",
    },
  ]

  const designProcess = [
    { step: "1", title: "Brief Designer", description: "Share your requirements", color: "bg-blue-500" },
    { step: "2", title: "Get Concepts", description: "Receive initial designs", color: "bg-green-500" },
    { step: "3", title: "Revisions", description: "Request changes if needed", color: "bg-purple-500" },
    { step: "4", title: "Final Design", description: "Get print-ready files", color: "bg-orange-500" },
  ]

  return (
    <div className="px-3 sm:px-4 lg:px-6 space-y-8">
      {/* Design Categories */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Design Categories</h3>
        <div className="grid grid-cols-1 gap-4">
          {designCategories.map((category, index) => (
            <Link key={index} href={category.href}>
              <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg truncate">{category.title}</h4>
                        {category.popular && <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 truncate">{category.description}</p>
                      <p className="text-[#61E987] font-bold text-lg">{category.price}</p>
                    </div>
                    <Button className="bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold px-6">
                      Browse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Designers */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Designers</h3>
        <div className="space-y-4">
          {topDesigners.map((designer, index) => (
            <Link key={index} href={designer.href}>
              <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 border-4 border-[#61E987] flex-shrink-0 shadow-lg">
                      <AvatarFallback className="bg-gradient-to-br from-[#61E987] to-[#4ADE80] text-[#1F1D5D] font-bold text-lg">
                        {designer.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg truncate">{designer.name}</h4>
                        {designer.verified && <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
                      </div>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{designer.rating}</span>
                          <span className="text-xs text-gray-500">({designer.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{designer.deliveryTime}</span>
                        </div>
                        <span className="text-sm text-gray-500">{designer.orders} orders</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {designer.specialties.map((specialty, specIndex) => (
                          <Badge key={specIndex} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-[#61E987] font-bold text-lg">{designer.price}</p>
                    </div>
                    <Button className="bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold px-6 flex-shrink-0">
                      Hire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Design Process */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
        <div className="grid grid-cols-2 gap-4">
          {designProcess.map((process, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-5 text-center">
                <div
                  className={`w-12 h-12 ${process.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg`}
                >
                  {process.step}
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{process.title}</h4>
                <p className="text-sm text-gray-600">{process.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6 text-center relative">
            <div className="absolute top-4 right-4 text-4xl opacity-20">🎨</div>
            <h3 className="text-xl font-bold mb-3">Need Custom Design?</h3>
            <p className="text-white/90 text-sm mb-6">Connect with expert designers for your unique requirements</p>
            <Link href="/designers/hire">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold px-8 py-3">
                Hire Designer
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
