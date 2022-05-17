export class CategoriesNavigationResponseModel {
  constructor(
    public id: string,
    public name: string,
    public childCategories: CategoriesNavigationResponseModel[]
  ) {}
}
