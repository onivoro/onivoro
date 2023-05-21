import { Module } from '@nestjs/common';
import { moduleFactory } from '@onivoro/server-common';
import { StripeService } from './services/stripe.service';
import { ServerStripeConfig } from './classes/server-stripe-config.class';
import Stripe from 'stripe';

@Module({})
export class ServerStripeModule {
  static configure(config: ServerStripeConfig) {
    return moduleFactory({
      module: ServerStripeModule,
      providers: [
        {
          provide: ServerStripeConfig,
          useValue: config
        },
        {
          provide: StripeService,
          useValue: new StripeService(new Stripe(config.STRIPE_SECRET_ACCESS_KEY, config.serverStripeConfigOptions))
        }
      ]
    });
  }
}

