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

  export namespace Table {
    // https://quasar.dev/vue-components/table#qtable-api > scopedslots > body-cell-[name]
    export type BodyCellNamed<T> = {
      col: qComponent.ColumnDefinition<T>;
      value: unknown;
      key: string;
      row: T;
      rowIndex: number;
      pageIndex: number;
      cols: qComponent.ColumnDefinition<T>[];
      colsMap: Record<keyof T, qComponent.ColumnDefinition<T>>;
      sort: (colName: string) => void;
      selected: boolean;
      expand: boolean;
      color: string;
      dark: boolean;
      dense: boolean;
    }
  }
}
