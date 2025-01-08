import { StatsGrid } from "@/components/admin/dashboard/stats-grid"
import { OverviewCard } from "@/components/admin/dashboard/overview-card"
import { RecentOrdersCard } from "@/components/admin/dashboard/recent-orders-card"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewCard />
        <RecentOrdersCard />
      </div>
    </div>
  )
}