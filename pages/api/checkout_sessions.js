const stripe = require("stripe")(
  "sk_test_51M7Ro4GeoqyJBYDEdMmGsYfDad2uEvDYFQFaMQZqS6UY5GwN7USQzUBNzVoOY7azHXeZJush7uWUZNQ4tnrGgHmA004f2BeJFH"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1M7tZiGeoqyJBYDEyiXtS1km",
            quantity: 1,
          },
        ],
        payment_method_types: ["card"],
        mode: "subscription",
        //success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        //cancel_url: `${req.headers.origin}/?canceled=true`,
        success_url: `${req.headers.origin}/app/storeinfo/id`,
        cancel_url: `${req.headers.origin}/app/pricing`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}