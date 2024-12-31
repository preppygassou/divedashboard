"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Award } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Loading from "../global/loading"
import { PassCard } from "@prisma/client"

interface ProfilePassCardProps {
  user: any
}

export function ProfilePassCard({ user }: ProfilePassCardProps) {

  const [cards, setCards] = useState<PassCard[]>([]);
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState<string>("");

   useEffect(() => {
      async function fetchPassCards() {
        try {
          const response = await fetch(`/api/pass-cards?userId=${user.id}`)
          const data = await response.json()
          setCards(data)
        } catch (error) {
          console.error("Error fetching PassCards:", error)
        } finally {
          setLoading(false)
        }
      }
  
      fetchPassCards()
    }, [user.id])

    if (loading) {
      return <Loading/>
    }
  // Filter cards based on search term
 /*  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); */
/*   console.log("cards",cards)
  console.log("cards.length ",cards.length ) */
    if (cards.length === 0 ) {
   return   <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Pas de Pass card Active</h3>
            <p className="text-muted-foreground text-center mb-6">
              Commencez avec une Pass card pour accéder à des lieux exclusifs.
            </p>
            <Button asChild>
              <Link href="/">Voir les Pass Cards</Link>
            </Button>
          </CardContent>
        </Card>
    }

  return (
    <div className="space-y-6">
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
               Mes Pass Cards
              </span>
             {/*  <Badge variant="secondary" className="capitalize">
                {user.cardTier} Niveau
              </Badge> */}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Numéro de Carte</p>
                  <p className="font-mono text-lg">**** **** **** 1234</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Valide Jusqu'à</p>
                <p className="font-mono">12/24</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Plongées Restantes</p>
                <p className="text-2xl font-bold">8/10</p>
              </div>
              <div>
                <p className="text-sm font-medium">Lieux Valides</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div> */}
           
        <ul className="space-y-4">
          {cards.map((card) => (
            <li
              key={card.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{card.cardNumber}</h2>
                <p>Type: {card.tier}</p>
                <p>Validity: {new Date(card.validFrom).toLocaleDateString()} - {new Date(card.validUntil).toLocaleDateString()}</p>
                <p>
                  Status:{" "}
                  <span
                    className={
                      card.status === "activated"
                        ? "text-green-600"
                        : card.status === "expired"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {card.status}
                  </span>
                </p>
              </div>
              <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  View
                </button>
                {card.status === "expired" && (
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Renew
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
          </CardContent>
        </Card>
    </div>
  )
}