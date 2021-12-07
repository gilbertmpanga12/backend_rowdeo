const router = require('express').Router();
const firestore = require('firebase-admin');
const collection = 'rowdeousers';
router.put('/', async function(req,res){
    try{
        const body = req.body.userId;
        await firestore.firestore()
        .collection(collection).doc(body).update({subscriptionStatus: true});
        res.status(204).send({message: "Successfully upgraded plan"});
    }catch(error){
        res.status(500).send({error});
    }   
});

module.exports = router;