import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/strip";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceId } = req.body;

  if (req.method !== 'POST') { // inpedir de navegas pelo url
    return res.status(405).json({ error: "Method not allowed!"});
  }

  if (!priceId) {
    return res.status(400).json({ error: "Price not found!"});
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl, // url de sucesso para onde mandar o user dps de sucesso
    cancel_url: cancelUrl, // url de cancelamento para onde mandar o user dps de cancel
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}