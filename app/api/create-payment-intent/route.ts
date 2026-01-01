import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { CartItem } from '@/app/context/CartContext'; // Adjust path as needed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use a recent API version
});

export async function POST(req: Request) {
  try {
    const { cartItems }: { cartItems: CartItem[] } = await req.json();

    // Calculate the total amount on the server to prevent client-side manipulation
    const totalAmount = cartItems.reduce((sum, item) => {
      // IMPORTANT: In a real application, you should fetch product prices from your database
      // based on item.id to prevent price manipulation on the client-side.
      // For this example, we'll trust the client-provided price for simplicity.
      return sum + item.price * item.quantity;
    }, 0);

    // Stripe expects the amount in cents (or smallest currency unit)
    const amountInCents = Math.round(totalAmount * 100);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'ron', // Assuming RON currency. Adjust if necessary.
      automatic_payment_methods: {
        enabled: true,
      },
      // You can add more metadata here if needed, e.g., order ID, customer ID
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Error creating PaymentIntent:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
