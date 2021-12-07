const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async function(req,res){
    try{
    const amount = req.body.amount;
    const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: 'rowdeo-premium',
                  },
                  unit_amount: Number(amount) * 100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
          });
          res.json({ id: session.id });
    }catch(error){
    res.status(500).send(JSON.stringify(error));
    }   
});

module.exports = router;