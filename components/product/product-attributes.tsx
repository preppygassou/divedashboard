"use client"

import { ProductAttribute, ProductSwitcher } from "@/lib/types/product"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductAttributesProps {
  attributes: ProductAttribute[]
  variations: ProductSwitcher[]
  selectedVariation: ProductSwitcher
  setselectedVariation: () => {}
}

export function ProductAttributes({ attributes, variations, selectedVariation, setselectedVariation }: ProductAttributesProps) {

  return (
    <>
      {attributes?.map((attribute) => {
        /* const attribute?.variations = variations?.filter(
          (variation) => variation.attributeId === attribute.attribute.id
        );
    console.log("attribute?.variations",attribute?.variations) */
        return (
          <div key={attribute.id} className="space-y-4">
            <h2
              className="text-xl font-bold mb-2"
              style={{
                color: "#F2F1F7",
                fontSize: "24px",
                fontWeight: 900,
                lineHeight: "129%", // 30.96px
              }}
            >
              {attribute?.attribute?.name}
            </h2>

            {attribute?.variations?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {attribute?.variations.map((variation) => (
                  <button
                    key={variation.id}
                    onClick={() => {
                      setselectedVariation(variation.switcher);
                      console.log(`Selected variation: ${variation?.switcher?.name}`);
                    }}
                    className={cn(
                      "relative h-25 w-25 overflow-hidden",
                      "transition-all",
                      selectedVariation?.name === variation?.switcher?.name
                        ? "border-2 border-[#F2F1F7] rounded-lg"
                        : ""
                    )}
                  >
                    {
                      attribute?.attribute?.type === "image" ?
                        <Image
                          src={
                            variation?.switcher?.image?.url
                          }
                          alt={variation?.switcher?.name}
                          width={126}
                          height={121}
                          className="shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"

                        /> : attribute?.attribute?.type === "color" ?
                          <div
                            className="absolute inset-0"
                            style={{ background: variation?.switcher?.image?.color }}
                          /> : <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 capitalize">
                            {variation?.switcher?.name}
                          </div>
                    }

                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>


  )
}