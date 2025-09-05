"use client"

import { useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Software Engineer",
    company: "TCS Mumbai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    text: "Printable saved my job interview! Got my resume printed in 10 minutes with perfect quality. The delivery guy even waited while I made last-minute changes. Absolutely incredible service!",
    service: "Resume Printing",
    location: "Bandra, Mumbai",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Wedding Planner",
    company: "Dream Weddings",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    text: "Designed and printed 500 wedding invitations through Printable. The designer was amazing and the print quality exceeded expectations. All my clients now ask for Printable!",
    service: "Wedding Invitations",
    location: "Andheri, Mumbai",
    verified: true,
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "Restaurant Owner",
    company: "Spice Garden",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    text: "Booked a billboard through Printable for my restaurant launch. The process was seamless, got live photos when it went up, and saw 40% increase in footfall. Worth every rupee!",
    service: "Billboard Advertising",
    location: "Powai, Mumbai",
    verified: true,
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "Startup Founder",
    company: "EcoTech Solutions",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    text: "From business cards to pitch deck printing, Printable handles everything. The PDF conversion tools are free and work perfectly. It's like having a print shop in your pocket!",
    service: "Business Materials",
    location: "BKC, Mumbai",
    verified: true,
  },
  {
    id: 5,
    name: "Amit Singh",
    role: "College Student",
    company: "IIT Bombay",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    text: "As a student, the pickup service is a lifesaver! They collected my 200-page project, printed and bound it perfectly, delivered back in 4 hours. Saved me a whole day of running around.",
    service: "Academic Printing",
    location: "Powai, Mumbai",
    verified: true,
  },
  {
    id: 6,
    name: "Kavya Reddy",
    role: "Marketing Manager",
    company: "Flipkart",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    rating: 5,
    text: "Printable's marketplace has amazing designers! Got a complete brand identity designed and printed for our new product launch. The quality and speed were outstanding.",
    service: "Brand Design",
    location: "Koramangala, Bangalore",
    verified: true,
  },
]

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-current" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Our Users Say</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join 50,000+ happy customers who trust Printable for all their printing needs
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-blue-500 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-600">from 12,000+ reviews</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="mx-auto max-w-4xl border-0 shadow-xl bg-white">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                              <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                              <AvatarFallback className="bg-printable-navy text-white text-xl">
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {testimonial.verified && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-printable-green rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-blue-500 fill-current" />
                            ))}
                          </div>

                          <div className="relative mb-6">
                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-printable-green/20" />
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                              "{testimonial.text}"
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                            <p className="text-gray-600">
                              {testimonial.role} at {testimonial.company}
                            </p>
                            <div className="flex items-center justify-center md:justify-start space-x-3">
                              <Badge className="bg-printable-green/10 text-printable-green border-printable-green/20">
                                {testimonial.service}
                              </Badge>
                              <span className="text-sm text-gray-500">{testimonial.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white border-0"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white border-0"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-printable-green scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-printable-green/10 to-printable-navy/10 rounded-2xl p-8 border border-printable-green/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Them?</h3>
            <p className="text-gray-600 mb-6">Start your printing journey with India's most trusted platform</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-printable-green hover:bg-printable-green/90 px-8">Start Printing Now</Button>
              <Button variant="outline" className="bg-transparent">
                Download Mobile App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
