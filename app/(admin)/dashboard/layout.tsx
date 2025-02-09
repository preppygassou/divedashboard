"use client"

import { useState } from "react";
import { BarChart2, CreditCard, LayoutDashboard, Package, Users, ShoppingBag, ChevronDown,CreditCardIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/layout/theme-toggle";

const navigation = [
  {
    name: 'Tableau de bord', 
    href: '/dashboard', 
    type: 'link',
    children: [],
    icon: LayoutDashboard 
  },
  { 
    name: 'Analytique',
    href: '/dashboard/analytics', 
    icon: BarChart2,
    type: 'link',
    children: [],
  },
  { 
    name: 'Commandes', 
    href: '/dashboard/orders', 
    icon: Package,
    type: 'link',
    children: [],
  },
  { 
    name: 'Produits', 
    href: '/dashboard/products', 
    icon: ShoppingBag,
    type: 'sub',
    children:[
      { name: 'Liste des produits', href: '/dashboard/products' },
      { name: 'Attributs', href: '/dashboard/products/attributes' },
    ], 
  },
  { 
    name: 'Utilisateurs', 
    href: '/dashboard/users',
    icon: Users,
    type: 'link',
    children: [],
  },
  { 
    name: 'Pass cards', 
    href: '/dashboard/pass-cards',
    icon: CreditCardIcon,
    type: 'link',
    children: [],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme} = useTheme();
  const toggleMenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const isParentActive = (children: { href: string }[]) => {
    return children.some((child) => pathname === child.href);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <aside
          className={cn(
            "fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300",
            !isSidebarOpen && "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-1 flex-col border-r bg-card px-3 py-4">
            <div className="flex items-center gap-2 px-3 py-2">
            <a href="/dashboard"><img width={100} src={theme==="light" ?"https://dive.paris/wp-content/uploads/2024/10/DIVE_2025-b.webp":"https://dive.paris/wp-content/uploads/2024/12/DIVE_2025.png"} />
            <span className="text-lg font-semibold">DASH</span>
            </a>
              
            </div>
            <nav className="flex-1 space-y-1 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.type === 'sub' && isParentActive(item.children));

                if (item.type === 'sub') {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={cn(
                          "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "ml-auto h-4 w-4 transition-transform",
                            activeMenu === item.name && "rotate-180"
                          )}
                        />
                      </button>
                      {activeMenu === item.name && (
                        <div className="ml-4 space-y-1">
                          {item.children.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className={cn(
                                "group flex items-center rounded-md px-3 py-2 mt-1 text-sm font-medium",
                                pathname === subitem.href
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              )}
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

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
                );
              })}
            </nav>
          </div>
        </aside>

        <main
          className={cn(
            "flex-1 transition-margin duration-300",
            isSidebarOpen ? "ml-72" : "ml-0"
          )}
        >
          <div className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center gap-4 px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>
              <ThemeToggle />
            </div>
           
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
