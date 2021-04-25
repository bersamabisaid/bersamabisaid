/* eslint-disable @typescript-eslint/no-namespace */
import type { QTable } from 'quasar';

export namespace qComponent {
  export type ColumnDefinition<T = Record<string, unknown>> = Omit<
    NonNullable<QTable['columns']>[number],
    'field' | 'format' | 'sort' | 'name' | 'align'
  > & {
    name: keyof T | string;
    field: ((row: T) => string) | keyof T;
    format?: (val: T[keyof T], row: T) => string;
    sort?: (a: T[keyof T], b: T[keyof T], rowA: T, rowB: T) => number;
    align?: 'left' | 'center' | 'right';
  }
}
