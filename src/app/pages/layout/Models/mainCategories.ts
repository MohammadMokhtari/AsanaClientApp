import { MediaFile } from './mediaFile';

export class MainCategories {
  constructor(
    public id: number,
    public name: string,
    public mediaFile: MediaFile
  ) {}
}
