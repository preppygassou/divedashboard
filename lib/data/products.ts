import { Product } from "@/lib/types/product"

export const products: Record<string, Product> = {
  plus: {
    id: "plus-card",
    name: "plus Dive Card",
    description: "Perfect for beginners and casual divers. Access to essential diving spots and basic features.",
    price: 19900,
    tier: "plus",
    images: [
      {
        id: "blue-1",
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        alt: "Blue diving card front view",
        colorId: "blue"
      },
      {
        id: "black-1",
        url: "https://images.unsplash.com/photo-1582649475121-05c9f3c37f48?w=800&q=80",
        alt: "Black diving card front view",
        colorId: "black"
      },
      {
        id: "silver-1",
        url: "https://images.unsplash.com/photo-1580019542155-247062e19ce4?w=800&q=80",
        alt: "Silver diving card front view",
        colorId: "silver"
      },
      {
        id: "generic-1",
        url: "https://images.unsplash.com/photo-1586043229226-8981c0d4c68c?w=800&q=80",
        alt: "Dive locations preview"
      }
    ],
    attributes: [
      {
        id: "validity",
        name: "Validity",
        value: "12 months"
      },
      {
        id: "dives",
        name: "Number of Dives",
        value: "10 dives"
      },
      {
        id: "locations",
        name: "Access to Locations",
        value: "15 diving spots"
      },
      {
        id: "support",
        name: "Customer Support",
        value: "Email support"
      }
    ],
    switchers: [
      {
        id: "color",
        name: "Card Color",
        options: ["blue", "black", "silver"],
        selected: "blue",
        colors: [
          {
            id: "blue",
            name: "Ocean Blue",
            background: "linear-gradient(135deg, #0396FF 0%, #0D47A1 100%)",
            preview: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
          },
          {
            id: "black",
            name: "Deep Black",
            background: "linear-gradient(135deg, #2C3E50 0%, #000000 100%)",
            preview: "https://images.unsplash.com/photo-1582649475121-05c9f3c37f48?w=800&q=80"
          },
          {
            id: "silver",
            name: "Silver",
            background: "linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)",
            preview: "https://images.unsplash.com/photo-1580019542155-247062e19ce4?w=800&q=80"
          }
        ]
      },
      {
        id: "material",
        name: "Card Material",
        options: ["Standard PVC", "Recycled PVC", "Bio-based"],
        selected: "Standard PVC"
      }
    ],
    features: [
      "10 dives included",
      "Access to 15 diving locations",
      "Basic diving insurance",
      "Mobile app access",
      "Digital dive log",
      "Email support"
    ]
  },
  ultra: {
    id: "pro-card",
    name: "Pro Dive Card",
    description: "For experienced divers seeking premium features and exclusive access to advanced diving spots.",
    price: 39900,
    tier: "ultra",
    images: [
      {
        id: "gold-1",
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        alt: "Gold diving card front view",
        colorId: "gold"
      },
      {
        id: "platinum-1",
        url: "https://images.unsplash.com/photo-1582649475121-05c9f3c37f48?w=800&q=80",
        alt: "Platinum diving card front view",
        colorId: "platinum"
      },
      {
        id: "rose-gold-1",
        url: "https://images.unsplash.com/photo-1580019542155-247062e19ce4?w=800&q=80",
        alt: "Rose Gold diving card front view",
        colorId: "rose-gold"
      },
      {
        id: "pro-locations",
        url: "https://images.unsplash.com/photo-1586043229226-8981c0d4c68c?w=800&q=80",
        alt: "Premium dive locations preview"
      }
    ],
    attributes: [
      {
        id: "validity",
        name: "Validity",
        value: "12 months"
      },
      {
        id: "dives",
        name: "Number of Dives",
        value: "25 dives"
      },
      {
        id: "locations",
        name: "Access to Locations",
        value: "35 diving spots"
      },
      {
        id: "support",
        name: "Customer Support",
        value: "Priority email & phone support"
      },
      {
        id: "insurance",
        name: "Insurance Coverage",
        value: "Premium coverage"
      }
    ],
    switchers: [
      {
        id: "color",
        name: "Card Color",
        options: ["gold", "platinum", "rose-gold"],
        selected: "gold",
        colors: [
          {
            id: "gold",
            name: "Premium Gold",
            background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
            pattern: "https://images.unsplash.com/photo-1586043229226-8981c0d4c68c?w=800&q=80"
          },
          {
            id: "platinum",
            name: "Platinum",
            background: "linear-gradient(135deg, #E5E4E2 0%, #B4B4B4 100%)",
            pattern: "https://images.unsplash.com/photo-1582649475121-05c9f3c37f48?w=800&q=80"
          },
          {
            id: "rose-gold",
            name: "Rose Gold",
            background: "linear-gradient(135deg, #FFE5E5 0%, #FFB6C1 100%)",
            pattern: "https://images.unsplash.com/photo-1580019542155-247062e19ce4?w=800&q=80"
          }
        ]
      },
      {
        id: "material",
        name: "Card Material",
        options: ["Premium Metal", "Recycled Metal", "Carbon Fiber"],
        selected: "Premium Metal"
      },
      {
        id: "finish",
        name: "Surface Finish",
        options: ["Matte", "Glossy", "Brushed"],
        selected: "Matte"
      }
    ],
    features: [
      "25 dives included",
      "Access to 35 diving locations",
      "Premium diving insurance",
      "Priority mobile app features",
      "Advanced dive log analytics",
      "Priority email & phone support",
      "Exclusive diving events access",
      "Equipment rental discounts",
      "Free dive photography sessions"
    ]
  },
  max: {
    id: "elite-card",
    name: "Elite Dive Card",
    description: "The ultimate diving experience with unlimited dives, exclusive benefits, and VIP treatment.",
    price: 79900,
    tier: "max",
    images: [
      {
        id: "black-diamond-1",
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        alt: "Black Diamond card front view",
        colorId: "black-diamond"
      },
      {
        id: "pearl-white-1",
        url: "https://images.unsplash.com/photo-1582649475121-05c9f3c37f48?w=800&q=80",
        alt: "Pearl White card front view",
        colorId: "pearl-white"
      },
      {
        id: "cosmic-black-1",
        url: "https://images.unsplash.com/photo-1580019542155-247062e19ce4?w=800&q=80",
        alt: "Cosmic Black card front view",
        colorId: "cosmic-black"
      },
      {
        id: "elite-locations",
        url: "https://images.unsplash.com/photo-1586043229226-8981c0d4c68c?w=800&q=80",
        alt: "Elite dive locations preview"
      }
    ],
    attributes: [
      {
        id: "validity",
        name: "Validity",
        value: "12 months"
      },
      {
        id: "dives",
        name: "Number of Dives",
        value: "Unlimited"
      },
      {
        id: "locations",
        name: "Access to Locations",
        value: "All diving spots worldwide"
      },
      {
        id: "support",
        name: "Customer Support",
        value: "24/7 concierge service"
      },
      {
        id: "insurance",
        name: "Insurance Coverage",
        value: "Comprehensive global coverage"
      },
      {
        id: "concierge",
        name: "Personal Concierge",
        value: "Dedicated diving concierge"
      }
    ],
    switchers: [
      {
        id: "color",
        name: "Card Color",
        options: ["black-diamond", "pearl-white", "cosmic-black"],
        selected: "black-diamond",
        colors: [
          {
            id: "black-diamond",
            name: "Black Diamond",
            background: "linear-gradient(135deg, #000000 0%, #2C3E50 100%)",
            pattern: "https://images.unsplash.com/photo-1580019542155-247062e19ce4?w=800&q=80"
          },
          {
            id: "pearl-white",
            name: "Pearl White",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)",
            pattern: "https://images.unsplash.com/photo-1582649475121-05c9f3c37f48?w=800&q=80"
          },
          {
            id: "cosmic-black",
            name: "Cosmic Black",
            background: "linear-gradient(135deg, #111111 0%, #434343 100%)",
            pattern: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
          }
        ]
      },
      {
        id: "material",
        name: "Card Material",
        options: ["Titanium", "Carbon Fiber", "Ceramic"],
        selected: "Titanium"
      },
      {
        id: "finish",
        name: "Surface Finish",
        options: ["Diamond Cut", "Ceramic Coated", "Laser Etched"],
        selected: "Diamond Cut"
      },
      {
        id: "personalization",
        name: "Personalization",
        options: ["Custom Engraving", "Digital Signature", "Hologram"],
        selected: "Custom Engraving"
      }
    ],
    features: [
      "Unlimited dives",
      "Global diving spot access",
      "Comprehensive insurance",
      "VIP mobile app access",
      "Advanced analytics & reporting",
      "24/7 concierge service",
      "Private diving sessions",
      "Helicopter transfers",
      "Luxury equipment provided",
      "Private yacht access",
      "Exclusive retreats & events",
      "Personal diving instructor"
    ]
  }
}