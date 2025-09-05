import { TrendingUp, Clock, Star, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const trendingServices = [
  {
    id: 1,
    title: "Resume Printing",
    description: "Professional resume printing on premium paper",
    price: "₹25",
    originalPrice: "₹35",
    rating: 4.9,
    reviews: 1250,
    image: "📄",
    category: "Documents",
    trending: "+45%",
    href: "/print?category=resume",
  },
  {
    id: 2,
    title: "Wedding Cards",
    description: "Beautiful wedding invitation cards with custom design",
    price: "₹1,299",
    originalPrice: "₹1,899",
    rating: 4.8,
    reviews: 890,
    image: "💒",
    category: "Cards",
    trending: "+32%",
    href: "/designers?category=wedding",
  },
  {
    id: 3,
    title: "Business Flyers",
    description: "Eye-catching flyers for your business promotion",
    price: "₹199",
    originalPrice: "₹299",
    rating: 4.7,
    reviews: 567,
    image: "📋",
    category: "Marketing",
    trending: "+28%",
    href: "/shop?category=flyers",
  },
  {
    id: 4,
    title: "Photo Printing",
    description: "High-quality photo prints in various sizes",
    price: "₹15",
    originalPrice: "₹25",
    rating: 4.9,
    reviews: 2100,
    image: "📸",
    category: "Photos",
    trending: "+25%",
    href: "/print?category=photos",
  },
]

export default function TrendingServices() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-printable-navy mb-4">Trending This Week</h2>
            <p className="text-lg text-gray-600">Most popular printing services right now</p>
          </div>
          <Link href="/shop">
            <Button
              variant="outline"
              className="border-printable-green text-printable-green hover:bg-printable-green hover:text-printable-navy bg-transparent"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingServices.map((service) => (
            <Link key={service.id} href={service.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 bg-white shadow-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 bg-printable-gray rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {service.image}
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className="bg-blue-100 text-blue-700 text-xs font-bold">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {service.trending}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {service.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-bold text-printable-navy text-lg font-display mb-2 group-hover:text-printable-green transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-blue-500 fill-current" />
                        <span className="font-semibold text-printable-navy text-sm">{service.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-printable-navy text-lg">{service.price}</span>
                        <span className="text-gray-500 text-sm line-through">{service.originalPrice}</span>
                      </div>
                      <div className="flex items-center text-printable-green text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>15 min</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-printable-green/10 px-6 py-3 rounded-full">
            <TrendingUp className="w-5 h-5 text-printable-green" />
            <span className="text-printable-navy font-semibold">Join 50,000+ customers who love our services</span>
          </div>
        </div>
      </div>
    </section>
  )
}
