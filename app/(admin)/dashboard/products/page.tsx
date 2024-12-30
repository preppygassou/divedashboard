import { getAttributes } from "@/lib/data/attribute"
import ProductsListPage from "@/components/admin/products/listdetaills"
import { getProducts } from "@/lib/data/product"

export default async function ProductsPage() {

  const fetchedallAttributes = await getAttributes()
  const fetchedProducts = await getProducts()
  return (
    <ProductsListPage allAttributes={fetchedallAttributes} fetchedProducts={fetchedProducts}/>
  )
}