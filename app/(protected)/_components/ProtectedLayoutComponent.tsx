"use client"
import React, { useEffect } from 'react'
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/routes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ProtectedLayoutComponent = ({children,isLoggedIn}) => {
 
  
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    const search = searchParams.get('search');
  
    useEffect(() => {
      const handleAuth = async () => {
        
        const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
        const isPublicRoute = publicRoutes.includes(pathname);
        const isAuthRoute = authRoutes.includes(pathname);
        const isAdminRoute = pathname.startsWith('/admin');
        const isCheckoutRoute = pathname.startsWith('/checkout');
  
      
        if (isAuthRoute && isLoggedIn) {
          router.replace(DEFAULT_LOGIN_REDIRECT);
          return;
        }
  
        if (!isLoggedIn && !isPublicRoute) {
          const callbackUrl = `${pathname}${search ? search : ""}`;
          router.replace(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
          return;
        }
  
        if (!isLoggedIn && (isAdminRoute || isCheckoutRoute)) {
          const callbackUrl = `${pathname}${search ? search : ""}`;
          router.replace(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
          return;
        }
      };
  
      handleAuth();
    }, [router, pathname, search,isLoggedIn]); 
   /*  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
        const isPublicRoute = publicRoutes.includes(pathname);
        const isAuthRoute = authRoutes.includes(pathname);
        const isAdminRoute = pathname.startsWith('/dashboard');
        const isCheckoutRoute = pathname.startsWith('/checkout');
  
        if (isApiAuthRoute) {
          return;
        }
  
        if (isAuthRoute && isLoggedIn) {
          router.replace(DEFAULT_LOGIN_REDIRECT);
          return;
        }
  
        if (!isLoggedIn && !isPublicRoute) {
          const callbackUrl = `${pathname}${search ? search : ""}`;
          router.replace(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
          return;
        }
  
        if (!isLoggedIn && (isAdminRoute || isCheckoutRoute)) {
          const callbackUrl = `${pathname}${search ? search : ""}`;
          router.replace(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
          return;
        }  */
  return (
    <>{children}</>
  )
}

export default ProtectedLayoutComponent