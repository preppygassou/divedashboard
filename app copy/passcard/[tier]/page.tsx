import { useEffect, useState } from "react";
import { ProductDetails } from "@/components/product/product-details";
import { notFound } from "next/navigation";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { getProducts, getProductsWithGroupedVariations } from "@/lib/data/product";
import Menu from "@/components/menu";

interface ProductPageProps {
  params: {
    tier: string;
  };
}


export async function generateStaticParams() {
  const products = await getProducts();
  return Object.keys(products).map((tier) => ({
    tier,
  }));
}


export default async function ProductPage({ params }: ProductPageProps) {
 // const [product, setProduct] = useState(null);
 const products = await getProductsWithGroupedVariations();
  const product = products.find((p) => p.tier === params.tier);
 /*  useEffect(() => {
    async function fetchProduct() {
      const products = await getProducts();
      const product = products[params.tier];

      if (!product) {
        notFound();
      } else {
        setProduct(product);
      }
    }

    fetchProduct();
  }, [params.tier]);
 */
  if (!product) {
    return null; // or a loading spinner
  }

  return (
    <main style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)', backdropFilter: 'blur(11.5px)' }} className="min-h-screen">
      {/* <nav className="container mx-auto p-4">
        <Link href="/products" className="flex items-center space-x-2 hover:opacity-80">
          <CreditCard className="h-8 w-8" />
          <span className="text-2xl font-bold">Dive Card</span>
        </Link>
      </nav> */}
      <div className="md:hidden  w-full p-[10px]">
         <Menu type={"white"} />
       </div>

      <div className="w-full h-full">
        <ProductDetails product={product} />
      </div>
    </main>
  );
}