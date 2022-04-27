export class MediaFile {
  constructor(public alt: string, public url: string, mediaType: MediaType) {}
}

export enum MediaType {
  Image,
  Vidio,
}
