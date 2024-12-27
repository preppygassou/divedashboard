
import React from 'react'
import Menu from './menu'

const CheckoutLayout = ({children}) => {
  return (
    <div className="bg-[#F2F1F7] min-h-screen p-[17px] w-full overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 gap-10">
      <Menu/>
      {children}
      </div>
    </div>
  )
}

export default CheckoutLayout