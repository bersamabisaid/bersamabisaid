import type fb from 'firebase';

export interface TimestampedModel {
  _created: fb.firestore.Timestamp;
  _updated: fb.firestore.Timestamp;
  _deleted: fb.firestore.Timestamp | null;
}

export type Model<T> = T & TimestampedModel;

export type ModelToJson<T> = Model<T> & {
  uid: string;
}

export interface ModelUIData<T> {
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
