
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Stripe with your secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "sk_test_51234567890", {
      apiVersion: "2023-10-16",
    });

    const { amount, currency = 'usd', donor_info, payment_method } = await req.json();

    console.log('Creating payment session:', { amount, currency, donor_info, payment_method });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: donor_info.email,
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Donation to Santa's Heart",
              description: "Supporting children's education and development programs",
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
      metadata: {
        donor_name: donor_info.name,
        donor_email: donor_info.email,
        donor_phone: donor_info.phone || "",
        payment_method: payment_method,
      },
    });

    console.log('Payment session created:', session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
