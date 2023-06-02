import Stripe from "stripe";

export type ICheckoutParams = Pick<Stripe.Checkout.SessionCreateParams,
    'success_url' |
    'cancel_url' |
    'customer_email' |
    'client_reference_id' |
    'line_items' |
    'mode'
>;