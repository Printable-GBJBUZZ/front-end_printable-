"use client"

import { Star, MapPin, Clock, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredStores = [
  {
    id: 1,
    name: "Quick Print Hub",
    rating: 4.8,
    reviews: 245,
    distance: "0.5 km",
    deliveryTime: "15 min",
    specialties: ["Business Cards", "Flyers", "Posters"],
    pricing: { bw: 2, color: 6 },
    express: true,
    image: "🏪",
  },
  {
    id: 2,
    name: "Digital Print Zone",
    rating: 4.7,
    reviews: 189,
    distance: "1.2 km",
    deliveryTime: "25 min",
    specialties: ["Thesis Binding", "Reports", "Presentations"],
    pricing: { bw: 3, color: 8 },
    express: false,
    image: "🖨️",
  },
  {
    id: 3,
    name: "Express Printing Co.",
    rating: 4.9,
    reviews: 312,
    distance: "0.8 km",
    deliveryTime: "20 min",
    specialties: ["Wedding Cards", "Invitations", "Banners"],
    pricing: { bw: 2, color: 7 },
    express: true,
    image: "⚡",
  },
]

export default function FeaturedStores() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1F1D5D]">Featured Print Stores</h2>
          <Link href="/stores">
            <Button variant="ghost" className="text-[#61E987] hover:text-[#61E987]/80">
              View All Stores
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStores.map((store) => (
            <Card key={store.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{store.image}</div>
                    <div>
                      <h3 className="font-semibold text-[#1F1D5D]">{store.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {store.rating} ({store.reviews})
                      </div>
                    </div>
                  </div>
                  {store.express && (
                    <Badge className="bg-[#61E987] text-[#1F1D5D] border-0">
                      <Zap className="w-3 h-3 mr-1" />
                      Express
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {store.distance} away
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {store.deliveryTime} delivery
                  </div>
                  <div className="text-sm">{store.deliveryTime} delivery</div>
                  <div className="text-sm">
                    <span className="text-gray-600">
                      B/W: ₹{store.pricing.bw} • Color: ₹{store.pricing.color}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {store.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-[#1F1D5D] hover:bg-[#1F1D5D]/90 text-white">Print at this store</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
