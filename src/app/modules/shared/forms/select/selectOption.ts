export class Option {
  constructor(
    public lable: string = 'DefaultLable',
    public value: string,
    public isActive: boolean = false,
    public parentId?: string
  ) {}
}
