import * as functions from 'firebase-functions';
import { db } from '../service/firebaseAdmin';
import midtrans from '../service/midtrans';
import firestoreCollection, { firestoreProxy, getItemRefsFromTransactionRef } from '../service/firestoreCollection';
import { addProgramDonationProgress } from './donation';
import hasRequiredBody from '../middleware/hasRequiredBody';
import apiMethod from '../middleware/apiMethod';
import allowCors from '../middleware/allowCors';
import { isPaymentWebhookRequestBody } from '../../../shared/types/backendRequest';
import type { DocRef } from '../../../shared/firestoreCollection';
import type { GetStatusTransaction } from '../../../shared/types/midtransApi';
import type { PaymentStatus } from '../../../shared/types/modelData';

interface paymentSummaryPayload {
  transactionStatus: GetStatusTransaction['transaction_status'];
  fraudStatus: GetStatusTransaction['fraud_status'];
}

const getTransactionStatusSummary = ({ transactionStatus, fraudStatus }: paymentSummaryPayload) => {
  let paymentSummary: PaymentStatus['status'] = 'pending';

  if (transactionStatus === 'capture') {
    if (fraudStatus) {
      if (fraudStatus === 'deny') {
        paymentSummary = 'fail';
      } else if (fraudStatus === 'challenge') {
        paymentSummary = 'need_action';
      }
    }
    paymentSummary = 'accepted';
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
          const [programRef] = await getItemRefsFromTransactionRef(transactionRef) as DocRef.ProgramDonationModel<true>[];
          const donationRef = firestoreCollection.Donations(programRef).doc(order_id);

          await addProgramDonationProgress(donationRef);
          // set donation document visibility by restoring the document
          fbt.update(donationRef, firestoreProxy.restore());
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
