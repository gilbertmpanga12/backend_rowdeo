const router = require('express').Router();
const firestore = require('firebase-admin');
const collection = 'rowdeousers';
const endpointSecret = process.env.endpointSecret;
router.post('/', async function(req,res){
    try{
        console.log('ALLLLLLLLL CALLLEDDDD'); 
        console.log(JSON.stringify(req.body));
        const body = req.body.userId;
        const stripeSignature = request.headers['stripe-signature'];
        const event = stripe.webhooks.constructEvent(request.body, stripeSignature, endpointSecret);
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
              console.log("checkout.session.completed", sessionComplete);
              // Then define and call a function to handle the event checkout.session.completed
              break;
            // ... handle other event types
            default:
              console.log(`Unhandled event type ${event.type}`);
          }
        
        // await firestore.firestore()
        // .collection(collection).doc(body).update({subscriptionStatus: true});
        res.status(204).send({message: "Successfully upgraded plan"});
    }catch(error){
      console.log('error is hereeee', JSON.stringify(error));
        res.status(500).send({error});
    }   
});

module.exports = router;