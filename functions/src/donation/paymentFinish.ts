import * as functions from 'firebase-functions';
import { db } from '../service/firebaseAdmin';
import firestoreCollection, { isSnapshotExists } from '../service/firestoreCollection';
import hasRequiredQuery from '../middleware/hasRequiredQuery';
import apiMethod from '../middleware/apiMethod';
import { FinishPaymentRedirectQuery } from '../../../shared/types/midtransApi';
import type { DocRef } from '../../../shared/firestoreCollection';

/* eslint-disable camelcase, @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFinishPaymentRedirectQuery = function (data: any): data is FinishPaymentRedirectQuery {
  return typeof data?.order_id === 'string';
};
/* eslint-enable camelcase, @typescript-eslint/no-unsafe-member-access */

const buildFinishRedirectUrl = (baseUrl: string, eventId: string, donationId: string) => {
  const url = new URL(baseUrl);

  url.searchParams.forEach((val, key) => url
    .searchParams.delete(key));

  url.searchParams.append('donationId', donationId);
  url.searchParams.append('eventId', eventId);

  return url.toString();
};

export const getFinishRedirectUrl = async (transactionId: string) => db
  .runTransaction(async (fbt) => {
    const transactionSnapshot = await fbt.get(firestoreCollection.Transactions.doc(transactionId));

    if (isSnapshotExists(transactionSnapshot)) {
      const { items: [eventItem] } = transactionSnapshot.data();

      if (eventItem) {
        const eventRef = eventItem.ref as DocRef.EventModel<true>;
        const donationRef = firestoreCollection.Donations(eventRef).doc(transactionId);
        const donationSnapshot = await donationRef.get();

        if (isSnapshotExists(donationSnapshot)) {
          const { _system: { finishPaymentRedirectURL } } = donationSnapshot.data();

          return buildFinishRedirectUrl(finishPaymentRedirectURL, eventRef.id, donationRef.id);
        }
      }
    }

    return undefined;
  });

const paymentFinishRequestHandler = apiMethod.get(hasRequiredQuery(
  isFinishPaymentRedirectQuery,
  async ({ query }, res) => {
    const finishRedirectUrl = await getFinishRedirectUrl(query.order_id);

    if (finishRedirectUrl) {
      res.redirect(finishRedirectUrl);
    }

    res.status(404).end();
  },
));

export default functions.https.onRequest(paymentFinishRequestHandler);
