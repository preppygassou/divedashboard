

declare module 'confirmPayment' {
  function confirmPayment(options: {
    elements?: StripeElements;
    clientSecret: string;
    confirmParams: paymentIntents.ConfirmPaymentData;
    redirect?: 'always' | 'if_required';
  }): Promise<never | { error: StripeError }>;

  export = confirmPayment;
}
