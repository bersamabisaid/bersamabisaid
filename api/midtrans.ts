/* eslint-disable camelcase */
import axios, { AxiosError } from 'axios';
import type { NowApiHandler } from '@vercel/node';
import allowCors from './utils/allowCors';

const API_URL = {
  production: 'https://app.midtrans.com/snap/v1/transactions',
  dev: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
};

interface SuccessResponse {
  token: string;
  redirect_url: string;
}

interface ErrorResponse {
  error_messages: Array<string>;
}

const encodeBase64 = (v: string) => Buffer.from(v).toString('base64');

const authString = encodeBase64(`${process.env.MIDTRANS_serverKey || ''}:`);

module.exports = allowCors((async (req, res) => {
  try {
    const transaction = await axios.post<SuccessResponse>(
      API_URL.dev,
      {
        transaction_details: {
          order_id: Date.now(),
          gross_amount: 1,
        },
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${authString}`,
        },
      },
    );

    if (req.headers.accept === 'application/json') res.json(transaction.data);
    else res.redirect(transaction.data.redirect_url);
  } catch (err) {
    const {
      response,
    } = err as AxiosError<ErrorResponse>;

    res.json(response?.data || { error: true });
  }
}) as NowApiHandler);
