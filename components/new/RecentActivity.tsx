import { Clock, CheckCircle, Package, Truck, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const recentOrders = [
  {
    id: "ORD-001",
    title: "Resume_Final.pdf",
    type: "Document",
    pages: 2,
    price: "₹4",
    status: "completed",
    time: "2 hours ago",
    store: "PrintHub Express",
    rating: 5,
  },
  {
    id: "ORD-002",
    title: "Wedding_Invitation.pdf",
    type: "Cards",
    pages: 50,
    price: "₹1,250",
    status: "printing",
    time: "30 minutes ago",
    store: "Creative Prints",
    rating: null,
  },
  {
    id: "ORD-003",
    title: "Business_Flyer.jpg",
    type: "Marketing",
    pages: 100,
    price: "₹500",
    status: "delivered",
    time: "1 day ago",
    store: "Quick Print Center",
    rating: 4,
  },
  {
    id: "ORD-004",
    title: "Photo_Album.zip",
    type: "Photos",
    pages: 25,
    price: "₹375",
    status: "processing",
    time: "1 hour ago",
    store: "Photo Studio Pro",
    rating: null,
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
    case "delivered":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "printing":
      return <Package className="w-4 h-4 text-blue-600" />
    case "processing":
      return <Clock className="w-4 h-4 text-orange-600" />
    default:
      return <Clock className="w-4 h-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
    case "delivered":
      return "bg-green-100 text-green-700"
    case "printing":
      return "bg-blue-100 text-blue-700"
    case "processing":
      return "bg-orange-100 text-orange-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function RecentActivity() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-printable-navy mb-4">Recent Activity</h2>
            <p className="text-lg text-gray-600">Your latest printing orders and updates</p>
          </div>
          <Link href="/orders">
            <Button
              variant="outline"
              className="border-printable-green text-printable-green hover:bg-printable-green hover:text-printable-navy bg-transparent"
            >
              View All Orders
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentOrders.map((order) => (
            <Card
              key={order.id}
              className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-white shadow-card"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-printable-navy font-display mb-1">{order.title}</h3>
                      <p className="text-sm text-gray-600">{order.store}</p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-xs font-semibold`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Type</p>
                      <p className="font-semibold text-printable-navy">{order.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Pages</p>
                      <p className="font-semibold text-printable-navy">{order.pages}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-semibold text-printable-navy">{order.price}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{order.time}</span>
                    </div>
                    {order.rating && (
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < order.rating! ? "text-orange-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-printable-navy text-white border-0">
            <CardContent className="p-6 text-center">
              <Package className="w-12 h-12 text-printable-green mx-auto mb-4" />
              <h3 className="font-bold font-display mb-2">Track Order</h3>
              <p className="text-printable-green text-sm mb-4">Get real-time updates on your prints</p>
              <Link href="/orders">
                <Button className="bg-printable-green hover:bg-printable-green/90 text-printable-navy font-bold">
                  Track Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-printable-green text-printable-navy border-0">
            <CardContent className="p-6 text-center">
              <Truck className="w-12 h-12 text-printable-navy mx-auto mb-4" />
              <h3 className="font-bold font-display mb-2">Reorder</h3>
              <p className="text-printable-navy/70 text-sm mb-4">Print the same files again with one click</p>
              <Button
                variant="outline"
                className="border-printable-navy text-printable-navy hover:bg-printable-navy hover:text-white font-bold bg-transparent"
              >
                Reorder
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-printable-green">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-printable-green mx-auto mb-4" />
              <h3 className="font-bold font-display text-printable-navy mb-2">Rate Service</h3>
              <p className="text-gray-600 text-sm mb-4">Help us improve by rating your experience</p>
              <Button className="bg-printable-green hover:bg-printable-green/90 text-printable-navy font-bold">
                Rate Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
