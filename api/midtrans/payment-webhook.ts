import { PaymentStatus } from 'app/shared/types/modelData';
import hasRequiredBody from '../_middleware/hasRequiredBody';
import allowCors from '../_middleware/allowCors';
import apiMethod from '../_middleware/apiMethod';
import midtrans from '../_services/midtrans';
import { collection } from '../_services/firebase';
import { isPaymentWebhookRequestBody } from '../../shared/types/backendRequest';
import type { GetStatusTransaction } from '../../shared/types/midtransApi';

const handler = hasRequiredBody(isPaymentWebhookRequestBody, async (req, res) => {
  try {
    /* eslint-disable camelcase */
    const {
      order_id, transaction_status, fraud_status, transaction_time,
    } = (await midtrans.snap.transaction.notification(req.body)) as GetStatusTransaction;
    const doc = collection.Donations.doc(order_id);
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

    await doc.update({ paymentStatus: paymentSummary });

    res.status(200).end();
    /* eslint-enable camelcase */
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = allowCors(apiMethod.post(handler));
