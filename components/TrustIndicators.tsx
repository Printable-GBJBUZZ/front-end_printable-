import { CheckCircle, Clock, Shield, Star } from "lucide-react"

const indicators = [
  { icon: CheckCircle, text: "500+ Stores", color: "text-printable-green" },
  { icon: Clock, text: "15min Delivery", color: "text-blue-500" },
  { icon: Shield, text: "100% Secure", color: "text-purple-500" },
  { icon: Star, text: "4.9★ Rating", color: "text-orange-500" },
]

export default function TrustIndicators() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700 font-medium">
            Professional prints delivered in <span className="font-bold text-printable-navy">15 minutes</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <Icon className={`w-8 h-8 ${indicator.color}`} />
                </div>
                <p className="font-semibold text-gray-900">{indicator.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
