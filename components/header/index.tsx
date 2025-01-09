"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Activity, User } from 'lucide-react'
import { useCurrentUser } from '@/hooks/use-current-user';
import ThemeToggle from '../layout/theme-toggle';
import { useTheme } from 'next-themes';


const Header = async () => {
  const user = useCurrentUser();
  const { theme} = useTheme();
  return (
    <nav className="container mx-auto p-4 flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <a href="/"><img width={100} src={theme==="light" ?"https://dive.paris/wp-content/uploads/2024/10/DIVE_2025-b.webp":"https://dive.paris/wp-content/uploads/2024/12/DIVE_2025.png"} /></a>
    </div>
    <div className="flex items-center space-x-4">
     {/*  <Link href="/cart">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </Link> */}
      {user?.role === 'ADMIN' && (
        <a href="/dashboard">
          <Button variant="ghost" size="icon">
            <Activity className="h-5 w-5" />
          </Button>
        </a>
      )}
      <a href="/profile">
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </a>
      <ThemeToggle />
    </div>
  </nav>

  )
}

export default Header