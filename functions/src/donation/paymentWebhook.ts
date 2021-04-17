import * as functions from 'firebase-functions';
import midtrans from '../service/midtrans';
import firestoreCollection from '../service/firestoreCollection';
import { isPaymentWebhookRequestBody } from '../../../shared/types/backendRequest';
import { GetStatusTransaction } from '../../../shared/types/midtransApi';
import { PaymentStatus } from '../../../shared/types/modelData';
import hasRequiredBody from '../middleware/hasRequiredBody';
import apiMethod from '../middleware/apiMethod';
import allowCors from '../middleware/allowCors';

const donationPaymentWebhookHandler = apiMethod.post(hasRequiredBody(
  isPaymentWebhookRequestBody,
  async ({ body }, res) => {
    try {
      /* eslint-disable camelcase */
      const {
        order_id, transaction_status, fraud_status, transaction_time,
      } = (await midtrans.snap.transaction.notification(body)) as GetStatusTransaction;
      const transactionRef = firestoreCollection.Transactions.doc(order_id);
      const paymentSummary: PaymentStatus = {
        status: 'pending',
        timestamp: transaction_time,
      };

      if (transaction_status === 'capture') {
        if (fraud_status === 'accept') {
          paymentSummary.status = 'accepted';
        } else if (fraud_status === 'challenge') {
          paymentSummary.status = 'need_action';
        } else {
          paymentSummary.status = 'fail';
        }
      } else if (transaction_status === 'settlement') {
        paymentSummary.status = 'accepted';
      } else if (
        transaction_status === 'cancel'
            || transaction_status === 'expire'
            || transaction_status === 'pending'
            || transaction_status === 'refund'
      ) {
        paymentSummary.status = transaction_status;
      } else {
        paymentSummary.status = 'fail';
      }

      await transactionRef.update({ paymentStatus: paymentSummary });

      res.status(200).end();
      /* eslint-enable camelcase */
    } catch (err) {
      functions.logger.error(err);
      res.status(500).json(err);
    }
  },
));

export default functions.https.onRequest(
  allowCors(donationPaymentWebhookHandler),
);
