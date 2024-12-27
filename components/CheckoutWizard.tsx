"use client"
import { menuItems } from '@/lib/menu';
import React from 'react';
import { usePathname } from 'next/navigation'

export default function CheckoutWizard({}) {
  const path = usePathname();
  const menuItem = menuItems.find(item => item.path === path);

  return (
    <div className="">
      {menuItem && (
        <>
        <h3 className="text-[#1E1E1E] text-shadow-md text-[15px] font-extrabold leading-[129%] uppercase">
          étape {menuItem.id}
        </h3>
        <h1 className="text-[#1E1E1E] text-shadow-md font-extrabold leading-[129%] uppercase text-[32px] md:text-[64px]">
          {menuItem.title}
        </h1>
        <p className="text-[#1E1E1E] text-[24px] font-semibold leading-[137.5%]">
          {menuItem.description}
        </p>
        
        </>
      )}
    </div>
  );
}