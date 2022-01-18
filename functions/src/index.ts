const functions = require('firebase-functions');
const Razorpay = require('razorpay');
let key_id = 'rzp_live_ojGuKvMDp0167v';
let key_secret = 'e99WZHA5aJkND4yhlc7kE3ob';
let request = require('request');
import * as cors from 'cors';
const corsHandler = cors({origin: true});
let instance = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});

exports.createOrder = functions.https.onRequest((req: any, res: any) => {
  corsHandler(req, res, () => {
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
  corsHandler(req, res, () => {
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