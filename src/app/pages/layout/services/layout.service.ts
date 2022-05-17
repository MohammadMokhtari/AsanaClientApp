import { MainCategories } from './../Models/mainCategories';
import { shareReplay, map } from 'rxjs/operators';
import { ResponseJsonStatus } from '@shared-module/models/ResponseJsonStatus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriesNavigationResponseModel } from '../components/header/bottom-header/site-menu/mega-menu/models/categoriesNavigationResponseModel';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) {}

  private categoriesNavgationObs: Observable<
    CategoriesNavigationResponseModel[]
  >;

  private mainCategoriesObs: Observable<MainCategories[]>;

  public getCategoriesNavgationObs() {
    if (this.categoriesNavgationObs) {
      return this.categoriesNavgationObs;
    }
    this.categoriesNavgationObs = this.fetchCategoriesNavigation();
    return this.categoriesNavgationObs;
  }

  public getMaincategoriesObs() {
    if (this.mainCategoriesObs) {
      return this.mainCategoriesObs;
    }
    this.mainCategoriesObs = this.fetchMainCategories();
    return this.mainCategoriesObs;
  }

  private fetchCategoriesNavigation(): Observable<
    CategoriesNavigationResponseModel[]
  > {
    return this.http
      .get<ResponseJsonStatus<CategoriesNavigationResponseModel[]>>('category')
      .pipe(
        shareReplay(1),
        map((response) => {
          return response.data;
        })
      );
  }

  private fetchMainCategories(): Observable<MainCategories[]> {
    return this.http
      .get<ResponseJsonStatus<MainCategories[]>>('category/main')
      .pipe(
        shareReplay(1),
        map((response) => {
          return response.data;
        })
      );
  }
}
