import type fb from 'firebase';

export interface TimestampedModel {
  _created: fb.firestore.Timestamp;
  _updated: fb.firestore.Timestamp;
  _deleted: fb.firestore.Timestamp | null;
}

export type Model<T> = T & TimestampedModel;

export type ModelInObject<T> = Model<T> & {
  _uid: string;
}

export interface ModelUIData<T = unknown> {
  value: T;
  lastUpdate: fb.firestore.Timestamp;
  expiration: fb.firestore.Timestamp | null;
}

export type ModelUI<T extends Record<string, unknown>> = {
  [i in keyof T]: ModelUIData<T[i]>;
}

export type ModelUIHasRelation<T> = {
  foreignKey: string;
  data: T;
}

export type ApiResponse<T = Record<string, unknown>> = {
  success: boolean;
  message: string;
  data: T;
}
