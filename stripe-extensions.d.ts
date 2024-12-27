import Stripe from 'stripe';

declare module 'stripe' {
  namespace Stripe {
    interface ConfirmPaymentOptions {
      elements?: Stripe.StripeElements;
      clientSecret: string;
      confirmParams: Stripe.PaymentIntents.ConfirmPaymentData;
      redirect?: 'always' | 'if_required';
    }

    function confirmPayment(
      options: ConfirmPaymentOptions
    ): Promise<never | { error: Stripe.StripeError }>;
  }
}