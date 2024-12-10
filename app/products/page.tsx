import { products } from "@/lib/data/products"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CreditCard } from "lucide-react"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="container mx-auto p-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-8 w-8" />
          <span className="text-2xl font-bold">Dive Card</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Dive Cards</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect dive card that matches your diving needs and experience level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(products).map((product) => (
            <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <p className="text-xl font-bold mb-6">€{(product.price / 100).toFixed(2)}</p>
              <Button className="w-full" asChild>
                <Link href={`/products/${product.tier}`}>
                  Learn More
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}