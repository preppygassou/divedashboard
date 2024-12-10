import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { CreditCard, ShoppingCart, User } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-8 w-8" />
          <span className="text-2xl font-bold">Dive Card</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Trois possibilités</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Deviens membre avec Plus, Affirme toi avec Ultra, Impose toi avec Max
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Dive Plus', image: '/images/dive-plus.jpg', description: 'Version par défaut, non personnalisée et qui te donne accès aux expériences' },
            { name: 'Dive Ultra', image: '/images/dive-ultra.jpg', description: 'Le début des privilèges sur cette carte métallique gravée au laser' },
            { name: 'Dive Max', image: '/images/dive-max.jpg', description: 'Le max de privilèges avec une bordure haut de gamme (or, diamant, ect)' }
          ].map((tier) => (
            <Card key={tier.name} className="p-6 hover:shadow-lg transition-shadow">
              <img src={tier.image} alt={tier.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-4">{tier.name}</h3>
              <div className="space-y-4">
          <p className="text-muted-foreground">
            {tier.description}
          </p>
          <Button className="w-full" asChild>
            <Link href={`/checkout/shipping?tier=${tier.name.toLowerCase()}`}>
              Get Started
            </Link>
          </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}