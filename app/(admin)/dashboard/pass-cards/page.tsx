"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PassCardsTable } from "@/components/admin/pass-cards/pass-cards-table"
import { PassCardFilters } from "@/components/admin/pass-cards/pass-card-filters"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Your modal component
import { useForm } from "react-hook-form";

export default function PassCardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log("New Pass Card Data:", data);
    // Add API call to create a new pass card
    reset(); // Reset the form after submission
  };

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
           {/* Create New Pass Card Button */}
           <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                New Pass Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Pass Card</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  {...register("name")}
                  placeholder="Pass Card Name"
                  required
                />
                <Input
                  {...register("type")}
                  placeholder="Type (e.g., Gold, Silver)"
                  required
                />
                <Input
                  {...register("validity")}
                  placeholder="Validity (e.g., 2024-12-31)"
                  required
                  type="date"
                />
                <Input
                  {...register("status")}
                  placeholder="Status (e.g., Active, Expired)"
                  required
                />
                <DialogFooter>
                  <Button type="submit" className="bg-green-500 hover:bg-green-600">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <PassCardFilters />
        <PassCardsTable searchQuery={searchQuery} />
      </Card>
    </div>
  )
}