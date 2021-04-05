import { date } from 'quasar';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const dateToDateString = (d: Parameters<typeof date['formatDate']>[0]) => date.formatDate(d, DATE_FORMAT);

export const dateStringToDate = (d: string) => date.extractDate(d, DATE_FORMAT);

export const toIdr = (n: number, maximumFractionDigits = 2) => n.toLocaleString('ID', { style: 'currency', currency: 'IDR', maximumFractionDigits });
