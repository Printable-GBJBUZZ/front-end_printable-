"use client"

import { useState } from "react"
import { Bell, Shield, CreditCard, LogOut, ChevronRight, User, MapPin, HelpCircle, Moon, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface SettingsMenuProps {
  items: string[]
  onItemClick?: (item: string) => void
}

const settingsConfig = {
  Notifications: {
    icon: Bell,
    description: "Manage your notification preferences",
    hasToggle: true,
  },
  Privacy: {
    icon: Shield,
    description: "Control your privacy settings",
    hasToggle: false,
  },
  "Payment Methods": {
    icon: CreditCard,
    description: "Manage cards and payment options",
    hasToggle: false,
  },
  Profile: {
    icon: User,
    description: "Edit your profile information",
    hasToggle: false,
  },
  Addresses: {
    icon: MapPin,
    description: "Manage delivery addresses",
    hasToggle: false,
  },
  "Dark Mode": {
    icon: Moon,
    description: "Toggle dark mode theme",
    hasToggle: true,
  },
  Language: {
    icon: Globe,
    description: "Change app language",
    hasToggle: false,
  },
  "Help & Support": {
    icon: HelpCircle,
    description: "Get help and contact support",
    hasToggle: false,
  },
  Logout: {
    icon: LogOut,
    description: "Sign out of your account",
    hasToggle: false,
    isDestructive: true,
  },
}

export default function SettingsMenu({ items, onItemClick }: SettingsMenuProps) {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    Notifications: true,
    "Dark Mode": false,
  })

  const handleToggle = (item: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  const handleItemClick = (item: string) => {
    onItemClick?.(item)
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {items.map((item, index) => {
            const config = settingsConfig[item as keyof typeof settingsConfig]
            if (!config) return null

            const Icon = config.icon
            const isLast = index === items.length - 1

            return (
              <div
                key={item}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  config.isDestructive ? "hover:bg-red-50" : ""
                } ${isLast ? "rounded-b-lg" : ""}`}
                onClick={() => !config.hasToggle && handleItemClick(item)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${config.isDestructive ? "bg-red-100" : "bg-gray-100"}`}>
                      <Icon className={`h-4 w-4 ${config.isDestructive ? "text-red-600" : "text-gray-600"}`} />
                    </div>
                    <div>
                      <h4 className={`font-medium ${config.isDestructive ? "text-red-600" : "text-gray-900"}`}>
                        {item}
                      </h4>
                      <p className="text-sm text-gray-500">{config.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {config.hasToggle ? (
                      <Switch checked={toggleStates[item] || false} onCheckedChange={() => handleToggle(item)} />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
