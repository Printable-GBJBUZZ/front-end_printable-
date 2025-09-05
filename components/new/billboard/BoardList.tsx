"use client"

import { MapPin, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface BoardItem {
  location: string
  price: string
  features?: string[]
  availability?: string
  viewCount?: number
}

interface BoardListProps {
  items: BoardItem[]
  onSelectBoard?: (item: BoardItem) => void
}

const defaultItems: BoardItem[] = [
  {
    location: "Sitabuldi Chowk",
    price: "₹1499/day",
    features: ["High Traffic", "Prime Location", "24/7 Visibility"],
    availability: "Available from tomorrow",
    viewCount: 15000,
  },
  {
    location: "Dharampeth Market",
    price: "₹1299/day",
    features: ["Shopping Area", "Weekend Rush", "Local Audience"],
    availability: "Available now",
    viewCount: 12000,
  },
]

export default function BoardList({ items = defaultItems, onSelectBoard }: BoardListProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {item.location}
                </h3>
                <p className="text-2xl font-bold text-green-600 mt-1">{item.price}</p>
              </div>
              <Button onClick={() => onSelectBoard?.(item)} className="bg-blue-600 hover:bg-blue-700 text-white">
                Book Now
              </Button>
            </div>

            {item.features && (
              <div className="flex flex-wrap gap-2 mb-3">
                {item.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              {item.availability && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.availability}</span>
                </div>
              )}
              {item.viewCount && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{item.viewCount.toLocaleString()} daily views</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
