"use client"

import { useState } from "react"
import { BarChart2, CreditCard, LayoutDashboard, Package, Users, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Orders', href: '/dashboard/orders', icon: Package },
  { name: 'Products', href: '/dashboard/products', icon: ShoppingBag },
  { name: 'Users', href: '/dashboard/users', icon: Users },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <aside className={cn(
          "fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300",
          !isSidebarOpen && "-translate-x-full"
        )}>
          <div className="flex h-full flex-1 flex-col border-r bg-card px-3 py-4">
            <div className="flex items-center gap-2 px-3 py-2">
              <CreditCard className="h-6 w-6" />
              <span className="text-lg font-semibold">Dive Card Admin</span>
            </div>
            <nav className="flex-1 space-y-1 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        <main className={cn(
          "flex-1 transition-margin duration-300",
          isSidebarOpen ? "ml-72" : "ml-0"
        )}>
          <div className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center gap-4 px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}