'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { getMonthlySpending } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useGetAllMyOrders } from "@/hooks/useOrder"

export default function SpendingChart() {
  const { orders, isPending, error } = useGetAllMyOrders()

  if (isPending) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-card">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !orders?.length) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground">
        No spending history yet.
      </div>
    )
  }

  const { labels, values } = getMonthlySpending(orders)
  const chartData = labels.map((label, i) => ({ month: label, total: values[i] }))

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 font-semibold text-card-foreground">Spending Over Time</h2>
      <ResponsiveContainer width="100%" height={240}>
  <LineChart data={chartData} style={{ outline: "none" }}>
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis
      dataKey="month"
      tick={{ fontSize: 12 }}
      stroke="var(--muted-foreground)"
      axisLine={false}
      tickLine={false}
    />
    <YAxis
      tick={{ fontSize: 12 }}
      stroke="var(--muted-foreground)"
      axisLine={false}
      tickLine={false}
    />
    <Tooltip
      formatter={(value) => [`${value} EGP`, "Total"]}
      contentStyle={{
        backgroundColor: "var(--card)",
        
        borderRadius: "8px",
        fontSize: "12px",
      }}
    />
    <Line type="monotone" dataKey="total" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} />
  </LineChart>
</ResponsiveContainer>
    </div>
  )
}