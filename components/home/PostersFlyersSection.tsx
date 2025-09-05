import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Megaphone, Heart, FileText, Upload, Palette } from "lucide-react"

export default function PostersFlyersSection() {
  const posterCategories = [
    {
      title: "Event Posters",
      description: "College events, parties, concerts",
      price: "From ₹299",
      icon: <Gift className="w-8 h-8 text-purple-500" />,
      href: "/posters?category=events",
      popular: true,
      color: "bg-purple-50",
    },
    {
      title: "Business Flyers",
      description: "Promote your business",
      price: "From ₹199",
      icon: <Megaphone className="w-8 h-8 text-blue-500" />,
      href: "/posters?category=business",
      popular: false,
      color: "bg-blue-50",
    },
    {
      title: "Wedding Posters",
      description: "Save the date, invitations",
      price: "From ₹499",
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      href: "/posters?category=wedding",
      popular: true,
      color: "bg-pink-50",
    },
    {
      title: "Educational Posters",
      description: "Charts, diagrams, presentations",
      price: "From ₹149",
      icon: <FileText className="w-8 h-8 text-green-500" />,
      href: "/posters?category=education",
      popular: false,
      color: "bg-green-50",
    },
  ]

  const sizes = [
    { name: "A4", price: "₹299", popular: true, gradient: "from-blue-500 to-blue-600" },
    { name: "A3", price: "₹499", popular: false, gradient: "from-green-500 to-green-600" },
    { name: "A2", price: "₹799", popular: false, gradient: "from-purple-500 to-purple-600" },
    { name: "A1", price: "₹1299", popular: false, gradient: "from-orange-500 to-orange-600" },
  ]

  return (
    <div className="px-3 sm:px-4 lg:px-6 space-y-8">
      {/* Poster Categories */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Poster Categories</h3>
        <div className="grid grid-cols-1 gap-4">
          {posterCategories.map((category, index) => (
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

      {/* Size Options */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Sizes</h3>
        <div className="grid grid-cols-2 gap-4">
          {sizes.map((size, index) => (
            <Link key={index} href={`/posters?size=${size.name.toLowerCase()}`}>
              <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${size.gradient}`}></div>
                <CardContent className="p-5 text-center">
                  <h4 className="font-bold text-gray-900 text-2xl mb-2">{size.name}</h4>
                  <p className="text-[#61E987] font-bold text-lg mb-3">{size.price}</p>
                  {size.popular && <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/posters/upload">
            <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Upload Design</h4>
                <p className="text-sm text-gray-600">Have your own design?</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/designers?category=posters">
            <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-purple-500" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">Hire Designer</h4>
                <p className="text-sm text-gray-600">Custom poster design</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}
