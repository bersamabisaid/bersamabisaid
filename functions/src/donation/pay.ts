import * as functions from 'firebase-functions';
import firestoreCollection, { firestoreProxy, uiDataFactory } from '../service/firestoreCollection';
import { createTransaction } from '../createTransaction';
import { isPayDonationRequestBody, PayDonationRequestBody } from '../../../shared/types/backendRequest';
import { PayDonationResponse } from '../../../shared/types/backendResponse';
import type { ApiResponse } from '../../../shared/types/model';

export const pay = async ({ donator, ...data }: Required<PayDonationRequestBody>) => {
  const eventRef = firestoreCollection.Events.doc(data.eventId);
  const donatorAsClient = await firestoreCollection.TransactionClients.add(firestoreProxy.create({
    fullname: donator.fullName,
    email: donator.email,
    phoneNumber: donator.phoneNumber,
    address: donator.address,
  }));
  const [transactionAction, transactionRef] = await createTransaction({
    transaction_details: {
      gross_amount: data.amount,
    },
    item_details: [{
      id: data.eventId,
      name: data.eventName,
      price: data.amount,
      quantity: 1,
      ref: eventRef,
    }],
    client: {
      ref: donatorAsClient,
      name: donator.fullName,
    },
  });

  const donationRef = firestoreCollection.Donations(eventRef).doc(transactionRef.id);
  await donationRef.set(firestoreProxy.create({
    event: eventRef,
    transaction: transactionRef,
    donator: donatorAsClient,
    hideDonator: data.hideDonator,
    amount: data.amount,
    message: data.message,
    _ui: {
      donatorName: uiDataFactory({
        foreignKey: donatorAsClient.id,
        data: donator.fullName,
      }),
      eventName: uiDataFactory({
        foreignKey: eventRef.id,
        data: data.eventName,
      }),
    },
    _system: { finishPaymentRedirectURL: data.finishPaymentRedirectURL },
  }));

  return {
    eventRef,
    donatorRef: donatorAsClient,
    donationRef,
    transactionRef,
    transactionAction,
  };
};

const callablePay = functions.https.onCall(async (payload, ctx) => {
  functions.logger.log(payload);
  if (isPayDonationRequestBody(payload)) {
    const finishPaymentRedirectURL = payload.finishPaymentRedirectURL || ctx.rawRequest.url;
    const { donationRef, transactionAction } = await pay({
      ...payload,
      finishPaymentRedirectURL,
    });

    return {
      success: true,
      message: 'Please use this given link to go to the payment page',
      data: {
        // because donationId will be always same to transactionId
        transactionId: donationRef.id,
        redirectURL: transactionAction.redirect_url,
      },
    } as ApiResponse<PayDonationResponse>;
  }

  return {
    success: false,
    message: 'Missing required arguments!',
    data: undefined,
  } as ApiResponse;
});

export default callablePay;
