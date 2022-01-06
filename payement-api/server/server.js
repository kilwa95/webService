const express = require('express');
const app = express();
const {resolve} = require('path');
const env = require('dotenv').config({path: './.env'});
const {createPayementIntent,webhook} = require('./src/controller/payement.controller');

app.use(express.static(process.env.STATIC_DIR));
app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html');
  res.sendFile(path);
});

app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post('/create-payment-intent',createPayementIntent)
app.post('/webhook', webhook);

app.listen(4242, () =>
  console.log(`Node server listening at http://localhost:4242`)
);
