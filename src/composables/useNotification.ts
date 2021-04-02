import { Notify } from 'quasar';

const successBaseOpts: Parameters<typeof Notify['create']>[0] = {
  type: 'positive',
};

const errorBaseOpts: Parameters<typeof Notify['create']>[0] = {
  type: 'negative',
};

export const notifyError = (err: NonNullable<unknown>) => {
  console.log(err);

  if (typeof err === 'string') {
    return Notify.create({
      ...errorBaseOpts,
      message: err,
    });
  }

  if (typeof err === 'object') {
    const { message = '', code = '' } = (err as Record<string, string>) || { message: '', code: '' };
    const msgWithCode = code ? `(${code})` : '';

    return Notify.create({
      ...errorBaseOpts,
      message: `${message}${msgWithCode}`,
    });
  }

  return Notify.create({
    ...errorBaseOpts,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message: `${err}`,
  });
};

export const notifySuccess = (message: string) => Notify.create({
  ...successBaseOpts,
  message,
});

export default function useNotification() {
  return {
    notifyError,
    notifySuccess,
  };
}
