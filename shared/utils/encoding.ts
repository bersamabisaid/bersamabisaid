export const base64 = {
  encode(data: string) {
    return Buffer.from(data).toString('base64');
  },
  decode(data: string) {
    return Buffer.from(data, 'base64').toString('ascii');
  },
};
