"use client"

import { useState } from "react"
import { Heart, Download, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Template {
  name: string
  price: string
  image?: string
  rating?: number
  downloads?: number
  category?: string
  tags?: string[]
}

interface TemplateGridProps {
  templates: Template[]
  onTemplateSelect?: (template: Template) => void
}

const defaultTemplates: Template[] = [
  {
    name: "Elegant Wedding Card",
    price: "₹99",
    rating: 4.8,
    downloads: 1250,
    category: "Wedding Cards",
    tags: ["Elegant", "Floral", "Premium"],
  },
  {
    name: "Startup Flyer",
    price: "₹49",
    rating: 4.6,
    downloads: 890,
    category: "Flyers",
    tags: ["Modern", "Business", "Clean"],
  },
  {
    name: "Birthday Invitation",
    price: "₹79",
    rating: 4.9,
    downloads: 2100,
    category: "Invitations",
    tags: ["Colorful", "Fun", "Kids"],
  },
  {
    name: "Corporate Brochure",
    price: "₹129",
    rating: 4.7,
    downloads: 650,
    category: "Brochures",
    tags: ["Professional", "Corporate", "Minimal"],
  },
  {
    name: "Event Poster",
    price: "₹89",
    rating: 4.5,
    downloads: 1100,
    category: "Posters",
    tags: ["Bold", "Event", "Vibrant"],
  },
  {
    name: "Business Card Set",
    price: "₹59",
    rating: 4.8,
    downloads: 1800,
    category: "Business Cards",
    tags: ["Professional", "Set", "Versatile"],
  },
]

export default function TemplateGrid({ templates = defaultTemplates, onTemplateSelect }: TemplateGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (templateName: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(templateName)) {
      newFavorites.delete(templateName)
    } else {
      newFavorites.add(templateName)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {templates.map((template, index) => (
        <Card key={index} className="group hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-0">
            {/* Template Preview */}
            <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
              {template.image ? (
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-20 bg-white rounded shadow-sm mx-auto mb-2"></div>
                    <p className="text-xs text-gray-500">Preview</p>
                  </div>
                </div>
              )}

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-white hover:bg-gray-100">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onTemplateSelect?.(template)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(template.name)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <Heart
                  className={`h-4 w-4 ${favorites.has(template.name) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>

              {/* Category Badge */}
              {template.category && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-white bg-opacity-90 text-xs font-medium text-gray-700 rounded-full">
                    {template.category}
                  </span>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{template.name}</h3>

              {/* Rating and Downloads */}
              <div className="flex items-center justify-between mb-3">
                {template.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{template.rating}</span>
                  </div>
                )}
                {template.downloads && (
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {template.downloads > 1000 ? `${(template.downloads / 1000).toFixed(1)}k` : template.downloads}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {template.tags && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{template.tags.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">{template.price}</span>
                <Button
                  size="sm"
                  onClick={() => onTemplateSelect?.(template)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
