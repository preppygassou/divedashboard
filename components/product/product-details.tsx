"use client"

import { useState, useEffect } from "react"
import { Product, ProductImage } from "@/lib/types/product"
import { ProductImages } from "./product-images"
import { ProductAttributes } from "./product-attributes"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { ProductFeaturedImage } from "./product-feature-image"
import Menu from "../menu"
import { useStore } from '@/store';
import { addProductToCart } from "@/store/action"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {

  const [selectedVariation, setselectedVariation] = useState(null);

  /* useEffect(() => {
    if (product?.variations?.length > 0) {
      setselectedVariation(product.variations[0].switcher);
    }
  }, [product?.variations]); */

  const { state, dispatch } = useStore();
  const router = useRouter();

  const addToCart = () => {
    const cartItem = {
      product_id: product.id,
      variation_id: selectedVariation?.switcher?.id,
      variationName: selectedVariation?.switcher?.name,
      variationFeaturedImage: selectedVariation?.switcher?.featuredImage,
      price: Number(product.price),
      quantity: 1,
    };
    addProductToCart(dispatch, cartItem)
    router.push('/checkout/shipping');
    // Add your add to cart logic here
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 h-full">
      <ProductFeaturedImage featuredImage={selectedVariation&&selectedVariation?.featuredImage?selectedVariation?.featuredImage:product?.featuredImage} />
      {/* <ProductImages images={currentImages} /> */}      
      <div className="space-y-4 md:space-y-[117px] p-4 md:p-[39px] h-auto md:h-full">
      <div className="hidden md:block">
          <Menu type={"white"} />
        </div>
        <div className="space-y-4 md:space-y-[40px]">
          <div className="">
        <p
          style={{
            color: '#F2F1F7',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.07)',
            fontFamily: '"Roboto Flex"',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: 900,
            lineHeight: '129%', // 19.35px
          }}
        >
          {selectedVariation?.availableQuantity ? selectedVariation?.availableQuantity + " " + "Pass Restant(s)" : "Out of Stock"}
        </p>
        <h1
          className="text-2xl font-bold mb-2"
          style={{
            color: '#F2F1F7',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.07)',
            fontSize: '48px',
            fontWeight: 900,
            lineHeight: '129%', // 61.92px
          }}
        >
          {product?.name}
        </h1>
        <p
          className="text-[#515459] text-[20px] font-semibold leading-[33px]"
        >
          Price: €{product?.price}
        </p>
        <p
          className="text-[#515459] mb-4"
          style={{
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '143.75%', // 23px
          }}
        >
          {product&&product?.description?.replace(/<\/?[^>]+(>|$)/g, "")}
        </p>
          </div>
        
         
        <ProductAttributes attributes={product?.attributes} selectedVariation={selectedVariation} setselectedVariation={setselectedVariation}/>


          <div className="flex-1 flex items-center">
          <Button
        className="bg-[#F2F1F7] text-black rounded-[30px] px-[61px] py-[9px] shadow-md hover:bg-[#F2F1F7]"
        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.08)' }}
        onClick={addToCart}
          >
        Commander
          </Button>
          </div>
        </div>

       {/*  <Button asChild className="w-full">
          <Link href={`/checkout/shipping?tier=${product?.tier}`}>
            Get Started
          </Link>
        </Button> */}
      </div>
    </div>
  )
}