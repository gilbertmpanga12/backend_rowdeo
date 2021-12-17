const key = process.env.PORT ? process.env.STRIPE_SECRET_KEY_LIVE: process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(key);

module.exports = stripe;