"use client"

import { Trophy, Star, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface XPLevelProps {
  level: number
  progress: string
  totalXP?: number
  nextLevelXP?: number
}

const levelBenefits = {
  1: { name: "Beginner", color: "from-gray-400 to-gray-500", perks: ["Basic Support"] },
  2: { name: "Explorer", color: "from-blue-400 to-blue-500", perks: ["5% Discount", "Priority Support"] },
  3: {
    name: "Creator",
    color: "from-green-400 to-green-500",
    perks: ["10% Discount", "Free Templates", "Priority Support"],
  },
  4: {
    name: "Expert",
    color: "from-purple-400 to-purple-500",
    perks: ["15% Discount", "Premium Templates", "Express Delivery"],
  },
  5: {
    name: "Master",
    color: "from-yellow-400 to-orange-500",
    perks: ["20% Discount", "All Templates", "VIP Support"],
  },
}

export default function XPLevel({ level, progress, totalXP = 680, nextLevelXP = 1000 }: XPLevelProps) {
  const currentLevel = levelBenefits[level as keyof typeof levelBenefits] || levelBenefits[1]
  const nextLevel = levelBenefits[(level + 1) as keyof typeof levelBenefits]
  const progressPercent = Number.parseInt(progress.replace("%", ""))

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${currentLevel.color} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-full">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Level {level}</h3>
                <p className="text-sm opacity-90">{currentLevel.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{progress}</div>
              <div className="text-xs opacity-75">Progress</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{totalXP} XP</span>
              <span>{nextLevelXP} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${currentLevel.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{nextLevelXP - totalXP} XP to next level</div>
          </div>

          {/* Current Level Perks */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Current Perks
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentLevel.perks.map((perk, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {perk}
                </span>
              ))}
            </div>
          </div>

          {/* Next Level Preview */}
          {nextLevel && (
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                Next Level: {nextLevel.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {nextLevel.perks.map((perk, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
