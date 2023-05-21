import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {

  async createCheckoutSession(
    success_url: string,
    cancel_url: string,
    customer_email: string,
    client_reference_id: string,
    line_items: Stripe.Checkout.SessionCreateParams['line_items'],
    ) {
    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: 'payment',
      success_url,
      cancel_url,
      line_items,
      customer_email,
      client_reference_id,
    };

    return await this.stripe.checkout.sessions.create(params);
  }

  constructor(
    public stripe: Stripe,
  ) {}
}
