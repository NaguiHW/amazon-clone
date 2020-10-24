const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HfZ99JtSn1vJ3Q4wT9wtvcpmJmmV0fUM672sM9I4J3bD8kgqu5hXn8TWuHzK3cDX7ciH5DgOepSCbKoUZh4Qzzi00mDgSVu54')

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get('/', (request, response) => response.status(200).send('hello world!'))

app.post('/payments/create', async(request, response) => {
  const total = request.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);