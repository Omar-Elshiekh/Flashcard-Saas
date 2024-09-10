import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to format amount for Stripe
const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);  // Stripe expects amount in cents
};

export async function POST(req) {
  try {
    const { plan } = await req.json(); // Parse the request body to get the plan

    let priceAmount;
    let planName;

    // Set price and plan name based on the plan
    if (plan === 'basic') {
      priceAmount = formatAmountForStripe(5);  // $5 for Basic Plan
      planName = 'Basic Subscription';
    } else if (plan === 'pro') {
      priceAmount = formatAmountForStripe(10);  // $10 for Pro Plan
      planName = 'Pro Subscription';
    } else {
      return NextResponse.json({ error: { message: 'Invalid plan selected' } }, { status: 400 });
    }

    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planName,
            },
            unit_amount: priceAmount,  // Use the amount set above
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}
