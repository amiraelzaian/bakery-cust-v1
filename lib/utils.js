export function getMonthlySpending(orders = []) {
  const monthMap = {}

  orders.forEach((order) => {
    if (order.paymentStatus !== "paid") return 

    const date = new Date(order.createdAt)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

    monthMap[key] = (monthMap[key] || 0) + (order.totalOrderPrice ?? 0)
  })

  const sortedKeys = Object.keys(monthMap).sort()

  return {
    labels: sortedKeys.map((key) => {
      const [year, month] = key.split("-")
      return new Date(year, month - 1).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      })
    }),
    values: sortedKeys.map((key) => monthMap[key]),
  }
}