require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const payments = require('./controllers/payments');
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const port = 3000;
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/create-payment-intent', payments);
// initializeApp({
//     credential: {},
//     projectId: ""
// });
app.listen(port, () => {
console.log("App running! ✅");
});