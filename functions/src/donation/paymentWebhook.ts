import * as functions from 'firebase-functions';
import midtrans from '../service/midtrans';
import firestoreCollection, { getItemRefsFromTransactionRef } from '../service/firestoreCollection';
import hasRequiredBody from '../middleware/hasRequiredBody';
import apiMethod from '../middleware/apiMethod';
import allowCors from '../middleware/allowCors';
import { isPaymentWebhookRequestBody } from '../../../shared/types/backendRequest';
import { GetStatusTransaction } from '../../../shared/types/midtransApi';
import { PaymentStatus } from '../../../shared/types/modelData';
import { addEventDonationProgress } from './donation';
import { DocRef } from '../../../shared/firestoreCollection';
import { db } from '../service/firebaseAdmin';

interface paymentSummaryPayload {
  transactionStatus: GetStatusTransaction['transaction_status'];
  fraudStatus: GetStatusTransaction['fraud_status'];
}

const getTransactionStatusSummary = ({ transactionStatus, fraudStatus }: paymentSummaryPayload) => {
  let paymentSummary: PaymentStatus['status'] = 'pending';

  if (transactionStatus === 'capture') {
    if (fraudStatus === 'accept') {
      paymentSummary = 'accepted';
    } else if (fraudStatus === 'challenge') {
      paymentSummary = 'need_action';
    } else {
      paymentSummary = 'fail';
    }
  } else if (transactionStatus === 'settlement') {
    paymentSummary = 'accepted';
  } else if (
    transactionStatus === 'cancel'
    || transactionStatus === 'expire'
    || transactionStatus === 'pending'
    || transactionStatus === 'refund'
  ) {
    paymentSummary = transactionStatus;
  } else {
    paymentSummary = 'fail';
  }

  return paymentSummary;
};

const donationPaymentWebhookHandler = apiMethod.post(hasRequiredBody(
  isPaymentWebhookRequestBody,
  async ({ body }, res) => {
    try {
      /* eslint-disable camelcase */
      const {
        order_id, transaction_status, fraud_status, transaction_time,
      } = (await midtrans.snap.transaction.notification(body)) as GetStatusTransaction;
      const paymentSummary: PaymentStatus = {
        status: getTransactionStatusSummary({
          transactionStatus: transaction_status,
          fraudStatus: fraud_status,
        }),
        timestamp: transaction_time,
      };

      const transactionRef = firestoreCollection.Transactions.doc(order_id);

      await db.runTransaction(async (fbt) => {
        if (paymentSummary.status === 'accepted') {
          const [eventRef] = await getItemRefsFromTransactionRef(transactionRef) as DocRef.EventDonationModel<true>[];
          const donationRef = firestoreCollection.Donations(eventRef).doc(order_id);

          await addEventDonationProgress(donationRef);
        }

        fbt.update(transactionRef, { paymentStatus: paymentSummary });
      });

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
