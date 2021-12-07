require('dotenv').config();
const app = require('express')();
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const port = 3000;

app.listen(() => {
console.log("App running!");
},port);