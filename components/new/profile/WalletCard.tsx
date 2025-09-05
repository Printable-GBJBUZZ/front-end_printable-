"use client"

import { Wallet, Coins, Plus, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface WalletCardProps {
  balance: string
  coins: number
  onAddMoney?: () => void
  onRedeemCoins?: () => void
}

export default function WalletCard({ balance, coins, onAddMoney, onRedeemCoins }: WalletCardProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span className="text-sm opacity-90">Wallet Balance</span>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={onAddMoney}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Money
          </Button>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-1">{balance}</h2>
          <p className="text-sm opacity-75">Available to spend</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-yellow-300" />
            <span className="text-sm">{coins} Coins</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onRedeemCoins}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Coins Value */}
        <div className="mt-2 text-xs opacity-75">= ₹{Math.floor(coins / 10)} cashback value</div>
      </CardContent>
    </Card>
  )
}
