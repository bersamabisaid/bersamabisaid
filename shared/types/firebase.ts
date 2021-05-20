/* eslint-disable @typescript-eslint/no-namespace */
import type fb from 'firebase';

export namespace Storage {
  export type metadata<TcustomMetadata = Record<string, unknown>> = {
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
}
