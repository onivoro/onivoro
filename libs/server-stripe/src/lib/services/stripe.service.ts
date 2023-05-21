import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ICheckoutParams } from '../interfaces/checkout-params.interface';

@Injectable()
export class StripeService {

  async createCheckoutSession(params: ICheckoutParams) {

    return await this.stripe.checkout.sessions.create(params);
  }

  async listCheckoutSessions (sessionId: string) {
    return await this.stripe.checkout.sessions.retrieve(sessionId);
  }

  constructor(
    public stripe: Stripe,
  ) {}
}
