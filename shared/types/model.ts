import type fb from 'firebase';
import type fbNode from 'firebase-admin';

export type TfbTimestamp<isNodeCtx = false> = isNodeCtx extends true
  ? fbNode.firestore.Timestamp
  : fb.firestore.Timestamp;

export interface TimestampedModel<isNodeCtx = false> {
  _updated: TfbTimestamp<isNodeCtx>;
  _created: TfbTimestamp<isNodeCtx>;
  _deleted: TfbTimestamp<isNodeCtx> | null;
}

export type Model<T, isNodeCtx = false> = T & TimestampedModel<isNodeCtx>;

export type ModelInObject<T> = Model<T> & {
  _uid: string;
}

export interface ModelUIData<T = unknown, isNodeCtx = false> {
  value: T;
  lastUpdate: TfbTimestamp<isNodeCtx>;
  expiration: TfbTimestamp<isNodeCtx> | null;
}

export type ModelUI<T extends Record<string, unknown>, isNodeCtx = false> = {
  [i in keyof T]: ModelUIData<T[i], isNodeCtx>;
}

export type ModelUIHasRelation<T, isNodeCtx = false, TDoc = unknown> = {
  foreignKey: isNodeCtx extends true
    ? fbNode.firestore.DocumentReference<TDoc>
    : fb.firestore.DocumentReference<TDoc>;
  data: T;
}

export type ApiResponse<T = Record<string, unknown> | undefined> = {
  success: boolean;
  message: string;
  data: T;
}
