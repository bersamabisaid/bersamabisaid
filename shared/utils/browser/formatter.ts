import { date } from 'quasar';

const DATE_FORMAT = 'DD/MM/YYYY';

const dateToDateString = (d: Parameters<typeof date['formatDate']>[0]) => date.formatDate(d, DATE_FORMAT);

const dateStringToDate = (d: string) => date.extractDate(d, DATE_FORMAT);

const toIdr = (n: number, maximumFractionDigits = 2) => n.toLocaleString('ID', { style: 'currency', currency: 'IDR', maximumFractionDigits });

export {
  DATE_FORMAT,
  dateToDateString,
  dateStringToDate,
  toIdr,
};
