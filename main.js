require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const payments = require('./controllers/payments');
const upgradeplan = require('./controllers/upgradeplan');
const admin = require("firebase-admin");
const port = 3000;
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/create-payment-intent', payments);
app.use('/upgrade-plan', payments);
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "rowdeo-app",
        "private_key_id": process.env.private_key_id,
        "private_key": process.env.private_key,
        "client_email": process.env.client_email,
        "client_id": process.env.client_id,
        "auth_uri": process.env.auth_uri,
        "token_uri": process.env.token_uri,
        "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
        "client_x509_cert_url": process.env.client_x509_cert_url
    })
});
app.listen(port, () => {
console.log("App running! ✅");
});