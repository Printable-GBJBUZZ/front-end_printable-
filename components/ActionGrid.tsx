import {
  Printer,
  Package,
  Store,
  BarcodeIcon as Billboard,
  Palette,
  FileText,
  ShoppingBag,
  ClipboardList,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const actions = [
  {
    icon: Printer,
    title: "Print Now",
    description: "Upload & print instantly",
    href: "/print",
    color: "bg-printable-green",
    textColor: "text-printable-navy",
    badge: "Most Popular",
    badgeColor: "bg-red-500",
  },
  {
    icon: Package,
    title: "Pickup Service",
    description: "100+ pages? We'll collect",
    href: "/pickup",
    color: "bg-printable-navy",
    textColor: "text-white",
    badge: "Free Pickup",
    badgeColor: "bg-printable-green",
  },
  {
    icon: Store,
    title: "Shop Services",
    description: "Flyers, posters, cards",
    href: "/shop",
    color: "bg-purple-500",
    textColor: "text-white",
    badge: "500+ Stores",
    badgeColor: "bg-purple-600",
  },
  {
    icon: Billboard,
    title: "Billboard Ads",
    description: "Book outdoor advertising",
    href: "/billboard",
    color: "bg-orange-500",
    textColor: "text-white",
    badge: "Live Proof",
    badgeColor: "bg-orange-600",
  },
  {
    icon: Palette,
    title: "Hire Designer",
    description: "Professional design help",
    href: "/designers",
    color: "bg-pink-500",
    textColor: "text-white",
    badge: "Verified",
    badgeColor: "bg-pink-600",
  },
  {
    icon: FileText,
    title: "Doc Tools",
    description: "Merge, OCR, compress",
    href: "/tools",
    color: "bg-blue-500",
    textColor: "text-white",
    badge: "Free Tools",
    badgeColor: "bg-blue-600",
  },
  {
    icon: ShoppingBag,
    title: "Templates",
    description: "Buy, edit, print",
    href: "/templates",
    color: "bg-green-500",
    textColor: "text-white",
    badge: "1000+ Designs",
    badgeColor: "bg-green-600",
  },
  {
    icon: ClipboardList,
    title: "My Orders",
    description: "Track your prints",
    href: "/orders",
    color: "bg-printable-navy",
    textColor: "text-white",
    badge: "Live Tracking",
    badgeColor: "bg-printable-green",
  },
]

export default function ActionGrid() {
  return (
    <section className="py-16 md:py-24 bg-printable-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-printable-navy mb-6">
            Everything you need to print
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From quick prints to professional services, billboard ads to designer marketplace
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={index} href={action.href}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 cursor-pointer border-0 shadow-lg relative overflow-hidden bg-white hover:border-2 hover:border-printable-green">
                  {action.badge && (
                    <Badge
                      className={`absolute top-3 right-3 ${action.badgeColor} text-white text-xs z-10 font-semibold`}
                    >
                      {action.badge}
                    </Badge>
                  )}
                  <CardContent className="p-6 md:p-8 text-center space-y-6">
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-3xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl`}
                    >
                      <Icon className={`w-8 h-8 md:w-10 md:h-10 ${action.textColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-printable-navy mb-2 text-lg md:text-xl font-display">
                        {action.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{action.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
