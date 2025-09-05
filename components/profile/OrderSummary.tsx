"use client"

import { Package, Clock, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Order {
  id: string
  title: string
  status: "pending" | "processing" | "completed" | "cancelled"
  date: string
  amount: string
  items: number
}

interface OrderSummaryProps {
  orders: Order[]
}

const defaultOrders: Order[] = [
  {
    id: "ORD001",
    title: "Wedding Invitations",
    status: "completed",
    date: "2024-01-15",
    amount: "₹1,250",
    items: 50,
  },
  {
    id: "ORD002",
    title: "Business Cards",
    status: "processing",
    date: "2024-01-18",
    amount: "₹450",
    items: 100,
  },
  {
    id: "ORD003",
    title: "Event Posters",
    status: "pending",
    date: "2024-01-20",
    amount: "₹800",
    items: 25,
  },
]

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-50",
    label: "Pending",
  },
  processing: {
    icon: Package,
    color: "text-blue-500",
    bg: "bg-blue-50",
    label: "Processing",
  },
  completed: {
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-50",
    label: "Completed",
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    label: "Cancelled",
  },
}

export default function OrderSummary({ orders = defaultOrders }: OrderSummaryProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500">Your order history will appear here</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>

      <div className="space-y-3">
        {orders.slice(0, 5).map((order) => {
          const config = statusConfig[order.status]
          const StatusIcon = config.icon

          return (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${config.bg}`}>
                      <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{order.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>#{order.id}</span>
                        <span>•</span>
                        <span>{order.items} items</span>
                        <span>•</span>
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{order.amount}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${config.bg} ${config.color}`}>{config.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {orders.length > 5 && (
        <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2">
          View all orders ({orders.length})
        </button>
      )}
    </div>
  )
}
