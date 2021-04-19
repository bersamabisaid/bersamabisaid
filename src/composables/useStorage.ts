import type fb from 'firebase';

export type StorageFileMetadata<TcustomMetadata = Record<string, unknown>> = {
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

export const getStorageFile = async (storageRef: fb.storage.Reference) => ({
  URL: await storageRef.getDownloadURL() as Readonly<string>,
  metadata: await storageRef.getMetadata() as Readonly<StorageFileMetadata>,
});
