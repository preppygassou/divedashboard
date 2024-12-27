"use client"

import { useEffect, useState } from 'react';
/* import { Elements } from '@stripe/react-stripe-js'; */
import { Elements, CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { updateShippingInfo,addProductToCart } from '@/store/action';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from '@/components/payment/payment-form';
import { Card } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { useStore } from '@/store';
import Loading from '@/components/global/loading';
import CheckoutLayout from '@/components/CheckoutLayout';
import CheckoutWizard from '@/components/CheckoutWizard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';


if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const PayementPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useStore();
  const [shippingPrice, setShippingPrice] = useState(0);
  const [orderId, setOrderId] = useState();
  const searchParams = useSearchParams();
 const user = useCurrentUser()
/* 
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
  }, [tier]); */

   // Fetch PaymentIntent clientSecret from API when the page loads
   useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {

        const paymentIntent = await axios.post('/api/stripe/payment_intent', {
          amount: state?.cart?.price * 100, // The amount in cents
          currency: 'eur', // The currency
        });
        setClientSecret(paymentIntent.data.clientSecret);
      } catch (error) {
        console.error('Error creating PaymentIntent:', error);
      }
    };

    fetchPaymentIntent();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    // @ts-ignore
    event.preventDefault();
  
    if (!stripe || !elements) {
      return; // Ensure Stripe is loaded
    }
  
    setLoading(true);
    setErrorMessage(''); // Reset error state before proceeding
  
    // Ensure form submission via Elements is handled
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError?.message||"");
      setLoading(false);
      return;
    }
  
    try {
      // Create WooCommerce order if it doesn't exist
      let order=orderId ;
      if (!orderId) {
        const { data } = await axios.post('/api/orders/create-order', {
          items: [state?.cart], // Wrap state.cart in an array
          billingAddress: state?.billing,
          shippingAddress: state?.shipping,
          userId:user?.id
        });
       
        setOrderId(data.orderId);
        order=data.orderId
      }
  
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret, // Ensure clientSecret is available
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`, // Redirect URL on success
        },
        shipping: JSON.stringify(state?.shipping),  // Add shipping details to metadata
        metadata: {
          orderId: order,
          line_items: JSON.stringify([state?.cart]), // Add cart items to metadata
          billing: JSON.stringify(state?.billing), // Add billing details to metadata
          shipping: JSON.stringify(state?.shipping) // Add shipping details to metadata
        },
        redirect: "always"
        /* redirect: "if_required" */
      });

      if (!error && paymentIntent?.status === 'succeeded'&&order) {
        // Payment succeeded, update the WooCommerce order
        try {
            const response = await axios.patch('/api/orders/update-order', { orderId: order, status: 'processing', transaction_id: paymentIntent.id,paymentStatus:paymentIntent?.status });

          if (response.status === 200) {
            updateShippingInfo(dispatch,{})
            addProductToCart(dispatch,{})
        // Successfully updated the WooCommerce order
        window.location.href = `/checkout/success?order_id=${order}`; // Redirect to success page
          } else {
  
        setErrorMessage('Une erreur s\'est produite lors de la mise à jour de la commande.');
          }
        } catch (error) {
          
          setErrorMessage('Une erreur s\'est produite lors de la mise à jour de la commande.');
        }
      }
  
      if (error) {
        // Handle payment error
        setErrorMessage(error.message || 'Le paiement a échoué.');
      } else {
        // Payment succeeded, update the WooCommerce order
        try {
          const response = await axios.post('/api/woo/update-order', { orderId });
          if (response.status === 200) {
            // Successfully updated the WooCommerce order
            window.location.href = '/checkout/success'; // Redirect to success page
          } else {
            console.error('Failed to update WooCommerce order');
            setErrorMessage('Une erreur s\'est produite lors de la mise à jour de la commande.');
          }
        } catch (error) {
          console.error('WooCommerce order update error:', error);
          setErrorMessage('Une erreur s\'est produite lors de la mise à jour de la commande.');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage('Le paiement a échoué. Veuillez réessayer.');
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };
  


  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loading></Loading>
      </div>
    );
  }


  return (
    <CheckoutLayout>
      <CheckoutWizard />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-20 md:flex-row">
          <div className="flex-1 space-y-[19px]">
            <div className="space-y-[19px]">
              <div className="flex justify-center" style={{
                width: '372', height: '223'
              }}>


                {state?.cart && (
                  <Image
                    src={
                      state.cart?.variationFeaturedImage
                    }
                    alt={state.cart[0]?.variationName}
                    width={372} height={223} className="max-w-60 h-auto transform rotate-90"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-[#1E1E1E]">Total HT :</span>
                <span className="text-[#1E1E1E]">{state?.cart?.price}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1E1E1E]">Frais de livraison</span>
                <span className="text-[#1E1E1E]">GRATUIT</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-[#1E1E1E]">Total</span>
                <span className="text-[#1E1E1E]">{state?.cart?.price}€</span>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-[19px]">
            <h2 className="text-xl font-semibold text-[#1E1E1E]">Avec quelle carte bancaire ?</h2>

            <div className="space-y-[19px]">

              {clientSecret && <PaymentElement />}
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </div>
            
          </div>
          <>

          </>
          <div className="flex-1 flex justify-center items-center">

            <Button 
            className="bg-[#1E1E1E] text-white rounded-[30px] px-[61px] py-[9px] shadow-md hover:bg-[#1E1E1E]" 
            style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.08)' }} type="submit" disabled={loading}>
              {loading ? 'Traitement...' : 'Valider & Payer'}
            </Button>

          </div>

        </div>
      </form>
    </CheckoutLayout>
  );
}

export default function Payment() {
  const { state } = useStore();
  return (
    <Elements stripe={stripePromise} options={{ mode: "payment", amount: Number(state?.cart?.price), currency: "eur" }}>
      <PayementPage />
    </Elements>
  );
}