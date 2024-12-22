import { Router, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = Router();

router.post(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { product, card } = req.body;

    if (!product || !card) {
      res.status(400).json({ error: "Product and card details are required." });
      return; // Ensure the function returns void
    }

    try {
      // CREATE STRIPE PAYMENT TOKEN
      const stripeToken = await stripe.tokens.create({ card });

      // CREATE STRIPE CUSTOMER
      const stripeCustomer = await stripe.customers.create({
        email: "test@nishimwe.dev",
        source: stripeToken.id,
        address: { line1: "KK 137 ST", postal_code: "10001", city: "Kigali" },
        shipping: {
          name: "Nishimwe",
          address: { line1: "KK 137 ST", postal_code: "10001", city: "Kigali" },
        },
        name: "NISHIMWE",
      });

      // CREATE STRIPE CHARGE
      const stripeCharge = await stripe.charges.create({
        amount: product.price * 100, // Convert to cents
        currency: "usd",
        customer: stripeCustomer.id,
        //source:token.id
        description: `Purchased the ${product.name} for ${product.price}`,
      });

      // SEND RESPONSE
      res.status(200).json({
        message: "Payment was successful",
        charge: stripeCharge,
      });
    } catch (error: any) {
      if (error.type === "StripeCardError") {
        res.status(400).json({ error: error.message });
        return; // Ensure the function returns void
      }
      res.status(500).json({ error: error.message });
      return; // Ensure the function returns void
    }
  })
);

export default router;
