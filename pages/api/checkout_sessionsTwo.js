const stripe = require("stripe")(
  "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"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1MIlPkGeoqyJBYDEr0hjJqmC",
            quantity: 1,
          },
        ],
        payment_method_types: ["card"],
        mode: "subscription",
        //success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        //cancel_url: `${req.headers.origin}/?canceled=true`,
        success_url: `${req.headers.origin}/app/storeinfo2/id`,
        cancel_url: `${req.headers.origin}/app/boost`,
      });
      console.log(session.url);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
