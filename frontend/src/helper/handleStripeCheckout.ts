"use client";
import { loadStripe } from '@stripe/stripe-js';
import { 
    STRIPE_PUBLIC_KEY
} from '@/config/envs';

if (!STRIPE_PUBLIC_KEY) {
    throw new Error('Stripe public key is not defined');
}

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const handleCheckout = async (sessionId: string) => {
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
        sessionId,
    });

    if (error) {
        console.error('Error:', error);
    }
};
