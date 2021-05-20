import { memoize } from 'lodash';
import storageReferencePathName from './storageReference';
import 'firebase/storage';
import type fb from 'firebase';

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

type StorageFileMetadata<TcustomMetadata = Record<string, unknown>> = {
  readonly bucket: string;
  readonly generation: string;
  readonly metageneration: string;
  readonly fullPath: string;
  readonly name: string;
  readonly size: number;
  readonly timeCreated: string;
  readonly updated: string;
  cacheControl?: string;
  contentDisposition: string;
  contentEncoding: string;
  contentLanguage?: string
  contentType: string;
  customMetadata?: TcustomMetadata;
  md5Hash: string;
  type: string;
  ref: fb.storage.Reference;
}

interface IStorageFile {
  readonly URL: string;
  readonly metadata: StorageFileMetadata;
}

const getStorageFile = async (storageRef: fb.storage.Reference): Promise<IStorageFile> => ({
  URL: await storageRef.getDownloadURL() as Readonly<string>,
  metadata: await storageRef.getMetadata() as Readonly<StorageFileMetadata>,
});

export {
  init as default,
  StorageFileMetadata,
  IStorageFile,
  getStorageFile,
};
