/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as functions from 'firebase-functions';
import firestoreCollection, { isSnapshotExists } from '../service/firestoreCollection';
import { FinishPaymentRedirectQuery } from '../../../shared/types/midtransApi';
import hasRequiredQuery from '../middleware/hasRequiredQuery';
import apiMethod from '../middleware/apiMethod';

/* eslint-disable camelcase */
const isFinishPaymentRedirectQuery = function (data: any): data is FinishPaymentRedirectQuery {
  return Boolean(
    data?.order_id,
  );
};
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable camelcase */

export const getFinishRedirectUrl = async (transactionId: string) => {
  const donationDoc = firestoreCollection.Donations.doc(transactionId);
  const donationSnapshot = await donationDoc.get();

  if (isSnapshotExists(donationSnapshot)) {
    const { _system } = donationSnapshot.data();
    const url = new URL(_system.finishPaymentRedirectURL);

    url.searchParams.forEach((val, key) => url
      .searchParams.delete(key));

    url.searchParams.append('donationId', donationDoc.id);

    return url.toString();
  }

  return undefined;
};

const paymentFinishRequestHandler = apiMethod.get(hasRequiredQuery(
  isFinishPaymentRedirectQuery,
  async ({ query }, res) => {
    // if (isFinishPaymentRedirectQuery(query)) {
    const finishRedirectUrl = await getFinishRedirectUrl(query.order_id);

    if (finishRedirectUrl) {
      res.redirect(finishRedirectUrl);
    }

    res.status(404).end();
  },
));

export default functions.https.onRequest(paymentFinishRequestHandler);
