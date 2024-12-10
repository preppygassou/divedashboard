"use client"

import { StatCard } from "./stat-card"

const stats = [
  {
    title: "Total Revenue",
    value: "€45,231.89",
    change: "+20.1% from last month",
  },
  {
    title: "Active Users",
    value: "+2350",
    change: "+180.1% from last month",
  },
  {
    title: "Orders",
    value: "+12,234",
    change: "+19% from last month",
  },
  {
    title: "Active Cards",
    value: "+573",
    change: "+201 since last hour",
  },
]

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
        />
      ))}
    </div>
  )
}