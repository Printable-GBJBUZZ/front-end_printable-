"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  placeholder: string
  onSearch?: (query: string) => void
  onFilterChange?: (filters: any) => void
}

const categories = ["All", "Wedding Cards", "Business Cards", "Posters", "Flyers", "Banners"]
const priceRanges = ["Under ₹50", "₹50-₹100", "₹100-₹200", "Above ₹200"]

export default function SearchBar({ placeholder, onSearch, onFilterChange }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch?.(searchQuery)
  }

  const handleFilterApply = () => {
    onFilterChange?.({
      category: selectedCategory,
      priceRange: selectedPriceRange,
    })
    setShowFilters(false)
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedPriceRange("")
    onFilterChange?.({
      category: "All",
      priceRange: "",
    })
  }

  return (
    <div className="space-y-4">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-3 border-gray-300 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {showFilters && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Filters</h3>
            <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedPriceRange(range === selectedPriceRange ? "" : range)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedPriceRange === range
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleFilterApply} className="bg-blue-600 hover:bg-blue-700 text-white">
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-gray-300 hover:bg-gray-50 bg-transparent"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
