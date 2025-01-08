import OrderDetails from '@/components/profile/orderDetails'

const Page = async ({params}:{params: { orderId: string }}) => {
  return (
    <OrderDetails orderId={params.orderId}/>
  )
}

export default Page