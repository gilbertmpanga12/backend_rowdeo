require('dotenv').config();
const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const payments = require('./controllers/payments');
const upgradeplan = require('./controllers/upgradeplan');
const admin = require("firebase-admin");
const { getFirebaseUser } = require('./middleware/firebaseSecurity');
const port = 3000;
app.use(cors());
app.use(helmet());
// access before json() parsing for body.rawß
app.use('/upgrade-plan', express.json({verify: (req,res,buf) => { req.rawBody = buf }}), upgradeplan);
app.use(bodyParser.json());
app.use('/create-payment-intent', getFirebaseUser, payments);
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "rowdeo-app",
        "private_key_id": process.env.private_key_id,
        "private_key": process.env.private_key.replace(/\\n/g, '\n'),
        "client_email": process.env.client_email,
        "client_id": process.env.client_id,
        "auth_uri": process.env.auth_uri,
        "token_uri": process.env.token_uri,
        "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
        "client_x509_cert_url": process.env.client_x509_cert_url
    })
});

app.get('/', (req,res) => res.send({message: "App works 🥳🥳"}));
app.listen(process.env.PORT || port, () => {
console.log("App running! ✅");
});