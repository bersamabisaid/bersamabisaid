import { memoize } from 'lodash';
import storageReferencePathName from './storageReference';
import 'firebase/storage';
import type fb from 'firebase';
import type { Storage } from '../types/firebase';

const init = memoize((app: fb.app.App) => {
  const storage = app.storage();
  const rootRef = storage.ref().root;

  const refs = {
    Programs: rootRef.child(storageReferencePathName.PROGRAMS),

  };

  return {
    storage,
    refs,
  };
});
interface IStorageFile {
  readonly URL: string;
  readonly metadata: Storage.metadata;
}

const getStorageFile = async (storageRef: fb.storage.Reference): Promise<IStorageFile> => ({
  URL: await storageRef.getDownloadURL() as Readonly<string>,
  metadata: await storageRef.getMetadata() as Readonly<Storage.metadata>,
});

export {
  init as default,
  IStorageFile,
  getStorageFile,
};
