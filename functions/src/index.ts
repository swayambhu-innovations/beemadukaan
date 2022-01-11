const functions = require('firebase-functions');
const Razorpay = require('razorpay');
let key_id = 'rzp_test_UHcxu4dBF7Du1Z';
let key_secret = 'njAwxLhWKOf6PKVw7XBUYAyE';
let request = require('request');
const cors = require('cors')({ origin: true });
let instance = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});

exports.createOrder = functions.https.onRequest((req: any, res: any) => {
  return cors(req, res, () => {
    let options = {
      amount: req.body.amount,
      currency: 'INR',
      receipt: req.body.receipt,
    };
    instance.orders.create(options, (err: any, order: any) => {
      order ? res.status(200).send(order) : res.status(500).send(err);
    });
  });
});
exports.capturePayments = functions.https.onRequest((req: any, res: any) => {
  return cors(req, res, () => {
    request(
      {
        method: 'POST',
        url: `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${req.body.payment_id}/capture`,
        form: {
          amount: req.body.amount,
        },
      },
      (error: any, response: any, body: any) => {
        response
          ? res.status(200).send({
              res: response,
              req: req.body,
              body: body,
            })
          : res.status(500).send(error);
      }
    );
  });
});