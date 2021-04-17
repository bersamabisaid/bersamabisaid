import type { NowRequest, VercelRequest } from '@vercel/node';
import hasRequiredBody from '../_middleware/hasRequiredBody';
import apiMethod from '../_middleware/apiMethod';
import allowCors from '../_middleware/allowCors';
import midtrans from '../_services/midtrans';
import { collection, proxy, uiDataFactory } from '../_services/firebase';
import { PayDonationRequestBody, isPayDonationRequestBody } from '../../shared/types/backendRequest';
import type { ApiResponse } from '../../shared/types/model';

type SuccessResponse = ApiResponse<{
  redirectURL: string;
}>;

const buildUrl = ({ headers, url = '' }: VercelRequest) => {
  const proto = (headers['x-forwarded-proto'] || 'http') as string;
  const host = (headers['x-forwarded-host'] || 'localhost') as string;

  return `${proto}://${host}${url}`;
};

const storeToFirestore = async (data: PayDonationRequestBody, redirecUrl: string) => {
  const eventRef = collection.Events.doc(data.eventId);
  const transactionRef = collection.Transactions.doc();
  const donatorRef = await collection.TransactionClients.add(proxy.create({
    ...data.donator,
    fullname: data.donator.fullName,
  }));
  const donationRef = await collection.Donations.add(proxy.create({
    transaction: transactionRef,
    event: eventRef,
    donator: donatorRef,
    amount: data.amount,
    message: data.message,
    hideDonator: data.hideDonator,
    _ui: {
      donatorName: uiDataFactory({
        foreignKey: donatorRef.id,
        data: data.donator.fullName,
      }),
      eventName: uiDataFactory({
        foreignKey: data.eventId,
        data: data.eventName,
      }),
    },
    _system: {
      finishPaymentRedirectURL: redirecUrl,
    },
  }));

  return [donatorRef, donationRef] as const;
};

const handler = hasRequiredBody(isPayDonationRequestBody, async (req, res) => {
  const { donator, ...data } = req.body;

  try {
    const finishPaymentRedirectUrl = data.finishPaymentRedirectURL || buildUrl(req as NowRequest);
    const [, donationRef] = await storeToFirestore({ ...data, donator }, finishPaymentRedirectUrl);
    const transactionRedirectUrl = await midtrans.snap.createTransactionRedirectUrl({
      transaction_details: {
        order_id: donationRef.id,
        gross_amount: data.amount,
      },
      snapFull: {
        item_details: {
          id: donationRef.id,
          name: data.eventName,
          price: 1,
          quantity: data.amount,
        },
        customer_details: {
          first_name: donator.fullName,
          email: donator.email,
          phone: donator.phoneNumber,
        },
      },
    });

    res.json({
      success: true,
      message: '',
      data: { redirectURL: transactionRedirectUrl },
    } as SuccessResponse);
  } catch (err) {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    console.error(err);
    res.status(500).json({
      success: false,
      message: err?.message || '',
      data: err,
    } as ApiResponse);
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  }
});

module.exports = allowCors(apiMethod.post(handler));
