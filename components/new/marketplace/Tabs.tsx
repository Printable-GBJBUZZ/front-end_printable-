"use client"

import { useState } from "react"

interface TabsProps {
  items: string[]
  onTabChange?: (tab: string) => void
  showCounts?: boolean
}

const tabCounts: Record<string, number> = {
  All: 1250,
  "Wedding Cards": 320,
  "Business Cards": 180,
  Posters: 450,
  Flyers: 200,
  Banners: 100,
}

export default function Tabs({ items, onTabChange, showCounts = true }: TabsProps) {
  const [activeTab, setActiveTab] = useState(items[0])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8 overflow-x-auto">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => handleTabChange(item)}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === item
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {item}
            {showCounts && tabCounts[item] && (
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === item ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                }`}
              >
                {tabCounts[item]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
