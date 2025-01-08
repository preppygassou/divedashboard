import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Activity, ShoppingCart, User } from "lucide-react";
/* import { useEffect, useState } from "react"; */
import { Product } from "@/lib/types/product";
import { getProducts } from "@/lib/data/product";
import { currentUser } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
/* const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
          const loadProducts = async () => {
            const fetchedProducts = await getProducts()
            setProducts(fetchedProducts)
          }
          loadProducts()
        }, [])
     */
        /* 2024-12-26 07:11:41.543

     pro cm551rb2y000rd4j5dhqyu6c1
     at   cm54wi0yk0001d4j50mwxymhq

     new-1735191753524
     new-1735191767757
     new-1735191802209
     new-1735191829761
     new-1735191845824
     cm54ycd2b000ad4j5wgsxaa9i */


        const fetchedProducts = await getProducts()
        const user = await currentUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
        {/* <svg width="108" height="14" viewBox="0 0 108 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M61.9961 0H68.0448C70.1137 0 71.728 0.521415 72.8877 1.56425C74.3241 2.84171 75.0423 4.62104 75.0423 6.90223C75.0423 9.26164 74.3702 11.0866 73.0261 12.3771C71.9059 13.459 70.2389 14 68.025 14H61.9961V0ZM65.6925 3.01117V10.9888H67.7285C68.8882 10.9888 69.7447 10.6955 70.2982 10.1089C70.9571 9.39199 71.2866 8.3622 71.2866 7.01955C71.2866 5.49441 70.8319 4.38641 69.9226 3.69553C69.3033 3.23929 68.4862 3.01117 67.4715 3.01117H65.6925Z" fill="#F2F1F7"/>
        <path d="M80.7108 0V14H77.0143V0H80.7108Z" fill="#F2F1F7"/>
        <path d="M95.2663 0L90.6606 14H86.4107L81.9236 0H85.798L87.0828 4.06704C87.8076 6.34823 88.3084 8.45996 88.5851 10.4022C88.8882 8.44693 89.3956 6.34171 90.1072 4.08659L91.392 0H95.2663Z" fill="#F2F1F7"/>
        <path d="M107.818 0V3.01117H100.188V5.33799H107.166V8.21229H100.188V10.9888H107.996V14H96.4917V0H107.818Z" fill="#F2F1F7"/>
        <path d="M29.4993 11.5144C31.7817 11.5144 34.2837 10.2624 35.9787 8.36163C37.6749 10.2624 40.1779 11.5144 42.4603 11.5144C44.634 11.5144 46.957 10.2645 46.957 6.75713C46.957 3.24972 44.634 2.00202 42.4603 1.99986C40.1779 1.99986 37.676 3.25188 35.9798 5.15263C34.2848 3.25188 31.7828 1.99986 29.5004 1.99986C27.3256 1.99986 25.0004 3.24972 25.0004 6.75713C25.0004 10.2645 27.3256 11.5144 29.4993 11.5144ZM42.4603 3.90168C44.1202 3.90168 44.9809 4.86287 44.9809 6.75713C44.9809 8.65139 44.1202 9.61258 42.4603 9.61258C40.6236 9.61258 38.4927 8.43839 37.183 6.75713C38.4927 5.07587 40.6236 3.90168 42.4603 3.90168ZM29.4993 3.90168C31.336 3.90168 33.4669 5.07587 34.7766 6.75713C33.468 8.43839 31.3349 9.61257 29.4993 9.61257C27.8394 9.61257 26.9765 8.65139 26.9765 6.75713C26.9765 4.86287 27.8394 3.90168 29.4993 3.90168Z" fill="url(#paint0_linear_1504_1126)"/>
        <path d="M15 7L0.999999 7M0.999999 7L6.25 13M0.999999 7L6.25 1" stroke="#F2F1F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear_1504_1126" x1="35.9787" y1="1.99986" x2="35.9787" y2="11.5144" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="1" stop-color="#A3A3A3"/>
          </linearGradient>
        </defs>
      </svg> */}
          <img width={100} src="https://dive.paris/wp-content/uploads/2024/12/DIVE_2025-1024x413.png" />
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