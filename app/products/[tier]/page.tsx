import { products } from "@/lib/data/products"
import { ProductDetails } from "@/components/product/product-details"
import { notFound } from "next/navigation"
import { CreditCard } from "lucide-react"
import Link from "next/link"

interface ProductPageProps {
  params: {
    tier: string
  }
}

export function generateStaticParams() {
  return Object.keys(products).map((tier) => ({
    tier,
  }))
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products[params.tier]

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="container mx-auto p-4">
        <Link href="/products" className="flex items-center space-x-2 hover:opacity-80">
          <CreditCard className="h-8 w-8" />
          <span className="text-2xl font-bold">Dive Card</span>
        </Link>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <ProductDetails product={product} />
      </div>
    </main>
  )
}