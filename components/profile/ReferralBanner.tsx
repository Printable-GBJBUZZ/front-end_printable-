"use client"

import { Gift, Share, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ReferralBannerProps {
  text: string
  referralCode?: string
  onShare?: () => void
}

export default function ReferralBanner({ text, referralCode = "GUNJAN25", onShare }: ReferralBannerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Printable App",
        text: `Use my referral code ${referralCode} and get ₹25 bonus!`,
        url: `https://printable.app/ref/${referralCode}`,
      })
    } else {
      onShare?.()
    }
  }

  return (
    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-full">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{text}</h3>
              <p className="text-sm opacity-90">Share your code with friends</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCopyCode}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleShare}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3 p-2 bg-white bg-opacity-20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono">{referralCode}</span>
            <span className="text-xs opacity-75">Your referral code</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
