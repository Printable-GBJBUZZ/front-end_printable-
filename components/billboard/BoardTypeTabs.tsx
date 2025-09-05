"use client"

import { useState } from "react"

interface BoardTypeTabsProps {
  types: string[]
  onTypeChange?: (type: string) => void
}

export default function BoardTypeTabs({ types, onTypeChange }: BoardTypeTabsProps) {
  const [activeType, setActiveType] = useState(types[0])

  const handleTypeChange = (type: string) => {
    setActiveType(type)
    onTypeChange?.(type)
  }

  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => handleTypeChange(type)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeType === type
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
