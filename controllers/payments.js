const { baseUrl } = require('../constants');
const stripe = require('../stripe_config');
const router = require('express').Router();


router.post('/', async function(req,res){
    try{
    const amount = req.body.amount;
    const userId = req.body.userId;
    const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            client_reference_id: userId,
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
            success_url: baseUrl + 'success' + '/success',
            cancel_url: baseUrl + 'cancel' + '/failed',
          });
          res.json({ id: session.id });
    }catch(error){
    res.status(500).send(JSON.stringify(error));
    }   
});

module.exports = router;