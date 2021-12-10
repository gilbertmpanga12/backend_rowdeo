const router = require('express').Router();
const firestore = require('firebase-admin');
const stripe = require('../stripe_config');
const collection = 'rowdeousers';
const endpointSecret = process.env.endpointSecret;
const bodyParser = require('body-parser');

router.post('/', async function(req,res){
    try{
        const stripeSignature = req.headers['stripe-signature'];
        const payload = req.rawBody;
        const event = stripe.webhooks.constructEvent(payload, stripeSignature, endpointSecret);
        
        switch (event.type) {
            case 'checkout.session.async_payment_failed':
              const sessionFailed = event.data.object;
              console.log("checkout.session.async_payment_failed", sessionFailed);
              // Then define and call a function to handle the event checkout.session.async_payment_failed
              break;
            case 'checkout.session.async_payment_succeeded':
              const sessionSuccess = event.data.object;
              console.log("checkout.session.async_payment_succeeded", sessionSuccess)
              // Then define and call a function to handle the event checkout.session.async_payment_succeeded
              break;
            case 'checkout.session.completed':
              const sessionComplete = event.data.object;
              const userId = sessionComplete['client_reference_id'];
              await firestore.firestore()
              .collection(collection).doc(userId).update({subscriptionStatus: true});
              // Then define and call a function to handle the event checkout.session.completed
              break;
            // ... handle other event types
            default:
              console.log(`Unhandled event type ${event.type}`);
          }
        
        res.status(200).send({message: "Successfully upgraded plan"});
    }catch(error){
        res.status(500).send({error: JSON.stringify(error)});
    }   
});

module.exports = router;