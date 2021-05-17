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

export interface IStorageFile {
  readonly URL: string;
  readonly metadata: StorageFileMetadata;
}

export const getStorageFile = async (storageRef: fb.storage.Reference): Promise<IStorageFile> => ({
  URL: await storageRef.getDownloadURL() as Readonly<string>,
  metadata: await storageRef.getMetadata() as Readonly<StorageFileMetadata>,
});
