"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Tool {
  name: string
  icon: string
  description?: string
  category?: string
}

interface ToolGridProps {
  tools: Tool[]
  onToolSelect?: (tool: Tool) => void
}

const defaultTools: Tool[] = [
  {
    name: "Merge PDFs",
    icon: "📎",
    description: "Combine multiple PDF files into one",
    category: "PDF",
  },
  {
    name: "Compress File",
    icon: "🗜️",
    description: "Reduce file size without losing quality",
    category: "Optimization",
  },
  {
    name: "Convert PDF ↔ DOC/JPG",
    icon: "🔄",
    description: "Convert between different file formats",
    category: "Conversion",
  },
  {
    name: "OCR Text Recognition",
    icon: "🔍",
    description: "Extract text from images and scanned documents",
    category: "AI",
  },
  {
    name: "Add E-Signature",
    icon: "✍️",
    description: "Digitally sign your documents",
    category: "Security",
  },
  {
    name: "Split PDF",
    icon: "✂️",
    description: "Split PDF into multiple files",
    category: "PDF",
  },
  {
    name: "Watermark",
    icon: "🏷️",
    description: "Add watermarks to protect your documents",
    category: "Security",
  },
  {
    name: "Password Protect",
    icon: "🔒",
    description: "Add password protection to your files",
    category: "Security",
  },
]

export default function ToolGrid({ tools = defaultTools, onToolSelect }: ToolGridProps) {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool)
    onToolSelect?.(tool)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {tools.map((tool, index) => (
        <Card
          key={index}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedTool?.name === tool.name
              ? "ring-2 ring-blue-500 border-blue-500"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => handleToolSelect(tool)}
        >
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-3">{tool.icon}</div>
            <h3 className="font-medium text-gray-900 text-sm mb-2">{tool.name}</h3>
            {tool.description && <p className="text-xs text-gray-500 line-clamp-2">{tool.description}</p>}
            {tool.category && (
              <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tool.category}
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
