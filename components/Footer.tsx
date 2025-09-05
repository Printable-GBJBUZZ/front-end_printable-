"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#1F1D5D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative w-8 h-8 mr-2">
                <Image src="/images/logo-green.png" alt="Printable Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold">Printable</span>
            </div>
            <p className="text-gray-300 text-sm">
              India's full-stack PrintTech platform. From notes to posters — print anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-[#61E987] p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-[#61E987] p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-[#61E987] p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-[#61E987] p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-[#61E987] p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/print" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Print Now
                </Link>
              </li>
              <li>
                <Link href="/pickup" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Pickup Service
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Shop Services
                </Link>
              </li>
              <li>
                <Link href="/billboard" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Billboard Ads
                </Link>
              </li>
              <li>
                <Link href="/designers" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Hire Designer
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Doc Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-[#61E987] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                +91 98765 43210
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                support@printable.in
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                Mumbai, Maharashtra
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-300 text-sm">Get the latest offers and updates delivered to your inbox.</p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-[#61E987] hover:bg-[#61E987]/90 text-[#1F1D5D]">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">© 2024 Printable. All rights reserved. Made with ❤️ in India.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-[#61E987] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-[#61E987] transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-[#61E987] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
