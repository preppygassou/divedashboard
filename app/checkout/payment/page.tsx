"use client"

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import { PaymentForm } from '@/components/payment/payment-form';
import { Card } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string>();
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier }),
        });
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    if (tier) {
      createPaymentIntent();
    }
  }, [tier]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="container mx-auto p-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-8 w-8" />
          <span className="text-2xl font-bold">Dive Card</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
            <p className="text-muted-foreground mt-2">
              Enter your payment details to complete your order
            </p>
          </div>

          {clientSecret ? (
            <Elements
              stripe={getStripe()}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                },
              }}
            >
              <PaymentForm tier={tier || 'basic'} />
            </Elements>
          ) : (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}