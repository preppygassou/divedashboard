"use client"
import React, { useState, useEffect } from "react";
import Loading from "../global/loading";
import Link from "next/link";
import { Activity, User } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

interface OrderDetailsProps {
  orderId: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useCurrentUser()

  useEffect(() => {
    // Fetch the order details from your API
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <Loading />;
  if (!order) return <p>Commande non trouvée.</p>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <img width={100} src="https://dive.paris/wp-content/uploads/2024/12/DIVE_2025-1024x413.png" />
        </Link>
        <div className="flex items-center space-x-4">
          {/*  <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link> */}
          {user?.role === 'ADMIN' && (
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <Activity className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </nav>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Détails de la commande</h1>

        {/* Order Summary */}
        <div className="border p-4 rounded mb-4">
          <h2 className="text-lg font-semibold">Résumé de la commande</h2>
          <p>ID de la commande: {order?.id}</p>
          <p>Date de la commande: {new Date(order?.createdAt).toLocaleDateString()}</p>
          <p>Statut: <span className="font-medium">{order?.status}</span></p>
          <p>Total: ${order?.totalAmount.toFixed(2)}</p>
        </div>

        {/* Product List */}
        <div className="border p-4 rounded mb-4">
          <h2 className="text-lg font-semibold">Produits</h2>
          <ul className="space-y-4">
            {order?.orderItems?.map((orderItem: any) => (
              <li key={orderItem.product.id} className="flex justify-between">
                <span>{orderItem.product.name} x{orderItem?.quantity}</span>
                <span>${(orderItem.price * orderItem.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping Information */}
        <div className="border p-4 rounded mb-4">
          <h2 className="text-lg font-semibold">Informations de livraison</h2>
          <p>Nom: {order?.shippingAddress?.last_name} {order?.shippingAddress?.first_name}</p>
          <p>Adresse: {order?.shippingAddress?.address}</p>
          <p>Ville: {order?.shippingAddress?.city}</p>
          <p>Code postal: {order?.shippingAddress?.postcode}</p>
          <p>Pays: {order?.shippingAddress?.country}</p>
        </div>

        {/* Billing Information */}
        <div className="border p-4 rounded mb-4">
          <h2 className="text-lg font-semibold">Informations de facturation</h2>
          <p>Nom: {order?.billingAddress?.last_name} {order?.billingAddress?.first_name}</p>
          <p>Adresse: {order?.billingAddress?.address}</p>
          <p>Ville: {order?.billingAddress?.city}</p>
          <p>Code postal: {order?.billingAddress?.postcode}</p>
          <p>Pays: {order?.billingAddress?.country}</p>
        </div>

        {/* Payment Details */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold">Détails de paiement</h2>
          <p>Méthode de paiement: {order?.paymentMethodTitle}</p>
          <p>Statut du paiement: <span className="font-medium">{order?.paymentStatus === 'succeeded' ? 'Payé' : 'Non payé'}</span></p>
          {/* <p>ID de transaction: {order?.transactionId}</p> */}
        </div>
      </div>

    </main>

  );
};

export default OrderDetails;
