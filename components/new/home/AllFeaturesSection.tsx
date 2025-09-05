import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Printer, ScanLine, Truck, CreditCard, Palette, Heart, FileText, Wrench, Sparkles } from "lucide-react"

export default function AllFeaturesSection() {
  const allFeatures = [
    {
      category: "Print & Delivery",
      icon: <Printer className="w-6 h-6 text-blue-500" />,
      items: [
        {
          name: "Instant Print",
          price: "₹2/page",
          icon: <Printer className="w-5 h-5 text-blue-500" />,
          href: "/print-delivery",
          description: "Upload and print instantly",
          popular: true,
        },
        {
          name: "Document Scan",
          price: "Free",
          icon: <ScanLine className="w-5 h-5 text-green-500" />,
          href: "/scan-document",
          description: "Scan with your phone camera",
          popular: false,
        },
        {
          name: "Pickup Service",
          price: "₹25",
          icon: <Truck className="w-5 h-5 text-orange-500" />,
          href: "/pickup",
          description: "We collect from your location",
          popular: false,
        },
      ],
    },
    {
      category: "Design Services",
      icon: <Palette className="w-6 h-6 text-purple-500" />,
      items: [
        {
          name: "Business Cards",
          price: "₹149",
          icon: <CreditCard className="w-5 h-5 text-blue-500" />,
          href: "/marketplace?category=business-cards",
          description: "Professional business cards",
          popular: true,
        },
        {
          name: "Flyers & Posters",
          price: "₹299",
          icon: <FileText className="w-5 h-5 text-green-500" />,
          href: "/posters",
          description: "Eye-catching promotional materials",
          popular: true,
        },
        {
          name: "Wedding Cards",
          price: "₹399",
          icon: <Heart className="w-5 h-5 text-pink-500" />,
          href: "/marketplace?category=wedding",
          description: "Beautiful wedding invitations",
          popular: false,
        },
      ],
    },
    {
      category: "Premium Tools",
      icon: <Wrench className="w-6 h-6 text-red-500" />,
      items: [
        {
          name: "PDF Merge",
          price: "Free",
          icon: <FileText className="w-5 h-5 text-blue-500" />,
          href: "/tools/merge-pdf",
          description: "Combine multiple PDFs",
          popular: false,
        },
        {
          name: "Resume Builder",
          price: "₹99",
          icon: <Sparkles className="w-5 h-5 text-purple-500" />,
          href: "/tools/resume-builder",
          description: "AI-powered resume creation",
          popular: true,
        },
        {
          name: "Digital Signature",
          price: "₹199",
          icon: <Sparkles className="w-5 h-5 text-orange-500" />,
          href: "/tools/signature",
          description: "Sign documents digitally",
          popular: false,
        },
      ],
    },
  ]

  return (
    <div className="px-3 sm:px-4 lg:px-6 space-y-8">
      {allFeatures.map((category, categoryIndex) => (
        <section key={categoryIndex}>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mr-4">
              {category.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {category.items.map((item, itemIndex) => (
              <Link key={itemIndex} href={item.href}>
                <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-gray-900 text-lg truncate">{item.name}</h4>
                          {item.popular && <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 truncate">{item.description}</p>
                        <p className="text-[#61E987] font-bold text-lg">{item.price}</p>
                      </div>
                      <Button className="bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold px-6">
                        Use Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
