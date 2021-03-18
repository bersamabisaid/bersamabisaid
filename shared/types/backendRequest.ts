/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Donator } from '../../shared/types/modelData';

export interface CreateTransactionRequestBody {
  eventId: string;
  eventName: string;
  donator: Donator;
  amount: number;
  message: string;
}

export const isDonator = function (data: any): data is Donator {
  return Boolean(
    data?.nickName
    && data?.fullName
    && data?.email
    && data?.address
    && data?.phoneNumber,
  );
};

export const isCreateTransactionRequestBody = function (data: any): data is CreateTransactionRequestBody {
  return Boolean(
    data?.eventId
    && data?.eventName
    && isDonator(data?.donator)
    && data?.amount
    && data?.message,
  );
};
