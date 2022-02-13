
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: { // For sample support and debugging, not required for production:
      name: "stripe-samples/accept-a-payment/payment-element",
      version: "0.0.2",
      url: "https://github.com/stripe-samples"
    }
  });

exports.createPayementIntent = async (req, res, next) => {
    try {
        const {paymentMethodType,currency} = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          currency: 'EUR',
          amount: currency,
          payment_method_types: [paymentMethodType],
        });
        res.json({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (e) {
        return res.status(400).send({
          error: {
            message: e.message,
          },
        });
      }
}

exports.createPayement = async (req, res, next) => {
    // try {
    //     const {paymentMethodId,paymentIntentId} = req.body;
    //     const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId,{
    //         payment_method: paymentMethodId
    //     });
    //     res.json({
    //         clientSecret: paymentIntent.client_secret,
    //     });
    // } catch (e) {
    //     return res.status(400).send({
    //         error: {
    //             message: e.message,
    //         },
    //     });
    // }
}


exports.webhook = async (req, res) => {
    let data, eventType;

    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // we can retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }
  
    if (eventType === 'payment_intent.succeeded') {
      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log('💰 Payment captured!');
    } else if (eventType === 'payment_intent.payment_failed') {
      console.log('❌ Payment failed.');
    }
    res.sendStatus(200);
}

