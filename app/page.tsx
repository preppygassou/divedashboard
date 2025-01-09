import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Activity,  User } from "lucide-react";

import { getProducts } from "@/lib/data/product";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import Header from "@/components/header";

export default async function Home() {

        const fetchedProducts = await getProducts()
        const user = currentUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header/>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Trois possibilités</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Deviens membre avec Plus, Affirme toi avec Ultra, Impose toi avec Max
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fetchedProducts?.map((tier) => (
            <Card key={tier.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="relative aspect-square overflow-hidden mb-4">
              <Image src={tier?.featuredImage?.url} alt={tier.name} fill className="object-scale-down h-48 w-96 rounded" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{tier.name}</h3>
              <div className="space-y-4">
              <p className="text-muted-foreground">
                {tier.description}
              </p>
              <Button className="w-full" asChild>
                <Link href={`/passcard/${tier.tier}`}>
                En savoir plus
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