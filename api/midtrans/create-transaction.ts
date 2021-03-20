import type { NowRequest, VercelRequest } from '@vercel/node';
import hasRequiredBody from '../_middleware/hasRequiredBody';
import apiMethod from '../_middleware/apiMethod';
import allowCors from '../_middleware/allowCors';
import midtrans from '../_services/midtrans';
import { collection, proxy, uiDataFactory } from '../_services/firebase';
import { CreateTransactionRequestBody, isCreateTransactionRequestBody } from '../../shared/types/backendRequest';

const buildUrl = ({ headers, url = '' }: VercelRequest) => {
  const proto = (headers['x-forwarded-proto'] || 'http') as string;
  const host = (headers['x-forwarded-host'] || 'localhost') as string;

  return `${proto}://${host}${url}`;
};

const storeToFirestore = async (data: CreateTransactionRequestBody, redirecUrl: string) => {
  const donatorRef = await collection.Donators.add(proxy.create(data.donator));
  const donationRef = await collection.Donations.add(proxy.create({
    eventId: data.eventId,
    donatorId: donatorRef.id,
    amount: data.amount,
    message: data.message,
    _ui: {
      donatorNickName: uiDataFactory({
        foreignKey: donatorRef.id,
        data: data.donator.nickName,
      }),
      eventName: uiDataFactory({
        foreignKey: data.eventId,
        data: data.eventName,
      }),
    },
    _system: {
      finishPaymentRedirectUrl: redirecUrl,
    },
  }));

  return [donatorRef, donationRef] as const;
};

const handler = hasRequiredBody(isCreateTransactionRequestBody, async (req, res) => {
  const { donator, ...data } = req.body;

  try {
    const [, donationRef] = await storeToFirestore({ ...data, donator }, buildUrl(req as NowRequest));
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
          first_name: donator.nickName,
          email: donator.email,
          phone: donator.phoneNumber,
        },
      },
    });

    res.json(transactionRedirectUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = allowCors(apiMethod.post(handler));
