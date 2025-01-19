"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { PassCard } from "@/lib/types/pass-card"
import { Input } from "@/components/ui/input"
import { PassCardsTable } from "@/components/admin/pass-cards/pass-cards-table"
import { PassCardFilters } from "@/components/admin/pass-cards/pass-card-filters"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Your modal component
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { passCardSchema } from "@/lib/schemas/passcard"
import axios from "axios"
import { PassCardFormDialog } from "@/components/admin/pass-cards/pass-card-form-dialog"
import { useToast } from "@/components/ui/use-toast"
import { PassCardDetailsDialog } from "@/components/admin/pass-cards/pass-card-details-dialog"
import Loading from "@/components/global/loading"

export default function PassCardsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([])
  const [passCards, setPassCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedPassCard, setSelectedPassCard] = useState<PassCard | null>(null)
  const { toast } = useToast()

  const handleCreatePasscard = async (passcard: PassCard) => {

    try {
      setLoading(true)
      const selectedOrder = orders?.find(order => order.id === passcard.orderId);
      const userId = selectedOrder ? selectedOrder.userId : null;

      // Check if a passcard with the same orderId already exists
      const existingPassCard = passCards.find(pc => pc.orderId === passcard.orderId);
      if (existingPassCard) {
        toast({
          title: "Erreur",
          description: "Un pass card avec cet commande existe déjà.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { data } = await axios.post('/api/pass-cards', { ...passcard, userId });
      
      setPassCards((prevPassCards) => [...prevPassCards, data]);
      setIsCreateDialogOpen(false)
      toast({
        title: "Pass card créé",
        description: `${passcard.cardNumber} a été créé avec succès.`,
      })
      setLoading(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la création du produit",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handleUpdatePasscard = async (passcard: PassCard) => {
    try {
      setLoading(true)
      const { data } = await axios.patch('/api/pass-cards/' + passcard.id, passcard);
      setPassCards((prevPassCards) =>
        prevPassCards.map((pc) => (pc.id === data.id ? data : pc))
      );
      setIsCreateDialogOpen(false)
      toast({
        title: "Pass card mis à jour",
        description: `${passcard.cardNumber} a été mis à jour avec succès.`,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        title: "Erreur",
        description: "Échec de la mise à jour du Pass card",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    async function fetchsetPassCards() {
      try {
        const response = await fetch(`/api/pass-cards`)
        const data = await response.json()
        setPassCards(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchsetPassCards()
  }, [])
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`/api/orders`)
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`/api/orders`)
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  /*  console.log("orders",orders)
  */
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Pass Cards Management</h1>
        <div className="flex flex-col gap-4 p-4 border-b sm:flex-row">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pass cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />

        </div>
      </div>

      <Card>
        <PassCardFilters onCreateNew={() => setIsCreateDialogOpen(true)} />
        <PassCardsTable passCards={passCards} searchQuery={searchQuery} setSelectedPassCard={setSelectedPassCard} selectedPassCard={selectedPassCard} />
      </Card>
      {/* Create New Pass Card Button */}
      <PassCardFormDialog
        orders={orders}
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreatePasscard}
      />
      <PassCardDetailsDialog
        orders={orders}
        passcard={selectedPassCard}
        setSelectedPassCard={setSelectedPassCard}
        open={!!selectedPassCard}
        onOpenChange={(open) => !open && setSelectedPassCard(null)}
        onSubmit={handleUpdatePasscard}

      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  )
}