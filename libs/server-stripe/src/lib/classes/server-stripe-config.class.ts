import Stripe from 'stripe';

const apiVersion = '2022-08-01';
const maxNetworkRetries = 3;

export class ServerStripeConfig {
    constructor(public STRIPE_SECRET_ACCESS_KEY: string, public serverStripeConfigOptions?: Stripe.StripeConfig) {
        if (!serverStripeConfigOptions) {
            this.serverStripeConfigOptions = { apiVersion, maxNetworkRetries }
        } else {
            if (!this.serverStripeConfigOptions.apiVersion) {
                this.serverStripeConfigOptions.apiVersion = apiVersion;
            }

            if (!this.serverStripeConfigOptions.maxNetworkRetries) {
                this.serverStripeConfigOptions.maxNetworkRetries = maxNetworkRetries;
            }
        }
    }
}