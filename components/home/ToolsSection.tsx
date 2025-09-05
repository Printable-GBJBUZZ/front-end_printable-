import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Lock, FileText, Scissors, Package, ScanLine, Sparkles, CreditCard, Palette, QrCode } from "lucide-react"

export default function ToolsSection() {
  const toolCategories = [
    {
      title: "PDF Tools",
      icon: <FileText className="w-6 h-6 text-red-500" />,
      tools: [
        {
          name: "Merge PDFs",
          icon: <FileText className="w-8 h-8 text-blue-500" />,
          premium: false,
          href: "/tools/merge-pdf",
          users: "50K+",
          color: "bg-blue-50",
        },
        {
          name: "Split PDF",
          icon: <Scissors className="w-8 h-8 text-green-500" />,
          premium: false,
          href: "/tools/split-pdf",
          users: "30K+",
          color: "bg-green-50",
        },
        {
          name: "Compress PDF",
          icon: <Package className="w-8 h-8 text-purple-500" />,
          premium: false,
          href: "/tools/compress",
          users: "40K+",
          color: "bg-purple-50",
        },
        {
          name: "PDF to Word",
          icon: <FileText className="w-8 h-8 text-orange-500" />,
          premium: true,
          href: "/tools/pdf-to-word",
          users: "25K+",
          color: "bg-orange-50",
        },
      ],
    },
    {
      title: "Document Tools",
      icon: <ScanLine className="w-6 h-6 text-green-500" />,
      tools: [
        {
          name: "Document Scanner",
          icon: <ScanLine className="w-8 h-8 text-blue-500" />,
          premium: false,
          href: "/scan-document",
          users: "75K+",
          color: "bg-blue-50",
        },
        {
          name: "OCR Text Extract",
          icon: <Sparkles className="w-8 h-8 text-green-500" />,
          premium: true,
          href: "/tools/ocr",
          users: "20K+",
          color: "bg-green-50",
        },
        {
          name: "Digital Signature",
          icon: <Sparkles className="w-8 h-8 text-purple-500" />,
          premium: true,
          href: "/tools/signature",
          users: "35K+",
          color: "bg-purple-50",
        },
        {
          name: "Watermark",
          icon: <Sparkles className="w-8 h-8 text-orange-500" />,
          premium: true,
          href: "/tools/watermark",
          users: "15K+",
          color: "bg-orange-50",
        },
      ],
    },
    {
      title: "Design Tools",
      icon: <Palette className="w-6 h-6 text-purple-500" />,
      tools: [
        {
          name: "Resume Builder",
          icon: <FileText className="w-8 h-8 text-blue-500" />,
          premium: true,
          href: "/tools/resume-builder",
          users: "60K+",
          color: "bg-blue-50",
        },
        {
          name: "Business Card Maker",
          icon: <CreditCard className="w-8 h-8 text-green-500" />,
          premium: true,
          href: "/tools/business-card",
          users: "45K+",
          color: "bg-green-50",
        },
        {
          name: "Logo Maker",
          icon: <Palette className="w-8 h-8 text-purple-500" />,
          premium: true,
          href: "/tools/logo-maker",
          users: "30K+",
          color: "bg-purple-50",
        },
        {
          name: "QR Code Generator",
          icon: <QrCode className="w-8 h-8 text-orange-500" />,
          premium: false,
          href: "/tools/qr-generator",
          users: "55K+",
          color: "bg-orange-50",
        },
      ],
    },
  ]

  const popularTools = [
    {
      name: "Document Scanner",
      description: "Scan like CamScanner",
      icon: <ScanLine className="w-8 h-8 text-blue-500" />,
      users: "50K+ users",
      rating: 4.8,
      premium: false,
      href: "/scan-document",
      color: "bg-blue-50",
    },
    {
      name: "Resume Builder",
      description: "AI-powered resume creation",
      icon: <FileText className="w-8 h-8 text-green-500" />,
      users: "25K+ users",
      rating: 4.9,
      premium: true,
      href: "/tools/resume-builder",
      color: "bg-green-50",
    },
    {
      name: "PDF Merge",
      description: "Combine multiple PDFs",
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      users: "75K+ users",
      rating: 4.7,
      premium: false,
      href: "/tools/merge-pdf",
      color: "bg-purple-50",
    },
  ]

  return (
    <div className="px-3 sm:px-4 lg:px-6 space-y-8">
      {/* Popular Tools */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Tools</h3>
        <div className="space-y-4">
          {popularTools.map((tool, index) => (
            <Link key={index} href={tool.href}>
              <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                    >
                      {tool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg truncate">{tool.name}</h4>
                        {tool.premium && <Badge className="bg-yellow-500 text-white text-xs">Premium</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 truncate">{tool.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{tool.users}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm">⭐</span>
                          <span className="text-sm text-gray-600 font-medium">{tool.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold px-6">
                      Use Tool
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Tool Categories */}
      {toolCategories.map((category, categoryIndex) => (
        <section key={categoryIndex}>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mr-4">
              {category.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {category.tools.map((tool, toolIndex) => (
              <Link key={toolIndex} href={tool.href}>
                <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-5 text-center">
                    <div
                      className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      {tool.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">{tool.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{tool.users}</p>
                    {tool.premium ? (
                      <Badge className="bg-yellow-500 text-white text-xs mb-4">Premium</Badge>
                    ) : (
                      <Badge className="bg-green-500 text-white text-xs mb-4">Free</Badge>
                    )}
                    <Button className="w-full bg-[#61E987] hover:bg-[#4ADE80] text-[#1F1D5D] rounded-xl font-semibold flex items-center justify-center">
                      {tool.premium ? <Lock className="w-4 h-4 mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                      Use
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Premium Upgrade */}
      <section>
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6 text-center relative">
            <div className="absolute top-4 right-4 text-4xl opacity-20">⚡</div>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Unlock Premium Tools</h3>
            <p className="text-white/90 text-sm mb-6">Get access to AI-powered tools and advanced features</p>
            <Link href="/tools/premium">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold px-8 py-3">
                Upgrade to Premium
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
